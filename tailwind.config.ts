import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#f7f4ee",
        "red-deep": "#f1e7db",
        "red-mid": "#ddc9b8",
        "red-accent": "#960018",
        "text-primary": "#1c1713",
        "text-muted": "#6f655c",
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "serif"],
        sans: ["HelvLight", "var(--font-inter)", "sans-serif"],
        melodrama: ["var(--font-melodrama)", "serif"],
        inter: ["HelvLight", "var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
