/* eslint-disable no-underscore-dangle */
// Definations
import { builtinModules, createRequire } from "node:module";
import globals from "globals";
import { defineFlatConfig } from "eslint-define-config";
import { dirname } from "path";
import { fileURLToPath } from "url";
// Plugins
import importPlugin from "eslint-plugin-import";
import javascriptPlugin from "@eslint/js";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import nPlugin from "eslint-plugin-n";
import promisePlugin from "eslint-plugin-promise";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactPlugin from "eslint-plugin-react";
import reactRefreshPlugin from "eslint-plugin-react-refresh";
import regexpPlugin from "eslint-plugin-regexp";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import sonarjsPlugin from "eslint-plugin-sonarjs";
import sortKeysPlugin from "eslint-plugin-sort-keys";
import testingLibraryPlugin from "eslint-plugin-testing-library";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import unicornPlugin from "eslint-plugin-unicorn";
import vitestPlugin from "eslint-plugin-vitest";
// Parsers
import javascriptParser from "@babel/eslint-parser";
import typescriptParser from "@typescript-eslint/parser";

/*
 * Package needs require -> assert { type: "object" }
 * Not supported currently (as far as I know).
 */
const pkg = createRequire(import.meta.url)("./package.json");
const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * @typedef {{
 *   "cypress": import("eslint-plugin-cypress"),
 *   "import": import("eslint-plugin-import"),
 *   "javascript": import("@eslint/js"),
 *   "jsx-a11y": import("eslint-plugin-jsx-a11y"),
 *   "mocha": import("eslint-plugin-mocha"),
 *   "n": import("eslint-plugin-n"),
 *   "promise": import("eslint-plugin-promise"),
 *   "react": import("eslint-plugin-react"),
 *   "react-hooks": import("eslint-plugin-react-hooks"),
 *   "react-refresh": import("eslint-plugin-react-refresh"),
 *   "regexp": import("eslint-plugin-regexp"),
 *   "simple-import-sort": import("eslint-plugin-simple-import-sort"),
 *   "sonarjs": import("eslint-plugin-sonarjs"),
 *   "sort-keys": import("eslint-plugin-sort-keys"),
 *   "testing-library": import("eslint-plugin-testing-library"),
 *   "unicorn": import("eslint-plugin-unicorn"),
 *   "vitest": import("eslint-plugin-vitest"),
 * }} Plugins
 */

