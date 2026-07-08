/** @type {import('tailwindcss').Config} */

module.exports = {

  content: [

    "./app/**/*.{js,ts,jsx,tsx}",

    "./pages/**/*.{js,ts,jsx,tsx}",

    "./components/**/*.{js,ts,jsx,tsx}",

  ],

  theme: {
    extend: {
      colors: {
        "luxury-black": "#070707",
        "luxury-dark-gray": "#141414",
        "luxury-silver": "#b8b8b8",
        "luxury-metallic-red": "#b91c1c",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
        display: ["var(--font-playfair)", "serif"],
      },
    },
  },

  plugins: [],

};

