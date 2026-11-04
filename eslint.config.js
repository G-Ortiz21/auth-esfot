const featureSliced = require("@conarti/eslint-plugin-feature-sliced");
const expoConfig = require("eslint-config-expo/flat");
const featureSlicedConfig = featureSliced({
  layers: [
    { name: "shared", hasSlices: false },
    "entities",
    "features",
    "widgets",
    "pages",
    { name: "app", hasSlices: false },
  ],
  layersSlices: {
    allowTypeImports: false,
  },
  publicApi: {
    level: "segments",
    ignoreFiles: ["**/src/app/index.tsx"],
  },
  sortImports: false,
});

module.exports = [
  {
    ignores: ["apps/**", "dist/**", "node_modules/**"],
  },
  ...expoConfig,
  {
    ...featureSlicedConfig,
    files: ["src/**/*.{ts,tsx}"],
    settings: featureSlicedConfig.settings,
    rules: {
      ...featureSlicedConfig.rules,
      "import/no-cycle": ["error", { ignoreExternal: true }],
    },
  },
];
