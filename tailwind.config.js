module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors:{
      trasparent: 'transparent',
      current: 'currentColor',
      black: '#0a0b0c',
      darkgray: '#101113',
      brandred: '#FF0000',
      brandamber: '#f59e0b',
      brandwhite: '#f1f2f3',
      brandgray: '#AEB1B9',
      blackgray: '#1d1f22',
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('tailwind-scrollbar-hide'),
  ],
}
