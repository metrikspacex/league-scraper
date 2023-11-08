import { builtinModules } from "node:module";
import babelParser from "@babel/eslint-parser";
import javascript from "@eslint/js";
import { defineFlatConfig } from "eslint-define-config";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import sortKeysPlugin from "eslint-plugin-sort-keys";

// TODO: "import/no-unresolved": ["off"],
const eslintJavascriptConfig = defineFlatConfig({
  languageOptions: {
    ecmaVersion: 2022,
    globals: {
      console: "readonly",
    },
    parser: babelParser,
    parserOptions: {
      babelOptions: {
        babelrc: false,
        configFile: false,
        presets: ["@babel/preset-env"],
      },
      project: "../../../configs/javascript/jsconfig.eslint.json",
      requireConfigFile: false,
    },
    sourceType: "module",
  },
  linterOptions: {
    reportUnusedDisableDirectives: true,
  },
  plugins: {
    import: importPlugin,
    prettier: prettierPlugin,
    "sort-keys": sortKeysPlugin,
  },
  rules: {
    ...javascript.configs.all.rules,
    "import/no-duplicates": "error",
    "import/no-nodejs-modules": [
      "error",
      {
        allow: builtinModules.map((module_) => `node:${module_}`),
      },
    ],
    "import/no-unresolved": ["off"],
    "import/order": [
      "error",
      {
        alphabetize: {
          caseInsensitive: true,
          order: "asc",
        },
        groups: [
          "builtin",
          "external",
          "internal",
          "sibling",
          "parent",
          "index",
        ],
        pathGroups: [
          {
            group: "internal",
            pattern: "components",
          },
          {
            group: "internal",
            pattern: "common",
          },
          {
            group: "internal",
            pattern: "routes/ **",
          },
          {
            group: "internal",
            pattern: "assets/**",
            position: "after",
          },
        ],
        pathGroupsExcludedImportTypes: ["internal"],
      },
    ],
    "import/prefer-default-export": ["off"],
    indent: ["error", 2, { SwitchCase: 1 }],
    "multiline-comment-style": ["off"],
    "no-console": ["error", { allow: ["debug", "warn", "error"] }],
    "no-magic-numbers": ["off"],
    "no-warning-comments": ["error", { location: "anywhere", terms: [] }],
    "prettier/prettier": [
      "error",
      {
        arrowParens: "always",
        bracketSameLine: true,
        bracketSpacing: true,
        endOfLine: "lf",
        htmlWhitespaceSensitivity: "strict",
        jsxSingleQuote: false,
        printWidth: 80,
        proseWrap: "always",
        quoteProps: "as-needed",
        semi: true,
        singleAttributePerLine: false,
        singleQuote: false,
        tabWidth: 2,
        trailingComma: "es5",
        useTabs: false,
      },
    ],
    semi: ["error", "always"],
    "sort-imports": [
      "error",
      {
        allowSeparatedGroups: true,
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
      },
    ],
    "sort-keys": ["off"],
    "sort-keys/sort-keys-fix": ["error"],
  },
});

export { eslintJavascriptConfig };
