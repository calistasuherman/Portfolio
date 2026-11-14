import type { Config } from "tailwindcss";

const helvetica = ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"];

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#fafafa",
        "red-deep": "#efefef",
        "red-mid": "#d9d9d9",
        "red-accent": "#161616",
        "text-primary": "#161616",
        "text-muted": "#5f5f5f",
      },
      fontFamily: {
        serif: helvetica,
        sans: helvetica,
        melodrama: helvetica,
        inter: helvetica,
      },
    },
  },
  plugins: [],
};
export default config;
