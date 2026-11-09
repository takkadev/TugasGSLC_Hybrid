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

export interface Vehicle {
  id: string;
  merek: string;
  model: string;
  platNomor: string;
  odometerKm: number;
  kmPerHari: number;
}

export type BookingStatus = 'menunggu' | 'dikonfirmasi' | 'selesai' | 'dibatalkan';

export interface Booking {
  id: string;
  serviceId: string;
  branchId: string;
  tanggal: string;
  jam: string;
  status: BookingStatus;
  hargaRupiah: number;
}
