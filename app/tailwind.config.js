/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Neon purple palette
        'neon-purple': {
          100: '#f5f0ff',
          200: '#e9d9ff',
          300: '#d3b3ff',
          400: '#b980ff',
          500: '#9d4eff',
          600: '#8a20ff',
          700: '#7700e6',
          800: '#5c00b3',
          900: '#3d0080',
        },
        // Neon green palette
        'neon-green': {
          100: '#f0fff4',
          200: '#dcffe6',
          300: '#b3ffcc',
          400: '#80ffaa',
          500: '#4dff88',
          600: '#20ff66',
          700: '#00e64d',
          800: '#00b33c',
          900: '#008029',
        },
        // Dark background colors
        'dark': {
          100: '#3a3a3a',
          200: '#303030',
          300: '#282828',
          400: '#202020',
          500: '#181818',
          600: '#121212',
          700: '#0a0a0a',
          800: '#050505',
          900: '#000000',
        }
      },
      fontFamily: {
        sans: ['System', 'sans-serif'],
        mono: ['Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
}
