import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { C, T } from '@/constants/chat-theme';

type Props = { title: string; right?: ReactNode; children?: ReactNode };

/** Cabecera de pestaña: acciones circulares arriba + título grande (Figma "Header" + "Title"). */
export function ScreenHeader({ title, right, children }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.wrap, { paddingTop: insets.top + 6 }]}>
      <View style={styles.actions}>{right}</View>
      <Text style={[T.title, styles.title]}>{title}</Text>
      {children}
    </View>
  );
}

type CircleProps = { children: ReactNode; primary?: boolean; onPress?: () => void; label?: string };

export function CircleButton({ children, primary, onPress, label }: CircleProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityLabel={label}
      hitSlop={8}
      style={({ pressed }) => [
        styles.circle,
        { backgroundColor: primary ? C.product : C.surfaceCircular },
        pressed && { transform: [{ scale: 0.92 }], opacity: 0.85 },
      ]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { backgroundColor: C.surface, paddingBottom: 8, gap: 8 },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
    paddingHorizontal: 16,
    minHeight: 32,
    alignItems: 'center',
  },
  title: { paddingHorizontal: 16 },
  circle: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
});
