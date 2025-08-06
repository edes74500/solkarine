import { Character } from "@/models/character.model";
import { CharacterDB, CreateCharacterForm, EditCharacterForm } from "@repo/types";

export const getCharactersService = async (): Promise<CharacterDB[]> => {
  const characters = await Character.find();
  return characters;
};

export const createCharacterService = async (character: CreateCharacterForm): Promise<CharacterDB> => {
  // Vérifier si un personnage avec le même nom, serveur et région existe déjà
  const existingCharacter = await Character.findOne({
    name: character.name,
    server: character.server,
    region: character.region,
  });

  if (existingCharacter) {
    // Si le personnage existe déjà, mettre à jour ses informations
    const updatedCharacter = await Character.findByIdAndUpdate(existingCharacter._id, character, { new: true });
    return updatedCharacter as CharacterDB;
  }

  // Si le personnage n'existe pas, en créer un nouveau
  const newCharacter = await Character.create(character);
  return newCharacter;
};

export const editCharacterService = async (id: string, character: EditCharacterForm): Promise<CharacterDB | null> => {
  const updatedCharacter = await Character.findByIdAndUpdate(id, character, { new: true });
  return updatedCharacter;
};

export const deleteCharacterService = async (id: string): Promise<boolean> => {
  const deletedCharacter = await Character.findByIdAndDelete(id);
  return deletedCharacter !== null;
};

export const getCharacterService = async (id: string): Promise<CharacterDB | null> => {
  const character = await Character.findById(id);
  return character;
};

export const countCharactersService = async (): Promise<number> => {
  try {
    const count = await Character.countDocuments();
    return count;
  } catch (error) {
    console.error(error);
    return 0;
  }
};
