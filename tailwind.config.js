/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Putih hangat, bukan putih murni. Mengurangi silau untuk pengguna lanjut usia.
        surface: { DEFAULT: '#F2F1EC', raised: '#FDFBF7', sunken: '#EDE7DC' },
        ink: { DEFAULT: '#1B211F', muted: '#484F4C', soft: '#6B7470' },
        line: { DEFAULT: '#C2B6A0', soft: '#D6CDBA' },
        // Oranye oksida, bukan biru — sensitivitas mata ke biru menurun seiring usia.
        brand: { text: '#82290D', DEFAULT: '#A8390F', tint: '#FBE8DF', deep: '#6E2409' },
        // Gunmetal untuk header/chrome.
        steel: { DEFAULT: '#1C2228', on: '#F2F1EC', soft: '#AEB6BC' },
        ok: { text: '#135236', tint: '#E3EFE4' },
        warn: { text: '#634004', tint: '#FBF0D8' },
        bad: { text: '#8E1E14', tint: '#FAE5E1' },
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
