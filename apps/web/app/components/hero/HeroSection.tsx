import { frontendImageLink } from "@repo/constants";
import { Button } from "@repo/ui/components/button";
import Image from "next/image";
import { FaDiscord, FaTwitch, FaYoutube } from "react-icons/fa";

export default function HeroSection() {
  const solkarineImage = frontendImageLink.solkarine;
  return (
    <section className="flex flex-col gap-8 items-center w-full items-center justify-center">
      <div className="flex flex-col md:flex-row gap-8 items-center min-h-[50vh]">
        {/* image */}
        <div className="relative w-full md:w-1/3 aspect-square">
          <Image
            src={solkarineImage}
            alt="Solkarine"
            fill
            className="object-cover rounded-2xl shadow-lg border border-secondary/20"
            style={{
              filter: "drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))",
            }}
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
          />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent opacity-60"></div>
        </div>

        {/* description */}
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl font-bold">Hello there!</h1>
          <p className="text-muted-foreground">
            Bienvenue sur mon site officiel ! Je partage ma passion pour World of Warcraft à travers mes streams, guides
            et conseils pour les joueurs de tous niveaux.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <h2 className="text-2xl font-bold">Suivez-moi sur :</h2>
            <div className="flex flex-wrap gap-3">
              <Button className="flex items-center bg-purple-600 hover:bg-purple-700 text-white">
                <FaTwitch className="mr-2" /> Twitch
              </Button>
              <Button variant="outline" className="flex items-center text-red-500 border-red-500 hover:bg-red-500/10">
                <FaYoutube className="mr-2" /> YouTube
              </Button>
              <Button
                variant="outline"
                className="flex items-center text-indigo-500 border-indigo-500 hover:bg-indigo-500/10"
              >
                <FaDiscord className="mr-2" /> Discord
              </Button>
              <Button
                variant="outline"
                className="flex items-center text-black dark:text-white border-gray-500 hover:bg-gray-500/10"
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>{" "}
                TikTok
              </Button>
              <Button
                variant="outline"
                className="flex items-center text-pink-500 border-pink-500 hover:bg-pink-500/10"
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                </svg>{" "}
                Instagram
              </Button>
              <Button
                variant="outline"
                className="flex items-center text-blue-500 border-blue-500 hover:bg-blue-500/10"
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>{" "}
                Twitter
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
