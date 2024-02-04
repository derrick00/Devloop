/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
      extend: {
        fontFamily: {
          'roboto' : ['Roboto']
        },
        screens: {
          'phone': '350px',
          'tablet': '640px',
          'laptop': '1024px',
          'desktop': '1400px'
        },
        borderRadius: {
          'right-25p': '0 50% 50% 0'
        },
      },
    },

  plugins: [],
}

