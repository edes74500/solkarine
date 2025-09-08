#!/usr/bin/env node
const path = require("path");

function getJestMeta() {
  const pkgPath = require.resolve("jest/package.json", { paths: [process.cwd()] });
  const pkg = require(pkgPath);
  const major = parseInt((pkg.version || "0").split(".")[0], 10) || 0;
  const binRel = (pkg.bin && pkg.bin.jest) || "bin/jest.js";
  const binAbs = path.resolve(path.dirname(pkgPath), binRel);
  return { major, binAbs };
}

const { binAbs } = getJestMeta();

// --testPathPattern(s) posés par l’extension => on les DROP,
// car tes jest.int/e2e config ont déjà un testMatch qui filtre.
const args = process.argv.slice(2);
const out = [];
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === "--testPathPattern" || a === "--testPathPatterns") {
    i++; // skip aussi la valeur
    continue;
  }
  out.push(a);
}

process.argv = [process.argv[0], "jest", ...out];
require(binAbs);
