import { MainFooter } from "@/components/footer/MainFooter";
import { Navbar } from "@/components/navbar/Navbar";
import { ThemeProviderClient } from "@/components/theme/ThemeProvider";
import { StoreProvider } from "@/redux/StoreProvider";
import { frontendImageLink } from "@repo/constants";
import { Toaster } from "@repo/ui/components/sonner";
import "@repo/ui/styles/globals.css";
import type { Metadata } from "next";
import { DynaPuff, Geist, Geist_Mono, Nunito_Sans } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
        width: 200,
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
    "discord:image:width": "200",
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
    <html lang="en">
      <head></head>
      <StoreProvider>
        <body
          className={`${dynaPuff.variable} ${geistMono.variable}  ${nunito.variable} antialiased bg-background-secondary `}
        >
          <ThemeProviderClient>
            <main className="flex flex-col min-h-screen bg-background-secondary font-nunito">
              {/* <ContentWidthWrapper> */}
              <Navbar />
              {/* </ContentWidthWrapper> */}
              <div className="grow">
                <Toaster position="bottom-center" />
                {children}
              </div>
              {/* <ContentWidthWrapper> */}
              <MainFooter />
              {/* </ContentWidthWrapper> */}
            </main>
          </ThemeProviderClient>
        </body>
      </StoreProvider>
    </html>
  );
}
