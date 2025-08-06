import { WeakAura } from "@/models/weakAura.model";
import { CreateWeakAuraForm, EditWeakAuraForm, WeakAuraDB } from "@repo/types";

export const addWeakAura = async (data: CreateWeakAuraForm): Promise<boolean> => {
  // Vérifier si une WeakAura avec cette URL existe déjà
  const existingWeakAura = await WeakAura.findOne({ url: data.url });

  if (existingWeakAura) {
    // Mettre à jour la WeakAura existante
    const updatedWeakAura = await WeakAura.findByIdAndUpdate(
      existingWeakAura._id,
      {
        title: data.title,
        description: data.description,
        image: data.image,
        info: data.info,
        url: data.url,
        tags: data.tags,
      },
      { new: true },
    );
    const success = updatedWeakAura !== null;
    return success;
  } else {
    // Créer une nouvelle WeakAura
    const newWeakAura = await WeakAura.create({
      title: data.title,
      description: data.description,
      image: data.image,
      url: data.url,
      info: data.info,
      tags: data.tags,
    });
    const success = newWeakAura !== null;
    return success;
  }
};

export const getAllWeakAura = async (): Promise<WeakAuraDB[]> => {
  const weakAura = await WeakAura.find();
  return weakAura;
};

export const getWeakAuraById = async (id: string): Promise<WeakAuraDB | null> => {
  const weakAura = await WeakAura.findById(id);
  return weakAura;
};

export const deleteWeakAura = async (id: string): Promise<boolean> => {
  const success = await WeakAura.findByIdAndDelete(id);
  return success !== null;
};

export const updateWeakAura = async (id: string, data: EditWeakAuraForm): Promise<boolean> => {
  const success = await WeakAura.findByIdAndUpdate(id, data);
  return success !== null;
};

export const getWeakAuraCount = async (): Promise<number> => {
  const count = await WeakAura.countDocuments();
  return count;
};
