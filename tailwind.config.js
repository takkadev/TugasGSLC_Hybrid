/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Krem hangat — dipakai di layar terang (register, home, detail).
        surface: { DEFAULT: '#FDF6EE', raised: '#FFFFFF', sunken: '#F3E9DC' },
        ink: { DEFAULT: '#1F1B19', muted: '#8C827B', soft: '#8C827B' },
        line: { DEFAULT: '#E5DCD3', soft: '#EFE7DD' },
        // Oranye brand.
        brand: { text: '#C94A14', DEFAULT: '#E85A1F', tint: '#FBE3D2', deep: '#C94A14' },
        // Gunmetal gelap — dipakai di layar login (dark theme) dan kartu kendaraan.
        steel: { DEFAULT: '#171412', soft: '#262220', on: '#FDF6EE' },
        ok: { text: '#3E9B5F', tint: '#E3F3E8' },
        warn: { text: '#8A5A14', tint: '#FBEBD2' },
        bad: { text: '#D14343', tint: '#FBE3E3' },
      },
      fontFamily: {
        display: ['Archivo_700Bold'],
        data: ['Archivo_600SemiBold'],
        sans: ['IBMPlexSans_400Regular'],
        medium: ['IBMPlexSans_500Medium'],
        semibold: ['IBMPlexSans_600SemiBold'],
      },
      borderRadius: { card: '14px', pill: '999px' },
      spacing: { tap: '52px', field: '56px' },
    },
  },
  plugins: [],
};
