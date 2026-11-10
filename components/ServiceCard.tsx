import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import type { Service } from '../constants/types';
import { formatRupiah } from '../lib/format';

/**
 * Kartu layanan untuk Halaman Utama/Daftar.
 *
 * Satu blok visual (bukan dipisah divider jadi dua panel) — ikon sejajar
 * dengan chevron pada baris yang sama, lalu judul, lalu baris penutup
 * durasi+harga menyatu tanpa garis pemisah supaya kartu terasa satu unit.
 */
export function ServiceCard({ service, onPress }: { service: Service; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${service.nama}, ${formatRupiah(service.hargaRupiah)}, ${service.durasiMenit} menit`}
      className="min-h-tap gap-3 rounded-card border border-line-soft bg-surface-raised p-5 active:opacity-80"
    >
      <View className="flex-row items-center justify-between">
        <View className="h-11 w-11 items-center justify-center rounded-card bg-brand-tint">
          <Ionicons name={service.ikon} size={22} color="#FF7A45" />
        </View>
        <Ionicons name="chevron-forward" size={20} color="#6F6A66" />
      </View>

      <View className="gap-1">
        <Text className="font-semibold text-title text-ink">{service.nama}</Text>
        <Text className="text-body-s text-ink-muted">{service.ringkasan}</Text>
      </View>

      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-1">
          <Ionicons name="time-outline" size={14} color="#9A938E" />
          <Text className="text-body-s text-ink-muted">{service.durasiMenit} menit</Text>
        </View>
        <Text className="font-data text-data-s font-semibold text-brand-text">
          {formatRupiah(service.hargaRupiah)}
        </Text>
      </View>
    </Pressable>
  );
}
