import { mijnui } from "@mijn-ui/react-theme"
import { createPreset } from "fumadocs-ui/tailwind-plugin"
import animationPlugin from "tailwindcss-animate"

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./view/**/*.{ts,tsx}",
    "./registry/**/*.{ts,tsx,html}",
    "./content/**/*.{md,mdx}",

    "./node_modules/fumadocs-ui/dist/**/*.js",
    "./node_modules/@mijn-ui/**/dist/*.js",
  ],
  presets: [createPreset({ cssPrefix: "fd", addGlobalColors: false })],
  theme: {
    extend: {
      fontSize: {
        xxs: "0.625rem",
      },

      borderRadius: {
        default: "0.25rem",
      },

      transitionDuration: {
        400: "400ms",
      },
    },
  },
  plugins: [animationPlugin, mijnui({})],
}
