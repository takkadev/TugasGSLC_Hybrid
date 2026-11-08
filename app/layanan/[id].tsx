import { Pressable, ScrollView, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { ScreenContainer } from '../../components/ScreenContainer';
import { Button } from '../../components/Button';
import { getServiceById } from '../../constants/services';
import { formatRupiah } from '../../lib/format';

/** Halaman Detail Layanan (soal poin c, 15 pts). Dibuka dari item daftar. */
export default function DetailLayanan() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const service = getServiceById(id);

  if (!service) {
    return (
      <ScreenContainer className="items-center justify-center px-6">
        <Text className="text-body text-ink-muted">Layanan tidak ditemukan</Text>
        <Button label="Kembali ke Layanan" onPress={() => router.back()} />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <ScrollView contentContainerClassName="w-full max-w-[560px] self-center px-5 pt-6 pb-10">
        <Pressable onPress={() => router.back()} className="mb-4 min-h-[32px] self-start">
          <Text className="text-brand-text">← Kembali</Text>
        </Pressable>

        <View className="mb-5 h-20 w-20 items-center justify-center rounded-card bg-brand-tint">
          <Ionicons name={service.ikon} size={36} color="#C94A14" />
        </View>

        <Text className="font-display text-display text-ink">{service.nama}</Text>
        <Text className="mb-1 font-data text-data-s text-brand-text">
          {formatRupiah(service.hargaRupiah)}
        </Text>
        <Text className="mb-5 text-body-s text-ink-muted">{service.durasiMenit} menit</Text>

        <Text className="mb-6 text-body text-ink">{service.deskripsi}</Text>

        <Text className="mb-2 font-semibold text-base text-ink">Termasuk</Text>
        <View className="mb-8 gap-2">
          {service.termasuk.map((item) => (
            <View key={item} className="flex-row items-center gap-2">
              <Ionicons name="checkmark-circle" size={18} color="#3E9B5F" />
              <Text className="text-body text-ink">{item}</Text>
            </View>
          ))}
        </View>

        <Button
          label="Pilih Jadwal"
          onPress={() => router.push(`/layanan/${service.id}/jadwal`)}
        />
      </ScrollView>
    </ScreenContainer>
  );
}
