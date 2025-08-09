export const PERMISSION_AUTH = {
  USER: {
    CREATE: "user:create",
    READ: "user:read",
    UPDATE: "user:update",
    DELETE: "user:delete",
  },
  WEAK_AURA: {
    CREATE: "weak_aura:create",
    READ: "weak_aura:read",
    UPDATE: "weak_aura:update",
    DELETE: "weak_aura:delete",
  },
  ROUTE: {
    CREATE: "route:create",
    READ: "route:read",
    UPDATE: "route:update",
    DELETE: "route:delete",
  },
  ADDON: {
    CREATE: "addon:create",
    READ: "addon:read",
    UPDATE: "addon:update",
    DELETE: "addon:delete",
  },
  CHARACTER: {
    CREATE: "character:create",
    READ: "character:read",
    UPDATE: "character:update",
    DELETE: "character:delete",
  },
  STREAM_SCHEDULE: {
    CREATE: "stream_schedule:create",
    READ: "stream_schedule:read",
    UPDATE: "stream_schedule:update",
    DELETE: "stream_schedule:delete",
  },
  ADDON_PROFILE: {
    CREATE: "addon_profile:create",
    READ: "addon_profile:read",
    UPDATE: "addon_profile:update",
    DELETE: "addon_profile:delete",
  },
  DUNGEON: {
    CREATE: "dungeon:create",
    READ: "dungeon:read",
    UPDATE: "dungeon:update",
    DELETE: "dungeon:delete",
  },
  CHANGE_SEASON: {
    CREATE: "change_season:create",
    READ: "change_season:read",
    UPDATE: "change_season:update",
    DELETE: "change_season:delete",
  },
  TALENT: {
    CREATE: "talent:create",
    READ: "talent:read",
    UPDATE: "talent:update",
    DELETE: "talent:delete",
  },
  TIP: {
    CREATE: "tip:create",
    READ: "tip:read",
    UPDATE: "tip:update",
    DELETE: "tip:delete",
  },
} as const;

export const ROLE_AUTH = {
  ADMIN: "admin",
  USER: "user",
};

export const ALL_PERMISSIONS = Object.values(PERMISSION_AUTH).flatMap((category) => Object.values(category));

export const ALL_READ_PERMISSIONS = Object.values(PERMISSION_AUTH).flatMap((category) =>
  Object.values(category).filter((perm) => perm.endsWith(":read")),
);

export const ALL_WRITE_PERMISSIONS = Object.values(PERMISSION_AUTH).flatMap((category) =>
  Object.values(category).filter(
    (perm) => perm.endsWith(":create") || perm.endsWith(":update") || perm.endsWith(":delete"),
  ),
);
