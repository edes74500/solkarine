/**
 * Couleurs des classes de World of Warcraft
 * Format hexadécimal pour utilisation dans l'interface
 */
export const classColors = {
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
};

/**
 * Obtient la couleur d'une classe
 * @param className Nom de la classe en anglais
 * @returns Couleur hexadécimale ou undefined si la classe n'existe pas
 */
export function getClassColor(className: string): string | undefined {
  return classColors[className as keyof typeof classColors];
}
