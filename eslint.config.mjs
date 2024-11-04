import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {
    pluging: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      indent: ["error", 2],
      "comma-dangle": ["error", "always-multiline"],
      "eol-last": ["error", "always"],
      semi: ["error", "always"],
      "semi-style": ["error", "last"],
      "no-trailing-spaces": "error",
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
