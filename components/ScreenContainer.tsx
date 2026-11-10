import { SafeAreaView, type ViewProps } from 'react-native';

/**
 * Pembungkus layar: safe-area + background surface konsisten.
 *
 * style inline dipakai untuk flex-1 (bukan hanya className) — SafeAreaView
 * react-native-web kadang tidak mewarisi flex dari className NativeWind,
 * bikin child "flex-1" di dalamnya tidak punya apa-apa untuk di-fill.
 */
export function ScreenContainer({ children, className = '', style, ...rest }: ViewProps) {
  return (
    <SafeAreaView
      className={`overflow-hidden bg-surface ${className}`}
      style={[{ flex: 1 }, style]}
      {...rest}
    >
      {children}
    </SafeAreaView>
  );
}
