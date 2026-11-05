import { Text, TextInput, View, type TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
  /** Pakai di layar gelap (misal Login). Default terang. */
  dark?: boolean;
}

/** Input reusable dengan label dan pesan error. Tinggi field 56px. */
export function Input({ label, error, dark = false, ...rest }: InputProps) {
  return (
    <View className="gap-1.5">
      <Text className={`text-body-s font-medium ${dark ? 'text-surface/80' : 'text-ink-muted'}`}>
        {label}
      </Text>
      <TextInput
        className={`h-field rounded-card border px-4 text-base ${
          dark ? 'border-surface/20 bg-surface/5 text-steel-on' : 'bg-white text-ink'
        } ${error ? 'border-bad-text' : dark ? '' : 'border-line'}`}
        placeholderTextColor={dark ? '#8C827B' : '#8C827B'}
        {...rest}
      />
      {error ? <Text className="text-body-s text-bad-text">{error}</Text> : null}
    </View>
  );
}
