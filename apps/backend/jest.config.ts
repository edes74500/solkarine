// jest.config.ts
import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },

  testEnvironment: "node",
  setupFiles: ["<rootDir>/jest.setup.ts"],
  // indique à Jest de gérer .ts et .js
  moduleFileExtensions: ["ts", "js", "json"],
  // patterns pour vos tests
  testMatch: ["**/__tests__/**/*.+(ts|js)", "**/?(*.)+(spec|test).+(ts|js)"],
  // utiliser ts-jest pour transformer
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  // environnement Node
  // si vous importez des alias type "@/…", gardez le même mapping que tsconfig.json
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@repo/(.*)$": "<rootDir>/../../packages/$1/src/$1",
  },
  // coverage (optionnel)
  collectCoverage: true,
  coverageDirectory: "<rootDir>/coverage",
};

export default config;
