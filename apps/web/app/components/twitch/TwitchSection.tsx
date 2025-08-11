import TwitchEmbedLib from "@/app/components/twitch/TwitchEmbed";
import TwitchScheduleModule from "@/app/components/twitch/TwitchScheduleModule";
import { FaTwitch } from "react-icons/fa";

export default function TwitchSection() {
  return (
    <section className="gap-8 items-center w-full min-h-[50vh] my-15 mx-auto items-center justify-center flex flex-col">
      <h2 className="font-dyna-puff">
        <FaTwitch className="w-10 h-10 text-[#6441a5]" />
        <span>Rejoignez-moi en direct sur Twitch !</span>
        {/* Rejoignez-moi en direct sur Twitch ! */}
        {/* <svg className="w-6 h-6 text-indigo-400 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16,7V3H14V7H10V3H8V7H4V19H20V7H16M6,17V9H18V17H6Z" />
        </svg> */}
      </h2>
      <div className="flex flex-col md:flex-row gap-10 items-center w-full">
        <div className="w-full grow flex gap-10 lg:flex-row flex-col">
          <TwitchEmbedLib />
          <div className="w-full justify-center items-center flex lg:max-w-[20%]">
            <TwitchScheduleModule />
          </div>
        </div>
      </div>
    </section>
  );
}
