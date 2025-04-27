import { tanstackConfig } from "@tanstack/eslint-config";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";

// During the workshop this can be set to "false" in order to not
// get annoying messages due to import statements in wrong order
const enableImportRules = false;

const importRules = enableImportRules
  ? {
      "unused-imports/no-unused-imports": "error",
      "simple-import-sort/imports": "error",
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
    }
  : {};

export default [
  ...tanstackConfig,
  {
    plugins: {
      "unused-imports": unusedImports,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "react/no-unescaped-entities": "off",
      "react-hooks/exhaustive-deps": "off",
      "jsx-a11y/alt-text": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-types": "off",
      "prefer-const": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/consistent-type-imports": "off",
      "@typescript-eslint/no-unnecessary-condition": "off",
      "@typescript-eslint/method-signature-style": "off",
      "@stylistic/js/spaced-comment": "off"
      ...importRules,
    },
  },
  {
    ignores: [
      "tailwind.config.ts",
      "prettier.config.js",
      "postcss.config.js",
      "eslint.config.js",
      "src/routeTree.gen.ts"
    ],
  },
];
