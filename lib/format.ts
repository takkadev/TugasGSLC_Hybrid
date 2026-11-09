/** Format angka rupiah tanpa library tambahan — Intl sudah tersedia di JS engine. */
export function formatRupiah(nilai: number): string {
  return `Rp${nilai.toLocaleString('id-ID')}`;
}

/** Format tanggal "YYYY-MM-DD" jadi "Selasa, 8 Nov 2026" tanpa library tambahan. */
export function formatTanggal(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  return date.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' });
}
