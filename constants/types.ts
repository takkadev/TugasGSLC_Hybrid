/** Model data MontirKu. Semua data statis — prototipe tanpa backend. */

export type ServiceCategory = 'oli' | 'pengecekan' | 'cuci';

export interface Service {
  id: string;
  kategori: ServiceCategory;
  nama: string;
  ringkasan: string;
  deskripsi: string;
  hargaRupiah: number;
  durasiMenit: number;
  termasuk: string[];
  ikon: 'water-outline' | 'clipboard-outline' | 'sparkles-outline';
}

export interface Branch {
  id: string;
  nama: string;
  alamat: string;
  kota: string;
  jamBuka: string;
  jamTutup: string;
}

export interface TimeSlot {
  jam: string;
  tersedia: boolean;
}
