import { MainFooter } from "@/components/footer/MainFooter";
import { Navbar } from "@/components/navbar/Navbar";
import { ThemeProviderClient } from "@/components/theme/ThemeProvider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
        url: "/img/solka.avif",
        width: 630,
        height: 630,
        alt: "Solkarine",
      },
    ],
  },

  // Balises Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Solkarine",
    description: "Joueuse de WoW et streameuse sur Twitch. Je vous partage mes aventures dans le jeu.",
    images: ["/img/solka.avif"],
    creator: "@solkarine",
  },

  // Balises Discord Embed
  other: {
    "discord:image": "/img/solka.avif",
    "discord:image:alt": "Solkarine - Joueuse de WoW et streameuse",
    "discord:image:width": "630",
    "discord:image:height": "630",
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
    <html lang="en">
      <head></head>
      <body className={`${geistMono.className} antialiased bg-background-secondary`}>
        <ThemeProviderClient>
          <main className="flex flex-col min-h-screen max-w-[1050px] mx-auto p-5 bg-background-secondary">
            <Navbar />
            <div className="flex-1 my-10">{children}</div>
            <MainFooter />
          </main>
        </ThemeProviderClient>
      </body>
    </html>
  );
}
