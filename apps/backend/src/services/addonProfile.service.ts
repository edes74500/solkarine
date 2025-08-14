import { AppError } from "@/errors/AppError";
import { AddonProfile } from "@/models/addonProfile.model";
import { deleteImageFromR2, setImageToFolderInR2 } from "@/services/cdn.service";
import { revalidateFetch } from "@/services/nextJsCache.service";
import { NEXT_API_TAGS } from "@repo/constants";
import { AddonProfileDB, CreateAddonProfileForm, EditAddonProfileForm } from "@repo/types";

export const getAddonProfilesService = async () => {
  try {
    const addonProfiles = await AddonProfile.find({}).populate("addon_id").lean({ virtuals: true });
    return addonProfiles;
  } catch (error) {
    console.error("Error getting addon profiles", error);
    throw new AppError("Error getting addon profiles", 500);
  }
};

export const createAddonProfileService = async (body: CreateAddonProfileForm) => {
  try {
    const addonProfile = await AddonProfile.create(body);
    return addonProfile;
  } catch (error) {
    console.error("Error creating addon profile", error);
    throw new AppError("Error creating addon profile", 500);
  }
};

export const deleteAddonProfileByAddonId = async (addonId: string): Promise<number> => {
  try {
    const addonProfilesForThisAddon = await AddonProfile.find({ addon_id: addonId });
    let count = 0;

    const promises = addonProfilesForThisAddon.map(async (addonProfile) => {
      await deleteImageFromR2(addonProfile.screenshots);
      const deletedProfile = await AddonProfile.findByIdAndDelete(addonProfile._id);
      if (deletedProfile) {
        count++;
      }
    });

    await Promise.all(promises);

    if (count > 0) {
      await revalidateFetch(NEXT_API_TAGS.ADDON_PROFILE.GET.GET_ALL_WITH_POPULATED_ADDON);
    }
    return count;
  } catch (error) {
    console.error("Error deleting addon profile", error);
    throw new AppError("Error deleting addon profile", 500);
  }
};

export const getAddonProfilesCountForThisAddon = async (addonId: string): Promise<number> => {
  const count = await AddonProfile.countDocuments({ addon_id: addonId });
  return count;
};

export const updateAddonProfileService = async (
  id: string,
  data: EditAddonProfileForm,
  initialScreenshots: string[],
): Promise<{ success: boolean; data: AddonProfileDB | null }> => {
  try {
    // 1) Déterminer les images à supprimer
    const screenshotsToDelete = initialScreenshots.filter((u) => !data.screenshots.includes(u));
    console.log("screenshotsToDelete", screenshotsToDelete);

    // 2) Supprimer en parallèle
    if (screenshotsToDelete.length > 0) {
      await deleteImageFromR2(screenshotsToDelete);
    }

    // 3) Recréer le tableau final dans l’ordre du form
    const finalScreenshots = await Promise.all(
      data.screenshots.map(async (url: string, i: number) => {
        const isNew = !initialScreenshots.includes(url);
        if (!isNew) return url; // inchangé → garder tel quel

        return (await setImageToFolderInR2({
          imageUrl: url,
          folder: "addon-profiles",
          imageName: data.name,
          index: i,
        })) as string;
      }),
    );

    // 4) Mettre à jour en DB
    const updatedProfile = await AddonProfile.findByIdAndUpdate(
      id,
      { ...data, screenshots: finalScreenshots },
      { new: true },
    );

    if (updatedProfile) {
      await revalidateFetch(NEXT_API_TAGS.ADDON_PROFILE.GET.GET_ALL_WITH_POPULATED_ADDON);
    }
    // 5) Retourner un seul objet résultat
    return { success: !!updatedProfile, data: updatedProfile ?? null };
  } catch (error) {
    console.error("Error updating addon profile", error);
    return { success: false, data: null };
  }
};

export const deleteAddonProfileService = async (id: string): Promise<{ success: boolean }> => {
  try {
    const addonProfile = await AddonProfile.findById(id);
    if (!addonProfile) {
      throw new AppError("Addon profile not found", 404);
    }
    await deleteImageFromR2(addonProfile.screenshots);

    const deletedProfile = await AddonProfile.findByIdAndDelete(id);
    if (deletedProfile) {
      await revalidateFetch(NEXT_API_TAGS.ADDON_PROFILE.GET.GET_ALL_WITH_POPULATED_ADDON);
    }
    return { success: !!deletedProfile };
  } catch (error) {
    console.error("Error deleting addon profile", error);
    return { success: false };
  }
};
