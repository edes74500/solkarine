import TwitchEmbedLib from "@/app/components/twitch/TwitchEmbed";

export default function TwitchSection() {
  return (
    <section className="gap-8 items-center w-full min-h-[50vh] mx-auto items-center justify-center flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Retrouvez-moi sur Twitch !</h2>
      <div className="flex flex-col md:flex-row gap-10 items-center w-full">
        <div className="w-full grow">
          <TwitchEmbedLib />
        </div>
        <div className="bg-secondary/20 p-6 rounded-lg">
          <div className=" md:grid-cols-4 gap-4 flex flex-col">
            <div className="bg-background p-3 rounded border text-center">
              <p className="font-bold">Lundi</p>
              <p className="text-sm text-muted-foreground">20h - 23h</p>
            </div>
            <div className="bg-background p-3 rounded border text-center">
              <p className="font-bold">Mercredi</p>
              <p className="text-sm text-muted-foreground">20h - 23h</p>
            </div>
            <div className="bg-background p-3 rounded border text-center">
              <p className="font-bold">Vendredi</p>
              <p className="text-sm text-muted-foreground">20h - 23h</p>
            </div>
            <div className="bg-background p-3 rounded border text-center">
              <p className="font-bold">Dimanche</p>
              <p className="text-sm text-muted-foreground">14h - 18h</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
