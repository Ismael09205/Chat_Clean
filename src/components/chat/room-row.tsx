import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import type { Room } from '@features/chat/domain/entities/Room';
import { C, T } from '@/constants/chat-theme';
import { Avatar } from './avatar';

type Props = {
  room: Room;
  index: number;
  subtitle: string;
  isMine?: boolean;
  onPress: () => void;
};

export function formatListDate(d: Date) {
  const now = new Date();
  const sameDay = d.toDateString() === now.toDateString();
  if (sameDay) return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (d.toDateString() === yesterday.toDateString()) return 'Ayer';
  return d.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: '2-digit' });
}

export function RoomRow({ room, index, subtitle, isMine, onPress }: Props) {
  return (
    <Animated.View entering={FadeInDown.delay(Math.min(index, 10) * 30).duration(250)}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: 'rgba(0,0,0,0.06)' }}
        style={({ pressed }) => [styles.row, pressed && { backgroundColor: 'rgba(0,0,0,0.04)' }]}
      >
        <View style={styles.avatar}>
          <Avatar name={room.name} room />
        </View>
        <View style={styles.text}>
          <View style={styles.top}>
            <Text style={[T.name, styles.name]} numberOfLines={1}>
              {room.name}
            </Text>
            <Text style={T.body}>{formatListDate(room.createdAt)}</Text>
          </View>
          <View style={styles.top}>
            <Text style={[T.body, { flex: 1 }]} numberOfLines={1}>
              {subtitle}
            </Text>
            {isMine && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Tuya</Text>
              </View>
            )}
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 12.66, paddingLeft: 16, paddingTop: 10 },
  avatar: { paddingTop: 2 },
  text: {
    flex: 1,
    minHeight: 67.33,
    paddingRight: 15,
    gap: 3,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: C.separator,
  },
  top: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  name: { flex: 1 },
  badge: {
    backgroundColor: C.productSoft,
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  badgeText: { fontSize: 11, fontWeight: '600', color: C.productDark },
});
