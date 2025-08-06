import { Addon } from "@/models/addon.model";
import { AddonDB, CreateAddonForm, EditAddonForm } from "@repo/types";

export const getAllAddon = async (): Promise<AddonDB[]> => {
  const addons = await Addon.find();
  return addons;
};

export const createAddon = async (addon: CreateAddonForm): Promise<AddonDB> => {
  // Vérifier si un addon avec cette URL existe déjà
  const existingAddon = await Addon.findOne({ addonUrl: addon.addonUrl });

  if (existingAddon) {
    // Mettre à jour l'addon existant
    const updatedAddon = await Addon.findByIdAndUpdate(
      existingAddon._id,
      {
        name: addon.name,
        description: addon.description,
        imageUrl: addon.imageUrl,
        info: addon.info,
        tags: addon.tags,
      },
      { new: true },
    );
    return updatedAddon as AddonDB;
  } else {
    // Créer un nouvel addon
    const newAddon = await Addon.create(addon);
    return newAddon;
  }
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
