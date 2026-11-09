import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Button } from './Button';

interface EmptyStateProps {
  ikon: keyof typeof Ionicons.glyphMap;
  judul: string;
  pesan: string;
  labelAksi: string;
  onAksi: () => void;
}

/** State kosong generik dengan satu aksi jelas — dipakai saat belum ada kendaraan/data. */
export function EmptyState({ ikon, judul, pesan, labelAksi, onAksi }: EmptyStateProps) {
  return (
    <View className="gap-3 rounded-card bg-surface-raised p-5">
      <View className="h-11 w-11 items-center justify-center rounded-card bg-brand-tint">
        <Ionicons name={ikon} size={22} color="#FF7A45" />
      </View>
      <Text className="font-semibold text-title text-ink">{judul}</Text>
      <Text className="text-body-s text-ink-muted">{pesan}</Text>
      <Button label={labelAksi} onPress={onAksi} />
    </View>
  );
}
