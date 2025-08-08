import { RoleCache, UserCache } from "@repo/types";

export const TTL_ROLE_MS = 12 * 60 * 60 * 1000; // 12h
export const TTL_USER_MS = 10 * 60 * 1000; // 10min

export const cacheRBAC = {
  roles: new Map<string, RoleCache>(),
  users: new Map<string, UserCache>(),
};
