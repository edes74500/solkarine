import { z } from "zod";

export const roleCacheSchema = z.object({
  version: z.number(),
  permIds: z.instanceof(Set<string>),
  expiresAt: z.number(),
});

export const userCacheSchema = z.object({
  roleIds: z.array(z.string()),
  permSet: z.instanceof(Set<string>),
  roleVersionMap: z.record(z.string(), z.number()),
  expiresAt: z.number(),
});

export const cacheSchema = z.object({
  roles: z.instanceof(Map<string, RoleCache>),
  users: z.instanceof(Map<string, UserCache>),
});

export type CacheRBAC = z.infer<typeof cacheSchema>;
export type RoleCache = z.infer<typeof roleCacheSchema>;
export type UserCache = z.infer<typeof userCacheSchema>;
