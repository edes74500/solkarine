export const talents = {
  priest: {
    spec_0: {
      name: "discipline",
      description: "discipline",
      icon: "https://cdn.raiderio.net/images/wow/icons/large/spell_holy_disciplined.jpg",
    },
    spec_1: {
      name: "shadow",
      description: "shadow",
      icon: "https://cdn.raiderio.net/images/wow/icons/large/spell_shadow_shadowwordpain.jpg",
    },
    spec_2: {
      name: "holy",
      description: "holy",
      icon: "https://cdn.raiderio.net/images/wow/icons/large/spell_holy_holyword.jpg",
    },
  },
};

export const talentsPerClassPerDungeon = {
  //definir la classe
  priest: {
    //definir la spec
    Discipline: {
      //definir le donjon
      ARAK: {
        //definir la premiere option
        "1": {
          heroTalent: "Oracle",
          code: "CAQAmmmbZv0rzNjRHT4p8IjZfDDw2MmxYMYGMz2MbzMzMzMzAAAAAAAAAAAzysMbDmZGYhxMYMGLsNTzMxiBwMLYhixsMAjNsAA",
          description: "La spec le plus utilisée",
        },
        //definir la deuxieme option
        2: {
          heroTalent: "Avatar",
          code: "CAQAmmmbZv0rzNjRHT4p8IjZfDDw2MmxYMYGMz2MbzMzMzMzAAAAAAAAAAAzysMbDmZGYhxMYMGLsNTzMxiBwMLYhixsMAjNsAA",
          description: "Seconde spec un peu moins utilisée",
        },
      },
      //definir le donjon
      HOA: {
        //definir la premiere option
        "1": {
          heroTalent: "oracle",
          code: "dwadawdaw",
          description: "dwadawdaw",
        },
        //definir la deuxieme option
        2: {
          heroTalent: "oracle",
          code: "dwadawdaw",
          description: "dwadawdaw",
        },
      },
    },
  },

  //demon hunter
  demon_hunter: {
    Havoc: {
      ARAK: {
        "1": {
          heroTalent: "Shadow",
          code: "dwadawdaw",
          description: "dwadawdaw",
        },
      },
    },
    Vengeance: {
      ARAK: {
        "1": {
          heroTalent: "oracle",
          code: "dwadawdaw",
          description: "dwadawdaw",
        },
      },
    },
  },
};
