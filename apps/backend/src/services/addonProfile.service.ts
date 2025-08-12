import { AppError } from "@/errors/AppError";
import { AddonProfile } from "@/models/addonProfile.model";
import { deleteImageFromR2 } from "@/services/cdn.service";
import { revalidateFetch } from "@/services/nextJsCache.service";
import { NEXT_API_TAGS } from "@repo/constants";
import { CreateAddonProfileForm } from "@repo/types";

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
    const addonProfiles = await AddonProfile.find({ addon_id: addonId });
    let count: { deletedCount: number } | undefined;

    const promises = addonProfiles.map(async (addonProfile) => {
      await deleteImageFromR2(addonProfile.screenshots);
      count = await AddonProfile.deleteMany({ addon_id: addonId });
    });

    await Promise.all(promises);

    if (count && count.deletedCount > 0) {
      await revalidateFetch(NEXT_API_TAGS.ADDON_PROFILE.GET.GET_ALL_WITH_POPULATED_ADDON);
    }
    return count?.deletedCount || 0;
  } catch (error) {
    console.error("Error deleting addon profile", error);
    throw new AppError("Error deleting addon profile", 500);
  }
};

export const getAddonProfilesCountForThisAddon = async (addonId: string): Promise<number> => {
  const count = await AddonProfile.countDocuments({ addon_id: addonId });
  return count;
};
