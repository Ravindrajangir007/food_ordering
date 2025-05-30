/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          // ... add more shades as needed
          900: '#0c4a6e',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}