import { app } from "@/app";
import { dbConnexion } from "@/config/dbConnexion.config";
import { Dungeon } from "@/models/dungeon.model";
import { Talents } from "@/models/talents.model";
import { deleteImageFromR2, setImageToFolderInR2 } from "@/services/cdn.service";
import { addTalentService } from "@/services/talents.service";
import { DungeonDb } from "@repo/types";
import request from "supertest";
import { mockCreateTalentForm } from "../../../__fixture__/mockTalents";

jest.mock("@/services/cdn.service", () => ({
  setImageToFolderInR2: jest.fn(),
  deleteImageFromR2: jest.fn(),
}));
jest.mock("@/services/nextJsCache.service", () => ({
  revalidateFetch: jest.fn(),
}));

describe("Talents", () => {
  let dungeon: DungeonDb;
  beforeAll(async () => {
    await dbConnexion.connect();
    dungeon = await Dungeon.create({
      name: "Dungeon 1",
      slug: "dungeon-1",
      short_name: "D1",
      keystone_timer_seconds: 1800,
      icon_url: "https://example.com/icon.png",
      background_image_url: "https://example.com/bg.png",
      challenge_mode_id: 123,
    });
    (setImageToFolderInR2 as jest.Mock).mockImplementation(({ imageUrl, folder, imageName, index }) => {
      return Promise.resolve(`http://bucket-url/uploads/${folder}/${imageName}_${index || 0}.jpg`);
    });
    (deleteImageFromR2 as jest.Mock).mockResolvedValue(true);
    await addTalentService(
      mockCreateTalentForm({
        name: "Talent 1",
        dungeon_ids: [dungeon._id],
        screenshot: "https://example.com/image.jpg",
      }),
    );
  });

  afterAll(async () => {
    await Dungeon.deleteMany({});
    await Talents.deleteMany({});
    await dbConnexion.disconnect();
  });

  it("GET /api/v1/talents/get-all-with-populated-dungeon doit répondre avec les talents", async () => {
    const talent = await Talents.find({});
    expect(talent).toBeDefined();
    expect(talent).toHaveLength(1);

    const res = await request(app).get("/api/v1/talents/get-all-with-populated-dungeon").expect(200);
    expect(res.body.data).toBeDefined();
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].name).toBe("Talent 1");
    expect(res.body.data[0].dungeon_ids).toHaveLength(1);
    // Vérifier que le donjon est bien populé avec ses propriétés
    expect(res.body.data[0].dungeon_ids[0]).toHaveProperty("_id");
    expect(res.body.data[0].dungeon_ids[0]).toHaveProperty("name", "Dungeon 1");
    expect(res.body.data[0].dungeon_ids[0]).toHaveProperty("slug", "dungeon-1");
    expect(res.body.data[0].dungeon_ids[0]).toHaveProperty("short_name", "D1");
  });

  it("should create a new talent", async () => {
    const res = await request(app)
      .post("/api/v1/talents/create")
      .send(
        mockCreateTalentForm({
          name: "Talent 2",
          dungeon_ids: [dungeon._id],
          screenshot: "https://example.com/image.jpg",
        }),
      )
      .expect(200);
    expect(res.body.data).toBeDefined();
    expect(res.body.data.name).toBe("Talent 2");
    expect(res.body.data.dungeon_ids).toHaveLength(1);
    expect(res.body.data.dungeon_ids[0]).toBe(dungeon._id.toString());
  });
});
