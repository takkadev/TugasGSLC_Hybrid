import type { Branch, TimeSlot } from './types';

export const BRANCHES: Branch[] = [
  {
    id: 'br-semarang',
    nama: 'MontirKu Semarang',
    alamat: 'Jl. Pemuda No. 12',
    kota: 'Semarang',
    jamBuka: '08:00',
    jamTutup: '17:00',
  },
  {
    id: 'br-jakarta',
    nama: 'MontirKu Jakarta Selatan',
    alamat: 'Jl. Fatmawati No. 45',
    kota: 'Jakarta',
    jamBuka: '08:00',
    jamTutup: '18:00',
  },
];

/** Slot jam statis per cabang. Dummy — bukan hasil query database. */
export const TIME_SLOTS: TimeSlot[] = [
  { jam: '09:00', tersedia: true },
  { jam: '10:00', tersedia: true },
  { jam: '11:00', tersedia: false },
  { jam: '13:00', tersedia: true },
  { jam: '14:00', tersedia: true },
  { jam: '15:00', tersedia: false },
  { jam: '16:00', tersedia: true },
];
