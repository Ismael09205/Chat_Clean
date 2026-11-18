import { memo } from 'react';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

import type { Message } from '@features/chat/domain/entities/Message';
import { C, T, colorFor } from '@/constants/chat-theme';
import { Icon } from './icon';

type Props = {
  message: Message;
  isOwn: boolean;
  /** Primer mensaje de un bloque consecutivo del mismo autor: muestra nombre y "cola". */
  isFirstInGroup: boolean;
  onPressImage?: (url: string) => void;
};

const formatTime = (d: Date) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

function MessageBubbleBase({ message, isOwn, isFirstInGroup, onPressImage }: Props) {
  const pending = message.id.startsWith('temp-');
  const author = message.authorUsername || 'Usuario';
  const hasImage = !!message.imageUrl;
  const hasText = message.content.trim().length > 0;

  const meta = (overlay: boolean) => (
    <View style={overlay ? styles.metaOverlay : styles.meta}>
      <Text style={[T.time, overlay && { color: '#fff' }]}>{formatTime(message.createdAt)}</Text>
      {isOwn &&
        (pending ? (
          <Icon name="clock" size={13} color={overlay ? '#fff' : C.textAlpha} />
        ) : (
          <Icon name="check" size={17} color={overlay ? '#fff' : C.read} />
        ))}
    </View>
  );

  return (
    <Animated.View
      entering={FadeInUp.duration(180)}
      style={[styles.row, isOwn ? styles.rowOwn : styles.rowOther, { marginTop: isFirstInGroup ? 8 : 2 }]}
    >
      <View
        style={[
          styles.bubble,
          isOwn ? styles.own : styles.other,
          isFirstInGroup && (isOwn ? styles.tailOwn : styles.tailOther),
          hasImage && styles.imageBubble,
        ]}
      >
        {!isOwn && isFirstInGroup && (
          <Text style={[styles.author, { color: colorFor(author) }, hasImage && styles.authorImage]} numberOfLines={1}>
            {author}
          </Text>
        )}
        {hasImage && (
          <Pressable onPress={() => onPressImage?.(message.imageUrl!)} disabled={pending}>
            <Image
              source={{ uri: message.imageUrl }}
              style={[styles.image, pending && { opacity: 0.6 }]}
              contentFit="cover"
              transition={200}
            />
            {!hasText && meta(true)}
          </Pressable>
        )}
        {/* Texto + hora en flujo: si no cabe en la misma línea, la hora baja a la siguiente */}
        {(hasText || !hasImage) && (
          <View style={[styles.content, hasImage && styles.captionPad]}>
            <Text style={[T.message, styles.text]}>{message.content}</Text>
            {meta(false)}
          </View>
        )}
      </View>
    </Animated.View>
  );
}

export const MessageBubble = memo(MessageBubbleBase);

const styles = StyleSheet.create({
  row: { paddingHorizontal: 16 },
  rowOwn: { alignItems: 'flex-end' },
  rowOther: { alignItems: 'flex-start' },
  bubble: {
    maxWidth: '82%',
    minWidth: 88,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingTop: 5.5,
    paddingBottom: 6.5,
    borderWidth: 0.66,
    borderColor: C.bubbleBorder,
  },
  own: { backgroundColor: C.bubbleMe },
  other: { backgroundColor: C.bubbleFriend },
  tailOwn: { borderTopRightRadius: 3 },
  tailOther: { borderTopLeftRadius: 3 },
  author: { fontSize: 14, fontWeight: '600', lineHeight: 19, letterSpacing: -0.14 },
  content: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-end', columnGap: 8 },
  text: { flexShrink: 1 },
  imageBubble: { padding: 4, paddingTop: 4, paddingBottom: 4 },
  image: { width: 240, height: 240, borderRadius: 8, backgroundColor: 'rgba(0,0,0,0.06)' },
  authorImage: { paddingHorizontal: 6, paddingBottom: 3 },
  captionPad: { paddingHorizontal: 6, paddingTop: 4, paddingBottom: 2 },
  metaOverlay: {
    position: 'absolute',
    right: 6,
    bottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  meta: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginBottom: -2,
    height: 17,
  },
});
