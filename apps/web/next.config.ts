import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@repo/utils", "@repo/types", "@repo/typescript-config", "@repo/ui", "@repo/constants"],
  // Suppression des console.log en production
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"],
          }
        : false,
  },
  /* config options here */
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raider.io",
      },
      {
        protocol: "https",
        hostname: "render.worldofwarcraft.com",
      },
      {
        protocol: "https",
        hostname: "cdn.raiderio.net",
      },
      {
        protocol: "https",
        hostname: "wow.zamimg.com",
      },
      {
        protocol: "https",
        hostname: "media.wago.io",
      },
      {
        protocol: "https",
        hostname: "wago.io",
      },
      {
        protocol: "https",
        hostname: "www.curseforge.com",
      },
      {
        protocol: "https",
        hostname: "media.forgecdn.net",
      },
      {
        protocol: "https",
        hostname: "**", // Wildcard: tous les domaines
      },
    ],
  },
};

export default nextConfig;
