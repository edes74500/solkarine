import { Addon } from "@/models/addon.model";
import { AddonDB, CreateAddonForm, EditAddonForm } from "@repo/types";

export const getAllAddon = async (): Promise<AddonDB[]> => {
  const addons = await Addon.find();
  return addons;
};

export const createAddon = async (addon: CreateAddonForm): Promise<AddonDB> => {
  const newAddon = await Addon.create(addon);
  return newAddon;
};

export const deleteAddon = async (id: string): Promise<boolean> => {
  const addon = await Addon.findByIdAndDelete(id);
  return !!addon;
};

export const updateAddon = async (id: string, addon: EditAddonForm): Promise<boolean> => {
  const updatedAddon = await Addon.findByIdAndUpdate(id, addon, { new: true });
  return !!updatedAddon;
};

export const getAddonCount = async (): Promise<number> => {
  const count = await Addon.countDocuments();
  return count;
};
