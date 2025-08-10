import TwitchEmbedLib from "@/app/components/twitch/TwitchEmbed";
import TwitchScheduleModule from "@/app/components/twitch/TwitchScheduleModule";

export default function TwitchSection() {
  return (
    <section className="gap-8 items-center w-full min-h-[50vh] mx-auto items-center justify-center flex flex-col">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <svg className="w-8 h-8 text-purple-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.64 5.93h1.43v4.28h-1.43m3.93-4.28H17v4.28h-1.43M7 2L3.43 5.57v12.86h4.28V22l3.58-3.57h2.85L20.57 12V2m-1.43 9.29l-2.85 2.85h-2.86l-2.5 2.5v-2.5H7.71V3.43h11.43Z" />
        </svg>
        <span className="font-dyna-puff">Rejoignez-moi en direct sur Twitch !</span>
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
