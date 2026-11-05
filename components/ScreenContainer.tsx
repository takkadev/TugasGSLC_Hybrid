import { SafeAreaView, type ViewProps } from 'react-native';

/** Pembungkus layar: safe-area + background surface konsisten. */
export function ScreenContainer({ children, className = '', ...rest }: ViewProps) {
  return (
    <SafeAreaView className={`flex-1 bg-surface ${className}`} {...rest}>
      {children}
    </SafeAreaView>
  );
}
