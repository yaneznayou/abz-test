/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,ts,jsx,tsx}',
    './components/**/*.{html,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'gray-border': '#7E7E7E',
        'gray-bg': '#f8f8f8',
        'gray-bottom': '#B4B4B4',
      },
      backgroundImage: {
        'hero-pattern': "url('/img/bg-pc.jpg')",
        'hero-pattern-md': "url('/img/bg-pc-md.jpg')",
        'hero-pattern-lg': "url('/img/bg-pc-lg.jpg')",
      },
      fontFamily: {
        nunito: ['Nunito Sans', 'sans-serif'],
      },
    }
  },
  plugins: [],
}

