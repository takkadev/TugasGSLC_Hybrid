/** Nilai hex yang sama dengan tailwind.config.js, untuk dipakai di tempat
 * yang tidak menerima className (misal screenOptions navigator). */
export const COLORS = {
  surface: '#18191B',
  surfaceRaised: '#222325',
  ink: '#F4F3F1',
  inkMuted: '#9A938E',
  line: '#7D828B',
  brand: '#E0512A',
  brandTint: '#3A2420',
  steel: '#1C2228',
  steelOn: '#F2F1EC',
  okText: '#5FC98A',
  okTint: '#1E332A',
  warnText: '#F0B94D',
  warnTint: '#3A311C',
  badText: '#F0695F',
  badTint: '#3A2422',
} as const;

/** Target sentuh minimum, penting untuk pengguna lanjut usia. */
export const TAP_MIN = 52;
export const FIELD_HEIGHT = 56;
