import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { ScreenContainer } from '../../../components/ScreenContainer';
import { Button } from '../../../components/Button';
import { StatusBadge } from '../../../components/StatusBadge';
import { getServiceById } from '../../../constants/services';
import { BRANCHES, TIME_SLOTS } from '../../../constants/branches';
import { formatRupiah } from '../../../lib/format';

/**
 * Halaman Fitur Pendukung: Pilih Jadwal (soal poin d, 15 pts).
 *
 * Pilih cabang + slot jam dari data statis, lalu "konfirmasi" booking.
 * Tidak ada penyimpanan — prototipe sesuai soal (autentikasi dan data
 * tidak diimplementasikan sebagai backend nyata).
 */
export default function PilihJadwal() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const service = getServiceById(id);
  const [branchId, setBranchId] = useState(BRANCHES[0].id);
  const [jam, setJam] = useState<string | null>(null);
  const [konfirmasi, setKonfirmasi] = useState(false);

  if (!service) {
    return (
      <ScreenContainer>
        <View className="flex-1 items-center justify-center gap-4 px-6">
          <Text className="text-body text-ink-muted">Layanan tidak ditemukan</Text>
          <Button label="Kembali" onPress={() => router.back()} />
        </View>
      </ScreenContainer>
    );
  }

  if (konfirmasi) {
    const branch = BRANCHES.find((b) => b.id === branchId)!;
    return (
      <ScreenContainer>
        <View className="flex-1 items-center justify-center px-6">
          <View className="w-full max-w-[400px] items-center gap-4">
            <StatusBadge status="menunggu" center />
            <Text className="text-center font-display text-display text-ink">Booking dibuat</Text>
            <Text className="text-center text-body text-ink-muted">
              {service.nama} di {branch.nama}, jam {jam}. Ini prototipe — belum ada penyimpanan
              sungguhan.
            </Text>
            <Button label="Kembali ke Beranda" onPress={() => router.replace('/beranda')} />
          </View>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <ScrollView contentContainerClassName="w-full max-w-[560px] self-center px-5 pt-10 pb-16 gap-6">
        <View>
          <Pressable onPress={() => router.back()} className="mb-4 min-h-[32px] self-start">
            <Text className="text-brand-text">← Kembali</Text>
          </Pressable>
          <Text className="font-display text-display text-ink">Pilih Jadwal</Text>
          <Text className="text-body text-ink-muted">{service.nama}</Text>
        </View>

        <View className="gap-3">
          <Text className="font-semibold text-title text-ink">Cabang</Text>
          {BRANCHES.map((branch) => {
            const active = branch.id === branchId;
            return (
              <Pressable
                key={branch.id}
                onPress={() => setBranchId(branch.id)}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
                className={`min-h-tap rounded-card border p-4 ${
                  active ? 'border-brand bg-brand-tint' : 'border-line active:bg-surface-sunken'
                }`}
              >
                <Text className={`text-body ${active ? 'text-brand-text' : 'text-ink'}`}>
                  {branch.nama}
                </Text>
                <Text className="text-body-s text-ink-muted">{branch.alamat}</Text>
              </Pressable>
            );
          })}
        </View>

        <View className="gap-3">
          <Text className="font-semibold text-title text-ink">Jam tersedia</Text>
          <View className="flex-row flex-wrap gap-2">
            {TIME_SLOTS.map((slot) => {
              const active = jam === slot.jam;
              return (
                <Pressable
                  key={slot.jam}
                  disabled={!slot.tersedia}
                  onPress={() => setJam(slot.jam)}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active, disabled: !slot.tersedia }}
                  className={`h-tap items-center justify-center rounded-pill border px-5 ${
                    !slot.tersedia
                      ? 'border-line bg-surface-sunken opacity-50'
                      : active
                        ? 'border-brand bg-brand'
                        : 'border-line active:bg-surface-sunken'
                  }`}
                >
                  <Text
                    className={`text-body-s font-medium ${
                      !slot.tersedia ? 'text-ink-soft' : active ? 'text-white' : 'text-ink'
                    }`}
                  >
                    {slot.jam}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View className="flex-row items-center justify-between rounded-card bg-surface-sunken p-4">
          <Text className="text-body text-ink-muted">Estimasi biaya</Text>
          <Text className="font-data text-data-s font-semibold text-brand-text">
            {formatRupiah(service.hargaRupiah)}
          </Text>
        </View>

        <Button
          label="Konfirmasi Booking"
          onPress={() => jam && setKonfirmasi(true)}
        />
      </ScrollView>
    </ScreenContainer>
  );
}
