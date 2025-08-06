"use client";

import { DungeonClient } from "@repo/types";
import { Card, CardContent, CardFooter, CardHeader } from "@repo/ui/components/card";
import Image from "next/image";
import EditDungeon from "./EditDungeon";

interface DungeonCardProps {
  dungeon: DungeonClient;
  onEdit: (dungeon: DungeonClient) => void;
}

export default function DungeonCard({ dungeon, onEdit }: DungeonCardProps) {
  return (
    <Card className="overflow-hidden p-0 max-w-xs grow">
      <div className="relative h-40">
        <Image src={dungeon.background_image_url} alt={dungeon.name} fill sizes="100%" className="object-cover" />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <Image src={dungeon.icon_url} alt={`${dungeon.name} icon`} width={64} height={64} className="rounded-md" />
        </div>
      </div>

      <CardHeader className="px-5">
        <h3 className="font-bold text-lg">{dungeon.name}</h3>
        <p className="text-sm text-muted-foreground">{dungeon.short_name}</p>
      </CardHeader>

      <CardContent className="px-5 grow">
        <p className="text-sm">
          Timer: {Math.floor(dungeon.keystone_timer_seconds / 60)} mn{" "}
          {dungeon.keystone_timer_seconds % 60 < 10
            ? "0" + (dungeon.keystone_timer_seconds % 60)
            : dungeon.keystone_timer_seconds % 60}{" "}
          s
        </p>
      </CardContent>

      <CardFooter className="flex justify-center px-5 pb-5">
        <EditDungeon dungeon={dungeon} onEdit={onEdit} />
      </CardFooter>
    </Card>
  );
}
