import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import type { Vehicle } from '../constants/types';

/** Kartu kendaraan utama di Beranda — plat, odometer, estimasi servis. */
export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <View className="gap-4 rounded-card bg-surface-raised p-5">
      <View className="flex-row items-center justify-between">
        <Text className="text-label uppercase text-ink-muted">Kendaraan Utama</Text>
        <View className="rounded-pill bg-surface-sunken px-3 py-1">
          <Text className="font-data text-body-s font-semibold text-ink">{vehicle.platNomor}</Text>
        </View>
      </View>

      <View className="flex-row items-center gap-2">
        <Ionicons name="car-sport-outline" size={20} color="#F4F3F1" />
        <Text className="font-semibold text-title text-ink">
          {vehicle.merek} {vehicle.model}
        </Text>
      </View>

      <View className="flex-row gap-6">
        <View>
          <Text className="font-data text-data-s font-semibold text-ink">
            {vehicle.odometerKm.toLocaleString('id-ID')} km
          </Text>
          <Text className="text-body-s text-ink-muted">Odometer</Text>
        </View>
        <View>
          <Text className="font-data text-data-s font-semibold text-brand-text">
            {vehicle.kmPerHari.toLocaleString('id-ID')} km
          </Text>
          <Text className="text-body-s text-ink-muted">Menuju servis</Text>
        </View>
      </View>
    </View>
  );
}
