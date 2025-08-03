"use client";

import { TwitchEmbed } from "react-twitch-embed";

export default function TwitchEmbedLib() {
  return (
    // Le container force le ratio 16/9 grâce à "aspect-video"
    <div className="w-full aspect-video">
      <TwitchEmbed
        channel="solkarine"
        id="twitch-embed"
        withChat={false}
        parent={process.env.NEXT_PUBLIC_TWITCH_PARENT}
        width="100%"
        muted={true}
        height="100%"
      />
    </div>
  );
}
