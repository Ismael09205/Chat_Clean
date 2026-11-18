import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import { C, T } from '@/constants/chat-theme';

type Props<K extends string> = {
  options: { key: K; label: string }[];
  value: K;
  onChange: (key: K) => void;
};

export function FilterChips<K extends string>({ options, value, onChange }: Props<K>) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {options.map((o) => {
        const active = o.key === value;
        return (
          <Pressable
            key={o.key}
            onPress={() => onChange(o.key)}
            style={({ pressed }) => [styles.chip, active && styles.active, pressed && { opacity: 0.7 }]}
          >
            <Text style={[T.chip, { color: active ? C.productDark : C.textSecondary }]}>{o.label}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { gap: 8, paddingHorizontal: 16 },
  chip: {
    height: 34,
    paddingHorizontal: 14,
    borderRadius: 19,
    backgroundColor: C.surfaceChip,
    justifyContent: 'center',
  },
  active: { backgroundColor: C.productSoft },
});