const commonRules = {
  ...typescriptPlugin.configs.all.rules,
  ...importPlugin.configs.recommended.rules,
  ...javascriptPlugin.configs.all.rules,
  ...promisePlugin.configs.recommended.rules,
  ...regexpPlugin.configs.all.rules,
  ...sonarjsPlugin.configs.recommended.rules,
  ...unicornPlugin.configs.all.rules,
  "@typescript-eslint/array-type": ["off"],
  "@typescript-eslint/ban-ts-comment": ["off"],
  "@typescript-eslint/ban-tslint-comment": ["off"],
  "@typescript-eslint/ban-types": ["off"],
  "@typescript-eslint/class-methods-use-this": ["off"],
  "@typescript-eslint/comma-dangle": ["off"],
  "@typescript-eslint/consistent-generic-constructors": ["off"],
  "@typescript-eslint/consistent-indexed-object-style": ["off"],
  "@typescript-eslint/consistent-type-definitions": ["off"],
  "@typescript-eslint/consistent-type-exports": ["off"],
  "@typescript-eslint/consistent-type-imports": [
    "error",
    { disallowTypeAnnotations: false, prefer: "type-imports" },
  ],
  "@typescript-eslint/explicit-function-return-type": ["off"],
  "@typescript-eslint/explicit-module-boundary-types": ["off"],
  "@typescript-eslint/indent": [
    "off",
    2,
    {
      ArrayExpression: "off",
      CallExpression: "off",
      FunctionDeclaration: "off",
      FunctionExpression: "off",
      ImportDeclaration: "off",
      StaticBlock: "off",
      SwitchCase: 1,
      VariableDeclarator: "off",
      flatTernaryExpressions: "off",
    },
  ],
  "@typescript-eslint/lines-around-comment": ["off"],
  "@typescript-eslint/lines-between-class-members": ["off"],
  "@typescript-eslint/max-params": ["off"],
  "@typescript-eslint/member-ordering": ["off"],
  "@typescript-eslint/naming-convention": ["off"],
  "@typescript-eslint/no-confusing-void-expression": ["off"],
  "@typescript-eslint/no-empty-function": [
    "error",
    {
      allow: ["arrowFunctions", "constructors"],
    },
  ],
  "@typescript-eslint/no-empty-interface": ["off"],
  "@typescript-eslint/no-explicit-any": ["off"],
  "@typescript-eslint/no-extra-semi": ["off"],
  "@typescript-eslint/no-extraneous-class": ["off"],
  "@typescript-eslint/no-floating-promises": ["off"],
  "@typescript-eslint/no-inferrable-types": ["off"],
  "@typescript-eslint/no-magic-numbers": ["off"],
  "@typescript-eslint/no-misused-promises": ["off"],
  "@typescript-eslint/no-namespace": ["off"],
  "@typescript-eslint/no-redundant-type-constituents": ["off"],
  "@typescript-eslint/no-shadow": ["off"],
  "@typescript-eslint/no-throw-literal": ["off"],
  "@typescript-eslint/no-type-alias": ["off"],
  "@typescript-eslint/no-unnecessary-boolean-literal-compare": ["off"],
  "@typescript-eslint/no-unnecessary-condition": ["off"],
  "@typescript-eslint/no-unsafe-argument": ["off"],
  "@typescript-eslint/no-unsafe-assignment": ["off"],
  "@typescript-eslint/no-unsafe-call": ["off"],
  "@typescript-eslint/no-unsafe-member-access": ["off"],
  "@typescript-eslint/no-unsafe-return": ["off"],
  "@typescript-eslint/no-unused-expressions": ["off"],
  "@typescript-eslint/no-unused-vars": ["off"],
  "@typescript-eslint/no-useless-constructor": ["off"],
  "@typescript-eslint/no-useless-empty-export": ["off"],
  "@typescript-eslint/no-var-requires": "off",
  "@typescript-eslint/non-nullable-type-assertion-style": ["off"],
  "@typescript-eslint/object-curly-spacing": ["off"],
  "@typescript-eslint/prefer-destructuring": ["off"],
  "@typescript-eslint/prefer-enum-initializers": ["off"],
  "@typescript-eslint/prefer-for-of": ["off"],
  "@typescript-eslint/prefer-function-type": ["off"],
  "@typescript-eslint/prefer-namespace-keyword": ["off"],
  "@typescript-eslint/prefer-readonly": ["off"],
  "@typescript-eslint/prefer-readonly-parameter-types": ["off"],
  "@typescript-eslint/require-await": ["off"],
  "@typescript-eslint/restrict-template-expressions": ["off"],
  "@typescript-eslint/sort-type-constituents": ["off"],
  "@typescript-eslint/space-before-function-paren": ["off"],
  "@typescript-eslint/strict-boolean-expressions": ["off"],
  "@typescript-eslint/unbound-method": ["off"],
  "accessor-pairs": ["error"],
  "array-callback-return": ["off"],
  "arrow-body-style": ["off"],
  "block-scoped-var": ["error"],
  "capitalized-comments": ["off"],
  "class-methods-use-this": ["off"],
  complexity: ["off"],
  "consistent-return": ["off"],
  curly: ["off"],
  "default-case": ["error"],
  "dot-notation": ["off"],
  eqeqeq: ["error", "always", { null: "always" }],
  "func-names": ["off"],
  "func-style": ["off"],
  "guard-for-in": ["error"],
  "id-length": ["off"],
  "import/default": ["off"],
  "import/extensions": ["off"],
  "import/first": ["error"],
  "import/named": ["off"],
  "import/namespace": [
    "off",
    {
      allowComputed: true,
    },
  ],
  "import/newline-after-import": ["error"],
  "import/no-duplicates": ["error"],
  "import/no-extraneous-dependencies": ["error"],
  "import/no-named-as-default": ["off"],
  "import/no-named-as-default-member": ["off"],
  "import/no-nodejs-modules": [
    "error",
    { allow: builtinModules.map((mod) => `node:${mod}`) },
  ],
  "import/no-unresolved": ["error"],
  "import/order": ["error"],
  "import/prefer-default-export": ["off"],
  indent: [
    "error",
    2,
    {
      SwitchCase: 1,
    },
  ],
  "line-comment-position": ["off"],
  "linebreak-style": ["error", "unix"],
  "max-depth": ["error"],
  "max-len": [
    "error",
    {
      code: 80,
      comments: 80,
      ignoreComments: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreUrls: true,
      tabWidth: 2,
    },
  ],
  "max-lines": ["off"],
  "max-lines-per-function": ["off"],
  "max-param-count": ["off"],
  "max-params": ["off"],
  "max-statements": ["off"],
  "multiline-comment-style": ["off"],
  "n/no-deprecated-api": "off",
  "n/no-extraneous-import": [
    "error",
    {
      allowModules: ["less", "pnpapi", "sass", "unbuild", "vite", "vitest"],
    },
  ],
  "n/no-extraneous-require": [
    "error",
    {
      allowModules: ["less", "pnpapi", "sass", "unbuild", "vite", "vitest"],
    },
  ],
  "n/no-missing-import": [
    "off",
    {
      allowModules: ["less", "pnpapi", "sass", "unbuild", "vite", "vitest"],
      tryExtensions: [".ts", ".js", ".jsx", ".tsx", ".d.ts"],
    },
  ],
  "n/no-missing-require": [
    "error",
    {
      allowModules: ["less", "pnpapi", "sass", "unbuild", "vite", "vitest"],
      tryExtensions: [".ts", ".js", ".jsx", ".tsx", ".d.ts"],
    },
  ],
  "n/no-process-exit": ["off"],
  "n/no-restricted-require": [
    "error",
    Object.keys(pkg.devDependencies).map((d) => ({
      message: `devDependencies can only be imported using ESM syntax`,
      name: d,
    })),
  ],
  "n/no-unpublished-import": ["off"],
  "n/no-unpublished-require": ["off"],
  "n/no-unsupported-features/es-syntax": ["off"],
  "new-cap": ["off"],
  "no-alert": ["error"],
  "no-caller": ["error"],
  "no-console": [
    "error",
    {
      allow: [
        "assert",
        "clear",
        "countReset",
        "debug",
        "dir",
        "dirxml",
        "error",
        "group",
        "groupCollapsed",
        "groupEnd",
        "info",
        "log",
        "profile",
        "profileEnd",
        "table",
        "time",
        "timeEnd",
        "timeLog",
        "timeStamp",
        "trace",
        "warn",
      ],
    },
  ],
  "no-constant-condition": ["off"],
  "no-continue": ["error"],
  "no-debugger": ["error"],
  "no-div-regex": ["error"],
  "no-duplicate-imports": ["off"],
  "no-else-return": ["error"],
  "no-empty": [
    "error",
    {
      allowEmptyCatch: true,
    },
  ],
  "no-empty-function": [
    "error",
    {
      allow: ["arrowFunctions", "constructors"],
    },
  ],
  "no-empty-pattern": ["off"],
  "no-eq-null": ["off"],
  "no-eval": ["error"],
  "no-extend-native": ["error"],
  "no-extra-bind": ["error"],
  "no-extra-label": ["error"],
  "no-extra-semi": ["off"],
  "no-floating-decimal": ["error"],
  "no-global-assign": ["error"],
  "no-implicit-coercion": ["error"],
  "no-implicit-globals": ["error"],
  "no-implied-eval": ["error"],
  "no-inline-comments": ["off"],
  "no-invalid-this": ["error"],
  "no-iterator": ["error"],
  "no-labels": ["error"],
  "no-lone-blocks": ["error"],
  "no-lonely-if": ["error"],
  "no-loop-func": ["error"],
  "no-magic-numbers": ["off"],
  "no-multi-spaces": ["error"],
  "no-multi-str": ["error"],
  "no-new": ["off"],
  "no-new-func": ["error"],
  "no-new-wrappers": ["error"],
  "no-octal-escape": ["error"],
  "no-param-reassign": ["error"],
  "no-plusplus": ["off"],
  "no-process-exit": "off",
  "no-promise-executor-return": ["off"],
  "no-proto": ["error"],
  "no-return-assign": ["error"],
  "no-return-await": ["error"],
  "no-script-url": ["error"],
  "no-self-compare": ["error"],
  "no-sequences": ["error"],
  "no-shadow": ["off"],
  "no-template-curly-in-string": ["error"],
  "no-ternary": ["off"],
  "no-undef": ["off"],
  "no-undefined": ["off"],
  "no-underscore-dangle": ["off"],
  "no-unused-expressions": ["error"],
  "no-unused-vars": ["off"],
  "no-use-before-define": ["off"],
  "no-useless-concat": ["off"],
  "no-useless-constructor": ["off"],
  "no-useless-escape": "off",
  "no-warning-comments": ["off"],
  "one-var": ["off"],
  "prefer-const": [
    "error",
    {
      destructuring: "all",
    },
  ],
  quotes: ["error", "double"],
  radix: ["error"],
  "regexp/no-contradiction-with-assertion": ["error"],
  "regexp/require-unicode-sets-regexp": ["off"],
  "regexp/use-ignore-case": ["off"],
  "require-await": ["off"],
  semi: ["error", "always"],
  "simple-import-sort/exports": ["error"],
  "simple-import-sort/imports": ["error"],
  "sonarjs/cognitive-complexity": ["off"],
  "sonarjs/no-duplicate-string": ["off"],
  "sonarjs/no-empty-collection": ["error"],
  "sonarjs/no-nested-template-literals": ["off"],
  "sonarjs/no-redundant-jump": ["error"],
  "sonarjs/prefer-immediate-return": ["error"],
  "sort-imports": ["off"],
  "sort-keys": ["off"],
  "sort-keys/sort-keys-fix": ["error"],
  "spaced-comment": ["off"],
  strict: ["error"],
  "unicorn/consistent-function-scoping": ["off"],
  "unicorn/error-message": ["error"],
  "unicorn/filename-case": ["off"],
  "unicorn/import-style": ["off"],
  "unicorn/no-abusive-eslint-disable": ["off"],
  "unicorn/no-array-callback-reference": ["off"],
  "unicorn/no-array-method-this-argument": ["off"],
  "unicorn/no-array-reduce": ["error"],
  "unicorn/no-empty-file": ["off"],
  "unicorn/no-keyword-prefix": ["off"],
  "unicorn/no-negated-condition": ["error"],
  "unicorn/no-null": ["off"],
  "unicorn/no-useless-undefined": ["off"],
  "unicorn/prefer-at": ["error"],
  "unicorn/prefer-dom-node-dataset": ["error"],
  "unicorn/prefer-event-target": ["error"],
  "unicorn/prefer-number-properties": ["error"],
  "unicorn/prefer-query-selector": ["off"],
  "unicorn/prefer-spread": ["error"],
  "unicorn/prefer-ternary": ["error"],
  "unicorn/prefer-top-level-await": ["error"],
  "unicorn/prevent-abbreviations": ["off"],
};
const backendConfig = defineFlatConfig([
  {
    files: [
      "projects/backend/src/**/*.ts",
      "projects/backend/tsup.config.ts",
      "projects/backend/types/**/*.ts",
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.es2020,
        ...globals.node,
      },
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2020,
        parser: typescriptParser,
        project: ["./projects/backend/src/tsconfig.json"],
        sourceType: "module",
        tsconfigRootDir: __dirname,
      },
      sourceType: "module",
    },
    linterOptions: {
      noInlineConfig: false,
      reportUnusedDisableDirectives: true,
    },
    /** @type {Plugins} */
    plugins: {
      "@typescript-eslint": typescriptPlugin,
      import: importPlugin,
      n: nPlugin,
      promise: promisePlugin,
      regexp: regexpPlugin,
      "simple-import-sort": simpleImportSort,
      sonarjs: sonarjsPlugin,
      "sort-keys": sortKeysPlugin,
      unicorn: unicornPlugin,
    },
    rules: {
      ...commonRules,
      "@typescript-eslint/init-declarations": ["off"],
      "init-declarations": ["off"],
      "prefer-promise-reject-errors": ["off"],
    },
    settings: {
      "import/parsers": {
        "@typescript-eslint/parser": [
          ".cts",
          ".d.cts",
          ".d.mts",
          ".d.ts",
          ".mts",
          ".ts",
          ".tsx",
        ],
      },
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
        typescript: {
          alwaysTryTypes: true,
          project: ["./projects/backend/src/tsconfig.json"],
        },
      },
      react: {
        version: "detect",
      },
    },
  },
]);

