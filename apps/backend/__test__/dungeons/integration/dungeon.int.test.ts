import { dbConnexion } from "@/config/dbConnexion.config";
import { Dungeon } from "@/models/dungeon.model";
import { addDungeon, clearAllDungeons, getAllDungeons, updateDungeon } from "@/services/dungeons.service";
import { CreateDungeonForm, EditDungeonForm } from "@repo/types";
import mongoose from "mongoose";

describe("Tests d'intégration des services de donjons", () => {
  // Connexion à la base de données avant tous les tests
  beforeAll(async () => {
    await dbConnexion.connect();
  });

  // Nettoyage après chaque test
  afterEach(async () => {
    await clearAllDungeons();
  });

  // Déconnexion après tous les tests
  afterAll(async () => {
    await dbConnexion.disconnect();
  });

  describe("addDungeon", () => {
    it("devrait créer un nouveau donjon dans la base de données", async () => {
      // Arrange
      const dungeonData: CreateDungeonForm = {
        name: "Donjon de Test",
        slug: "donjon-test",
        short_name: "DT",
        keystone_timer_seconds: 1800,
        icon_url: "https://example.com/icon.png",
        background_image_url: "https://example.com/bg.png",
        challenge_mode_id: 123,
      };

      // Act
      const createdDungeon = await addDungeon(dungeonData);

      // Assert
      expect(createdDungeon).toBeDefined();
      expect(createdDungeon.name).toBe(dungeonData.name);
      expect(createdDungeon.slug).toBe(dungeonData.slug);

      // Vérifier que le donjon existe réellement dans la base de données
      const dungeonInDb = await Dungeon.findById(createdDungeon._id);
      expect(dungeonInDb).not.toBeNull();
      expect(dungeonInDb?.name).toBe(dungeonData.name);
    });
  });

  describe("getAllDungeons", () => {
    it("devrait récupérer tous les donjons de la base de données", async () => {
      // Arrange
      const dungeons = [
        {
          name: "Premier Donjon",
          slug: "premier-donjon",
          short_name: "PD",
          keystone_timer_seconds: 1800,
          icon_url: "https://example.com/icon1.png",
          background_image_url: "https://example.com/bg1.png",
          challenge_mode_id: 111,
        },
        {
          name: "Deuxième Donjon",
          slug: "deuxieme-donjon",
          short_name: "DD",
          keystone_timer_seconds: 2400,
          icon_url: "https://example.com/icon2.png",
          background_image_url: "https://example.com/bg2.png",
          challenge_mode_id: 222,
        },
      ];

      // Ajouter les donjons à la base de données
      await Dungeon.create(dungeons[0]);
      await Dungeon.create(dungeons[1]);

      // Act
      const retrievedDungeons = await getAllDungeons();

      // Assert
      expect(retrievedDungeons).toHaveLength(2);
      expect(retrievedDungeons[0].name).toBe(dungeons[0].name);
      expect(retrievedDungeons[1].name).toBe(dungeons[1].name);
    });

    it("devrait retourner un tableau vide s'il n'y a pas de donjons", async () => {
      // Act
      const retrievedDungeons = await getAllDungeons();

      // Assert
      expect(retrievedDungeons).toHaveLength(0);
    });
  });

  describe("updateDungeon", () => {
    it("devrait mettre à jour un donjon existant", async () => {
      // Arrange
      const initialDungeon = await Dungeon.create({
        name: "Ancien Donjon",
        slug: "ancien-donjon",
        short_name: "AD",
        keystone_timer_seconds: 1800,
        icon_url: "https://example.com/old.png",
        background_image_url: "https://example.com/old-bg.png",
        challenge_mode_id: 333,
      });

      const updateData: EditDungeonForm = {
        name: "Donjon Mis à Jour",
        slug: "donjon-mis-a-jour",
        short_name: "DMJ",
        keystone_timer_seconds: 2000,
        icon_url: "https://example.com/new.png",
        background_image_url: "https://example.com/new-bg.png",
      };

      // Act
      const result = await updateDungeon(initialDungeon._id.toString(), updateData);
      const updatedDungeon = await Dungeon.findById(initialDungeon._id);

      // Assert
      expect(result).toBe(true);
      expect(updatedDungeon).not.toBeNull();
      expect(updatedDungeon?.name).toBe(updateData.name);
      expect(updatedDungeon?.slug).toBe(updateData.slug);
      expect(updatedDungeon?.keystone_timer_seconds).toBe(updateData.keystone_timer_seconds);
    });

    it("devrait retourner false si le donjon n'existe pas", async () => {
      // Arrange
      const nonExistentId = new mongoose.Types.ObjectId().toString();
      const updateData: EditDungeonForm = {
        name: "Donjon Inexistant",
        slug: "donjon-inexistant",
        short_name: "DI",
        keystone_timer_seconds: 1500,
        icon_url: "https://example.com/fake.png",
        background_image_url: "https://example.com/fake-bg.png",
      };

      // Act
      const result = await updateDungeon(nonExistentId, updateData);

      // Assert
      expect(result).toBe(false);
    });
  });

  describe("clearAllDungeons", () => {
    it("devrait supprimer tous les donjons de la base de données", async () => {
      // Arrange
      await Dungeon.create([
        {
          name: "Donjon 1",
          slug: "donjon-1",
          short_name: "D1",
          keystone_timer_seconds: 1800,
          icon_url: "https://example.com/icon1.png",
          background_image_url: "https://example.com/bg1.png",
          challenge_mode_id: 111,
        },
        {
          name: "Donjon 2",
          slug: "donjon-2",
          short_name: "D2",
          keystone_timer_seconds: 2400,
          icon_url: "https://example.com/icon2.png",
          background_image_url: "https://example.com/bg2.png",
          challenge_mode_id: 222,
        },
      ]);

      // Vérifier que les donjons ont été créés
      const dungeonsBefore = await Dungeon.find();
      expect(dungeonsBefore).toHaveLength(2);

      // Act
      await clearAllDungeons();

      // Assert
      const dungeonsAfter = await Dungeon.find();
      expect(dungeonsAfter).toHaveLength(0);
    });
  });
});
