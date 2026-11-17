import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core Branding
        primary: {
          DEFAULT: "#3e6b2b",
          50: "#f4f7f2",
          100: "#e6ede1",
          200: "#cfddc5",
          300: "#adc59e",
          400: "#86a873",
          500: "#658c51",
          600: "#4e723c",
          700: "#3e6b2b", // Main primary
          800: "#324925",
          900: "#2a3d20",
          950: "#14210e",
        },
        secondary: {
          DEFAULT: "#F2B632",
          50: "#fef9ee",
          100: "#fdf1d3",
          200: "#fbe2a6",
          300: "#f7cf70",
          400: "#F2B632", // Main secondary
          500: "#d99719",
          600: "#bb7712",
          700: "#945513",
          800: "#794416",
          900: "#673817",
        },
        // Specified theme accents
        luminous: {
          orange: "#ff6900",
          amber: "#fcb900",
        },
        coral: {
          DEFAULT: "#ff6b6b",
          gradient: "linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)",
          light: "#ff8a73",
          dark: "#e85959",
        },
        brand: {
          "light-cyan": "#7bdcb5",
          "vivid-cyan": "#00d084",
          "bluish-gray": "#abb8c3",
        },
        // Healthcare clinical accents
        clinical: {
          slate: "#0f172a",
          card: "#ffffff",
          subtle: "#f8fafc",
          border: "#e2e8f0",
        },
      },
      fontFamily: {
        sans: ["var(--font-roboto)", "'Roboto'", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        roboto: ["var(--font-roboto)", "'Roboto'", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)",
        premium: "0 10px 30px -10px rgba(62, 107, 43, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.03)",
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
        dropdown: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [],
};
export default config;
