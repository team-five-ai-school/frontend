import pluginQuery from "@tanstack/eslint-plugin-query";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/**
 * Anti-slop guard: UI colors must come from theme tokens (bg-primary, text-muted-foreground, …),
 * defined once in src/app/globals.css. These patterns fail lint in app code:
 * - Tailwind palette colors:   bg-blue-500, text-zinc-400, from-purple-600, ring-red-500/50
 * - Gradients:                 bg-gradient-to-r, bg-linear-to-r, bg-radial, bg-conic
 * - Arbitrary hex colors:      bg-[#7c3aed], text-[#fff]
 */
const PALETTE =
  "(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)";
const UTILITY =
  "(?:bg|text|border|ring|outline|fill|stroke|from|via|to|shadow|decoration|divide|placeholder|accent|caret)";
const RAW_COLOR = `/(^|\\s|:)${UTILITY}-${PALETTE}-\\d{2,3}/`;
const GRADIENT = "/(^|\\s|:)bg-(gradient-to|linear-to|radial|conic)/";
const HEX = "/-\\[#[0-9a-fA-F]{3,8}\\]/";

const colorRule = (selector, message) => [
  { selector: `Literal[value=${selector}]`, message },
  { selector: `TemplateElement[value.raw=${selector}]`, message },
];

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  ...pluginQuery.configs["flat/recommended"],
  {
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/components/ui/**"],
    rules: {
      "no-restricted-syntax": [
        "error",
        ...colorRule(
          RAW_COLOR,
          "Use theme tokens (bg-primary, text-muted-foreground…) instead of palette colors.",
        ),
        ...colorRule(GRADIENT, "No decorative gradients. See AGENTS.md → UI rules."),
        ...colorRule(HEX, "No arbitrary hex colors. Add a token in globals.css instead."),
      ],
      "no-restricted-imports": [
        "error",
        { paths: [{ name: "cn", message: 'Import cn from "@/lib/utils".' }] },
      ],
    },
  },
  {
    // The re-export itself.
    files: ["src/lib/utils.ts"],
    rules: { "no-restricted-imports": "off" },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", ".claude/**", ".agents/**"]),
]);

export default eslintConfig;
