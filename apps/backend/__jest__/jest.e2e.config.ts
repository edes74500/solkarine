// jest.config.ts
import type { Config } from "jest";
import path from "node:path";

const ROOT = path.resolve(__dirname, "..");

const config: Config = {
  rootDir: ROOT,
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  globals: {
    "ts-jest": {
      useESM: true,
      tsconfig: "tsconfig.test.json",
    },
  },
  setupFiles: ["<rootDir>/__jest__/jest.e2e.setup.ts"],
  moduleFileExtensions: ["ts", "js", "json"],
  testMatch: ["<rootDir>/__test__/**/*.e2e.test.ts"],
  transform: {
    "^.+\\.ts$": ["ts-jest", { useESM: true }],
  },
  // Configuration spécifique pour pnpm
  transformIgnorePatterns: [
    // Pattern pour la structure classique node_modules
    "node_modules/(?!@faker-js/faker)",
    // Pattern pour la structure pnpm (.pnpm)
    "node_modules/\\.pnpm/(?!@faker-js\\+faker@)",
    // Alternative pour être sûr
    "node_modules/(?!(.*\\.pnpm.*@faker-js.*|@faker-js))",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@repo/constants": "<rootDir>/../../packages/constants/src/index.ts",
    "^@repo/utils": "<rootDir>/../../packages/utils/src/index.ts",
    "^@repo/types": "<rootDir>/../../packages/types/src/index.ts",
    "^(\\.{1,2}/.*)\\.js$": "$1",
    // ➕ deep imports (utile si un fichier fait @repo/types/season.schema)
  },
  // Important pour pnpm : résolution des modules
  resolver: undefined, // Laisse Jest utiliser sa résolution par défaut
  collectCoverage: true,
  coverageDirectory: "<rootDir>/coverage",
};

export default config;
