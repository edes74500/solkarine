export const CLASS_COLORS = {
  // Tanks
  "Death Knight": "#C41E3A",
  "Demon Hunter": "#A330C9",
  Druid: "#FF7C0A",
  Monk: "#00FF98",
  Paladin: "#F48CBA",
  Warrior: "#C69B6D",

  // Healers
  Priest: "#FFFFFF",
  Shaman: "#0070DD",
  Evoker: "#33937F",

  // DPS
  Hunter: "#AAD372",
  Mage: "#3FC7EB",
  Rogue: "#FFF468",
  Warlock: "#8788EE",
} as const;

export const TALENTS = {
  "Death Knight": {
    Blood: { name: "Blood", role: "Tank", description: "Blood", icon_url: "blood" },
    Frost: { name: "Frost", role: "Dps", description: "Frost", icon_url: "frost" },
    Unholy: { name: "Unholy", role: "Dps", description: "Unholy", icon_url: "unholy" },
    hero_talent: {
      Deathbringer: { name: "Deathbringer", description: "Deathbringer", icon_url: "deathbringer" },
      "San'layn": { name: "San'layn", description: "San'layn", icon_url: "san_layn" },
    },
  },

  "Demon Hunter": {
    Havoc: { name: "Havoc", role: "Dps", description: "Havoc", icon_url: "havoc" },
    Vengeance: { name: "Vengeance", role: "Tank", description: "Vengeance", icon_url: "vengeance" },
    hero_talent: {
      Felblade: { name: "Felblade", description: "Felblade", icon_url: "felblade" },
      Aldrachi: { name: "Aldrachi", description: "Aldrachi", icon_url: "aldrachi" },
    },
  },

  Druid: {
    Balance: { name: "Balance", role: "Dps", description: "Balance", icon_url: "balance" },
    Feral: { name: "Feral", role: "Dps", description: "Feral", icon_url: "feral" },
    Guardian: { name: "Guardian", role: "Tank", description: "Guardian", icon_url: "guardian" },
    Restoration: { name: "Restoration", role: "Heal", description: "Restoration", icon_url: "restoration" },
    hero_talent: {
      Keeper: { name: "Keeper of the Grove", description: "Keeper of the Grove", icon_url: "keeper" },
      Wildstalker: { name: "Wildstalker", description: "Wildstalker", icon_url: "wildstalker" },
    },
  },

  Evoker: {
    Devastation: { name: "Devastation", role: "Dps", description: "Devastation", icon_url: "devastation" },
    Preservation: { name: "Preservation", role: "Heal", description: "Preservation", icon_url: "preservation" },
    Augmentation: { name: "Augmentation", role: "Dps", description: "Augmentation", icon_url: "augmentation" },
    hero_talent: {
      Flameshaper: { name: "Flameshaper", description: "Flameshaper", icon_url: "flameshaper" },
      Scalecommander: { name: "Scalecommander", description: "Scalecommander", icon_url: "scalecommander" },
    },
  },

  Hunter: {
    BeastMastery: { name: "Beast Mastery", role: "Dps", description: "Beast Mastery", icon_url: "beast_mastery" },
    Marksmanship: { name: "Marksmanship", role: "Dps", description: "Marksmanship", icon_url: "marksmanship" },
    Survival: { name: "Survival", role: "Dps", description: "Survival", icon_url: "survival" },
    hero_talent: {
      Sentinel: { name: "Sentinel", description: "Sentinel", icon_url: "sentinel" },
      Packleader: { name: "Packleader", description: "Packleader", icon_url: "packleader" },
    },
  },

  Mage: {
    Arcane: { name: "Arcane", role: "Dps", description: "Arcane", icon_url: "arcane" },
    Fire: { name: "Fire", role: "Dps", description: "Fire", icon_url: "fire" },
    Frost: { name: "Frost", role: "Dps", description: "Frost", icon_url: "frost" },
    hero_talent: {
      Spellslinger: { name: "Spellslinger", description: "Spellslinger", icon_url: "spellslinger" },
      Frostfire: { name: "Frostfire", description: "Frostfire", icon_url: "frostfire" },
    },
  },

  Monk: {
    Brewmaster: { name: "Brewmaster", role: "Tank", description: "Brewmaster", icon_url: "brewmaster" },
    Mistweaver: { name: "Mistweaver", role: "Heal", description: "Mistweaver", icon_url: "mistweaver" },
    Windwalker: { name: "Windwalker", role: "Dps", description: "Windwalker", icon_url: "windwalker" },
    hero_talent: {
      ShadoPan: { name: "Shado-Pan", description: "Shado-Pan", icon_url: "shado_pan" },
      MasterOfHarmony: { name: "Master of Harmony", description: "Master of Harmony", icon_url: "master_of_harmony" },
    },
  },

  Paladin: {
    Holy: { name: "Holy", role: "Heal", description: "Holy", icon_url: "holy" },
    Protection: { name: "Protection", role: "Tank", description: "Protection", icon_url: "protection" },
    Retribution: { name: "Retribution", role: "Dps", description: "Retribution", icon_url: "retribution" },
    hero_talent: {
      Lightsmith: { name: "Lightsmith", description: "Lightsmith", icon_url: "lightsmith" },
      Templar: { name: "Templar", description: "Templar", icon_url: "templar" },
    },
  },

  Priest: {
    Discipline: { name: "Discipline", role: "Heal", description: "Discipline", icon_url: "discipline" },
    Holy: { name: "Holy", role: "Heal", description: "Holy", icon_url: "holy" },
    Shadow: { name: "Shadow", role: "Dps", description: "Shadow", icon_url: "shadow" },
    hero_talent: {
      Oracle: { name: "Oracle", description: "Oracle", icon_url: "oracle" },
      Voidweaver: { name: "Voidweaver", description: "Voidweaver", icon_url: "voidweaver" },
    },
  },

  Rogue: {
    Assassination: { name: "Assassination", role: "Dps", description: "Assassination", icon_url: "assassination" },
    Outlaw: { name: "Outlaw", role: "Dps", description: "Outlaw", icon_url: "outlaw" },
    Subtlety: { name: "Subtlety", role: "Dps", description: "Subtlety", icon_url: "subtlety" },
    hero_talent: {
      Trickster: { name: "Trickster", description: "Trickster", icon_url: "trickster" },
      Deathstalker: { name: "Deathstalker", description: "Deathstalker", icon_url: "deathstalker" },
    },
  },

  Shaman: {
    Elemental: { name: "Elemental", role: "Dps", description: "Elemental", icon_url: "elemental" },
    Enhancement: { name: "Enhancement", role: "Dps", description: "Enhancement", icon_url: "enhancement" },
    Restoration: { name: "Restoration", role: "Heal", description: "Restoration", icon_url: "restoration" },
    hero_talent: {
      Stormbringer: { name: "Stormbringer", description: "Stormbringer", icon_url: "stormbringer" },
      Farseer: { name: "Farseer", description: "Farseer", icon_url: "farseer" },
    },
  },

  Warlock: {
    Affliction: { name: "Affliction", role: "Dps", description: "Affliction", icon_url: "affliction" },
    Demonology: { name: "Demonology", role: "Dps", description: "Demonology", icon_url: "demonology" },
    Destruction: { name: "Destruction", role: "Dps", description: "Destruction", icon_url: "destruction" },
    hero_talent: {
      SoulHarvester: { name: "Soul Harvester", description: "Soul Harvester", icon_url: "soul_harvester" },
      Hellcaller: { name: "Hellcaller", description: "Hellcaller", icon_url: "hellcaller" },
    },
  },

  Warrior: {
    Arms: { name: "Arms", role: "Dps", description: "Arms", icon_url: "arms" },
    Fury: { name: "Fury", role: "Dps", description: "Fury", icon_url: "fury" },
    Protection: { name: "Protection", role: "Tank", description: "Protection", icon_url: "protection" },
    hero_talent: {
      Colossus: { name: "Colossus", description: "Colossus", icon_url: "colossus" },
      MountainThane: { name: "Mountain Thane", description: "Mountain Thane", icon_url: "mountain_thane" },
    },
  },
};
