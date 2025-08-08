import { cacheRBAC, TTL_ROLE_MS } from "@/config/rbac.config";
import { Role } from "@/models/auth/role.model";
import { CreateRole, RoleCache, RoleDB, UpdateRole } from "@repo/types";

export const dbCreateRoleService = async (role: CreateRole): Promise<RoleDB> => {
  const newRole = await Role.create(role);
  return newRole;
};

export const dbGetRoleByIdService = async (id: string): Promise<RoleDB | null> => {
  const role = await Role.findById(id);
  return role?.toObject() as RoleDB;
};

export const dbUpdateRoleByIdService = async (id: string, role: UpdateRole): Promise<boolean> => {
  const result = await Role.findByIdAndUpdate(id, role, { new: true });
  return result !== null;
};

export const dbDeleteRoleByIdService = async (id: string): Promise<boolean> => {
  const result = await Role.findByIdAndDelete(id);
  return result !== null;
};

export async function getOrLoadRoleService(roleId: string): Promise<RoleCache> {
  const now = Date.now();
  const hit = cacheRBAC.roles.get(roleId);
  if (hit && hit.expiresAt > now) return hit;

  const role = await dbGetRoleByIdService(roleId); // inclut permissions[]
  if (!role) throw new Error("Role not found");
  const rc: RoleCache = {
    version: role.version,
    permIds: new Set(role.permissions.map((p) => p.name)),
    expiresAt: now + TTL_ROLE_MS,
  };
  cacheRBAC.roles.set(roleId, rc);
  return rc;
}
