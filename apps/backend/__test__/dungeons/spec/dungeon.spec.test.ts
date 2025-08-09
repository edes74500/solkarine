import { Dungeon } from "@/models/dungeon.model";
import { addDungeon, clearAllDungeons, getAllDungeons, updateDungeon } from "@/services/dungeons.service";
import { CreateDungeonForm, EditDungeonForm } from "@repo/types";

// Mock de mongoose et du modèle Dungeon
jest.mock("@/models/dungeon.model", () => ({
  Dungeon: {
    create: jest.fn(),
    deleteMany: jest.fn(),
    find: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  },
}));

describe("Services de donjons", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("addDungeon", () => {
    it("devrait créer un nouveau donjon", async () => {
      // Arrange
      const mockDungeon: CreateDungeonForm = {
        name: "Donjon Test",
        slug: "nonexistent",
        short_name: "nonexistent",
        keystone_timer_seconds: 0,
        icon_url: "nonexistent",
        background_image_url: "nonexistent",
        challenge_mode_id: 0,
      };

      const mockCreatedDungeon = {
        _id: "123",
        ...mockDungeon,
        toObject: () => ({ _id: "123", ...mockDungeon }),
      };

      (Dungeon.create as jest.Mock).mockResolvedValue(mockCreatedDungeon);

      // Act
      const result = await addDungeon(mockDungeon);

      // Assert
      expect(Dungeon.create).toHaveBeenCalledWith(mockDungeon);
      expect(result).toEqual(mockCreatedDungeon);
    });
  });

  describe("clearAllDungeons", () => {
    it("devrait supprimer tous les donjons", async () => {
      // Arrange
      (Dungeon.deleteMany as jest.Mock).mockResolvedValue({ deletedCount: 5 });

      // Act
      await clearAllDungeons();

      // Assert
      expect(Dungeon.deleteMany).toHaveBeenCalledWith({});
    });
  });

  describe("getAllDungeons", () => {
    it("devrait récupérer tous les donjons", async () => {
      // Arrange
      const mockDungeons = [
        {
          _id: "123",
          name: "Donjon 1",
          description: "Description 1",
          difficulty: "easy",
          toObject: () => ({
            _id: "123",
            name: "Donjon 1",
            description: "Description 1",
            difficulty: "easy",
          }),
        },
        {
          _id: "456",
          name: "Donjon 2",
          description: "Description 2",
          difficulty: "hard",
          toObject: () => ({
            _id: "456",
            name: "Donjon 2",
            description: "Description 2",
            difficulty: "hard",
          }),
        },
      ];

      (Dungeon.find as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockDungeons),
      });

      // Act
      const result = await getAllDungeons();

      // Assert
      expect(Dungeon.find).toHaveBeenCalled();
      expect(result).toEqual(mockDungeons.map((d) => d));
      expect(result.length).toBe(2);
    });
  });

  describe("updateDungeon", () => {
    it("devrait mettre à jour un donjon existant", async () => {
      // Arrange
      const dungeonId = "123";
      const updateData: EditDungeonForm = {
        name: "Donjon Modifié",
        slug: "nonexistent",
        short_name: "nonexistent",
        keystone_timer_seconds: 0,
        icon_url: "nonexistent",
        background_image_url: "nonexistent",
      };

      const mockUpdatedDungeon = {
        _id: dungeonId,
        ...updateData,
      };

      (Dungeon.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedDungeon);

      // Act
      const result = await updateDungeon(dungeonId, updateData);

      // Assert
      expect(Dungeon.findByIdAndUpdate).toHaveBeenCalledWith(dungeonId, updateData, { new: true });
      expect(result).toBe(true);
    });

    it("devrait retourner false si le donjon n'existe pas", async () => {
      // Arrange
      const dungeonId = "nonexistent";
      const updateData: EditDungeonForm = {
        name: "Donjon Inexistant",
        slug: "nonexistent",
        short_name: "nonexistent",
        keystone_timer_seconds: 0,
        icon_url: "nonexistent",
        background_image_url: "nonexistent",
      };

      (Dungeon.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

      // Act
      const result = await updateDungeon(dungeonId, updateData);

      // Assert
      expect(Dungeon.findByIdAndUpdate).toHaveBeenCalledWith(dungeonId, updateData, { new: true });
      expect(result).toBe(false);
    });
  });
});
