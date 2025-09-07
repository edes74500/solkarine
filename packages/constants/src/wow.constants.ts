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

export const CLASS_AND_TALENTS = {
  1: {
    name: "Death Knight",
    icon_url: "/img/wow/classes/64/deathknight.jpg",
    1: {
      name: "Blood",
      role: "Tank",
      description: "Blood",
      icon_url: "/img/wow/specs/blood-dk.png",
      hero_talent: {
        1: { name: "San'layn", description: "San'layn", icon_url: "/img/wow/hero_specs/herospec_sanlayn.png" },
        2: {
          name: "Deathbringer",
          description: "Deathbringer",
          icon_url: "/img/wow/hero_specs/herospec_deathbringer.png",
        },
      },
    },
    2: {
      name: "Frost",
      role: "Dps",
      description: "Frost",
      icon_url: "/img/wow/specs/frost-dk.png",
      hero_talent: {
        1: {
          name: "Rider of the Apocalypse",
          description: "Rider of the Apocalypse",
          icon_url: "/img/wow/hero_specs/herospec_rider-of-the-apocalypse.png",
        },
        2: {
          name: "Deathbringer",
          description: "Deathbringer",
          icon_url: "/img/wow/hero_specs/herospec_deathbringer.png",
        },
      },
    },
    3: {
      name: "Unholy",
      role: "Dps",
      description: "Unholy",
      icon_url: "/img/wow/specs/unholy-dk.png",
      hero_talent: {
        1: {
          name: "Rider of the Apocalypse",
          description: "Rider of the Apocalypse",
          icon_url: "/img/wow/hero_specs/herospec_rider-of-the-apocalypse.png",
        },
        2: { name: "San'layn", description: "San'layn", icon_url: "/img/wow/hero_specs/herospec_sanlayn.png" },
      },
    },
  },

  2: {
    name: "Demon Hunter",
    icon_url: "/img/wow/classes/64/demonhunter.jpg",
    1: {
      name: "Havoc",
      role: "Dps",
      description: "Havoc",
      icon_url: "/img/wow/specs/havoc-dh.png",
      hero_talent: {
        1: {
          name: "Aldrachi Reaver",
          description: "Aldrachi Reaver",
          icon_url: "/img/wow/hero_specs/herospec_aldrachi-reaver.png",
        },
        2: {
          name: "Fel-Scarred",
          description: "Fel-Scarred",
          icon_url: "/img/wow/hero_specs/herospec_fel-scarred.png",
        },
      },
    },
    2: {
      name: "Vengeance",
      role: "Tank",
      description: "Vengeance",
      icon_url: "/img/wow/specs/vengeance-dh.png",
      hero_talent: {
        1: {
          name: "Aldrachi Reaver",
          description: "Aldrachi Reaver",
          icon_url: "/img/wow/hero_specs/herospec_aldrachi-reaver.png",
        },
        2: {
          name: "Fel-Scarred",
          description: "Fel-Scarred",
          icon_url: "/img/wow/hero_specs/herospec_fel-scarred.png",
        },
      },
    },
  },

  3: {
    name: "Druid",
    icon_url: "/img/wow/classes/64/druid.png",
    1: {
      name: "Balance",
      role: "Dps",
      description: "Balance",
      icon_url: "/img/wow/specs/balance-druid.png",
      hero_talent: {
        1: {
          name: "Keeper of the Grove",
          description: "Keeper of the Grove",
          icon_url: "/img/wow/hero_specs/herospec_keeper-of-the-grove.png",
        },
        2: {
          name: "Elune's Chosen",
          description: "Elune's Chosen",
          icon_url: "/img/wow/hero_specs/herospec_elunes-chosen.png",
        },
      },
    },
    2: {
      name: "Feral",
      role: "Dps",
      description: "Feral",
      icon_url: "/img/wow/specs/feral-druid.png",
      hero_talent: {
        1: {
          name: "Wildstalker",
          description: "Wildstalker",
          icon_url: "/img/wow/hero_specs/herospec_wildstalker.png",
        },
        2: {
          name: "Druid of the Claw",
          description: "Druid of the Claw",
          icon_url: "/img/wow/hero_specs/herospec_druid-of-the-claw.png",
        },
      },
    },
    3: {
      name: "Guardian",
      role: "Tank",
      description: "Guardian",
      icon_url: "/img/wow/specs/guardian-druid.png",
      hero_talent: {
        1: {
          name: "Druid of the Claw",
          description: "Druid of the Claw",
          icon_url: "/img/wow/hero_specs/herospec_druid-of-the-claw.png",
        },
        2: {
          name: "Elune's Chosen",
          description: "Elune's Chosen",
          icon_url: "/img/wow/hero_specs/herospec_elunes-chosen.png",
        },
      },
    },
    4: {
      name: "Restoration",
      role: "Heal",
      description: "Restoration",
      icon_url: "/img/wow/specs/restoration-druid.png",
      hero_talent: {
        1: {
          name: "Keeper of the Grove",
          description: "Keeper of the Grove",
          icon_url: "/img/wow/hero_specs/herospec_keeper-of-the-grove.png",
        },
        2: {
          name: "Wildstalker",
          description: "Wildstalker",
          icon_url: "/img/wow/hero_specs/herospec_wildstalker.png",
        },
      },
    },
  },

  4: {
    name: "Evoker",
    icon_url: "/img/wow/classes/64/evoker.jpg",
    1: {
      name: "Devastation",
      role: "Dps",
      description: "Devastation",
      icon_url: "/img/wow/specs/devastation-evoker.png",
      hero_talent: {
        1: {
          name: "Flameshaper",
          description: "Flameshaper",
          icon_url: "/img/wow/hero_specs/herospec_flameshaper.png",
        },
        2: {
          name: "Scalecommander",
          description: "Scalecommander",
          icon_url: "/img/wow/hero_specs/herospec_scalecommander.png",
        },
      },
    },
    2: {
      name: "Preservation",
      role: "Heal",
      description: "Preservation",
      icon_url: "/img/wow/specs/preservation-evoker.png",
      hero_talent: {
        1: {
          name: "Flameshaper",
          description: "Flameshaper",
          icon_url: "/img/wow/hero_specs/herospec_flameshaper.png",
        },
        2: {
          name: "Chronowarden",
          description: "Chronowarden",
          icon_url: "/img/wow/hero_specs/herospec_chronowarden.png",
        },
      },
    },
    3: {
      name: "Augmentation",
      role: "Dps",
      description: "Augmentation",
      icon_url: "/img/wow/specs/augmentation-evoker.png",
      hero_talent: {
        1: {
          name: "Chronowarden",
          description: "Chronowarden",
          icon_url: "/img/wow/hero_specs/herospec_chronowarden.png",
        },
        2: {
          name: "Scalecommander",
          description: "Scalecommander",
          icon_url: "/img/wow/hero_specs/herospec_scalecommander.png",
        },
      },
    },
  },

  5: {
    name: "Hunter",
    icon_url: "/img/wow/classes/64/hunter.png",
    1: {
      name: "Beast Mastery",
      role: "Dps",
      description: "Beast Mastery",
      icon_url: "/img/wow/specs/beast_mastery-hunter.png",
      hero_talent: {
        1: {
          name: "Pack Leader",
          description: "Pack Leader",
          icon_url: "/img/wow/hero_specs/herospec_pack-leader.png",
        },
        2: {
          name: "Dark Ranger",
          description: "Dark Ranger",
          icon_url: "/img/wow/hero_specs/herospec_dark-ranger.png",
        },
      },
    },
    2: {
      name: "Marksmanship",
      role: "Dps",
      description: "Marksmanship",
      icon_url: "/img/wow/specs/marksmanship-hunter.png",
      hero_talent: {
        1: {
          name: "Dark Ranger",
          description: "Dark Ranger",
          icon_url: "/img/wow/hero_specs/herospec_dark-ranger.png",
        },
        2: { name: "Sentinel", description: "Sentinel", icon_url: "/img/wow/hero_specs/herospec_sentinel.png" },
      },
    },
    3: {
      name: "Survival",
      role: "Dps",
      description: "Survival",
      icon_url: "/img/wow/specs/survival-hunter.png",
      hero_talent: {
        1: { name: "Sentinel", description: "Sentinel", icon_url: "/img/wow/hero_specs/herospec_sentinel.png" },
        2: { name: "Pack Leader", description: "Pack Leader", icon_url: "/img/wow/hero_specs/pack-leader.png" },
      },
    },
  },

  6: {
    name: "Mage",
    icon_url: "/img/wow/classes/64/mage.png",
    1: {
      name: "Arcane",
      role: "Dps",
      description: "Arcane",
      icon_url: "/img/wow/specs/arcane-mage.png",
      hero_talent: {
        1: { name: "Sunfury", description: "Sunfury", icon_url: "/img/wow/hero_specs/herospec_sunfury.png" },
        2: {
          name: "Spellslinger",
          description: "Spellslinger",
          icon_url: "/img/wow/hero_specs/herospec_spellslinger.png",
        },
      },
    },
    2: {
      name: "Fire",
      role: "Dps",
      description: "Fire",
      icon_url: "/img/wow/specs/fire-mage.png",
      hero_talent: {
        1: { name: "Sunfury", description: "Sunfury", icon_url: "/img/wow/hero_specs/herospec_sunfury.png" },
        2: { name: "Frostfire", description: "Frostfire", icon_url: "/img/wow/hero_specs/herospec_frostfire.png" },
      },
    },
    3: {
      name: "Frost",
      role: "Dps",
      description: "Frost",
      icon_url: "/img/wow/specs/frost-mage.png",
      hero_talent: {
        1: { name: "Frostfire", description: "Frostfire", icon_url: "/img/wow/hero_specs/herospec_frostfire.png" },
        2: {
          name: "Spellslinger",
          description: "Spellslinger",
          icon_url: "/img/wow/hero_specs/herospec_spellslinger.png",
        },
      },
    },
  },

  7: {
    name: "Monk",
    icon_url: "/img/wow/classes/64/monk.png",
    1: {
      name: "Brewmaster",
      role: "Tank",
      description: "Brewmaster",
      icon_url: "/img/wow/specs/brewmaster-monk.png",
      hero_talent: {
        1: {
          name: "Master of Harmony",
          description: "Master of Harmony",
          icon_url: "/img/wow/hero_specs/herospec_master-of-harmony.png",
        },
        2: { name: "Shado-Pan", description: "Shado-Pan", icon_url: "/img/wow/hero_specs/herospec_shado-pan.png" },
      },
    },
    2: {
      name: "Mistweaver",
      role: "Heal",
      description: "Mistweaver",
      icon_url: "/img/wow/specs/mistweaver-monk.png",
      hero_talent: {
        1: {
          name: "Master of Harmony",
          description: "Master of Harmony",
          icon_url: "/img/wow/hero_specs/herospec_master-of-harmony.png",
        },
        2: {
          name: "Conduit of the Celestials",
          description: "Conduit of the Celestials",
          icon_url: "/img/wow/hero_specs/herospec_conduit-of-the-celestials.png",
        },
      },
    },
    3: {
      name: "Windwalker",
      role: "Dps",
      description: "Windwalker",
      icon_url: "/img/wow/specs/windwalker-monk.png",
      hero_talent: {
        1: { name: "Shado-Pan", description: "Shado-Pan", icon_url: "/img/wow/hero_specs/herospec_shado-pan.png" },
        2: {
          name: "Conduit of the Celestials",
          description: "Conduit of the Celestials",
          icon_url: "/img/wow/hero_specs/herospec_conduit-of-the-celestials.png",
        },
      },
    },
  },

  8: {
    name: "Paladin",
    icon_url: "/img/wow/classes/64/paladin.png",
    1: {
      name: "Holy",
      role: "Heal",
      description: "Holy",
      icon_url: "/img/wow/specs/holy-paladin.png",
      hero_talent: {
        1: { name: "Lightsmith", description: "Lightsmith", icon_url: "/img/wow/hero_specs/herospec_lightsmith.png" },
        2: {
          name: "Herald of the Sun",
          description: "Herald of the Sun",
          icon_url: "/img/wow/hero_specs/herospec_herald-of-the-sun.png",
        },
      },
    },
    2: {
      name: "Protection",
      role: "Tank",
      description: "Protection",
      icon_url: "/img/wow/specs/protection-paladin.png",
      hero_talent: {
        1: { name: "Lightsmith", description: "Lightsmith", icon_url: "/img/wow/hero_specs/herospec_lightsmith.png" },
        2: { name: "Templar", description: "Templar", icon_url: "/img/wow/hero_specs/herospec_templar.png" },
      },
    },
    3: {
      name: "Retribution",
      role: "Dps",
      description: "Retribution",
      icon_url: "/img/wow/specs/retribution-paladin.png",
      hero_talent: {
        1: {
          name: "Herald of the Sun",
          description: "Herald of the Sun",
          icon_url: "/img/wow/hero_specs/herospec_herald-of-the-sun.png",
        },
        2: { name: "Templar", description: "Templar", icon_url: "/img/wow/hero_specs/herospec_templar.png" },
      },
    },
  },

  9: {
    name: "Priest",
    icon_url: "/img/wow/classes/64/priest.png",
    1: {
      name: "Discipline",
      role: "Heal",
      description: "Discipline",
      icon_url: "/img/wow/specs/discipline-priest.png",
      hero_talent: {
        1: { name: "Voidweaver", description: "Voidweaver", icon_url: "/img/wow/hero_specs/herospec_voidweaver.png" },
        2: { name: "Oracle", description: "Oracle", icon_url: "/img/wow/hero_specs/herospec_oracle.png" },
      },
    },
    2: {
      name: "Holy",
      role: "Heal",
      description: "Holy",
      icon_url: "/img/wow/specs/holy-priest.png",
      hero_talent: {
        1: { name: "Oracle", description: "Oracle", icon_url: "/img/wow/hero_specs/herospec_oracle.png" },
        2: { name: "Archon", description: "Archon", icon_url: "/img/wow/hero_specs/herospec_archon.png" },
      },
    },
    3: {
      name: "Shadow",
      role: "Dps",
      description: "Shadow",
      icon_url: "/img/wow/specs/shadow-priest.png",
      hero_talent: {
        1: { name: "Voidweaver", description: "Voidweaver", icon_url: "/img/wow/hero_specs/herospec_voidweaver.png" },
        2: { name: "Archon", description: "Archon", icon_url: "/img/wow/hero_specs/herospec_archon.png" },
      },
    },
  },

  10: {
    name: "Rogue",
    icon_url: "/img/wow/classes/64/rogue.png",
    1: {
      name: "Assassination",
      role: "Dps",
      description: "Assassination",
      icon_url: "/img/wow/specs/assassination-rogue.png",
      hero_talent: {
        1: {
          name: "Deathstalker",
          description: "Deathstalker",
          icon_url: "/img/wow/hero_specs/herospec_deathstalker.png",
        },
        2: { name: "Fatebound", description: "Fatebound", icon_url: "/img/wow/hero_specs/herospec_fatebound.png" },
      },
    },
    2: {
      name: "Outlaw",
      role: "Dps",
      description: "Outlaw",
      icon_url: "/img/wow/specs/outlaw-rogue.png",
      hero_talent: {
        1: { name: "Trickster", description: "Trickster", icon_url: "/img/wow/hero_specs/herospec_trickster.png" },
        2: { name: "Fatebound", description: "Fatebound", icon_url: "/img/wow/hero_specs/herospec_fatebound.png" },
      },
    },
    3: {
      name: "Subtlety",
      role: "Dps",
      description: "Subtlety",
      icon_url: "/img/wow/specs/subtlety-rogue.png",
      hero_talent: {
        1: {
          name: "Deathstalker",
          description: "Deathstalker",
          icon_url: "/img/wow/hero_specs/herospec_deathstalker.png",
        },
        2: { name: "Trickster", description: "Trickster", icon_url: "/img/wow/hero_specs/herospec_trickster.png" },
      },
    },
  },

  11: {
    name: "Shaman",
    icon_url: "/img/wow/classes/64/shaman.png",
    1: {
      name: "Elemental",
      role: "Dps",
      description: "Elemental",
      icon_url: "/img/wow/specs/elemental-shaman.png",
      hero_talent: {
        1: {
          name: "Stormbringer",
          description: "Stormbringer",
          icon_url: "/img/wow/hero_specs/herospec_stormbringer.png",
        },
        2: { name: "Farseer", description: "Farseer", icon_url: "/img/wow/hero_specs/herospec_farseer.png" },
      },
    },
    2: {
      name: "Enhancement",
      role: "Dps",
      description: "Enhancement",
      icon_url: "/img/wow/specs/enhancement-shaman.png",
      hero_talent: {
        1: {
          name: "Stormbringer",
          description: "Stormbringer",
          icon_url: "/img/wow/hero_specs/herospec_stormbringer.png",
        },
        2: { name: "Totemic", description: "Totemic", icon_url: "/img/wow/hero_specs/herospec_totemic.png" },
      },
    },
    3: {
      name: "Restoration",
      role: "Heal",
      description: "Restoration",
      icon_url: "/img/wow/specs/restoration-shaman.png",
      hero_talent: {
        1: { name: "Farseer", description: "Farseer", icon_url: "/img/wow/hero_specs/herospec_farseer.png" },
        2: { name: "Totemic", description: "Totemic", icon_url: "/img/wow/hero_specs/herospec_totemic.png" },
      },
    },
  },

  12: {
    name: "Warlock",
    icon_url: "/img/wow/classes/64/warlock.png",
    1: {
      name: "Affliction",
      role: "Dps",
      description: "Affliction",
      icon_url: "/img/wow/specs/affliction-warlock.png",
      hero_talent: {
        1: {
          name: "Soul Harvester",
          description: "Soul Harvester",
          icon_url: "/img/wow/hero_specs/herospec_soul-harvester.png",
        },
        2: { name: "Hellcaller", description: "Hellcaller", icon_url: "/img/wow/hero_specs/herospec_hellcaller.png" },
      },
    },
    2: {
      name: "Demonology",
      role: "Dps",
      description: "Demonology",
      icon_url: "/img/wow/specs/demonology-warlock.png",
      hero_talent: {
        1: {
          name: "Soul Harvester",
          description: "Soul Harvester",
          icon_url: "/img/wow/hero_specs/herospec_soul-harvester.png",
        },
        2: { name: "Diabolist", description: "Diabolist", icon_url: "/img/wow/hero_specs/herospec_diabolist.png" },
      },
    },
    3: {
      name: "Destruction",
      role: "Dps",
      description: "Destruction",
      icon_url: "/img/wow/specs/destruction-warlock.png",
      hero_talent: {
        1: { name: "Hellcaller", description: "Hellcaller", icon_url: "/img/wow/hero_specs/herospec_hellcaller.png" },
        2: { name: "Diabolist", description: "Diabolist", icon_url: "/img/wow/hero_specs/herospec_diabolist.png" },
      },
    },
  },

  13: {
    name: "Warrior",
    icon_url: "/img/wow/classes/64/warrior.png",
    1: {
      name: "Arms",
      role: "Dps",
      description: "Arms",
      icon_url: "/img/wow/specs/arms-warrior.png",
      hero_talent: {
        1: { name: "Colossus", description: "Colossus", icon_url: "/img/wow/hero_specs/herospec_colossus.png" },
        2: { name: "Slayer", description: "Slayer", icon_url: "/img/wow/hero_specs/herospec_slayer.png" },
      },
    },
    2: {
      name: "Fury",
      role: "Dps",
      description: "Fury",
      icon_url: "/img/wow/specs/fury-warrior.png",
      hero_talent: {
        1: { name: "Slayer", description: "Slayer", icon_url: "/img/wow/hero_specs/herospec_slayer.png" },
        2: {
          name: "Mountain Thane",
          description: "Mountain Thane",
          icon_url: "/img/wow/hero_specs/herospec_mountain-thane.png",
        },
      },
    },
    3: {
      name: "Protection",
      role: "Tank",
      description: "Protection",
      icon_url: "/img/wow/specs/protection-warrior.png",
      hero_talent: {
        1: { name: "Colossus", description: "Colossus", icon_url: "/img/wow/hero_specs/herospec_colossus.png" },
        2: {
          name: "Mountain Thane",
          description: "Mountain Thane",
          icon_url: "/img/wow/hero_specs/herospec_mountain-thane.png",
        },
      },
    },
  },
} as const;
