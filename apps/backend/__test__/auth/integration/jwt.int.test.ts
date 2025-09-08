import { UnauthorizedError } from "@/errors/UnauthorisedError";
import {
  generateJwtAccessToken,
  generateJwtRefreshToken,
  verifyJwtAccessToken,
  verifyJwtRefreshToken,
} from "@/services/auth/jwt.service";
import { dbCreateUserService } from "@/services/auth/user.service";
import { UserDB } from "@repo/types";
import { JwtPayload } from "jsonwebtoken";

describe("JWT access and refresh token", () => {
  let user: UserDB;

  beforeAll(async () => {
    // await dbConnexion.connect();
    user = await dbCreateUserService({
      username: "test",
      password: "test",
      role: ["admin"],
    });
  });

  afterAll(async () => {
    // await dbConnexion.disconnect();
  });

  describe("generateJwtAccessToken", () => {
    it("should generate a valid access token", async () => {
      const token = await generateJwtAccessToken(user._id);
      expect(token).toBeDefined();
      expect(token).toMatch(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/);
    });
  });

  describe("generateJwtRefreshToken", () => {
    it("should generate a valid refresh token", async () => {
      const token = await generateJwtRefreshToken(user._id);
      expect(token).toBeDefined();
      expect(token).toMatch(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/);
    });
  });

  describe("verifyJwtAccessToken", () => {
    let accessToken: string;
    beforeAll(async () => {
      accessToken = await generateJwtAccessToken(user._id);
    });

    it("should verify a valid access token", async () => {
      const decoded = verifyJwtAccessToken(accessToken);
      expect(decoded).toBeDefined();
    });

    it("should throw an error if the token is invalid", async () => {
      await expect(verifyJwtAccessToken("invalid")).rejects.toThrow(UnauthorizedError);
    });
  });

  describe("verifyJwtRefreshToken", () => {
    let refreshToken: string;
    beforeAll(async () => {
      refreshToken = await generateJwtRefreshToken(user._id);
    });

    it("should verify a valid refresh token", async () => {
      const decoded = await verifyJwtRefreshToken(refreshToken);
      expect(decoded).toBeDefined();
      expect((decoded as JwtPayload).userId).toEqual(user._id.toString());
      expect((decoded as JwtPayload).username).toEqual(user.username);
    });

    it("should throw an error if the token is invalid", async () => {
      await expect(verifyJwtRefreshToken("invalid")).rejects.toThrow(UnauthorizedError);
    });
  });
});
