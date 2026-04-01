import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        huim6: {
          green: { DEFAULT: "#3D6B40", light: "#4E8A52", dark: "#2D5030" },
          red: { DEFAULT: "#9A2830", light: "#B83038", dark: "#7A1820" },
          amber: "#D4830A",
          teal: "#2A7B88",
        },
        surface: {
          bg: "#F5F6FA",
          card: "#FFFFFF",
          elevated: "#FFFFFF",
          border: "#E2E5EC",
        },
        text: {
          primary: "#1A2332",
          body: "#4A5568",
          secondary: "#8896A6",
          muted: "#A0AEC0",
        },
        conforme: "#3D6B40",
        partiel: "#D4830A",
        "non-conforme": "#9A2830",
        na: "#8896A6",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
