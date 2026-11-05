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
      onPress={onPress}
      className={
        isPrimary
          ? 'h-tap items-center justify-center rounded-card bg-brand active:bg-brand-deep'
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
