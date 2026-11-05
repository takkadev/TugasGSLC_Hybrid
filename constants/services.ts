import type { Service } from './types';

/** Data statis katalog layanan. Tidak ada fetch, tidak ada database. */
export const SERVICES: Service[] = [
  {
    id: 'svc-oli',
    kategori: 'oli',
    nama: 'Ganti Oli Mesin',
    ringkasan: 'Oli sintetik + filter, siap dipakai 45 menit',
    deskripsi:
      'Penggantian oli mesin lengkap dengan filter oli baru. Montir memeriksa kebocoran ringan dan level cairan lain selagi mobil di atas lift.',
    hargaRupiah: 350000,
    durasiMenit: 45,
    termasuk: ['Oli mesin sintetik 4L', 'Filter oli baru', 'Pengecekan kebocoran'],
    ikon: 'water-outline',
  },
  {
    id: 'svc-cek',
    kategori: 'pengecekan',
    nama: 'Pengecekan Rutin',
    ringkasan: 'Inspeksi 20 titik, laporan tertulis',
    deskripsi:
      'Pengecekan rutin 20 titik: rem, ban, aki, lampu, cairan, dan suspensi. Hasilnya diberikan sebagai catatan tertulis dengan rekomendasi servis berikutnya.',
    hargaRupiah: 250000,
    durasiMenit: 90,
    termasuk: ['Inspeksi 20 titik', 'Laporan tertulis', 'Rekomendasi servis'],
    ikon: 'checkmark-done-outline',
  },
  {
    id: 'svc-cuci',
    kategori: 'cuci',
    nama: 'Cuci Mobil',
    ringkasan: 'Cuci + vakum interior, 30 menit',
    deskripsi:
      'Cuci eksterior dengan sabun khusus cat mobil, dilanjutkan vakum interior dan lap dashboard.',
    hargaRupiah: 50000,
    durasiMenit: 30,
    termasuk: ['Cuci eksterior', 'Vakum interior', 'Lap dashboard'],
    ikon: 'sparkles-outline',
  },
];

export function getServiceById(id: string): Service | undefined {
  return SERVICES.find((s) => s.id === id);
}
