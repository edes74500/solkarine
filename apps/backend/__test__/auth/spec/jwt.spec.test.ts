import { generateJwtAccessToken, generateJwtRefreshToken, verifyJwtAccessToken } from "@/services/auth/jwt.service";
import { dbGetUserByIdService } from "@/services/auth/user.service";
import { JwtPayload } from "jsonwebtoken";

jest.mock("@/services/auth/user.service");

describe("JWT Access Token", () => {
  it("should throw an error if the user is not found", async () => {
    (dbGetUserByIdService as jest.Mock).mockResolvedValue(null);
    await expect(generateJwtAccessToken("123")).rejects.toThrow("User not found");
  });

  it("should generate a valid access token", async () => {
    (dbGetUserByIdService as jest.Mock).mockResolvedValue({
      _id: "123",
      username: "test",
    });
    const token = await generateJwtAccessToken("123");
    expect(token).toBeDefined();
    expect(token).toMatch(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/);
  });

  it("should generate a valid access token with a short expiration time in development", async () => {
    process.env.NODE_ENV = "development";
    const token = await generateJwtAccessToken("123");
    expect(token).toBeDefined();
    expect(token).toMatch(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/);

    const decoded = await verifyJwtAccessToken(token);
    expect(decoded).toBeDefined();
    //check if the expiration time is less than 1 second from now
    expect((decoded as JwtPayload).exp).toBeLessThan(Date.now() / 1000 + 1);
  });
});

describe("JWT Refresh Token", () => {
  it("should throw an error if the user is not found", async () => {
    (dbGetUserByIdService as jest.Mock).mockResolvedValue(null);
    await expect(generateJwtRefreshToken("123")).rejects.toThrow("User not found");
  });

  it("should generate a valid refresh token", async () => {
    (dbGetUserByIdService as jest.Mock).mockResolvedValue({
      _id: "123",
      username: "test",
    });
    const token = await generateJwtRefreshToken("123");
    expect(token).toBeDefined();
  });
});
