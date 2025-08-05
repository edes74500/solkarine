import { BasicMeta, OGScraperQuery, OGTags, ScrapingResult, TwitterTags } from "@repo/types";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import * as cheerio from "cheerio";
import { Express, Request, Response } from "express";
import puppeteer from "puppeteer";

// Fonction pour scraper avec Puppeteer (pour contenu dynamique)
async function scrapeOGTagsWithPuppeteer(url: string): Promise<ScrapingResult> {
  let browser;
  try {
    console.log(`Fetching with Puppeteer: ${url}`);

    browser = await puppeteer.launch({
      headless: true,
      // args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // Définir un User-Agent réaliste
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    );

    // Naviguer vers la page et attendre le chargement
    await page.goto(url, {
      waitUntil: ["networkidle0", "domcontentloaded"],
      timeout: 30000,
    });

    // Attendre un peu plus pour les métadonnées dynamiques
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Extraire les données
    const result = await page.evaluate((originalUrl) => {
      const ogTags: { [key: string]: string } = {};
      const twitterTags: { [key: string]: string } = {};

      // Extraire les balises OG
      document.querySelectorAll('meta[property^="og:"]').forEach((element) => {
        const property = element.getAttribute("property");
        const content = element.getAttribute("content");
        if (property && content) {
          const key = property.replace("og:", "");
          ogTags[key] = content;
        }
      });

      // Extraire les balises Twitter
      document.querySelectorAll('meta[name^="twitter:"]').forEach((element) => {
        const name = element.getAttribute("name");
        const content = element.getAttribute("content");
        if (name && content) {
          const key = name.replace("twitter:", "");
          twitterTags[key] = content;
        }
      });

      // Métadonnées de base
      // titre
      const titleElement = document.querySelector("title");
      const title = titleElement?.textContent;

      // description (standard)
      const descriptionElement = document.querySelector('meta[name="description"]');
      const description = descriptionElement?.getAttribute("content");

      // favicon
      const faviconElement = document.querySelector('link[rel="icon"], link[rel="shortcut icon"]');
      const faviconUrl = faviconElement?.getAttribute("href");

      // **image de preview via Open Graph**
      const ogImageEl = document.querySelector('meta[name="og:image"]');
      const ogImageUrl = ogImageEl?.getAttribute("content") || null;

      // **fallback Twitter Card**
      //   const twitterImageElement = document.querySelector('meta[name="twitter:image"]');
      //   const twitterImageUrl = twitterImageElement?.getAttribute("content");

      const basicMeta = {
        title: title || "",
        description: description || "",
        favicon: faviconUrl || "",
        ogImageUrl: ogImageUrl || "",
      };

      return {
        url: originalUrl,
        openGraph: ogTags,
        twitter: twitterTags,
        basic: basicMeta,
        timestamp: new Date().toISOString(),
      };
    }, url);

    return result;
  } catch (error: any) {
    console.error("Erreur lors du scraping avec Puppeteer:", error.message);
    throw new Error(`Impossible de scraper ${url} avec Puppeteer: ${error.message}`);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Fonction de fallback avec axios (plus rapide)
async function scrapeOGTagsWithAxios(url: string): Promise<ScrapingResult> {
  try {
    // Configuration des headers pour éviter les blocages
    const config: AxiosRequestConfig = {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate",
        Connection: "keep-alive",
        "Upgrade-Insecure-Requests": "1",
      },
      timeout: 10000,
      maxRedirects: 5,
    };

    console.log(`Fetching with Axios: ${url}`);
    const response: AxiosResponse<string> = await axios.get(url, config);

    const $: cheerio.CheerioAPI = cheerio.load(response.data);

    const ogTags: OGTags = {};
    $('meta[property^="og:"]').each((i: number, element: any) => {
      const property = $(element).attr("property");
      const content = $(element).attr("content");
      if (property && content) {
        const key = property.replace("og:", "");
        ogTags[key] = content;
      }
    });

    const twitterTags: TwitterTags = {};
    $('meta[name^="twitter:"]').each((i: number, element: any) => {
      const name = $(element).attr("name");
      const content = $(element).attr("content");
      if (name && content) {
        const key = name.replace("twitter:", "");
        twitterTags[key] = content;
      }
    });

    const basicMeta: BasicMeta = {
      title: $("title").text() || "",
      description: $('meta[name="description"]').attr("content") || "",
      favicon: $('link[rel="icon"]').attr("href") || $('link[rel="shortcut icon"]').attr("href") || "",
      ogImageUrl: $('meta[name="og:image"]').attr("content") || "",
    };

    return {
      url: url,
      openGraph: ogTags,
      twitter: twitterTags,
      basic: basicMeta,
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    console.error("Erreur lors du scraping avec Axios:", error.message);
    throw new Error(`Impossible de scraper ${url} avec Axios: ${error.message}`);
  }
}

// Fonction principale qui essaie d'abord Axios puis Puppeteer
async function scrapeOGTags(url: string, forcePuppeteer: boolean = false): Promise<ScrapingResult> {
  if (forcePuppeteer) {
    return scrapeOGTagsWithPuppeteer(url);
  }

  try {
    // Essayer d'abord avec Axios (plus rapide)
    const result = await scrapeOGTagsWithAxios(url);

    // Si aucune balise OG trouvée, essayer avec Puppeteer
    if (Object.keys(result.openGraph).length === 0 && Object.keys(result.twitter).length === 0) {
      console.log("Aucune balise OG trouvée avec Axios, tentative avec Puppeteer...");
      return await scrapeOGTagsWithPuppeteer(url);
    }

    return result;
  } catch (axiosError) {
    console.log("Échec avec Axios, tentative avec Puppeteer...");
    return await scrapeOGTagsWithPuppeteer(url);
  }
}

// Fonction pour utiliser avec Express
function createOGScraperRoute(app: Express): void {
  app.get(
    "/api/og-scraper",
    async (req: Request<{}, any, any, OGScraperQuery & { puppeteer?: string }>, res: Response) => {
      try {
        const { url, puppeteer: forcePuppeteer } = req.query;

        if (!url) {
          return res.status(400).json({
            error: "URL manquante. Utilisez ?url=https://example.com&puppeteer=true pour forcer Puppeteer",
          });
        }

        // Valider l'URL
        try {
          new URL(url);
        } catch {
          return res.status(400).json({
            error: "URL invalide",
          });
        }

        const result: ScrapingResult = await scrapeOGTags(url, forcePuppeteer === "true");
        res.json(result);
      } catch (error: any) {
        res.status(500).json({
          error: error.message,
        });
      }
    },
  );
}

// Exemple d'utilisation directe

// Export pour utilisation en tant que module
export {
  BasicMeta,
  createOGScraperRoute,
  OGTags,
  scrapeOGTags,
  scrapeOGTagsWithAxios,
  scrapeOGTagsWithPuppeteer,
  ScrapingResult,
  TwitterTags,
};
