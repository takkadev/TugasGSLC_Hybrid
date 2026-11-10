import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { Input } from '../components/Input';
import { Button } from '../components/Button';

/**
 * Layar Autentikasi (Login & Register dihitung satu layar, soal poin a).
 *
 * Prototipe: tidak ada backend/AsyncStorage (sesuai soal: "autentikasi
 * belum diimplementasikan"). Semua elemen pada satu axis (center), spacing
 * kelipatan 8px, card terpusat vertikal+horizontal.
 */
export default function AuthScreen() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [hp, setHp] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  function switchMode(next: 'login' | 'register') {
    setMode(next);
    setErrors({});
  }

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
      next.password = sisa > 0 ? `Kurang ${sisa} karakter lagi` : 'Kata sandi belum valid';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    router.replace('/beranda');
  }

  const isLogin = mode === 'login';

  return (
    <ScrollView
      className="flex-1 bg-surface"
      contentContainerClassName="min-h-full items-center justify-center px-6 py-10"
    >
      <View className="w-full max-w-[400px] items-center gap-6 rounded-card border border-line-soft bg-surface-raised p-6">
        <View className="items-center gap-1.5">
          <View className="h-12 w-12 items-center justify-center rounded-pill bg-brand-tint">
            <Ionicons name="build" size={22} color="#FF7A45" />
          </View>
          <Text className="font-display text-title text-ink">MontirKu</Text>
        </View>

        <View className="w-full items-center gap-0.5">
          {!isLogin ? (
            <Pressable
              onPress={() => switchMode('login')}
              className="mb-2 min-h-[32px] w-full flex-row items-center justify-center"
            >
              <Text className="text-brand-text">← Kembali</Text>
            </Pressable>
          ) : null}
          <Text className="font-display text-display text-ink">
            {isLogin ? 'Masuk' : 'Daftar akun'}
          </Text>
          <Text className="text-center text-body text-ink-muted">
            {isLogin
              ? 'Kelola servis mobil kamu dalam satu tempat'
              : 'Isi data diri untuk mulai booking servis'}
          </Text>
        </View>

        <View className="w-full gap-3">
          {mode === 'register' ? (
            <Input label="Nama" placeholder="Budi Santoso" value={nama} onChangeText={setNama} error={errors.nama} />
          ) : null}

          <Input
            label="Email"
            placeholder="nama@email.com"
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
            label="Kata sandi"
            placeholder="••••••••"
            helper="Minimal 6 karakter"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            error={errors.password}
          />
        </View>

        <View className="w-full gap-3">
          <Button label={isLogin ? 'Masuk' : 'Daftar'} onPress={handleSubmit} />

          {isLogin ? (
            <Text className="text-center text-body-s text-ink-muted">
              Belum punya akun?{' '}
              <Text className="text-brand-text" onPress={() => switchMode('register')}>
                Daftar sekarang
              </Text>
            </Text>
          ) : (
            <Text className="text-center text-body-s text-ink-muted">
              Sudah punya akun?{' '}
              <Text className="text-brand-text" onPress={() => switchMode('login')}>
                Masuk
              </Text>
            </Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
