// @ts-check
import eslint from "@eslint/js";
import vitest from "@vitest/eslint-plugin";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintPluginUnicorn from "eslint-plugin-unicorn";

// This is just an example default config for ESLint.
// You should change it to your needs following the documentation.
export default tseslint.config(
  {
    ignores: ["**/build/**", "**/tmp/**", "**/coverage/**"],
  },
  eslint.configs.recommended,
  eslintConfigPrettier,
  eslintPluginUnicorn.configs["flat/recommended"],
  {
    extends: [...tseslint.configs.recommended],

    files: ["**/*.ts", "**/*.mts"],

    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },

    rules: {
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },

    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 2020,
      sourceType: "module",

      globals: {
        ...globals.node,
      },

      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  },
  {
    files: ["eslint.config.mjs", "vitest.config.mts"],
  },
  {
    files: ["**/*.test.*"],

    plugins: {
      vitest,
    },

    rules: {
      ...vitest.configs.recommended.rules,
    },

    settings: {
      vitest: {
        typecheck: true,
      },
    },

    languageOptions: {
      globals: {
        ...vitest.environments.env.globals,
        ...globals.node,
      },
      parser: tseslint.parser,
      ecmaVersion: 2020,
      sourceType: "module",
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  },
);
