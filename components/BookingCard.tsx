import { Pressable, Text, View } from 'react-native';

import { StatusBadge } from './StatusBadge';
import type { Booking } from '../constants/types';
import { getServiceById } from '../constants/services';
import { formatRupiah, formatTanggal } from '../lib/format';

/** Kartu booking (terdekat atau riwayat) — judul layanan, tanggal, status, harga. */
export function BookingCard({ booking, onPress }: { booking: Booking; onPress?: () => void }) {
  const service = getServiceById(booking.serviceId);
  if (!service) return null;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      className="min-h-tap gap-2 rounded-card border border-line-soft bg-surface-raised p-4 active:opacity-80"
    >
      <View className="flex-row items-center justify-between">
        <Text className="font-semibold text-body text-ink">{service.nama}</Text>
        <StatusBadge status={booking.status} />
      </View>
      <Text className="text-body-s text-ink-muted">
        {formatTanggal(booking.tanggal)} · {booking.jam}
      </Text>
      <Text className="font-data text-body-s font-semibold text-brand-text">
        {formatRupiah(booking.hargaRupiah)}
      </Text>
    </Pressable>
  );
}
