/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        mopdf: {
          bright: '#FF4D4F',
          primary: '#E53935',
          crimson: '#C62828',
          deep: '#B91C1C',
          rose: '#FFF1F2',
        }
      }
    },
  },
  plugins: [],
}
