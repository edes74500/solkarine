import { cacheRBAC } from "@/config/rbac.config";
import { Role } from "@/models/auth/role.model";
import {
  dbCreateRoleService,
  dbDeleteRoleByIdService,
  dbGetRoleByIdService,
  dbUpdateRoleByIdService,
  getOrLoadRoleService,
  upsertRoleWithVersion,
} from "@/services/auth/role.service";
import { CreateRole, UpdateRole } from "@repo/types";

describe("Tests d'intégration des services de rôles", () => {
  // Connexion à la base de données avant tous les tests
  beforeAll(async () => {
    // await dbConnexion.connect();
  });

  // Nettoyage après chaque test
  afterEach(async () => {
    await Role.deleteMany({});
    // Vider le cache
    cacheRBAC.roles.clear();
  });

  // Déconnexion après tous les tests
  afterAll(async () => {
    // await dbConnexion.disconnect();
  });

  describe("dbCreateRoleService", () => {
    it("devrait créer un nouveau rôle dans la base de données", async () => {
      // Arrange
      const roleData: CreateRole = {
        name: "testRole",
        permissionsIds: ["perm1", "perm2"],
      };

      // Act
      const createdRole = await dbCreateRoleService(roleData);

      // Assert
      expect(createdRole).toBeDefined();
      expect(createdRole?.name).toBe(roleData.name);
      expect(createdRole?.permissionsIds).toEqual(expect.arrayContaining(roleData.permissionsIds));

      // Vérifier que le rôle existe réellement dans la base de données
      const roleInDb = await Role.findById(createdRole?._id);
      expect(roleInDb).not.toBeNull();
      expect(roleInDb?.name).toBe(roleData.name);
    });
  });

  describe("dbGetRoleByIdService", () => {
    it("devrait récupérer un rôle par son ID", async () => {
      // Arrange
      const roleData = {
        name: "adminRole",
        permissionsIds: ["admin:read", "admin:write"],
        version: 1,
      };
      const role = await Role.create(roleData);

      // Act
      const foundRole = await dbGetRoleByIdService(role._id.toString());

      // Assert
      expect(foundRole).toBeDefined();
      expect(foundRole?.name).toBe(roleData.name);
      expect(foundRole?.permissionsIds).toEqual(expect.arrayContaining(roleData.permissionsIds));
    });

    it("devrait retourner undefined si le rôle n'existe pas", async () => {
      // Arrange
      const nonExistentId = "507f1f77bcf86cd799439011"; // ID MongoDB valide mais inexistant

      // Act
      const result = await dbGetRoleByIdService(nonExistentId);

      // Assert
      expect(result).toBeUndefined();
    });
  });

  describe("dbUpdateRoleByIdService", () => {
    it("devrait mettre à jour un rôle existant", async () => {
      // Arrange
      const roleData = {
        name: "userRole",
        permissionsIds: ["user:read"],
        version: 1,
      };
      const role = await Role.create(roleData);

      const updateData: UpdateRole = {
        name: "updatedUserRole",
        permissionsIds: ["user:read", "user:write"],
      };

      // Act
      const result = await dbUpdateRoleByIdService(role._id.toString(), updateData);

      // Assert
      expect(result).toBeDefined();

      // Vérifier que les modifications ont été appliquées
      const updatedRole = await Role.findById(role._id);
      expect(updatedRole?.name).toBe(updateData.name);
      expect(updatedRole?.permissionsIds).toEqual(expect.arrayContaining(updateData.permissionsIds));
    });

    it("devrait retourner undefined si le rôle n'existe pas", async () => {
      // Arrange
      const nonExistentId = "507f1f77bcf86cd799439011";
      const updateData: UpdateRole = {
        name: "nonExistentRole",
        permissionsIds: [],
      };

      // Act
      const result = await dbUpdateRoleByIdService(nonExistentId, updateData);

      // Assert
      expect(result).toBeUndefined();
    });
  });

  describe("dbDeleteRoleByIdService", () => {
    it("devrait supprimer un rôle existant", async () => {
      // Arrange
      const roleData = {
        name: "tempRole",
        permissionsIds: ["temp:read"],
      };
      const role = await Role.create(roleData);

      // Act
      const result = await dbDeleteRoleByIdService(role._id.toString());

      // Assert
      expect(result).toBe(true);

      // Vérifier que le rôle a bien été supprimé
      const deletedRole = await Role.findById(role._id);
      expect(deletedRole).toBeNull();
    });

    it("devrait retourner false si le rôle n'existe pas", async () => {
      // Arrange
      const nonExistentId = "507f1f77bcf86cd799439011";

      // Act
      const result = await dbDeleteRoleByIdService(nonExistentId);

      // Assert
      expect(result).toBe(false);
    });
  });

  describe("getOrLoadRoleService", () => {
    it("devrait charger un rôle depuis la base de données et le mettre en cache", async () => {
      // Arrange
      const roleData = {
        name: "cacheRole",
        permissionsIds: ["cache:read", "cache:write"],
        version: 2,
      };
      const role = await Role.create(roleData);
      const roleId = role._id.toString();

      // Act
      const cachedRole = await getOrLoadRoleService(roleId);

      // Assert
      expect(cachedRole).toBeDefined();
      expect(cachedRole.version).toBe(roleData.version);
      expect(cachedRole.permIds.size).toBe(roleData.permissionsIds.length);
      expect(cachedRole.permIds.has("cache:read")).toBe(true);
      expect(cachedRole.permIds.has("cache:write")).toBe(true);

      // Vérifier que le rôle est bien en cache
      expect(cacheRBAC.roles.has(roleId)).toBe(true);
    });

    it("devrait retourner le rôle depuis le cache s'il est déjà présent", async () => {
      // Arrange
      const roleData = {
        name: "cachedRole",
        permissionsIds: ["cached:read"],
        version: 3,
      };
      const role = await Role.create(roleData);
      const roleId = role._id.toString();

      // Charger une première fois pour mettre en cache
      await getOrLoadRoleService(roleId);

      // Modifier le rôle en base mais pas en cache
      await Role.findByIdAndUpdate(roleId, { name: "modifiedButCached" });

      // Act
      const cachedRole = await getOrLoadRoleService(roleId);

      // Assert
      expect(cachedRole).toBeDefined();
      expect(cachedRole.version).toBe(roleData.version);

      // Le rôle retourné devrait être celui du cache, pas celui modifié en base
      const updatedRoleInDb = await Role.findById(roleId);
      expect(updatedRoleInDb?.name).toBe("modifiedButCached");
    });

    it("devrait lever une erreur si le rôle n'existe pas", async () => {
      // Arrange
      const nonExistentId = "507f1f77bcf86cd799439011";

      // Act & Assert
      await expect(getOrLoadRoleService(nonExistentId)).rejects.toThrow("Role not found");
    });
  });

  describe("upsertRoleWithVersion", () => {
    it("devrait créer un nouveau rôle s'il n'existe pas", async () => {
      // Arrange
      const roleName = "newUpsertRole";
      const permissions = ["perm1", "perm2", "perm3"];

      // Act
      await upsertRoleWithVersion(roleName, permissions);

      // Assert
      const role = await Role.findOne({ name: roleName });
      expect(role).not.toBeNull();
      expect(role?.name).toBe(roleName);
      expect(role?.permissionsIds).toEqual(expect.arrayContaining(permissions));
      expect(role?.version).toBe(1);
    });

    it("devrait mettre à jour un rôle existant si les permissions changent", async () => {
      // Arrange
      const roleName = "existingUpsertRole";
      const initialPermissions = ["initial:read"];
      await Role.create({
        name: roleName,
        permissionsIds: initialPermissions,
        version: 1,
      });

      const newPermissions = ["initial:read", "new:write"];

      // Act
      await upsertRoleWithVersion(roleName, newPermissions);

      // Assert
      const updatedRole = await Role.findOne({ name: roleName });
      expect(updatedRole).not.toBeNull();
      expect(updatedRole?.permissionsIds).toEqual(expect.arrayContaining(newPermissions));
      expect(updatedRole?.version).toBe(2);
    });

    it("ne devrait pas mettre à jour la version si les permissions sont identiques", async () => {
      // Arrange
      const roleName = "unchangedRole";
      const permissions = ["unchanged:read", "unchanged:write"];
      await Role.create({
        name: roleName,
        permissionsIds: permissions,
        version: 5,
      });

      // Act
      await upsertRoleWithVersion(roleName, [...permissions]); // Même permissions, différente instance

      // Assert
      const role = await Role.findOne({ name: roleName });
      expect(role).not.toBeNull();
      expect(role?.version).toBe(5); // La version ne devrait pas changer
    });
  });
});
