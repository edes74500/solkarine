import { WeakAura } from "@/models/weakAura.model";
import { ScrapingResult } from "@/utils/ogBaliseScrapper";

export const addWeakAura = async (data: ScrapingResult, info?: string): Promise<boolean> => {
  // Vérifier si une WeakAura avec cette URL existe déjà
  const existingWeakAura = await WeakAura.findOne({ url: data.url });

  if (existingWeakAura) {
    // Mettre à jour la WeakAura existante
    const updatedWeakAura = await WeakAura.findByIdAndUpdate(
      existingWeakAura._id,
      {
        title: data.basic.title,
        description: data.basic.description,
        image: data.basic.ogImageUrl,
        info: info,
      },
      { new: true },
    );
    const success = updatedWeakAura !== null;
    return success;
  } else {
    // Créer une nouvelle WeakAura
    const newWeakAura = await WeakAura.create({
      title: data.basic.title,
      description: data.basic.description,
      image: data.basic.ogImageUrl,
      url: data.url,
      info: info,
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
