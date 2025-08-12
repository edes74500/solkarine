import { createAddon, deleteAddon, getAddonCount, getAllAddon, updateAddon } from "@/services/addon.service";
import { deleteAddonProfileByAddonId, getAddonProfilesCountForThisAddon } from "@/services/addonProfile.service";
import { revalidateFetch } from "@/services/nextJsCache.service";
import { NEXT_API_TAGS } from "@repo/constants";
import { createAddonSchema, editAddonSchema } from "@repo/types";
import { Request, Response } from "express";

export const getAllAddonController = async (req: Request, res: Response) => {
  const addons = await getAllAddon();
  if (!addons) {
    return res.status(404).json({ success: false, message: "No addons found" });
  }
  res.status(200).json({ success: true, data: addons });
};

export const createAddonController = async (req: Request, res: Response) => {
  const body = req.body;
  const parsedBody = createAddonSchema.safeParse(body);

  if (!parsedBody.success) {
    return res.status(400).json({ success: false, message: "Invalid body" });
  }

  const addon = await createAddon(parsedBody.data);
  //* revalidate les tags
  await revalidateFetch(NEXT_API_TAGS.ADDON.GET.GET_ALL);
  res.status(201).json({ success: true, data: addon });
};

export const updateAddonController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body;
  const parsedBody = editAddonSchema.safeParse(body);
  if (!parsedBody.success) {
    return res.status(400).json({ success: false, message: "Invalid body" });
  }
  const success = await updateAddon(id, parsedBody.data);
  if (!success) {
    return res.status(404).json({ success: false, message: "Addon not found" });
  }
  //* revalidate les tags
  await revalidateFetch(NEXT_API_TAGS.ADDON.GET.GET_ALL);
  await revalidateFetch(NEXT_API_TAGS.ADDON_PROFILE.GET.GET_ALL_WITH_POPULATED_ADDON);
  res.status(200).json({ success: true, message: "Addon updated successfully" });
};

export const deleteAddonController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { confirm } = req.query;
  const confirmBoolean = confirm === "true";

  //check si l'addon a des profils d'addons
  const addonProfilesCountForThisAddon = await getAddonProfilesCountForThisAddon(id);

  if (addonProfilesCountForThisAddon > 0 && !confirmBoolean) {
    return res.status(200).json({
      success: false,
      message: `Cet addon possède ${addonProfilesCountForThisAddon} profil${addonProfilesCountForThisAddon > 1 ? "s" : ""} d'addon associé${addonProfilesCountForThisAddon > 1 ? "s" : ""}.\nAttention: La suppression de cet addon entraînera également la suppression de tous ses profils associés.`,
    });
  }

  const success = await deleteAddon(id);

  if (!success) {
    return res.status(404).json({ success: false, message: "Addon not found" });
  }
  const count = await deleteAddonProfileByAddonId(id);

  //* revalidate les tags
  await revalidateFetch(NEXT_API_TAGS.ADDON.GET.GET_ALL);
  res.status(200).json({ success: true, message: "Addon deleted successfully" });
};

export const getAddonCountController = async (req: Request, res: Response) => {
  const count = await getAddonCount();
  res.status(200).json({ success: true, data: count });
};

// export const getAllAddonsTagsController = async (req: Request, res: Response) => {
//   const tags = await getAllAddonsTags();
//   res.status(200).json({ success: true, data: tags });
// };
