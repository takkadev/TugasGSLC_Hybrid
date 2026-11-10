import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { router } from 'expo-router';

import { ScreenContainer } from '../components/ScreenContainer';
import { ServiceCard } from '../components/ServiceCard';
import { SERVICES } from '../constants/services';
import type { ServiceCategory } from '../constants/types';

const FILTERS: { key: ServiceCategory | 'semua'; label: string }[] = [
  { key: 'semua', label: 'Semua' },
  { key: 'oli', label: 'Oli' },
  { key: 'pengecekan', label: 'Pengecekan' },
  { key: 'cuci', label: 'Cuci' },
];

/** Halaman Utama/Daftar Layanan (soal poin b, 20 pts). */
export default function Layanan() {
  const [filter, setFilter] = useState<ServiceCategory | 'semua'>('semua');

  const daftar = filter === 'semua' ? SERVICES : SERVICES.filter((s) => s.kategori === filter);

  return (
    <ScreenContainer>
      <View className="w-full max-w-[560px] flex-1 self-center px-5 pt-10">
        <Text className="font-display text-display text-ink">Layanan</Text>
        <Text className="mb-5 text-body text-ink-muted">Pilih layanan, lihat harga di awal</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="gap-3 pb-5"
        >
          {FILTERS.map((f) => {
            const active = filter === f.key;
            return (
              <Pressable
                key={f.key}
                onPress={() => setFilter(f.key)}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
                className={`h-tap items-center justify-center rounded-pill px-4 ${
                  active ? 'bg-brand-deep' : 'border border-line active:bg-surface-sunken'
                }`}
              >
                <Text className={`text-body-s font-medium ${active ? 'text-white' : 'text-ink-muted'}`}>
                  {f.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <ScrollView contentContainerClassName="gap-4 pb-16">
          {daftar.length === 0 ? (
            <Text className="text-body-s text-ink-muted">Belum ada layanan di kategori ini.</Text>
          ) : (
            daftar.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onPress={() => router.push(`/layanan/${service.id}`)}
              />
            ))
          )}
        </ScrollView>
      </View>
    </ScreenContainer>
  );
}
