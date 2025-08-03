import { colors, styles } from "./consoleLogColors.utils";

// Ajouter en haut de votre fichier
declare const console: {
  log: (...args: any[]) => void;
  info: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
  debug: (...args: any[]) => void;
};

export const applyTimestampToLogs = () => {
  const originalConsoleLog = console.log;
  const originalConsoleInfo = console.info;
  const originalConsoleWarn = console.warn;
  const originalConsoleError = console.error;
  const originalConsoleDebug = console.debug;

  // Fonction pour formatter le timestamp
  const getTimestamp = () => {
    const now = new Date();
    return `[${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}]`;
  };

  // Fonction pour appliquer le style bright/gras à tous les arguments texte
  const applyStyleToArgs = (argsArray: any[], textColor: string) => {
    return argsArray.map((arg) => {
      if (typeof arg === "string") {
        return `${textColor}${arg}${colors.reset}`;
      }
      return arg;
    });
  };

  // Fonction pour appliquer les styles spéciaux (Redis, MongoDB, WS)
  const applySpecialStyles = (args: any[]) => {
    let styledArgs = [...args];

    if (args.length > 0 && typeof args[0] === "string") {
      // Cas spécial pour "Redis:"
      if (args[0].includes("Redis") || args[0].includes("CACHE")) {
        const parts = args[0].split("Redis");
        styledArgs[0] = parts[0] + `${colors.cyan}${styles.bright}[Redis]${colors.reset}:` + parts[1];
      }
      // Cas spécial pour "MongoDB:"
      if (args[0].includes("MongoDB")) {
        const parts = args[0].split("MongoDB");
        styledArgs[0] = parts[0] + `${colors.magenta}${styles.bright}[MongoDB]${colors.reset}:` + parts[1];
      }
      // Cas spécial pour "WS:"
      if (args[0].includes("WS")) {
        const parts = args[0].split("WS");
        styledArgs[0] = parts[0] + `${colors.green}${styles.bright}[WS]${colors.reset}:` + parts[1];
      }

      // Vérifier si le premier argument est une chaîne avec un préfixe entre crochets
      const match = args[0].match(/^(\[[\w\s-]+\]:?\s*)(.*)$/);
      if (match) {
        // Extraire le préfixe et le reste du message
        const [, prefix, rest] = match;

        // Style spécifique pour le préfixe
        const styledPrefix = `${colors.cyan}${styles.bright}${prefix}${colors.reset}`;

        // Remplacer le premier argument
        if (rest) {
          styledArgs[0] = styledPrefix + rest;
        } else {
          styledArgs[0] = styledPrefix;
        }
      }
    }

    return styledArgs;
  };

  console.log = (...args) => {
    const timestamp = getTimestamp();
    const styledArgs = applySpecialStyles(args);
    originalConsoleLog(timestamp, ...styledArgs);
  };

  console.info = (...args) => {
    const timestamp = `${getTimestamp()}${colors.reset}`;
    const tag = `${colors.green}${styles.bright}[INFO]${colors.reset}`;
    const styledArgs = applySpecialStyles(args);
    originalConsoleInfo(timestamp, tag, ...styledArgs);
  };

  console.warn = (...args) => {
    const timestamp = `${styles.bright}${getTimestamp()}${colors.reset}`;
    const tag = `${colors.yellow}${styles.bright}[WARN]${colors.reset}`;
    let styledArgs = applySpecialStyles(args);
    styledArgs = applyStyleToArgs(styledArgs, colors.yellow);
    originalConsoleWarn(timestamp, tag, ...styledArgs);
  };

  console.error = (...args) => {
    const timestamp = `${styles.bright}${getTimestamp()}${colors.reset}`;
    const tag = `${colors.red}${styles.bright}[ERROR]${colors.reset}`;
    let styledArgs = applySpecialStyles(args);
    styledArgs = applyStyleToArgs(styledArgs, colors.red);
    originalConsoleError(timestamp, tag, ...styledArgs);
  };

  console.debug = (...args) => {
    const timestamp = `${styles.bright}${getTimestamp()}${colors.reset}`;
    const tag = `${colors.blue}${styles.bright}[DEBUG]${colors.reset}`;
    let styledArgs = applySpecialStyles(args);
    styledArgs = applyStyleToArgs(styledArgs, colors.blue);
    originalConsoleDebug(timestamp, tag, ...styledArgs);
  };
};
