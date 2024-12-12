/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0f5ff',
          100: '#e5edff',
          200: '#cddbfe',
          300: '#b4c6fc',
          400: '#8da2fb',
          500: '#6676f5',
          600: '#4f56ea',
          700: '#3b3fd1',
          800: '#2d31a6',
          900: '#252a83',
          950: '#171a54',
        },
        midnight: {
          50: '#f4f6fb',
          100: '#e8ecf5',
          200: '#cbd5e9',
          300: '#9eafd5',
          400: '#6b85bc',
          500: '#4865a3',
          600: '#384f87',
          700: '#2e406d',
          800: '#28375b',
          900: '#25314d',
          950: '#161c2e',
        },
      },
    },
  },
  plugins: [],
};