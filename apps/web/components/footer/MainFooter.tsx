"use client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@repo/ui/components/tooltip";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaDiscord, FaInstagram, FaPuzzlePiece, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa";

export function MainFooter() {
  const pathname = usePathname();
  const isAdminPage = pathname.includes("admin");

  if (isAdminPage) {
    return null;
  }

  return (
    <footer className="border-t border-border  mx-auto w-full bg-navbar px-5 rounded-t-lg">
      <div className="mx-auto flex items-center justify-between py-6 w-full max-w-[1080px]">
        <div className="flex items-center space-x-4">
          <Link href="/" className="font-bold text-xl font-mono pr-5">
            Solkarine
          </Link>
        </div>

        <div>
          <Link href="/admin/dashboard">Admin</Link>
        </div>
        <div className="flex items-center space-x-6">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="https://discord.com" className="hover:opacity-80 transition-opacity">
                  <FaDiscord className="h-5 w-5 text-[#5865F2]" />
                  <span className="sr-only">Discord</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Discord</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="https://instagram.com" className="hover:opacity-80 transition-opacity">
                  <FaInstagram className="h-5 w-5 text-[#E4405F]" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Instagram</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="https://puzzle.com" className="hover:opacity-80 transition-opacity">
                  <FaPuzzlePiece className="h-5 w-5 text-[#FF9900]" />
                  <span className="sr-only">Puzzle</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Puzzle</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="https://twitter.com" className="hover:opacity-80 transition-opacity">
                  <FaTwitter className="h-5 w-5 text-[#1DA1F2]" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Twitter</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="https://youtube.com" className="hover:opacity-80 transition-opacity">
                  <FaYoutube className="h-5 w-5 text-[#FF0000]" />
                  <span className="sr-only">YouTube</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>YouTube</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="https://tiktok.com" className="hover:opacity-80 transition-opacity">
                  <FaTiktok className="h-5 w-5 text-[#000000] dark:text-[#FFFFFF]" />
                  <span className="sr-only">TikTok</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>TikTok</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </footer>
  );
}
