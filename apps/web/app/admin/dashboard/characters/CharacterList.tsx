import CharacterDelete from "@/app/admin/dashboard/characters/CharacterDelete";
import { CharacterCard } from "@/components/characters/CharacterCard";
import { getAllCharacters } from "@/lib/api/character";
import { fetchRaiderCharacter } from "@/lib/api/Raider.io";
import { Alert, AlertDescription, AlertTitle } from "@repo/ui/components/alert";
import { InfoIcon } from "lucide-react";

export async function CharacterList() {
  //   const { data: characters, isLoading, error } = useGetCharactersQuery();
  const characters = await getAllCharacters();
  console.log(characters);

  //   console.log(characters);

  const charactersData = await Promise.all(
    characters.data.map(async (character) => {
      const data = await fetchRaiderCharacter(character.region, character.server, character.name);
      return {
        ...data,
        id: character.id, // Récupération de l'ID depuis les données de getAllCharacters
      };
    }),
  );

  console.log(charactersData);

  return (
    <div>
      <div className="flex flex-col gap-4">
        <h1>Personnages</h1>
        <Alert className="mb-4">
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>Information</AlertTitle>
          <AlertDescription>
            Pour éviter un abus sur l'API de Raider.io, les données sont mises en cache et peuvent prendre jusqu'à 24h
            pour se mettre à jour.
          </AlertDescription>
        </Alert>
        <div className="flex flex-wrap gap-4">
          {charactersData.map((character) => (
            <div key={character.name} className="relative flex flex-col gap-2">
              <CharacterCard character={character} />
              <CharacterDelete characterId={character.id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
