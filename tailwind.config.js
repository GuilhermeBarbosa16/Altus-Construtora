/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        scrollDown: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '75%': { transform: 'translateY(32px)', opacity: '0' },
          '76%': { transform: 'translateY(0)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      },
      animation: {
        'scrollDown': 'scrollDown 2s ease-in-out infinite'
      }
    },
  },
  plugins: [],
};