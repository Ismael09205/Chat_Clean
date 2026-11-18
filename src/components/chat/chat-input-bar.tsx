import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import Animated, { FadeIn, FadeOut, ZoomIn, ZoomOut } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { C } from '@/constants/chat-theme';
import { Icon } from './icon';

type Props = {
  value: string;
  onChangeText: (t: string) => void;
  onSend: () => void;
  onPickGallery: () => void;
  onTakePhoto: () => void;
};

/** Barra de escritura basada en el "Input bar" de Figma: [+] [input] [cámara | enviar] */
export function ChatInputBar({ value, onChangeText, onSend, onPickGallery, onTakePhoto }: Props) {
  const insets = useSafeAreaInsets();
  const canSend = value.trim().length > 0;

  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 6) }]}>
      <Pressable
        onPress={onPickGallery}
        accessibilityLabel="Enviar foto de la galería"
        hitSlop={6}
        style={({ pressed }) => [styles.iconBtn, pressed && styles.pressed]}
      >
        <Icon name="attach" size={32} color={C.textPrimary} />
      </Pressable>

      <View style={styles.input}>
        <TextInput
          style={styles.text}
          value={value}
          onChangeText={onChangeText}
          placeholder="Mensaje"
          placeholderTextColor={C.textSecondary}
          multiline
          maxLength={500}
        />
      </View>

      {canSend ? (
        <Animated.View key="send" entering={ZoomIn.duration(150)} exiting={ZoomOut.duration(120)}>
          <Pressable
            onPress={onSend}
            accessibilityLabel="Enviar mensaje"
            style={({ pressed }) => [styles.send, pressed && { transform: [{ scale: 0.92 }] }]}
          >
            <Icon name="send" size={18} color={C.textInvert} weight="fill" />
          </Pressable>
        </Animated.View>
      ) : (
        <Animated.View key="camera" entering={FadeIn.duration(150)} exiting={FadeOut.duration(100)}>
          <Pressable
            onPress={onTakePhoto}
            accessibilityLabel="Tomar foto"
            hitSlop={6}
            style={({ pressed }) => [styles.iconBtn, pressed && styles.pressed]}
          >
            <Icon name="camera" size={32} color={C.textPrimary} />
          </Pressable>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    paddingLeft: 7,
    paddingRight: 9,
    paddingTop: 6,
    backgroundColor: C.chatPanel,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: C.separator,
  },
  iconBtn: { height: 36, justifyContent: 'center' },
  pressed: { opacity: 0.5 },
  input: {
    flex: 1,
    minHeight: 36,
    backgroundColor: C.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: C.inputBorder,
    borderRadius: 18,
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  text: { fontSize: 16, lineHeight: 21, color: C.textPrimary, maxHeight: 105, paddingVertical: 7 },
  send: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: C.product,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
