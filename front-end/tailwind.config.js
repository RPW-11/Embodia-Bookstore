/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "main": ["Poppins", "sans-serif"],
        "title": ["Libre Baskerville", "serif"]
      },
      colors: {
        "main": "#f7f6f0"
      }
    },
  },
  plugins: [],
}