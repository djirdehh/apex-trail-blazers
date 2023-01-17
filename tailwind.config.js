/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      black: "#181817",
      white: "#FFFFFF",
      orange: "#FE1B06",
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
