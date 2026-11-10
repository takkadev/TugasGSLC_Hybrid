import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { ScreenContainer } from '../components/ScreenContainer';
import { VehicleCard } from '../components/VehicleCard';
import { EmptyState } from '../components/EmptyState';
import { BookingCard } from '../components/BookingCard';
import { ServiceCard } from '../components/ServiceCard';
import { SERVICES } from '../constants/services';
import { VEHICLE, UPCOMING_BOOKING, BOOKING_HISTORY } from '../constants/vehicle';

/**
 * Beranda — Halaman Utama (soal poin b, 20 pts).
 *
 * Dua state: punya kendaraan (kartu kendaraan + booking terdekat + riwayat)
 * atau belum (empty state). Toggle `punyaMobil` cuma demo lokal, bukan
 * fitur produk — prototipe data statis, tidak ada backend.
 */
export default function Beranda() {
  const [punyaMobil, setPunyaMobil] = useState(true);

  return (
    <ScreenContainer>
      <ScrollView contentContainerClassName="pb-16">
        <View className="w-full max-w-[560px] flex-1 self-center px-5 pt-10 gap-6">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-label uppercase text-ink-muted">Selamat Datang</Text>
              <Text className="font-display text-title text-ink">Budi Santoso</Text>
            </View>
            <View
              accessibilityRole="button"
              accessibilityLabel="Notifikasi"
              className="h-11 w-11 items-center justify-center rounded-pill bg-brand-tint"
            >
              <Ionicons name="notifications-outline" size={20} color="#FF7A45" />
            </View>
          </View>

          {punyaMobil ? (
            <VehicleCard vehicle={VEHICLE} />
          ) : (
            <EmptyState
              ikon="car-outline"
              judul="Tambahkan mobil kamu"
              pesan="Cukup merek, model, dan nomor plat. MontirKu bisa mengingatkan jadwal servis."
              labelAksi="Tambah Kendaraan"
              onAksi={() => setPunyaMobil(true)}
            />
          )}

          {punyaMobil ? (
            <View className="gap-3">
              <View className="flex-row items-center justify-between">
                <Text className="font-semibold text-title text-ink">Booking terdekat</Text>
              </View>
              <BookingCard booking={UPCOMING_BOOKING} />
            </View>
          ) : null}

          <View className="gap-3">
            <Text className="font-semibold text-title text-ink">Pesan layanan</Text>
            {SERVICES.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onPress={() => router.push(`/layanan/${service.id}`)}
              />
            ))}
          </View>

          {punyaMobil ? (
            <View className="gap-3">
              <Text className="font-semibold text-title text-ink">Riwayat terakhir</Text>
              {BOOKING_HISTORY.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </View>
          ) : null}

          {/* Demo-only: toggle dua state Beranda (dipstick switch, bukan form Tambah Kendaraan sungguhan) */}
          {punyaMobil ? (
            <Pressable onPress={() => setPunyaMobil(false)} className="min-h-[32px] self-center">
              <Text className="text-body-s text-ink-soft">Lihat state belum ada kendaraan</Text>
            </Pressable>
          ) : null}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