const backendTestingConfig = defineFlatConfig([
  {
    files: [
      "projects/backend/tests/**/*.ts",
      "projects/backend/vitest.config.ts",
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.es2020,
        ...globals.node,
      },
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2020,
        parser: typescriptParser,
        project: ["./projects/backend/tests/tsconfig.json"],
        sourceType: "module",
        tsconfigRootDir: __dirname,
      },
      sourceType: "module",
    },
    linterOptions: {
      noInlineConfig: false,
      reportUnusedDisableDirectives: true,
    },
    /** @type {Plugins} */
    plugins: {
      "@typescript-eslint": typescriptPlugin,
      import: importPlugin,
      n: nPlugin,
      promise: promisePlugin,
      regexp: regexpPlugin,
      "simple-import-sort": simpleImportSort,
      sonarjs: sonarjsPlugin,
      "sort-keys": sortKeysPlugin,
      unicorn: unicornPlugin,
      vitest: vitestPlugin,
    },
    // @type {RulesRecord}
    rules: {
      ...commonRules,
      ...vitestPlugin.configs.all.rules,
      "vitest/max-expects": ["off"],
      "vitest/no-disabled-tests": ["off"],
    },
    settings: {
      "import/parsers": {
        "@typescript-eslint/parser": [
          ".cts",
          ".d.cts",
          ".d.mts",
          ".d.ts",
          ".mts",
          ".ts",
          ".tsx",
        ],
      },
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
        typescript: {
          alwaysTryTypes: true,
          project: ["./projects/backend/tests/tsconfig.json"],
        },
      },
      react: {
        version: "detect",
      },
    },
  },
]);

