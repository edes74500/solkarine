import { MainFooter } from "@/components/footer/MainFooter";
import BackgroundGrid from "@/components/layout/BackgroundGrid";
import RouteTransition from "@/components/layout/RouteTransition";
import { Navbar } from "@/components/navbar/Navbar";
import { ThemeProviderClient } from "@/components/theme/ThemeProvider";
import { StoreProvider } from "@/redux/StoreProvider";
import { GoogleAnalytics } from "@next/third-parties/google";
import { frontendImageLink } from "@repo/constants";
import { Toaster } from "@repo/ui/components/sonner";
import "@repo/ui/styles/globals.css";
import type { Metadata } from "next";
import { DynaPuff, Geist, Geist_Mono, Nunito_Sans, Poppins } from "next/font/google";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const nunito = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const dynaPuff = DynaPuff({
  variable: "--font-dyna-puff",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Solkarine",
  description:
    "Bienvenue sur le site de Solkarine. Joueuse de WoW et streameuse sur Twitch. Je vous partage mes aventures dans le jeu.",

  // Balises OpenGraph de base
  openGraph: {
    title: "Solkarine",
    description: "Joueuse de WoW et streameuse sur Twitch. Je vous partage mes aventures dans le jeu.",
    url: "https://solkarine.jdapp.dev",
    siteName: "Solkarine",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: frontendImageLink.solkarine,
        width: 113,
        height: 200,
        alt: "Solkarine",
      },
    ],
  },

  // Balises Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Solkarine",
    description: "Joueuse de WoW et streameuse sur Twitch. Je vous partage mes aventures dans le jeu.",
    images: [frontendImageLink.solkarine],
    creator: "@solkarine",
  },

  // Balises Discord Embed
  other: {
    "discord:image": frontendImageLink.solkarine,
    "discord:image:alt": "Solkarine - Joueuse de WoW et streameuse",
    "discord:image:width": "113",
    "discord:image:height": "200",
  },

  // Métadonnées supplémentaires
  keywords: ["Solkarine", "World of Warcraft", "WoW", "Twitch", "Streameuse", "Gaming"],
  authors: [{ name: "Solkarine" }],
  creator: "Solkarine",
  publisher: "Solkarine",
  formatDetection: {
    telephone: false,
  },
  metadataBase: new URL("https://solkarine.jdapp.dev"),
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="[scrollbar-gutter:stable_both-edges]">
      <head>
        {/* Google tag (gtag.js) */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-H59G71TTZQ" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-H59G71TTZQ');
          `}
        </Script>
      </head>
      <GoogleAnalytics gaId="G-H59G71TTZQ" />
      <StoreProvider>
        <body
          className={`${dynaPuff.variable} ${geistMono.variable}  ${poppins.variable} antialiased bg-red-500 [scrollbar-gutter:stable_both-edges]`}
        >
          <ThemeProviderClient>
            <main className="flex flex-col min-h-screen h-full bg-background-secondary font-poppins relative">
              {/* <ContentWidthWrapper> */}
              <BackgroundGrid />

              <Navbar />
              {/* </ContentWidthWrapper> */}
              <div className="grow px-4 lg:px-0 z-10">
                <RouteTransition>{children}</RouteTransition>
              </div>
              {/* {children}</div> */}
              {/* <ContentWidthWrapper> */}
              <MainFooter />
              <Toaster position="bottom-center" className="!z-50" />
              {/* </ContentWidthWrapper> */}
            </main>
          </ThemeProviderClient>
        </body>
      </StoreProvider>
    </html>
  );
}
