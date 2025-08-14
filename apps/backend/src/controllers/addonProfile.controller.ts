import { AppError } from "@/errors/AppError";
import {
  createAddonProfileService,
  deleteAddonProfileService,
  getAddonProfilesService,
  updateAddonProfileService,
} from "@/services/addonProfile.service";
import { setImageToFolderInR2 } from "@/services/cdn.service";
import { revalidateFetch } from "@/services/nextJsCache.service";
import { NEXT_API_TAGS } from "@repo/constants";
import { createAddonProfileSchema, editAddonProfileSchema } from "@repo/types";
import { Request, Response } from "express";

export const getAddonProfilesController = async (req: Request, res: Response) => {
  const addonProfiles = await getAddonProfilesService();

  if (!addonProfiles) {
    return res.status(404).json({ success: false, message: "Aucun profil d'addon trouvé" });
  }

  res.status(200).json({ success: true, data: addonProfiles });
};

export const createAddonProfileController = async (req: Request, res: Response) => {
  const parsedBody = createAddonProfileSchema.parse(req.body);

  const uploadedScreenshots = await Promise.all(
    parsedBody.screenshots.map(async (url: string, i: number) => {
      return await setImageToFolderInR2({
        imageUrl: url,
        folder: "addon-profiles",
        imageName: parsedBody.name,
        index: i,
      });
    }),
  );

  const addonProfile = await createAddonProfileService({
    ...parsedBody,
    screenshots: Array.isArray(uploadedScreenshots) ? uploadedScreenshots : [uploadedScreenshots],
  });

  await revalidateFetch(NEXT_API_TAGS.ADDON_PROFILE.GET.GET_ALL_WITH_POPULATED_ADDON);

  res.status(201).json({ success: true, data: addonProfile });
};

export const updateAddonProfileController = async (req: Request, res: Response) => {
  const data = editAddonProfileSchema.parse(req.body.formData);
  const initialScreenshots: string[] = req.body.initialScreenshots ?? [];
  const id = req.params.id;

  // 1) Supprimer ce qui n’est plus dans le form
  const { success, data: updatedProfile } = await updateAddonProfileService(id, data, initialScreenshots);

  if (!success) {
    throw new AppError("Error updating addon profile", 500);
  }

  res.status(200).json({ success, data: updatedProfile });
};

export const deleteAddonProfileController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { success } = await deleteAddonProfileService(id);

  if (!success) {
    throw new AppError("Error deleting addon profile", 500);
  }

  res.status(200).json({ success });
};

export const getAddonProfileCountController = async (req: Request, res: Response) => {};
