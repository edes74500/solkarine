export const WEAK_AURA_TAGS = [
  // Content
  "raid",
  "mythic_plus",
  "pvp",
  "utility",
  // Roles
  "heal",
  "dps",
  "tank",
  // Classes
  "mage",
  "priest",
  "warlock",
  "rogue",
  "monk",
  "demon_hunter",
  "druid",
  "evoker",
  "hunter",
  "shaman",
  "death_knight",
  "paladin",
  "warrior",
] as const;

export const WEAK_AURA_IMAGE_SOURCE: Record<(typeof WEAK_AURA_TAGS)[number], string> = {
  // Content
  raid: "/img/wow/content/raid.jpg",
  mythic_plus: "/img/wow/content/mythic_plus.png",
  pvp: "/img/wow/content/pvp.jpg",
  utility: "/img/wow/content/utility.jpg",
  // Roles
  heal: "/img/wow/roles/heal.png",
  dps: "/img/wow/roles/dps.png",
  tank: "/img/wow/roles/tank.png",
  // Classes
  mage: "/img/wow/classes/64/mage.png",
  priest: "/img/wow/classes/64/priest.png",
  warlock: "/img/wow/classes/64/warlock.png",
  rogue: "/img/wow/classes/64/rogue.png",
  monk: "/img/wow/classes/64/monk.png",
  demon_hunter: "/img/wow/classes/64/demonhunter.jpg",
  druid: "/img/wow/classes/64/druid.png",
  evoker: "/img/wow/classes/64/evoker.jpg",
  hunter: "/img/wow/classes/64/hunter.png",
  shaman: "/img/wow/classes/64/shaman.png",
  death_knight: "/img/wow/classes/64/deathknight.jpg",
  paladin: "/img/wow/classes/64/paladin.png",
  warrior: "/img/wow/classes/64/warrior.png",
};
