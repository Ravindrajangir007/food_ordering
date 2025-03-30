/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./<custom-directory>/**/*.{js,jsx,ts,tsx}", // Add any other directories you're using
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Add this to ensure proper class generation
  important: "html",
};
