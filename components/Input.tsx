import { Text, TextInput, View, type TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
  /** Teks bantuan di bawah field, tetap terlihat (beda dari placeholder yang hilang saat diketik). */
  helper?: string;
}

/** Input reusable dengan label, helper text, dan pesan error. Tinggi field 56px. */
export function Input({ label, error, helper, ...rest }: InputProps) {
  return (
    <View className="gap-1.5">
      <Text className="text-label font-medium uppercase text-ink-muted">{label}</Text>
      <TextInput
        accessibilityLabel={label}
        className={`h-field rounded-card border bg-surface-sunken px-4 text-base text-ink ${
          error ? 'border-bad-text' : 'border-line'
        }`}
        placeholderTextColor="#9A938E"
        {...rest}
      />
      {/* Slot pesan tetap ada (min-height) biar munculnya error tidak mendorong layout di bawahnya */}
      <Text className="min-h-[16px] text-body-s" style={{ color: error ? '#F0695F' : '#9A938E' }}>
        {error || helper || ''}
      </Text>
    </View>
  );
}
