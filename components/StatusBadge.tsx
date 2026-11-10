import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import type { BookingStatus } from '../constants/types';

const STATUS_META: Record<
  BookingStatus,
  { label: string; icon: keyof typeof Ionicons.glyphMap; textClass: string; tintClass: string }
> = {
  menunggu: { label: 'Menunggu', icon: 'time-outline', textClass: 'text-warn-text', tintClass: 'bg-warn-tint' },
  dikonfirmasi: { label: 'Dikonfirmasi', icon: 'checkmark-circle-outline', textClass: 'text-ok-text', tintClass: 'bg-ok-tint' },
  selesai: { label: 'Selesai', icon: 'checkmark-done-outline', textClass: 'text-ok-text', tintClass: 'bg-ok-tint' },
  dibatalkan: { label: 'Dibatalkan', icon: 'close-circle-outline', textClass: 'text-bad-text', tintClass: 'bg-bad-tint' },
};

/** Status selalu ikon DAN kata — tidak mengandalkan warna saja (aksesibilitas). */
export function StatusBadge({ status, center = false }: { status: BookingStatus; center?: boolean }) {
  const meta = STATUS_META[status];
  return (
    <View
      className={`flex-row items-center gap-1 rounded-pill px-3 py-1 ${center ? 'self-center' : 'self-start'} ${meta.tintClass}`}
    >
      <Ionicons name={meta.icon} size={14} color="currentColor" className={meta.textClass} />
      <Text className={`text-body-s font-medium ${meta.textClass}`}>{meta.label}</Text>
    </View>
  );
}
