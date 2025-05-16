/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto:['Roboto', 'serif'],// <weight>: Use a value from 100 to 900
        funnel:["Funnel Display", 'serif'] // <weight>: Use a value from 300 to 800
      },
      screens: {
        'below-md': {'max': '786px'}, 
        'below-lg': {'max': '1024px'}, 
        'below-xl': {'max': '1280px'} 
       },
      
    },
  },
  plugins: [],
};
