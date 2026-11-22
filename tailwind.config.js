/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: "#F8F8F4",
          50: "#FCFCFA",
          100: "#F8F8F4",
          200: "#F0EFE8",
          300: "#E6E5DC",
        },
        charcoal: {
          DEFAULT: "#171A18",
          50: "#363C38",
          100: "#2B302D",
          200: "#232724",
          800: "#1D211F",
          900: "#171A18",
          950: "#0F1110",
        },
        lime: {
          DEFAULT: "#C8F169",
          hover: "#B5DE52",
          light: "#E3F9A6",
          dark: "#98BE33",
        },
        muted: {
          DEFAULT: "#747A75",
          dark: "#545955",
          light: "#9CA19D",
        },
        surface: "#FFFFFF",
        borderNeutral: "#E6E6DF",
      },
      fontFamily: {
        sans: [
          "Plus Jakarta Sans",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)",
        card: "0 2px 8px -2px rgba(23, 26, 24, 0.06), 0 1px 3px -1px rgba(23, 26, 24, 0.04)",
        dropdown: "0 10px 30px -5px rgba(23, 26, 24, 0.12), 0 4px 6px -2px rgba(23, 26, 24, 0.04)",
        drawer: "-8px 0 30px rgba(0, 0, 0, 0.12)",
      },
      borderRadius: {
        brand: "8px",
        'brand-lg': "12px",
        'brand-xl': "16px",
      }
    },
  },
  plugins: [],
}
