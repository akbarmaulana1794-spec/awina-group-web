/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brandRed: "#D91A2A",
        brandDark: "#0A0A0A",
        brandCard: "#141414",
        brandGray: "#1F1F1F",
      },
    },
  },
  plugins: [],
};
