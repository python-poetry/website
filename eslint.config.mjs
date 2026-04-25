import js from "@eslint/js"
import babelParser from "@babel/eslint-parser"
import globals from "globals"

export default [
  {
    ignores: ["**/*.css", "**/*.svg"],
  },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 12,
      sourceType: "module",
      parser: babelParser,
      globals: {
        ...globals.browser,
      },
    },
  },
]
