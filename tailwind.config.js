/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Dark theme di seluruh app — sesuai identitas automotive/gunmetal.
        // surface = permukaan utama (bg app), raised = kartu, sunken = input/divider.
        surface: { DEFAULT: '#18191B', raised: '#222325', sunken: '#2B2D30' },
        // ink = teks. Kontras diukur: ink/surface ~15.8:1, ink-muted/surface ~5.9:1 (lolos WCAG AA).
        ink: { DEFAULT: '#F4F3F1', muted: '#9A938E', soft: '#6F6A66' },
        line: { DEFAULT: '#7D828B', soft: '#3A3D42' },
        // Oranye brand — satu-satunya aksen, dipakai di CTA/harga/status aktif saja.
        brand: { text: '#FF7A45', DEFAULT: '#E0512A', tint: '#3A2420', deep: '#B8431F' },
        ok: { text: '#5FC98A', tint: '#1E332A' },
        warn: { text: '#F0B94D', tint: '#3A311C' },
        bad: { text: '#F0695F', tint: '#3A2422' },
      },
      fontFamily: {
        display: ['Archivo_700Bold'],
        data: ['Archivo_600SemiBold'],
        sans: ['IBMPlexSans_400Regular'],
        medium: ['IBMPlexSans_500Medium'],
        semibold: ['IBMPlexSans_600SemiBold'],
      },
      fontSize: {
        data: ['40px', { lineHeight: '44px', letterSpacing: '-1px' }],
        'data-s': ['24px', { lineHeight: '28px' }],
        display: ['28px', { lineHeight: '34px' }],
        title: ['20px', { lineHeight: '26px' }],
        body: ['16px', { lineHeight: '24px' }],
        'body-s': ['14px', { lineHeight: '20px' }],
        label: ['11px', { lineHeight: '14px', letterSpacing: '0.8px' }],
      },
      borderRadius: { card: '14px', pill: '999px' },
      spacing: { tap: '52px', field: '56px' },
    },
  },
  plugins: [],
};
