import { createAddon, deleteAddon, getAddonCount, getAllAddon, updateAddon } from "@/services/addon.service";
import { revalidateFetch } from "@/services/nextJsCache.service";
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
  await revalidateFetch("addon-getAllAddons");
  await revalidateFetch("addon-getAllAddonsTags");
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
  await revalidateFetch("addon-getAllAddons");
  await revalidateFetch("addon-getAllAddonsTags");
  res.status(200).json({ success: true, message: "Addon updated successfully" });
};

export const deleteAddonController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const success = await deleteAddon(id);
  if (!success) {
    return res.status(404).json({ success: false, message: "Addon not found" });
  }
  //* revalidate les tags
  await revalidateFetch("addon-getAllAddons");
  await revalidateFetch("addon-getAllAddonsTags");
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
