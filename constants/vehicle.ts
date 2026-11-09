import type { Booking, Vehicle } from './types';

/** Kendaraan dummy milik pengguna. Prototipe — tidak ada CRUD/backend. */
export const VEHICLE: Vehicle = {
  id: 'veh-1',
  merek: 'Toyota',
  model: 'Avanza',
  platNomor: 'B 1234 ABC',
  odometerKm: 42500,
  kmPerHari: 1200,
};

/** Booking terdekat dummy, dipakai di Beranda. */
export const UPCOMING_BOOKING: Booking = {
  id: 'bk-1',
  serviceId: 'svc-oli',
  branchId: 'br-semarang',
  tanggal: '2026-11-08',
  jam: '09:00',
  status: 'menunggu',
  hargaRupiah: 350000,
};

/** Riwayat booking dummy, status selesai. */
export const BOOKING_HISTORY: Booking[] = [
  {
    id: 'bk-2',
    serviceId: 'svc-cuci',
    branchId: 'br-semarang',
    tanggal: '2026-10-20',
    jam: '14:00',
    status: 'selesai',
    hargaRupiah: 50000,
  },
  {
    id: 'bk-3',
    serviceId: 'svc-cek',
    branchId: 'br-semarang',
    tanggal: '2026-10-05',
    jam: '10:00',
    status: 'selesai',
    hargaRupiah: 250000,
  },
];
