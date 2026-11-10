import '../global.css';

import { useFonts } from 'expo-font';
import {
  Archivo_600SemiBold,
  Archivo_700Bold,
} from '@expo-google-fonts/archivo';
import {
  IBMPlexSans_400Regular,
  IBMPlexSans_500Medium,
  IBMPlexSans_600SemiBold,
} from '@expo-google-fonts/ibm-plex-sans';
import { DarkTheme, Stack, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

/**
 * Override tema navigasi root — tanpa ini background bawaan (#F2F2F2 terang)
 * bikin heading di luar card tak terlihat (putih di atas abu terang).
 * Pakai export `DarkTheme`/`ThemeProvider` dari expo-router sendiri,
 * tidak perlu install @react-navigation/native terpisah.
 */
const navTheme = {
  ...DarkTheme,
  colors: { ...DarkTheme.colors, background: '#18191B', card: '#222325', border: '#34363A' },
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Archivo_700Bold,
    Archivo_600SemiBold,
    IBMPlexSans_400Regular,
    IBMPlexSans_500Medium,
    IBMPlexSans_600SemiBold,
  });

  if (!fontsLoaded) return null;

  return (
    <ThemeProvider value={navTheme}>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}
