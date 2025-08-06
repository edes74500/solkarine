import { RaiderioCharacter } from "@repo/types";
import { Card, CardContent, CardFooter, CardHeader } from "@repo/ui/components/card";
import Image from "next/image";

interface CharacterCardProps {
  character: RaiderioCharacter | null;
}

export function CharacterCard({ character }: CharacterCardProps) {
  if (!character) return null;

  return (
    <Card className="overflow-hidden w-xs pt-0 h-full">
      <CardHeader className="relative p-0 h-32 !pt-0 !pb-0 !mt-0 bg-red-500">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70">
          <Image
            src={character.thumbnail_url || "/images/character-placeholder.jpg"}
            alt={character.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute bottom-2 left-3 text-white">
          <h3 className="text-xl font-bold">{character.name}</h3>
          <p className="text-sm opacity-90">{character.realm}</p>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        {/* <div className="flex items-center justify-between mb-2">
          <Badge className={`${getClassColor(character.class)}`}>{character.class}</Badge>
          <Badge variant="outline">{character.active_spec_name}</Badge>
        </div> */}
        <div className="flex items-center gap-2 mt-3">
          <span className="text-sm font-medium">Classe:</span>
          <span>{character.class}</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm font-medium">Spécialisation:</span>
          <span>{character.active_spec_name}</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm font-medium">iLvl:</span>
          <span>{Math.floor(character.gear?.item_level_equipped)}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-3">
        <div>
          <span className="text-sm font-medium">Score :</span>
          <span
            className="ml-2 font-bold text-blue-500"
            style={{ color: character.mythic_plus_scores_by_season[0]?.segments?.all?.color }}
          >
            {character.mythic_plus_scores_by_season[0]?.scores?.all.toFixed(1)}
          </span>
        </div>
        <a
          href={character.profile_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-500 hover:underline"
        >
          Raider.io
        </a>
      </CardFooter>
    </Card>
  );
}
