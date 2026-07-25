import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0c",
        "bg-alt": "#101014",
        panel: "#15151b",
        steel: {
          DEFAULT: "#9a9aa6",
          dim: "#4a4a54",
        },
        purple: {
          DEFAULT: "#8b5cf6",
          dim: "#4c2a8f",
        },
        ink: {
          DEFAULT: "#e9e9ee",
          dim: "#86868f",
        },
      },
      fontFamily: {
        display: ["Orbitron", "sans-serif"],
        mono: ["'Share Tech Mono'", "'JetBrains Mono'", "monospace"],
        ui: ["Rajdhani", "sans-serif"],
      },
      fontSize: {
        // Site-wide text was hard to read, so every step of the scale is
        // bumped ~30% larger than Tailwind's defaults (both the font size and
        // its paired line-height).
        xs: ["0.975rem", { lineHeight: "1.3rem" }],
        sm: ["1.1375rem", { lineHeight: "1.625rem" }],
        base: ["1.3rem", { lineHeight: "1.95rem" }],
        lg: ["1.4625rem", { lineHeight: "2.275rem" }],
        xl: ["1.625rem", { lineHeight: "2.275rem" }],
        "2xl": ["1.95rem", { lineHeight: "2.6rem" }],
        "3xl": ["2.4375rem", { lineHeight: "2.925rem" }],
      },
    },
  },
  plugins: [],
};

export default config;
