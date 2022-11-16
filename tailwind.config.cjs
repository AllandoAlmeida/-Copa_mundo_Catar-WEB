/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container:{
      center: true
    },
    fontSize: {
      xs: ['12px', '16 px'],
      sm: ['14px', '18 px'],
      base: ['16px', '24 px'],
      lg: ['20px', '28 px'],
      xl:['24px', '32 px'],
      '2xl':['32px', '40 px'],
      '3xl':['48px', '56 px'],
    },
    extend: {
      colors: {
        black: '#0B0E16',
        white: '#F4F6FF',
        grey:{
          300:'#B1B4BD',
          500:'#91949D',
          700:'#696C74',
        },
        red: { 
          300: '#BB2E57',
          500:'#AF053F',
          700: '#300219',
        },
      },
    },
  },
  plugins: [],
}
