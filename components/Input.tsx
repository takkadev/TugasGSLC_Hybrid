import { Text, TextInput, View, type TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
}

/** Input reusable dengan label dan pesan error. Tinggi field 56px. */
export function Input({ label, error, ...rest }: InputProps) {
  return (
    <View className="gap-1.5">
      <Text className="text-label font-medium uppercase text-ink-muted">{label}</Text>
      <TextInput
        accessibilityLabel={label}
        className={`h-field rounded-card border bg-surface-sunken px-4 text-base text-ink ${
          error ? 'border-bad-text' : 'border-line'
        }`}
        placeholderTextColor="#6F6A66"
        {...rest}
      />
      {error ? <Text className="text-body-s text-bad-text">{error}</Text> : null}
    </View>
  );
}
