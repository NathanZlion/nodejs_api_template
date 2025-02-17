import globals from "globals";
import tseslint from "typescript-eslint";


/** @type {import('eslint').Linter.Config[]} */
export default [
  { languageOptions: { globals: globals.browser } },
  {
    // acts as global ignores, due to the absence of other properties
    ignores: [".config/", "dist/", "tsconfig.json"]
  },
  ...tseslint.configs.recommended,
];