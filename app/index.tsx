import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { Input } from '../components/Input';
import { Button } from '../components/Button';

/**
 * Layar Autentikasi (Login & Register dihitung satu layar, soal poin a).
 *
 * Prototipe: tidak ada backend/AsyncStorage (sesuai soal: "autentikasi
 * belum diimplementasikan"). Validasi input sederhana saja, lalu diarahkan
 * ke Halaman Utama. Login tampil gelap, Register tampil terang — mengikuti
 * mockup desain MontirKu.
 */
export default function AuthScreen() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [hp, setHp] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const next: Record<string, string> = {};
    if (mode === 'register' && nama.trim().length < 3) {
      next.nama = 'Nama minimal 3 karakter';
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      next.email = 'Email kurang lengkap. Contoh: budi@email.com';
    }
    if (mode === 'register' && !/^\d{8,13}$/.test(hp)) {
      next.hp = 'Nomor HP 8-13 digit, tanpa spasi';
    }
    if (password.length < 6) {
      const sisa = 6 - password.length;
      next.password = `Baru ${password.length} karakter. Tambah ${sisa} lagi.`;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    router.replace('/layanan');
  }

  const isLogin = mode === 'login';

  return (
    <ScrollView
      className={isLogin ? 'flex-1 bg-steel' : 'flex-1 bg-surface'}
      contentContainerClassName="min-h-full justify-center px-6 py-10"
    >
      {/* Lebar form dikunci di 400px dan dipusatkan — tanpa ini form stretch
          selebar viewport web, yang justru merusak keterbacaan. */}
      <View className="w-full max-w-[400px] self-center">
        <View className="mb-8 flex-row items-center justify-center gap-2">
          <Ionicons name="build" size={28} color="#E85A1F" />
          <Text className={`font-display text-title ${isLogin ? 'text-steel-on' : 'text-ink'}`}>
            MONTIRKU
          </Text>
        </View>

        {!isLogin ? (
          <Text className="mb-4 text-brand-text active:opacity-70" onPress={() => { setMode('login'); setErrors({}); }}>
            ← Kembali
          </Text>
        ) : null}

        <Text className={`font-display text-display ${isLogin ? 'text-steel-on' : 'text-ink'}`}>
          {isLogin ? 'Masuk' : 'Daftar akun'}
        </Text>
        <Text className={`mb-6 text-body ${isLogin ? 'text-steel-on/70' : 'text-ink-muted'}`}>
          {isLogin ? 'Masuk untuk melanjutkan booking kamu' : 'Isi data diri untuk mulai booking servis'}
        </Text>

        <View className="gap-4">
          {mode === 'register' ? (
            <Input label="Nama lengkap" placeholder="Budi Santoso" value={nama} onChangeText={setNama} error={errors.nama} />
          ) : null}

          <Input
            dark={isLogin}
            label="Email"
            placeholder="budi@email.com"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            error={errors.email}
          />

          {mode === 'register' ? (
            <Input label="Nomor HP" placeholder="81234567890" keyboardType="phone-pad" value={hp} onChangeText={setHp} error={errors.hp} />
          ) : null}

          <Input
            dark={isLogin}
            label="Password"
            placeholder="Minimal 6 karakter"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            error={errors.password}
          />

          <Button label={isLogin ? 'Masuk' : 'Daftar'} onPress={handleSubmit} />

          {isLogin ? (
            <Text className="text-center text-body-s text-steel-on/70">
              Belum punya akun?{' '}
              <Text className="text-brand" onPress={() => { setMode('register'); setErrors({}); }}>
                Daftar sekarang
              </Text>
            </Text>
          ) : (
            <Text className="text-center text-body-s text-ink-muted">
              Sudah punya akun?{' '}
              <Text className="text-brand" onPress={() => { setMode('login'); setErrors({}); }}>
                Masuk
              </Text>
            </Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
