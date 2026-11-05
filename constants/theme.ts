/** Nilai hex yang sama dengan tailwind.config.js, untuk dipakai di tempat
 * yang tidak menerima className (misal screenOptions navigator). */
export const COLORS = {
  surface: '#F2F1EC',
  surfaceRaised: '#FDFBF7',
  ink: '#1B211F',
  inkMuted: '#484F4C',
  line: '#C2B6A0',
  brand: '#A8390F',
  brandTint: '#FBE8DF',
  steel: '#1C2228',
  steelOn: '#F2F1EC',
  okText: '#135236',
  okTint: '#E3EFE4',
  warnText: '#634004',
  warnTint: '#FBF0D8',
  badText: '#8E1E14',
  badTint: '#FAE5E1',
} as const;

/** Target sentuh minimum, penting untuk pengguna lanjut usia. */
export const TAP_MIN = 52;
export const FIELD_HEIGHT = 56;
