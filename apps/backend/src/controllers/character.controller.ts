import {
  countCharactersService,
  createCharacterService,
  deleteCharacterService,
  getCharacterService,
  getCharactersService,
} from "@/services/character.service";
import { revalidateFetch } from "@/services/nextJsCache.service";
import { NEXT_API_TAGS } from "@repo/constants";
import { Request, Response } from "express";

export const getCharactersController = async (req: Request, res: Response) => {
  try {
    const characters = await getCharactersService();
    res.status(200).json({ success: true, data: characters });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur lors de la récupération des personnages" });
  }
};

export const createCharacterController = async (req: Request, res: Response) => {
  try {
    const character = await createCharacterService(req.body);
    await revalidateFetch(NEXT_API_TAGS.CHARACTER.GET.GET_ALL);
    res.status(201).json({ success: true, data: character });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur lors de la création du personnage" });
  }
};

// export const editCharacterController = async (req: Request, res: Response) => {
//   try {
//     const character = await editCharacterService(req.params.id, req.body);
//     res.status(200).json({ success: true, data: character });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Erreur lors de la modification du personnage" });
//   }
// };

export const deleteCharacterController = async (req: Request, res: Response) => {
  try {
    const character = await deleteCharacterService(req.params.id);
    await revalidateFetch(NEXT_API_TAGS.CHARACTER.GET.GET_ALL);
    res.status(200).json({ success: true, data: character });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur lors de la suppression du personnage" });
  }
};

export const getCharacterController = async (req: Request, res: Response) => {
  try {
    const character = await getCharacterService(req.params.id);
    res.status(200).json({ success: true, data: character });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur lors de la récupération du personnage" });
  }
};

export const countCharactersController = async (req: Request, res: Response) => {
  try {
    console.log("countCharactersController");
    const count = await countCharactersService();
    console.log("count", count);
    res.status(200).json({ success: true, data: count });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur lors de la récupération des personnages" });
  }
};
