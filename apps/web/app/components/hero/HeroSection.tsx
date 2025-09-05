import { frontendImageLink } from "@repo/constants";
import { SOCIAL_MEDIA_LINK } from "@repo/constants/dist";
import { Button } from "@repo/ui/components/button";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaShoppingBag, FaTiktok, FaTwitch, FaYoutube } from "react-icons/fa";

export default function HeroSection() {
  const solkarineImage = frontendImageLink.solkarine;
  return (
    <section className="flex flex-col gap-8 items-center w-full items-center justify-center">
      <div className="flex flex-col md:flex-row gap-8 items-center py-20">
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
          <h1 className="text-4xl font-bold font-dyna-puff">Hello there!</h1>
          <p className="">
            Bienvenue sur mon site officiel ! Je partage ma passion pour World of Warcraft à travers mes streams, guides
            et conseils pour les joueurs de tous niveaux.
          </p>

          <div className="flex flex-wrap pt-2">
            <h2 className="text-2xl font-bold mb-2">Suivez-moi sur :</h2>
            <div className="flex flex-wrap gap-3">
              <Button className="flex items-center bg-purple-600 hover:bg-purple-700 text-white" asChild>
                <Link href={SOCIAL_MEDIA_LINK.TWITCH} target="_blank">
                  <FaTwitch className="" /> Twitch
                </Link>
              </Button>
              <Button
                variant="outline"
                className="flex items-center text-red-500 border-red-500 hover:bg-red-500/10"
                asChild
              >
                <Link href={SOCIAL_MEDIA_LINK.YOUTUBE} target="_blank">
                  <FaYoutube className="" /> YouTube
                </Link>
              </Button>

              <Button
                variant="outline"
                className="flex items-center text-black dark:text-white border-gray-500 hover:bg-gray-500/10"
              >
                <Link href={SOCIAL_MEDIA_LINK.TIKTOK} target="_blank" className="flex items-center gap-2">
                  <FaTiktok className="" />
                  TikTok
                </Link>
              </Button>
              <Button
                variant="outline"
                className="flex items-center text-pink-500 border-pink-500 hover:bg-pink-500/10"
              >
                <Link href={SOCIAL_MEDIA_LINK.INSTAGRAM} target="_blank" className="flex items-center gap-2">
                  <FaInstagram className="" />
                  Instagram
                </Link>
              </Button>
              <Button
                variant="outline"
                className="flex items-center text-blue-500 border-blue-500 hover:bg-blue-500/10"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>{" "}
                <Link href={SOCIAL_MEDIA_LINK.TWITTER} target="_blank">
                  Twitter
                </Link>
              </Button>
              <Button
                variant="outline"
                className="flex items-center text-indigo-500 border-indigo-500 hover:bg-indigo-500/10"
              >
                <Link href={SOCIAL_MEDIA_LINK.BOUTIQUE} target="_blank" className="flex items-center gap-2">
                  <FaShoppingBag className="" /> Boutique
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
