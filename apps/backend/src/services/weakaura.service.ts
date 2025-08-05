import { WeakAura } from "@/models/weakAura.model";
import { CreateWeakAuraForm, EditWeakAuraForm } from "@repo/types";

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

export const getAllWeakAura = async () => {
  const weakAura = await WeakAura.find();
  return weakAura;
};

export const getWeakAuraById = async (id: string) => {
  const weakAura = await WeakAura.findById(id);
  return weakAura;
};

export const deleteWeakAura = async (id: string) => {
  const success = await WeakAura.findByIdAndDelete(id);
  return success;
};

export const updateWeakAura = async (id: string, data: EditWeakAuraForm) => {
  const success = await WeakAura.findByIdAndUpdate(id, data);
  return success;
};

export const getWeakAuraCount = async () => {
  const count = await WeakAura.countDocuments();
  return count;
};
