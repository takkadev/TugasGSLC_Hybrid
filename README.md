# MontirKu

Aplikasi booking servis mobil sederhana yang dibuat dengan Expo, React Native, dan Expo Router. Semua data masih statis (ditulis langsung di folder `constants/`), jadi belum ada backend, autentikasi, maupun penyimpanan data. Fokus aplikasi ini ada di struktur navigasi, komponen yang bisa dipakai ulang, dan styling dengan Tailwind (NativeWind).

## Daftar isi

- [Fitur & Layar](#fitur--layar)
- [Cara menjalankan](#cara-menjalankan)
- [Struktur folder](#struktur-folder)
- [Konsep React Native yang dipakai](#konsep-react-native-yang-dipakai)
- [Analisis kebutuhan](#analisis-kebutuhan)
- [Keterbatasan](#keterbatasan)

## Fitur & Layar

| Layar | Route | Fungsi |
|---|---|---|
| Autentikasi | `/` | Form Masuk/Daftar dengan validasi, tanpa backend |
| Beranda | `/beranda` | Kendaraan aktif, booking terdekat, daftar layanan, riwayat |
| Daftar Layanan | `/layanan` | List layanan dengan filter kategori |
| Detail Layanan | `/layanan/[id]` | Deskripsi, harga, durasi, dan apa saja yang termasuk |
| Pilih Jadwal | `/layanan/[id]/jadwal` | Pilih cabang dan slot jam, lalu konfirmasi booking |

## Cara menjalankan

```bash
npm install
npx expo start
```

Tekan `w` untuk membuka versi web, atau scan QR code dengan Expo Go di Android/iOS. Project ini memakai Expo SDK 57, jadi Expo Go di HP harus versi yang mendukung SDK 57.

```bash
npx tsc --noEmit   # typecheck
npx expo lint      # lint
```

## Struktur folder

```
app/                       # Setiap file = 1 layar (file-based routing Expo Router)
  _layout.tsx              # Root layout: font dan tema navigasi
  index.tsx                # Layar Autentikasi
  beranda.tsx              # Layar Beranda
  layanan.tsx              # Daftar Layanan
  layanan/[id].tsx         # Detail Layanan (route dinamis)
  layanan/[id]/jadwal.tsx  # Pilih Jadwal (route dinamis bertingkat)
components/                # Komponen UI yang dipakai ulang
constants/                 # Data statis (layanan, cabang, kendaraan), types, dan warna
lib/                       # Fungsi bantu (format Rupiah dan tanggal)
```

## Konsep React Native yang dipakai

Navigasi aplikasi ini memakai Expo Router. Cara kerjanya berbasis file: setiap file di folder `app/` otomatis menjadi satu layar, dan nama folder menentukan alamat route-nya. File `app/layanan/[id].tsx` memakai tanda kurung siku sebagai route dinamis, sehingga `/layanan/svc-oli` dan `/layanan/svc-cuci` ditangani oleh file yang sama. Nilai `id` diambil dengan hook `useLocalSearchParams()`. Untuk pindah layar saya memakai `router.push()`, yang menyimpan riwayat sehingga pengguna bisa kembali. Setelah login atau setelah booking dikonfirmasi saya memakai `router.replace()`, karena pengguna tidak perlu kembali ke form yang sudah selesai diisi.

Komponen di folder `components/` dibuat sebagai functional component yang menerima data lewat props. Contohnya `Button`, `ServiceCard`, dan `StatusBadge` hanya menampilkan data yang dikirim kepadanya dan tidak menyimpan state sendiri. State yang berubah karena interaksi pengguna, seperti isi form, filter kategori yang aktif, dan jam yang dipilih, disimpan dengan hook `useState` di file layar lalu dikirim ke komponen lewat props. Dengan cara ini satu komponen bisa dipakai di beberapa layar. Misalnya `ServiceCard` muncul di Beranda dan di Daftar Layanan.

Styling memakai NativeWind, yaitu Tailwind CSS untuk React Native. Class seperti `rounded-card bg-surface-raised p-5` bisa langsung ditulis di `<View>`, `<Text>`, atau `<Pressable>` tanpa membuat `StyleSheet.create()` manual. Warna, radius, dan ukuran font didefinisikan sekali di `tailwind.config.js`. Kalau ada warna yang ingin diganti, cukup ubah di file itu dan semua layar ikut berubah.

Untuk elemen yang bisa ditekan saya memakai `<Pressable>`, bukan `<Text onPress>` atau `<TouchableOpacity>`. `Pressable` adalah komponen sentuh yang direkomendasikan React Native saat ini. Komponen ini mendukung state seperti `pressed` dan `disabled`, dan area sentuhnya mudah diatur supaya minimal 52px agar nyaman ditekan.

Aplikasi ini juga memakai conditional rendering. Di `app/layanan/[id]/jadwal.tsx`, kalau layanan dengan `id` tersebut tidak ada di data, atau kalau booking sudah dikonfirmasi, komponen langsung mengembalikan tampilan yang berbeda (early return). Kedua kondisi itu masih bagian dari layar yang sama, jadi tidak perlu dibuat route baru.

Tema navigasi diatur dengan `ThemeProvider` dari Expo Router yang membungkus `<Stack>` di `app/_layout.tsx`. Ini perlu karena Expo Router punya warna latar default sendiri (abu-abu terang) yang tidak ikut berubah lewat class Tailwind. Tanpa pengaturan ini, latar belakang aplikasi tetap terang walaupun semua komponen di dalamnya sudah berwarna gelap.

Contoh route dinamis dan state dari `app/layanan/[id]/jadwal.tsx`:

```tsx
const { id } = useLocalSearchParams<{ id: string }>();
const service = getServiceById(id);
const [jam, setJam] = useState<string | null>(null);
const [konfirmasi, setKonfirmasi] = useState(false);
// ...
<Button
  label="Konfirmasi Booking"
  onPress={() => jam && setKonfirmasi(true)}
/>
```

Contoh komponen dengan props dari `components/Button.tsx`:

```tsx
interface ButtonProps {
  label: string;
  onPress: (e: GestureResponderEvent) => void;
  variant?: 'primary' | 'outline';
}

export function Button({ label, onPress, variant = 'primary' }: ButtonProps) {
  const isPrimary = variant === 'primary';
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className={
        isPrimary
          ? 'h-tap items-center justify-center rounded-card bg-brand-deep active:opacity-90'
          : 'h-tap items-center justify-center rounded-card border border-line bg-transparent active:bg-surface-sunken'
      }
    >
      <Text className={isPrimary ? 'font-semibold text-base text-white' : 'font-semibold text-base text-ink'}>
        {label}
      </Text>
    </Pressable>
  );
}
```

## Analisis kebutuhan

### Masalah

Pemilik mobil sering lupa jadwal servis rutin. Untuk tahu jenis layanan, harga, dan jam yang masih kosong, mereka biasanya harus menelepon atau datang langsung ke bengkel. Riwayat servis sebelumnya juga jarang tercatat.

### Target pengguna

Pemilik mobil pribadi yang rutin servis di bengkel langganan dan sehari-hari memakai HP Android atau iOS.

### Kebutuhan fungsional

1. Pengguna dapat masuk atau mendaftar akun (form dengan validasi).
2. Pengguna dapat melihat daftar layanan servis beserta harga dan perkiraan durasi.
3. Pengguna dapat memfilter layanan berdasarkan kategori.
4. Pengguna dapat membuka detail satu layanan sebelum memesan.
5. Pengguna dapat memilih cabang bengkel dan jam yang tersedia, lalu mengonfirmasi booking.
6. Pengguna dapat melihat kendaraan, booking terdekat, dan riwayat servis di halaman Beranda.

### Kebutuhan non-fungsional

1. Tombol dan pilihan memiliki area sentuh minimal 52px supaya mudah ditekan.
2. Kontras teks terhadap latar memenuhi standar WCAG AA (rasio minimal 4.5:1 untuk teks biasa).
3. Tampilan konsisten di semua layar karena warna dan ukuran diambil dari satu konfigurasi (`tailwind.config.js`).
4. Aplikasi berjalan di Android, iOS, dan web dari satu kode yang sama.

### Batasan

Project ini dikerjakan sendiri untuk UTS dengan waktu terbatas dan tanpa backend. Karena itu login, penyimpanan booking, dan notifikasi belum dibuat sungguhan. Semua data diambil dari file statis dan state akan kembali ke awal setiap aplikasi di-reload.

## Keterbatasan

- Belum ada backend, sehingga data login dan booking hilang saat aplikasi di-reload.
- Belum ada pilihan tanggal. Slot jam yang tersedia dianggap untuk hari ini saja.
