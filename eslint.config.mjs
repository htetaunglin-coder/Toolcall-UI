import { FlatCompat } from "@eslint/eslintrc"
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"
import tailwind from "eslint-plugin-tailwindcss"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

/** @type {import('eslint').Linter.Config[]} */
const configs = [
  {
    ignores: ["**/node_modules/*", "**/out/*", "**/.next/*", ".source", "**/coverage"],
  },
  eslintPluginPrettierRecommended,
  ...compat.extends("next/core-web-vitals"),
  ...compat.extends("next/typescript"),
  ...tailwind.configs["flat/recommended"],
  {
    settings: {
      react: {
        version: "19.0.0-rc.1",
      },
      tailwindcss: {
        config: "./tailwind.config.js",
        callees: ["clsx", "cva", "cn"],
      },
    },
  },
  {
    rules: {
      "prettier/prettier": "warn",
      "import/no-anonymous-default-export": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "tailwindcss/no-custom-classname": "off",
      "tailwindcss/enforces-negative-arbitrary-values": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
]

export default configs