const frontendConfig = defineFlatConfig([
  {
    files: ["projects/frontend/**/*.ts", "projects/frontend/**/*.tsx"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.es2020,
        ...globals.node,
      },
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2020,
        parser: typescriptParser,
        project: [
          "./projects/frontend/tsconfig.json",
          "./projects/frontend/tsconfig.vite.json",
        ],
        sourceType: "module",
        tsconfigRootDir: __dirname,
      },
      sourceType: "module",
    },
    linterOptions: {
      noInlineConfig: false,
      reportUnusedDisableDirectives: true,
    },
    /** @type {Plugins} */
    plugins: {
      "@typescript-eslint": typescriptPlugin, // check
      import: importPlugin, // check
      "jsx-a11y": jsxA11yPlugin, // check
      n: nPlugin, // X
      promise: promisePlugin, // check
      react: reactPlugin, // check
      "react-hooks": reactHooksPlugin, // check
      "react-refresh": reactRefreshPlugin, // X
      regexp: regexpPlugin, // check
      "simple-import-sort": simpleImportSort, // X
      sonarjs: sonarjsPlugin, // X
      "sort-keys": sortKeysPlugin, // X
      "testing-library": testingLibraryPlugin, // X
      unicorn: unicornPlugin, // check
    },
    rules: {
      ...jsxA11yPlugin.configs.strict.rules,
      ...reactPlugin.configs.all.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...commonRules,
      "jsx-a11y/anchor-is-valid": [
        "error",
        {
          aspects: ["invalidHref", "preferButton"],
          components: ["Link"],
          specialLink: ["to"],
        },
      ],
      "jsx-a11y/click-events-have-key-events": ["off"],
      "jsx-a11y/media-has-caption": ["off"],
      "jsx-a11y/no-noninteractive-element-interactions": ["off"],
      "react-hooks/exhaustive-deps": ["error"],
      "react-hooks/rules-of-hooks": ["error"],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react/button-has-type": ["error"],
      "react/display-name": ["error"],
      "react/forbid-component-props": ["off"],
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "function-declaration",
          unnamedComponents: "arrow-function",
        },
      ],
      "react/jsx-curly-brace-presence": [
        "error",
        {
          children: "never",
          props: "never",
        },
      ],
      "react/jsx-filename-extension": [
        "error",
        {
          extensions: [".jsx", ".tsx"],
        },
      ],
      "react/jsx-fragments": ["error", "syntax"],
      "react/jsx-indent": [
        "error",
        2,
        {
          checkAttributes: true,
          indentLogicalExpressions: true,
        },
      ],
      "react/jsx-key": ["off"],
      "react/jsx-max-depth": [
        "error",
        {
          max: 5,
        },
      ],
      "react/jsx-max-props-per-line": ["off"],
      "react/jsx-newline": ["off"],
      "react/jsx-no-bind": ["off"],
      "react/jsx-no-duplicate-props": ["error"],
      "react/jsx-no-literals": ["off"],
      "react/jsx-no-undef": ["error"],
      "react/jsx-no-useless-fragment": ["error"],
      "react/jsx-one-expression-per-line": ["off"],
      "react/jsx-props-no-multi-spaces": ["error"],
      "react/jsx-props-no-spreading": ["error"],
      "react/jsx-sort-props": [
        "error",
        {
          callbacksLast: true,
          ignoreCase: true,
          shorthandFirst: true,
        },
      ],
      "react/jsx-tag-spacing": [
        "error",
        {
          beforeSelfClosing: "always",
        },
      ],
      "react/jsx-uses-react": ["error"],
      "react/no-array-index-key": ["off"],
      "react/no-children-prop": ["error"],
      "react/no-danger-with-children": ["error"],
      "react/no-direct-mutation-state": ["error"],
      "react/no-this-in-sfc": ["error"],
      "react/no-unescaped-entities": ["error"],
      "react/prop-types": ["off"],
      "react/react-in-jsx-scope": ["off"],
      "react/require-default-props": ["off"],
      "react/self-closing-comp": ["off"],
      "react/void-dom-elements-no-children": ["error"],
    },
    settings: {
      "import/parsers": {
        "@typescript-eslint/parser": [
          ".cts",
          ".d.cts",
          ".d.mts",
          ".d.ts",
          ".mts",
          ".ts",
          ".tsx",
        ],
      },
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
        typescript: {
          alwaysTryTypes: true,
          project: [
            "./projects/frontend/tsconfig.json",
            "./projects/frontend/tsconfig.vite.json",
          ],
        },
      },
      react: {
        version: "detect",
      },
    },
  },
]);

