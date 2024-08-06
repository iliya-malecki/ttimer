/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src//*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'bg-switch': {
          '0%': { backgroundColor: 'transparent' },
          '100%': { backgroundColor: '#86efac' }, // green-300
        },
      },
      animation: {
        'bg-switch': 'bg-switch 0.5s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
}
