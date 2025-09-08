import { Dungeon } from "@/models/dungeon.model";
import { Talents } from "@/models/talents.model";
import { deleteImageFromR2, setImageToFolderInR2 } from "@/services/cdn.service";
import { revalidateFetch } from "@/services/nextJsCache.service";
import {
  addTalentService,
  clearAllTalents,
  deleteTalentById,
  getAllTalentsService,
  getAllTalentsWithPopulatedDungeonService,
  updateTalentService,
} from "@/services/talents.service";
import { NEXT_API_TAGS } from "@repo/constants";
import { DungeonDb } from "@repo/types";
import mongoose from "mongoose";
import { mockCreateTalentForm } from "../../../__fixture__/mockTalents";

jest.mock("@/services/cdn.service", () => ({
  setImageToFolderInR2: jest.fn(),
  deleteImageFromR2: jest.fn(),
}));
jest.mock("@/services/nextJsCache.service", () => ({
  revalidateFetch: jest.fn(),
}));

describe("Tests d'intégration des services de talents", () => {
  let dungeon: DungeonDb;
  let dungeon2: DungeonDb;

  beforeEach(async () => {
    // await dbConnexion.connect();
    dungeon = await Dungeon.create({
      name: "Donjon de Test",
      slug: "donjon-test",
      short_name: "DT",
      keystone_timer_seconds: 1800,
      icon_url: "https://example.com/icon.png",
      background_image_url: "https://example.com/bg.png",
      challenge_mode_id: 123,
    });
    dungeon2 = await Dungeon.create({
      name: "Donjon de Test 2",
      slug: "donjon-test-2",
      short_name: "DT2",
      keystone_timer_seconds: 1800,
      icon_url: "https://example.com/icon2.png",
      background_image_url: "https://example.com/bg2.png",
      challenge_mode_id: 123,
    });

    (setImageToFolderInR2 as jest.Mock).mockImplementation(({ imageUrl, folder, imageName, index }) => {
      return Promise.resolve(`http://bucket-url/uploads/${folder}/${imageName}_${index || 0}.jpg`);
    });
    (deleteImageFromR2 as jest.Mock).mockResolvedValue(true);
  });

  afterEach(async () => {
    await Talents.deleteMany({});
    await Dungeon.deleteMany({});
    jest.clearAllMocks();

    // jest.clearAllMocks();
  });

  afterAll(async () => {
    await Dungeon.deleteMany({});
    // await dbConnexion.disconnect();
  });

  describe("getAllTalentsService", () => {
    it("devrait retourner une liste vide quand aucun talent n'existe", async () => {
      // Act
      const result = await getAllTalentsWithPopulatedDungeonService();

      // Assert
      expect(result).toHaveLength(0);
    });

    it("devrait retourner les talents avec les donjons populés", async () => {
      // Arrange
      const talent = await addTalentService(
        mockCreateTalentForm({
          name: "Talent Populé",
          dungeon_ids: [dungeon._id, dungeon2._id],
        }),
      );

      // Act
      const result = await getAllTalentsWithPopulatedDungeonService();

      // Assert
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("Talent Populé");
      expect(result[0].dungeon_ids).toHaveLength(2);

      // Vérifier que les donjons sont bien populés
      expect(result[0].dungeon_ids[0]).toHaveProperty("name", "Donjon de Test");
      expect(result[0].dungeon_ids[0]).toHaveProperty("slug", "donjon-test");
      expect(result[0].dungeon_ids[0]).toHaveProperty("_id", dungeon._id);
      expect(result[0].dungeon_ids[1]).toHaveProperty("name", "Donjon de Test 2");
      expect(result[0].dungeon_ids[1]).toHaveProperty("_id", dungeon2._id);
      expect(result[0].dungeon_ids[1]).toHaveProperty("slug", "donjon-test-2");
    });

    it("devrait correctement populer tous les champs des donjons", async () => {
      // Arrange
      await addTalentService(
        mockCreateTalentForm({
          dungeon_ids: [dungeon._id],
        }),
      );

      // Act
      const result = await getAllTalentsWithPopulatedDungeonService();

      // Assert
      const populatedDungeon = result[0].dungeon_ids[0];
      expect(populatedDungeon).toHaveProperty("_id");
      expect(populatedDungeon).toHaveProperty("name", "Donjon de Test");
      expect(populatedDungeon).toHaveProperty("slug", "donjon-test");
      expect(populatedDungeon).toHaveProperty("short_name", "DT");
      expect(populatedDungeon).toHaveProperty("keystone_timer_seconds", 1800);
      expect(populatedDungeon).toHaveProperty("icon_url", "https://example.com/icon.png");
      expect(populatedDungeon).toHaveProperty("background_image_url", "https://example.com/bg.png");
      expect(populatedDungeon).toHaveProperty("challenge_mode_id", 123);
    });

    it("devrait retourner tous les talents existants", async () => {
      // Arrange
      const talent1 = await addTalentService(mockCreateTalentForm({ name: "Talent 1", dungeon_ids: [dungeon._id] }));
      const talent2 = await addTalentService(mockCreateTalentForm({ name: "Talent 2", dungeon_ids: [dungeon._id] }));

      // Act
      const result = await getAllTalentsService();

      // Assert
      expect(result).toHaveLength(2);
      expect(result.map((t) => t.name)).toContain("Talent 1");
      expect(result.map((t) => t.name)).toContain("Talent 2");
    });
  });

  describe("addTalentService", () => {
    it("devrait créer un nouveau talent", async () => {
      // Arrange
      const talentForm = mockCreateTalentForm({ dungeon_ids: [dungeon._id, dungeon2._id] });

      // Act
      const talent = await addTalentService(talentForm);

      // Assert
      expect(talent).toBeDefined();
      expect(talent.name).toEqual(talentForm.name);
      // Convertir les ObjectId en strings pour la comparaison
      const dungeonIdsAsStrings = talent.dungeon_ids.map((id) => id.toString());
      expect(dungeonIdsAsStrings).toEqual(talentForm.dungeon_ids.map((id) => id.toString()));

      const result = await getAllTalentsService();
      expect(setImageToFolderInR2).toHaveBeenCalledWith(
        expect.objectContaining({
          imageUrl: talentForm.screenshot,
          folder: "talents",
        }),
      );
      expect(revalidateFetch).toHaveBeenCalledWith(NEXT_API_TAGS.TALENTS.GET.GET_ALL);
      expect(result).toHaveLength(1);
      expect(result[0]._id.toString()).toEqual(talent._id.toString());
    });
  });

  describe("clearAllTalents", () => {
    it("devrait supprimer tous les talents", async () => {
      // Arrange
      await addTalentService(mockCreateTalentForm({ dungeon_ids: [dungeon._id] }));
      await addTalentService(mockCreateTalentForm({ dungeon_ids: [dungeon._id] }));

      const talentsBefore = await getAllTalentsService();
      expect(talentsBefore).toHaveLength(2);

      // Act
      await clearAllTalents();

      // Assert
      const talentsAfter = await getAllTalentsService();
      expect(talentsAfter).toHaveLength(0);
      expect(deleteImageFromR2).toHaveBeenCalledTimes(2);
      expect(revalidateFetch).toHaveBeenCalledWith(NEXT_API_TAGS.TALENTS.GET.GET_ALL);
    });
  });

  describe("deleteTalentById", () => {
    it("devrait supprimer un talent par son ID", async () => {
      // Arrange
      const talent = await addTalentService(mockCreateTalentForm({ dungeon_ids: [dungeon._id] }));

      // Act
      const result = await deleteTalentById(talent._id.toString());

      // Assert
      expect(result).toBe(true);
      const talents = await getAllTalentsService();
      expect(talents).toHaveLength(0);
      expect(deleteImageFromR2).toHaveBeenCalledWith(talent.screenshot);
      expect(revalidateFetch).toHaveBeenCalledWith(NEXT_API_TAGS.TALENTS.GET.GET_ALL);
    });

    it("devrait retourner false si l'ID n'existe pas", async () => {
      // Arrange
      const fakeId = new mongoose.Types.ObjectId().toString();

      // Act
      const result = await deleteTalentById(fakeId);

      // Assert
      expect(result).toBe(false);
      expect(deleteImageFromR2).not.toHaveBeenCalled();
      expect(revalidateFetch).not.toHaveBeenCalled();
    });
  });

  describe("updateTalentService", () => {
    it("devrait mettre à jour un talent par son ID sans changer l'image", async () => {
      // Arrange
      const talent = await addTalentService(mockCreateTalentForm({ dungeon_ids: [dungeon._id] }));
      const initialScreenshot = talent.screenshot;

      // Act
      const result = await updateTalentService({
        id: talent._id.toString(),
        talent: { name: "Talent Mis à Jour" },
        initialScreenshot,
      });

      // Assert
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data?.name).toBe("Talent Mis à Jour");
      expect(result.data?.screenshot).toBe(initialScreenshot);
      expect(setImageToFolderInR2).toHaveBeenCalledTimes(1); // Seulement lors de la création
      expect(deleteImageFromR2).not.toHaveBeenCalled();
      expect(revalidateFetch).toHaveBeenCalledWith(NEXT_API_TAGS.TALENTS.GET.GET_ALL);
    });

    it("devrait mettre à jour l'image d'un talent", async () => {
      // Arrange
      const talent = await addTalentService(mockCreateTalentForm({ dungeon_ids: [dungeon._id] }));
      const initialScreenshot = talent.screenshot;
      const newScreenshot = "http://new-image.com/screenshot.jpg";
      const expectedNewScreenshot = "http://bucket-url/uploads/talents/Talent Mis à Jour_0.jpg";

      // Reset les mocks après la création
      jest.clearAllMocks();

      // Act
      const result = await updateTalentService({
        id: talent._id.toString(),
        talent: { name: "Talent Mis à Jour", screenshot: newScreenshot },
        initialScreenshot,
      });

      // Assert
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data?.name).toBe("Talent Mis à Jour");
      expect(result.data?.screenshot).toBe(expectedNewScreenshot);

      // Vérifier que l'image a été uploadée
      expect(setImageToFolderInR2).toHaveBeenCalledWith(
        expect.objectContaining({
          imageUrl: newScreenshot,
          folder: "talents",
          imageName: "Talent Mis à Jour",
        }),
      );

      // Vérifier que l'ancienne image a été supprimée
      expect(deleteImageFromR2).toHaveBeenCalledWith(initialScreenshot);
      expect(revalidateFetch).toHaveBeenCalledWith(NEXT_API_TAGS.TALENTS.GET.GET_ALL);
    });

    it("devrait gérer les erreurs lors de la mise à jour", async () => {
      // Arrange
      const talent = await addTalentService(mockCreateTalentForm({ dungeon_ids: [dungeon._id] }));
      const initialScreenshot = talent.screenshot;

      // Simuler une erreur
      (Talents.findByIdAndUpdate as jest.Mock) = jest.fn().mockRejectedValue(new Error("Erreur de mise à jour"));

      // Act
      const result = await updateTalentService({
        id: talent._id.toString(),
        talent: { name: "Talent Mis à Jour" },
        initialScreenshot,
      });

      // Assert
      expect(result.success).toBe(false);
      expect(result.data).toBeNull();

      // Restaurer le comportement normal
      (Talents.findByIdAndUpdate as jest.Mock).mockRestore();
    });
  });
});