export default defineFlatConfig([
  ...backendConfig,
  ...backendTestingConfig,
  ...frontendConfig,
  {
    files: ["eslint.config.js"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.es2020,
        ...globals.node,
      },
      parser: javascriptParser,
      parserOptions: {
        babelOptions: {
          configFile: false,
          presets: ["@babel/preset-env"],
        },
        ecmaVersion: 2020,
        parser: javascriptParser,
        requireConfigFile: false,
        sourceType: "module",
      },
      sourceType: "module",
    },
    linterOptions: {
      noInlineConfig: false,
      reportUnusedDisableDirectives: true,
    },
    plugins: {
      "sort-keys": sortKeysPlugin,
    },
    rules: {
      ...javascriptPlugin.configs.all.rules,
      "capitalized-comments": ["off"],
      "dot-notation": ["off"],
      "id-length": ["off"],
      "line-comment-position": ["off"],
      "max-lines": ["off"],
      "multiline-comment-style": ["off"],
      "no-inline-comments": ["off"],
      "no-magic-numbers": ["off"],
      "no-unused-vars": ["off"],
      "one-var": ["off"],
      "sort-imports": ["off"],
      "sort-keys": ["off"],
      "sort-keys/sort-keys-fix": ["error"],
    },
  },
  {
    ignores: ["build", "coverage", "dist", "node_modules"],
  },
]);
