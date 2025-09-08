export const NEXT_API_TAGS = {
  ADDON: {
    GET: {
      GET_ALL: "addon-getAllAddons",
    },
  },
  ADDON_PROFILE: {
    GET: {
      GET_ALL_WITH_POPULATED_ADDON: "addonProfile-getAllAddonProfilesWithPopulatedAddon",
    },
  },
  CHARACTER: {
    GET: {
      GET_ALL: "character-getAllCharacters",
    },
  },
  RAIDER_IO: {
    GET: {
      GET_RAIDER_IO_BY_CHARACTER_NAME: "raiderIo-getRaiderIoByCharacterName",
    },
  },
  DUNGEON: {
    GET: {
      GET_ALL: "dungeon-getAllDungeons",
    },
  },
  ROUTE: {
    GET: {
      //   GET_ALL: "route-getAllRoutes",
      GET_ALL_WITH_POPULATED_DUNGEON: "routes-getRoutesWithPopulatedDungeon",
    },
  },
  TWITCH: {
    GET: {
      GET_SCHEDULE: "twitch-getTwitchSchedule",
    },
  },
  WEAK_AURA: {
    GET: {
      GET_ALL: "weakAura-getAllWeakAuras",
    },
  },
  YOUTUBE: {
    GET: {
      GET_LATEST: "youtube-getYoutubeLatest",
    },
  },
  TALENTS: {
    GET: {
      GET_ALL: "talents-getAllTalents",
    },
  },
};
