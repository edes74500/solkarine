import { deleteImageFromR2, setImageToFolderInR2 } from "@/services/cdn.service";
import { revalidateFetch } from "@/services/nextJsCache.service";
import { NEXT_API_TAGS } from "@repo/constants";
import { CreateTalentForm, TalentsDB, TalentsDBWithDungeonPopulated } from "@repo/types";
import { v4 as uuidv4 } from "uuid";
import { Talents } from "../models/talents.model";

export const getAllTalentsWithPopulatedDungeonService = async (): Promise<TalentsDBWithDungeonPopulated[]> => {
  const talents = await Talents.find().populate("dungeon_ids").lean({ virtuals: true });

  return talents as unknown as TalentsDBWithDungeonPopulated[];
};

export const getAllTalentsService = async (): Promise<TalentsDB[]> => {
  const talents = await Talents.find().lean({ virtuals: true });
  return talents as unknown as TalentsDB[];
};

export const addTalentService = async (talent: CreateTalentForm): Promise<TalentsDB> => {
  const uploadedScreenshot = await setImageToFolderInR2({
    imageUrl: talent.screenshot,
    folder: "talents",
    imageName: talent.name + uuidv4(),
  });
  const newTalent = await Talents.create({ ...talent, screenshot: uploadedScreenshot });

  await revalidateFetch(NEXT_API_TAGS.TALENTS.GET.GET_ALL);

  return newTalent;
};

export const clearAllTalents: () => Promise<void> = async () => {
  const talentsScreenshot = await Talents.find({}).select("screenshot");
  if (talentsScreenshot.length > 0) {
    const promises = talentsScreenshot.map(async (talent) => {
      await deleteImageFromR2(talent.screenshot);
    });
    await Promise.all(promises);
  }
  const count = await Talents.deleteMany({});
  if (count.deletedCount > 0) {
    await revalidateFetch(NEXT_API_TAGS.TALENTS.GET.GET_ALL);
  }
};

export const deleteTalentById: (id: string) => Promise<boolean> = async (id: string) => {
  const talent = await Talents.findByIdAndDelete(id);
  if (talent) {
    await revalidateFetch(NEXT_API_TAGS.TALENTS.GET.GET_ALL);
    await deleteImageFromR2(talent.screenshot);
  }
  return talent ? true : false;
};

export const updateTalentService = async ({
  id,
  talent,
  initialScreenshot,
}: {
  id: string;
  talent: Partial<CreateTalentForm>;
  initialScreenshot: string;
}): Promise<{ success: boolean; data: TalentsDB | null }> => {
  try {
    // Vérifier si le screenshot a changé
    let finalScreenshot = talent.screenshot;

    if (talent.screenshot && talent.screenshot !== initialScreenshot) {
      console.info("talent.screenshot is different from initialScreenshot");
      // Uploader la nouvelle image
      finalScreenshot = await setImageToFolderInR2({
        imageUrl: talent.screenshot,
        folder: "talents",
        imageName: talent.name + uuidv4() || "talent" + uuidv4(),
      });

      // Supprimer l'ancienne image
      if (initialScreenshot) {
        await deleteImageFromR2(initialScreenshot);
      }
    }
    console.info("finalScreenshot", finalScreenshot);

    // Mettre à jour en DB
    const updatedTalent = await Talents.findByIdAndUpdate(
      id,
      { ...talent, screenshot: finalScreenshot },
      { new: true },
    );

    if (updatedTalent) {
      await revalidateFetch(NEXT_API_TAGS.TALENTS.GET.GET_ALL);
    }

    return { success: !!updatedTalent, data: updatedTalent || null };
  } catch (error) {
    console.error("Error updating talent", error);
    return { success: false, data: null };
  }
};
