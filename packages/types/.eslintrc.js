module.exports = {
  rules: {
    "no-restricted-imports": ["error", { patterns: ["@repo/types", "@repo/types/*", "src/*"] }],
  },
};
