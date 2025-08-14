import { dbConnexion } from "@/config/dbConnexion.config";
import { AddonProfile } from "@/models/addonProfile.model";
import { createAddon } from "@/services/addon.service";
import {
  createAddonProfileService,
  deleteAddonProfileByAddonId,
  deleteAddonProfileService,
  getAddonProfilesService,
  updateAddonProfileService,
} from "@/services/addonProfile.service";
import { deleteImageFromR2, setImageToFolderInR2 } from "@/services/cdn.service";
import { revalidateFetch } from "@/services/nextJsCache.service";
import { NEXT_API_TAGS } from "@repo/constants";
import { AddonDB } from "@repo/types";
import mongoose from "mongoose";
import { mockCreateAddon } from "../../fixture/mockAddon";
import { mockCreateAddonProfile, mockEditAddonProfile } from "../../fixture/mockAddonProfile";

jest.mock("@/services/cdn.service", () => ({
  setImageToFolderInR2: jest.fn(),
  deleteImageFromR2: jest.fn(),
}));
jest.mock("@/services/nextJsCache.service", () => ({
  revalidateFetch: jest.fn(),
}));

describe("AddonProfile", () => {
  const mockScreenshots = ["http://example.com/image1.jpg", "http://example.com/image2.jpg"];
  const mockUploadedScreenshots = [
    "http://bucket-url/uploads/addon-profiles/image1.jpg",
    "http://bucket-url/uploads/addon-profiles/image2.jpg",
  ];
  // const mockAddon = mockCreateAddon();
  let addon: AddonDB;

  beforeAll(async () => {
    await dbConnexion.connect();
    // Ajouter un addon
    addon = await createAddon(mockCreateAddon());

    (setImageToFolderInR2 as jest.Mock).mockImplementation(({ imageUrl, folder, imageName, index }) => {
      return Promise.resolve(`http://bucket-url/uploads/${folder}/${imageName}_${index || 0}.jpg`);
    });
    (deleteImageFromR2 as jest.Mock).mockResolvedValue(true);
  });

  afterEach(async () => {
    await AddonProfile.deleteMany({});
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await dbConnexion.disconnect();
  });

  describe("getAddonProfilesService", () => {
    it("devrait retourner tous les profils d'addon", async () => {
      // Arrange
      await createAddonProfileService(
        mockCreateAddonProfile({
          name: "Profil 1",
          addon_id: addon._id.toString(),
        }),
      );
      await createAddonProfileService(
        mockCreateAddonProfile({
          name: "Profil 2",
          addon_id: addon._id.toString(),
        }),
      );

      // Act
      const result = await getAddonProfilesService();

      // Assert
      expect(result).toHaveLength(2);
      expect(result[0].name).toBe("Profil 1");
      expect(result[1].name).toBe("Profil 2");
    });
  });

  describe("createAddonProfileService", () => {
    it("devrait créer un nouveau profil d'addon", async () => {
      // Arrange
      const profileData = mockCreateAddonProfile({
        name: "Nouveau Profil",
        addon_id: addon._id.toString(),
        screenshots: mockUploadedScreenshots,
      });

      // Act
      const result = await createAddonProfileService(profileData);

      // Assert
      expect(result).toBeDefined();
      expect(result.name).toBe("Nouveau Profil");
      expect(result.addon_id.toString()).toBe(addon._id.toString());
      expect(result.screenshots).toEqual(mockUploadedScreenshots);
      // Vérifier que l'ordre des screenshots est préservé
      expect(result.screenshots[0]).toBe(mockUploadedScreenshots[0]);
      expect(result.screenshots[1]).toBe(mockUploadedScreenshots[1]);
    });
  });

  describe("updateAddonProfileService", () => {
    it("devrait mettre à jour un profil d'addon existant", async () => {
      // Arrange
      const profile = await AddonProfile.create(
        mockCreateAddonProfile({
          name: "Profil Initial",
          addon_id: addon._id,
          screenshots: mockScreenshots,
        }),
      );

      const updatedData = mockEditAddonProfile({
        name: "Profil Modifié",
        addon_id: addon._id.toString(),
        screenshots: [...mockScreenshots, "http://example.com/image3.jpg"],
      });

      // Act
      const result = await updateAddonProfileService(profile._id.toString(), updatedData, mockScreenshots);

      // Assert
      expect(result.success).toBe(true);
      expect(result.data?.name).toBe("Profil Modifié");
      expect(deleteImageFromR2).not.toHaveBeenCalled();
      expect(setImageToFolderInR2).toHaveBeenCalledTimes(1);
      expect(revalidateFetch).toHaveBeenCalledWith(NEXT_API_TAGS.ADDON_PROFILE.GET.GET_ALL_WITH_POPULATED_ADDON);
      // Vérifier que l'ordre des screenshots est préservé
      expect(result.data?.screenshots[0]).toBe(mockScreenshots[0]);
      expect(result.data?.screenshots[1]).toBe(mockScreenshots[1]);
      expect(result.data?.screenshots[2]).toContain("Profil Modifié_2.jpg");
    });

    it("devrait supprimer les screenshots qui ne sont plus présents", async () => {
      // Arrange
      const profile = await AddonProfile.create(
        mockCreateAddonProfile({
          name: "Profil avec Images",
          addon_id: addon._id,
          screenshots: mockScreenshots,
        }),
      );

      const updatedData = mockEditAddonProfile({
        name: "Profil Modifié",
        addon_id: addon._id.toString(),
        screenshots: [mockScreenshots[0]], // On garde seulement la première image
      });

      // Act
      const result = await updateAddonProfileService(profile._id.toString(), updatedData, mockScreenshots);

      // Assert
      expect(result.success).toBe(true);
      expect(deleteImageFromR2).toHaveBeenCalledWith([mockScreenshots[1]]);
      expect(revalidateFetch).toHaveBeenCalledWith(NEXT_API_TAGS.ADDON_PROFILE.GET.GET_ALL_WITH_POPULATED_ADDON);
      expect(result.data?.screenshots).toHaveLength(1);
      // Vérifier que l'image conservée est bien celle à l'index 0
      expect(result.data?.screenshots[0]).toBe(mockScreenshots[0]);
    });
  });

  describe("deleteAddonProfileService", () => {
    it("devrait supprimer un profil d'addon existant et supprimer les images associées à ce profil et revalider le cache", async () => {
      // Arrange
      const profile = await AddonProfile.create(
        mockCreateAddonProfile({
          name: "Profil à Supprimer",
          addon_id: addon._id,
          screenshots: mockScreenshots,
        }),
      );

      // Act
      const result = await deleteAddonProfileService(profile._id.toString());

      // Assert
      expect(result.success).toBe(true);
      expect(deleteImageFromR2).toHaveBeenCalledWith(mockScreenshots);
      expect(revalidateFetch).toHaveBeenCalledWith(NEXT_API_TAGS.ADDON_PROFILE.GET.GET_ALL_WITH_POPULATED_ADDON);
      // Vérifier que le profil a bien été supprimé
      const deletedProfile = await AddonProfile.findById(profile._id);
      expect(deletedProfile).toBeNull();
    });

    it("devrait retourner success: false si le profil n'existe pas", async () => {
      // Arrange
      const fakeId = new mongoose.Types.ObjectId().toString();

      // Act
      const result = await deleteAddonProfileService(fakeId);

      // Assert
      expect(result.success).toBe(false);
      expect(deleteImageFromR2).not.toHaveBeenCalled();
    });
  });

  describe("deleteAddonProfileByAddonId", () => {
    it("devrait supprimer tous les profils associés à un addon et supprimer les images associées à ces profils et revalider le cache", async () => {
      // Arrange
      await AddonProfile.create(
        mockCreateAddonProfile({
          name: "Profil 1 de l'addon",
          addon_id: addon._id,
          screenshots: mockScreenshots,
        }),
        mockCreateAddonProfile({
          name: "Profil 2 de l'addon",
          addon_id: addon._id,
          screenshots: mockScreenshots,
        }),
      );

      // Act
      const deletedCount = await deleteAddonProfileByAddonId(addon._id.toString());

      // Assert
      expect(deletedCount).toBe(2);
      expect(deleteImageFromR2).toHaveBeenCalledTimes(2);
      expect(revalidateFetch).toHaveBeenCalledWith(NEXT_API_TAGS.ADDON_PROFILE.GET.GET_ALL_WITH_POPULATED_ADDON);

      // Vérifier que tous les profils ont été supprimés
      const remainingProfiles = await AddonProfile.find({ addon_id: addon._id });
      expect(remainingProfiles).toHaveLength(0);
    });

    it("devrait retourner 0 si aucun profil n'est associé à l'addon et ne supprimer aucune image et ne pas revalider le cache", async () => {
      // Arrange
      const unusedAddonId = new mongoose.Types.ObjectId().toString();

      // Act
      const deletedCount = await deleteAddonProfileByAddonId(unusedAddonId);

      // Assert
      expect(deletedCount).toBe(0);
      expect(deleteImageFromR2).not.toHaveBeenCalled();
      expect(revalidateFetch).not.toHaveBeenCalled();
    });
  });
});
