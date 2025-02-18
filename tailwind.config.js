/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'mono': ['Roboto Mono', 'sans-serif'],
      
    },
    extend: {},
  },
  plugins: [require('daisyui')],
}

