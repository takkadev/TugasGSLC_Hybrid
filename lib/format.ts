/** Format angka rupiah tanpa library tambahan — Intl sudah tersedia di JS engine. */
export function formatRupiah(nilai: number): string {
  return `Rp${nilai.toLocaleString('id-ID')}`;
}
