# Log Debugging — Bug Background Terang di Web

Project: MontirKu (TugasGSLC_Hybrid)
Tanggal: 9 Nov 2026

## Gejala

Setelah redesign total ke dark theme, screenshot browser menunjukkan latar belakang halaman tetap terang (abu-abu), padahal semua komponen sudah dipindah ke token warna gelap di `tailwind.config.js`.

## Langkah investigasi

1. Cek `global.css` — isinya cuma 3 baris `@tailwind base/components/utilities`. Bukan sumber masalah.
2. Cek `app/+html.tsx` — file ini tidak ada di project (beda dari project referensi `montirku` yang punya custom HTML template).
3. Screenshot browser dicek lewat `vision_analyze` — dikonfirmasi background memang terang, bukan salah lihat.
4. DOM di-walk pakai JavaScript lewat `browser_exec`, cek `getComputedStyle().backgroundColor` tiap elemen dari `<html>` turun ke bawah. Ketemu: elemen root (bukan `<body>`, bukan child manapun dari kode kita) punya `background-color: rgb(242, 242, 242)` lewat **inline style**, bukan dari class CSS manapun.
5. Cek isi `tailwind.config.js` — sudah benar, token `surface` memang `#18191B` (gelap). Jadi bukan salah konfigurasi Tailwind.
6. Cari di seluruh project (`search_files`) string `242, 242, 242` atau `#f2f2f2` — nihil. Warna itu tidak ada di kode kita sama sekali.
7. Cek struktur DOM lebih dalam: elemen itu adalah `AppContainer` bikinan `react-native-web`, dan warnanya persis sama dengan warna default `background` di tema `DefaultTheme` milik React Navigation (dipakai Expo Router di dalamnya untuk membungkus seluruh `<Stack>`).

## Akar masalah

Expo Router secara default memakai tema navigasi terang (`DefaultTheme`) untuk warna latar root container, terpisah total dari NativeWind/Tailwind. Classname apa pun yang ditulis di komponen tidak menyentuh elemen ini, karena elemen ini dirender oleh layer navigasi, bukan oleh komponen `<View>` kita.

## Perbaikan

Di `app/_layout.tsx`, bungkus `<Stack>` dengan `ThemeProvider` dan override warnanya pakai `DarkTheme` yang di-export langsung dari `expo-router` (tidak perlu install `@react-navigation/native` terpisah):

```tsx
import { DarkTheme, Stack, ThemeProvider } from 'expo-router';

const navTheme = {
  ...DarkTheme,
  colors: { ...DarkTheme.colors, background: '#18191B', card: '#222325', border: '#34363A' },
};

export default function RootLayout() {
  return (
    <ThemeProvider value={navTheme}>
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}
```

## Verifikasi

Setelah fix, DOM root dicek ulang: `background-color` berubah jadi `rgb(24, 25, 27)`, persis sama dengan `#18191B`. Dikonfirmasi visual lewat screenshot ulang di semua layar (Beranda, Layanan, Detail, Pilih Jadwal) — semua sudah gelap konsisten.

## Bug turunan yang ketemu di investigasi yang sama

Saat memverifikasi fix di atas, ketemu bug kedua: halaman konfirmasi booking (`app/layanan/[id]/jadwal.tsx`) tidak center secara vertikal, konten numpuk di atas.

**Sebab:** `ScreenContainer` menerima `className` custom lewat template string:
```tsx
<SafeAreaView className={`flex-1 overflow-hidden bg-surface ${className}`}>
```
NativeWind gagal menerapkan `flex-1` dengan benar pada `SafeAreaView` lewat pola ini di web — dicek lewat DOM walk, parent chain menunjukkan `flex: 0 0 auto` padahal seharusnya `flex: 1`.

**Perbaikan:** pindahkan `flex: 1` ke inline `style` sebagai fallback, bukan hanya lewat className:
```tsx
<SafeAreaView
  className={`overflow-hidden bg-surface ${className}`}
  style={[{ flex: 1 }, style]}
  {...rest}
>
```
Dan pindahkan layout (`items-center`, `justify-center`) dari prop `ScreenContainer` ke `<View>` child terpisah di dalamnya, supaya tidak gantung pada mekanisme yang sama yang gagal.

## Alat yang dipakai selama debugging

- `browser_exec` — buka browser nyata, jalankan JavaScript di halaman, ambil screenshot.
- `vision_analyze` — baca screenshot untuk verifikasi visual (bukan tebak-tebakan dari kode).
- `search_files` — cari string warna di seluruh source untuk eliminasi kemungkinan.
- `cdp('Emulation.setDeviceMetricsOverride', ...)` — emulasi ukuran layar HP standar (390×844) supaya screenshot representatif, karena viewport default browser test terlalu kecil (569px) dan menyesatkan.
