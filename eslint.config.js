import { defineFlatConfig } from "eslint-define-config";

import {
  eslintJavascriptConfig,
  eslintTSXConfig,
  eslintTypescriptConfig,
} from "./tools/eslint/index.js";

export default defineFlatConfig([
  { ignores: ["**/dist/**", "**/node_modules/**"] },
  {
    ...eslintJavascriptConfig,
    files: ["**/*.js"],
  },
  {
    ...eslintTypescriptConfig,
    files: ["**/*.ts", "**/*.d.ts"],
  },
  {
    ...eslintTSXConfig,
    files: ["**/*.tsx"],
  },
]);
