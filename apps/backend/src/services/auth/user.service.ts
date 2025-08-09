import { cacheRBAC, TTL_USER_MS } from "@/config/rbac.config";
import { getOrLoadRoleService } from "@/services/auth/role.service";
import { hashPassword } from "@/utils/auth.utils";
import { CreateUser, UpdateUser, UserDB } from "@repo/types";
import { User } from "../../models/auth/user.model";

export const dbCreateUserService = async (user: CreateUser): Promise<UserDB> => {
  const hashedPassword = await hashPassword(user.password);
  const newUser = await User.create({ ...user, password: hashedPassword });
  return newUser;
};

export const dbGetUserByIdService = async (id: string): Promise<UserDB | null> => {
  const user = await User.findById(id);
  return user?.toObject() as UserDB;
};

export const dbUpdateUserByIdService = async (id: string, user: UpdateUser): Promise<boolean> => {
  const result = await User.findByIdAndUpdate(id, user, { new: true });
  return result !== null;
};

export const dbDeleteUserByIdService = async (id: string): Promise<boolean> => {
  const result = await User.findByIdAndDelete(id);
  return result !== null;
};

function versionsOK(map: Record<string, number>): boolean {
  for (const [roleId, v] of Object.entries(map)) {
    const r = cacheRBAC.roles.get(roleId);
    if (!r || r.version !== v) return false;
  }
  return true;
}

export async function getUserPermsService(userId: string): Promise<Set<string>> {
  const now = Date.now();
  const userCacheHit = cacheRBAC.users.get(userId);
  if (userCacheHit && userCacheHit.expiresAt > now && versionsOK(userCacheHit.roleVersionMap)) {
    return userCacheHit.permSet;
  }

  const user = await dbGetUserByIdService(userId);
  if (!user) throw new Error("User not found");
  const permSet = new Set<string>();
  const roleVersionMap: Record<string, number> = {};

  for (const roleId of user.roleIds) {
    const rc = await getOrLoadRoleService(roleId);
    rc.permIds.forEach((p) => permSet.add(p));
    roleVersionMap[roleId] = rc.version;
  }

  cacheRBAC.users.set(userId, {
    roleIds: user.roleIds,
    permSet,
    roleVersionMap,
    expiresAt: now + TTL_USER_MS,
  });

  return permSet;
}
