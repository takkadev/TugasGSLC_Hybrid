import { Pressable, Text, type GestureResponderEvent } from 'react-native';

interface ButtonProps {
  label: string;
  onPress: (e: GestureResponderEvent) => void;
  variant?: 'primary' | 'outline';
}

/** Tombol reusable. Tinggi tap-min 52px untuk target sentuh pengguna lanjut usia. */
export function Button({ label, onPress, variant = 'primary' }: ButtonProps) {
  const isPrimary = variant === 'primary';
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className={
        // bg-brand-deep, bukan bg-brand: teks putih di atas bg-brand (#E85A1F)
        // cuma 3.55:1, gagal WCAG AA 4.5:1. brand-deep (#C94A14) 4.69:1, lolos.
        isPrimary
          ? 'h-tap items-center justify-center rounded-card bg-brand-deep active:opacity-90'
          : 'h-tap items-center justify-center rounded-card border border-line bg-transparent active:bg-surface-sunken'
      }
    >
      <Text
        className={
          isPrimary
            ? 'font-semibold text-base text-white'
            : 'font-semibold text-base text-ink'
        }
      >
        {label}
      </Text>
    </Pressable>
  );
}
