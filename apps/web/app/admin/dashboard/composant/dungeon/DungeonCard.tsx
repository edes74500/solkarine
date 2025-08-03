"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { DungeonClient } from "@repo/types";
import Image from "next/image";

interface DungeonCardProps {
  dungeon: DungeonClient;
  onEdit: (dungeon: DungeonClient) => void;
  onDelete: (id: string) => void;
}

export default function DungeonCard({ dungeon, onEdit, onDelete }: DungeonCardProps) {
  return (
    <Card className="overflow-hidden p-0 max-w-xs grow">
      <div className="relative h-40">
        <Image src={dungeon.background_image_url} alt={dungeon.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <Image src={dungeon.icon_url} alt={`${dungeon.name} icon`} width={64} height={64} className="rounded-md" />
        </div>
      </div>

      <CardHeader className="px-5">
        <h3 className="font-bold text-lg">{dungeon.name}</h3>
        <p className="text-sm text-muted-foreground">{dungeon.short_name}</p>
      </CardHeader>

      <CardContent className="px-5 grow">
        <p className="text-sm">Timer: {Math.floor(dungeon.keystone_timer_seconds / 60)} minutes</p>
      </CardContent>

      <CardFooter className="flex justify-between px-5 pb-5">
        <Button variant="outline" size="sm" onClick={() => onEdit(dungeon)}>
          Éditer
        </Button>
        <Button variant="destructive" size="sm" onClick={() => onDelete(dungeon.id)}>
          Supprimer
        </Button>
      </CardFooter>
    </Card>
  );
}
