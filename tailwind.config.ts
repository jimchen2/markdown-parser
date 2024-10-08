/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}", "./src/app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif"],
        serif: ["Merriweather", "ui-serif", "Georgia", "Cambria", "Times New Roman", "Times", "serif"],
        mono: ["Fira Code", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"],
        display: ["Playfair Display", "serif"],
        roboto: ["Roboto", "sans-serif"],
        source: ["Source Code Pro", "monospace"],
        calibri: ["Carlito", "Calibri", "sans-serif"], // Carlito as a web-safe alternative to Calibri
        quicksand: ["Quicksand", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
