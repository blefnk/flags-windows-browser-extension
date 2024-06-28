// @ts-check

import eslint from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
// @ts-expect-error - no types
import comments from "eslint-plugin-eslint-comments";
import importX from "eslint-plugin-import-x";
// @ts-expect-error - no types
import json from "eslint-plugin-json";
// @ts-expect-error - no types
import noRelative from "eslint-plugin-no-relative-import-paths";
// @ts-expect-error - no types
import perfectionist from "eslint-plugin-perfectionist";
// @ts-expect-error - no types
import promisePlugin from "eslint-plugin-promise";
import sonarjs from "eslint-plugin-sonarjs";
// @ts-expect-error - no types
import unicorn from "eslint-plugin-unicorn";
import globals from "globals";
import { fileURLToPath } from "node:url";
import tseslint from "typescript-eslint";

// @see https://github.com/blefnk/relivator/blob/main/eslint.config.mjs
const __dirname = (/** @type {string | URL} */ file) =>
  fileURLToPath(new URL(file, import.meta.url));

// @see https://eslint.org/docs/latest/rules
export default tseslint.config(
  eslint.configs.recommended,
  {
    // @see https://eslint.org/docs/latest/use/configure/ignore#ignoring-directories
    ignores: ["**/build/", "**/dist/", "**/node_modules/"],
  },
  {
    // @see https://eslint.org/docs/latest/use/configure
    extends: [
      // @see https://typescript-eslint.io/getting-started
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      unicorn.configs["flat/recommended"],
      stylistic.configs.customize({
        commaDangle: "never",
        flat: true,
        indent: 2,
        jsx: true,
        quotes: "double",
        semi: true,
      }),
      sonarjs.configs.recommended,
    ],
    files: ["**/*.{js,ts,cjs,cts,mjs,mts,jsx,tsx,mjsx,mtsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: tseslint.parser,
      parserOptions: {
        // @see https://typescript-eslint.io/packages/parser
        ecmaFeatures: {
          impliedStrict: true,
          jsx: true,
        },
        ecmaVersion: "latest",
        env: {
          browser: true,
          es2024: true,
          node: true,
        },
        project: ["./tsconfig.json"],
        sourceType: "module",
        tsconfigRootDir: __dirname("./"),
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
    name: "Blefnk ESLint: TypeScript",
    plugins: {
      "@stylistic": stylistic,
      "@typescript-eslint": tseslint.plugin,
      "eslint-comments": comments,
      "import-x": importX,
      "no-relative-import-paths": noRelative,
      perfectionist: perfectionist,
      promise: promisePlugin,
    },
    rules: {
      ...importX.configs.recommended.rules,
      ...perfectionist.configs["recommended-natural"].rules,
      ...promisePlugin.configs.recommended.rules,
      "@stylistic/brace-style": ["error", "1tbs", { allowSingleLine: false }],
      "@stylistic/comma-dangle": [
        "error",
        {
          arrays: "always-multiline",
          enums: "always-multiline",
          exports: "always-multiline",
          functions: "always-multiline",
          generics: "always-multiline",
          imports: "always-multiline",
          objects: "always-multiline",
          tuples: "always-multiline",
        },
      ],
      "@stylistic/operator-linebreak": [
        "error",
        "after",
        {
          overrides: {
            ":": "ignore",
            "?": "ignore",
            "||": "ignore",
          },
        },
      ],
      "@stylistic/quote-props": ["error", "as-needed"],
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "import-x/no-unresolved": "off",
      "sonarjs/no-duplicate-string": "off",
    },
    settings: {
      // @see https://github.com/un-ts/eslint-plugin-import-x
      "import-x/internal-regex": "^~/",
    },
  },
  {
    ...json.configs.recommended,
    files: ["**/*.json"],
    name: "Blefnk ESLint: JSON",
    plugins: { json: json },
    processor: "json/json",
    rules: {
      // @see https://www.npmjs.com/package/eslint-plugin-json
      "json/*": ["error", { allowComments: false }],
    },
  },
);

// @see https://dev.to/favourmark05/writing-clean-code-best-practices-and-principles-3amh
// @see https://eslint.org/docs/latest/extend/custom-rules#profile-rule-performance
// @see https://gist.github.com/wojteklu/73c6914cc446146b8b533c0988cf8d29
// @see https://freecodecamp.org/news/how-to-write-clean-code
// @see https://sonarsource.com/solutions/clean-code
