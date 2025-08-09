import { cacheRBAC, TTL_ROLE_MS } from "@/config/rbac.config";
import { Role } from "@/models/auth/role.model";
import { CreateRole, RoleCache, RoleDB, UpdateRole } from "@repo/types";

export const dbCreateRoleService = async (role: CreateRole): Promise<RoleDB | null> => {
  const newRole = await Role.create(role);
  return newRole;
};

export const dbGetRoleByIdService = async (id: string): Promise<RoleDB | null> => {
  const role = await Role.findById(id);
  return role?.toObject() as RoleDB;
};

export const dbUpdateRoleByIdService = async (id: string, role: UpdateRole): Promise<RoleDB | null> => {
  const result = await Role.findByIdAndUpdate(id, { ...role, permissionsIds: role.permissionsIds }, { new: true });
  return result?.toObject() as RoleDB;
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
    permIds: new Set(role.permissionsIds),
    expiresAt: now + TTL_ROLE_MS,
  };
  cacheRBAC.roles.set(roleId, rc);
  return rc;
}

/** Upsert d’un rôle: si la liste de permissions change → set + version++ */
export async function upsertRoleWithVersion(name: string, permissionIds: string[]) {
  const existing = await Role.findOne({ name }).lean();
  if (!existing) {
    await Role.create({ name, permissionsIds: permissionIds, version: 1 });
    console.log(`Created role ${name} (v1) with ${permissionIds.length} perms`);
    return;
  }

  const old = (existing.permissionsIds || []).map(String).sort();
  const cur = permissionIds.map(String).sort();
  const changed = old.length !== cur.length || old.some((v: string, i: number) => v !== cur[i]);

  if (!changed) {
    console.log(`No change for role ${name} (v${existing.version})`);
    return;
  }

  const nextVersion = (existing.version ?? 1) + 1;
  await Role.updateOne({ _id: existing._id }, { $set: { permissionsIds: permissionIds }, $inc: { version: 1 } });
  console.log(`Updated role ${name} → version ${nextVersion} (${permissionIds.length} perms)`);
}
