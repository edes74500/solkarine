import { createAddonProfileService, getAddonProfilesService } from "@/services/addonProfile.service";
import { setImageToFolderInR2 } from "@/services/cdn.service";
import { createAddonProfileSchema } from "@repo/types";
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

  const uploadedScreenshots = await setImageToFolderInR2({
    imageUrl: parsedBody.screenshots,
    folder: "addon-profiles",
    imageName: parsedBody.name,
  });

  const addonProfile = await createAddonProfileService({
    ...parsedBody,
    screenshots: Array.isArray(uploadedScreenshots) ? uploadedScreenshots : [uploadedScreenshots],
  });

  res.status(201).json({ success: true, data: addonProfile });
};

export const updateAddonProfileController = async (req: Request, res: Response) => {};

export const deleteAddonProfileController = async (req: Request, res: Response) => {};

export const getAddonProfileCountController = async (req: Request, res: Response) => {};
