import { app } from "@/app";
import request from "supertest";

describe("Health", () => {
  it("GET / doit répondre Hello World", async () => {
    const res = await request(app).get("/").expect(200);
    expect(res.text).toBe("Hello World");
  });
});
