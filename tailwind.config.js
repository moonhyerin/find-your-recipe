/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    backgroundImage: {
      'landing-image': "url('./assets/main-image.jpg')",
    },
    extend: {
      fontFamily: {
        lora: ['Lora', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
