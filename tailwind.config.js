/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0effe',
          500: '#2563eb',
          600: '#1d4ed8',
          700: '#1e40af',
          800: '#1e3a8a',
          900: '#0f172a'
        },
        academic: {
          gold: '#d97706',
          navy: '#0f172a',
          blue: '#1e3a8a',
          emerald: '#059669'
        }
      }
    },
  },
  plugins: [],
}
