/**
 * Couleurs des classes de World of Warcraft
 * Format hexadécimal pour utilisation dans l'interface
 */

import { CLASS_COLORS } from "@repo/constants/";

/**
 * Obtient la couleur d'une classe
 * @param className Nom de la classe en anglais
 * @returns Couleur hexadécimale ou undefined si la classe n'existe pas
 */
export function getClassColor(className: string): string | undefined {
  return CLASS_COLORS[className as keyof typeof CLASS_COLORS];
}
