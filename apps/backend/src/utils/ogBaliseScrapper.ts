import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import * as cheerio from "cheerio";
import chromium from "chrome-aws-lambda";
import { Express, Request, Response } from "express";
import puppeteer from "puppeteer-core";

// Interfaces TypeScript
interface OGTags {
  [key: string]: string;
}
interface TwitterTags {
  [key: string]: string;
}
interface BasicMeta {
  title: string;
  description: string;
  favicon: string;
  ogImageUrl: string;
}
interface ScrapingResult {
  url: string;
  openGraph: OGTags;
  twitter: TwitterTags;
  basic: BasicMeta;
  timestamp: string;
}
interface OGScraperQuery {
  url?: string;
  puppeteer?: string;
}

// Scraping avec Puppeteer (puppeteer-core + chrome-aws-lambda)
async function scrapeOGTagsWithPuppeteer(url: string): Promise<ScrapingResult> {
  let browser;
  try {
    console.log(`Fetching with Puppeteer: ${url}`);
    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
        "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    );
    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
    // Extraction directe dans le contexte de la page
    const result = await page.evaluate((origUrl) => {
      const og: Record<string, string> = {};
      document.querySelectorAll('meta[property^="og:"]').forEach((el) => {
        const p = el.getAttribute("property");
        const c = el.getAttribute("content");
        if (p && c) og[p.replace("og:", "")] = c;
      });
      const tw: Record<string, string> = {};
      document.querySelectorAll('meta[name^="twitter:"]').forEach((el) => {
        const n = el.getAttribute("name");
        const c = el.getAttribute("content");
        if (n && c) tw[n.replace("twitter:", "")] = c;
      });
      const title = document.querySelector("title")?.textContent || "";
      const desc = document.querySelector('meta[name="description"]')?.getAttribute("content") || "";
      const favicon = document.querySelector('link[rel="icon"], link[rel="shortcut icon"]')?.getAttribute("href") || "";
      const ogImg = document.querySelector('meta[name="og:image"]')?.getAttribute("content") || "";
      return {
        url: origUrl,
        openGraph: og,
        twitter: tw,
        basic: {
          title,
          description: desc,
          favicon,
          ogImageUrl: ogImg,
        },
        timestamp: new Date().toISOString(),
      };
    }, url);
    return result;
  } catch (err: any) {
    console.error("Erreur Puppeteer:", err.message);
    throw new Error(`Impossible de scraper ${url} avec Puppeteer: ${err.message}`);
  } finally {
    if (browser) await browser.close();
  }
}

// Scraping rapide avec Axios + Cheerio
async function scrapeOGTagsWithAxios(url: string): Promise<ScrapingResult> {
  try {
    const config: AxiosRequestConfig = {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
          "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      timeout: 10000,
      maxRedirects: 5,
    };
    console.log(`Fetching with Axios: ${url}`);
    const resp: AxiosResponse<string> = await axios.get(url, config);
    const $ = cheerio.load(resp.data);

    const og: OGTags = {};
    $('meta[property^="og:"]').each((_, el) => {
      const p = $(el).attr("property");
      const c = $(el).attr("content");
      if (p && c) og[p.replace("og:", "")] = c;
    });

    const tw: TwitterTags = {};
    $('meta[name^="twitter:"]').each((_, el) => {
      const n = $(el).attr("name");
      const c = $(el).attr("content");
      if (n && c) tw[n.replace("twitter:", "")] = c;
    });

    const basic: BasicMeta = {
      title: $("title").text() || "",
      description: $('meta[name="description"]').attr("content") || "",
      favicon: $('link[rel="icon"]').attr("href") || $('link[rel="shortcut icon"]').attr("href") || "",
      ogImageUrl: $('meta[name="og:image"]').attr("content") || "",
    };

    return {
      url,
      openGraph: og,
      twitter: tw,
      basic,
      timestamp: new Date().toISOString(),
    };
  } catch (err: any) {
    console.error("Erreur Axios:", err.message);
    throw new Error(`Impossible de scraper ${url} avec Axios: ${err.message}`);
  }
}

// Fonction principale : Axios ➔ Puppeteer si besoin
async function scrapeOGTags(url: string, forcePuppeteer: boolean = false): Promise<ScrapingResult> {
  if (forcePuppeteer) {
    return scrapeOGTagsWithPuppeteer(url);
  }
  try {
    const res = await scrapeOGTagsWithAxios(url);
    if (Object.keys(res.openGraph).length === 0 && Object.keys(res.twitter).length === 0) {
      console.log("Pas de OG tags avec Axios, utilisation de Puppeteer");
      return scrapeOGTagsWithPuppeteer(url);
    }
    return res;
  } catch {
    console.log("Fallback Puppeteer après erreur Axios");
    return scrapeOGTagsWithPuppeteer(url);
  }
}

// Route Express à brancher dans votre app
function createOGScraperRoute(app: Express): void {
  app.get("/api/og-scraper", async (req: Request<{}, any, any, OGScraperQuery>, res: Response) => {
    const { url, puppeteer: pFlag } = req.query;
    if (!url) {
      return res.status(400).json({ error: "URL manquante." });
    }
    try {
      new URL(url);
    } catch {
      return res.status(400).json({ error: "URL invalide." });
    }
    try {
      const data = await scrapeOGTags(url, pFlag === "true");
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });
}

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
