import { StyleSheet, Text, View } from 'react-native';

import { colorFor } from '@/constants/chat-theme';

type Props = {
  name: string;
  size?: number;
  /** Sala: muestra "#" estilo comunidad en vez de iniciales. */
  room?: boolean;
};

export function Avatar({ name, size = 56, room = false }: Props) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');

  return (
    <View
      style={[
        styles.base,
        {
          width: size,
          height: size,
          borderRadius: room ? size * 0.32 : size / 2,
          backgroundColor: colorFor(name),
        },
      ]}
    >
      <Text style={[styles.text, { fontSize: size * (room ? 0.42 : 0.36) }]}>
        {room ? '#' : initials || '?'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(10,10,10,0.1)',
  },
  text: { color: '#fff', fontWeight: '700' },
});
