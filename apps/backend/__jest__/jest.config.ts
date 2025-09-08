import type { Config } from "jest";
import path from "node:path";
import e2eConfig from "./jest.e2e.config";
import intConfig from "./jest.int.config";

const ROOT = path.resolve(__dirname, "..");

const config: Config = {
  projects: [
    {
      ...intConfig,
      displayName: "int",
    },
    {
      ...e2eConfig,
      displayName: "e2e",
    },
  ],
};

export default config;
