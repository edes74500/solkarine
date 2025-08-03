export const ANNOUNCES_AGES_LIST: Record<number, string> = {
  0: "3-5 ans",
  1: "6-8 ans",
  2: "9-11 ans",
  3: "12-14 ans",
  4: "15-17 ans",
  5: "Adulte",
};

export const ANNOUNCES_POSTE_LIST: Record<number, string> = {
  0: "Animateur",
  1: "Assistant(e) sanitaire",
  2: "Directeur",
  3: "Directeur adjoint",
  4: "Coordinateur",
  5: "Cuisine",
  6: "Service",
  7: "Menage",
  8: "Plonge",
  9: "Autre",
};

export const ANNOUNCES_CONTRATS_LIST: Record<number, string> = {
  0: "CDI",
  1: "CDD",
  2: "CEE",
};

export const ANNOUNCES_DIPLOMES_LIST: Record<number, string> = {
  0: "Sans Diplome",
  1: "Stagiaire BAFA",
  2: "BAFA",
  3: "Equivalence BAFA",
  4: "BAFD",
  5: "Equivalence BAFD",
  6: "BPJEPS ou +",
  7: "Autre",
};

export const ANNOUNCES_QUALIFICATIONS_LIST: Record<number, string> = {
  0: "Surveillant de baignade",
  1: "PSC1",
  2: "BAFA Voile",
  3: "BAFA Motocycle",
  4: "BAFA Canoe/kayak",
  5: "Permis B",
  6: "Autre",
};

export const ANNOUNCES_ACCUEIL_LIST: Record<number, string> = {
  0: "Classe de découverte",
  1: "Colo",
  2: "Séjour intinérant",
  3: "Séjour à l'étranger",
  4: "Accueil de loisirs",
  5: "Camping",
  6: "Séjour linguistique",
  7: "Séjour adapté",
  8: "Club vacances",
  9: "Périscolaire",
  10: "Scoutisme",
  11: "Hôtel/Club",
  12: "Autre",
} as const;

export const ANNOUNCES_SALARY_FREQUENCIES_LIST: Record<number, string> = {
  0: "Horaire",
  1: "Journalier",
  2: "Mensuel",
  3: "Contrat",
};

export const ANNOUNCES_REFRESH_DELAY = 1000 * 60 * 60 * 4; // 4 hours in milliseconds
