import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { C, T } from '@/constants/chat-theme';
import { Avatar } from './avatar';
import { Icon } from './icon';

type Props = {
  visible: boolean;
  onClose: () => void;
  onCreate: (name: string, done: () => void) => void;
  isCreating: boolean;
  error: string | null;
};

const MAX = 50;

export function CreateRoomSheet({ visible, onClose, onCreate, isCreating, error }: Props) {
  const [name, setName] = useState('');
  const insets = useSafeAreaInsets();
  const valid = name.trim().length > 0;

  const close = () => {
    setName('');
    onClose();
  };

  const submit = () => {
    if (!valid || isCreating) return;
    onCreate(name.trim(), () => setName(''));
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={close}>
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={close} />
        <View style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]}>
          <View style={styles.grabber} />
          <View style={styles.header}>
            <Pressable onPress={close} hitSlop={10}>
              <Text style={styles.cancel}>Cancelar</Text>
            </Pressable>
            <Text style={T.name}>Nueva sala</Text>
            <Pressable onPress={submit} disabled={!valid || isCreating} hitSlop={10}>
              {isCreating ? (
                <ActivityIndicator color={C.product} />
              ) : (
                <Text style={[styles.create, !valid && { opacity: 0.4 }]}>Crear</Text>
              )}
            </Pressable>
          </View>

          <View style={styles.preview}>
            <Avatar name={name || 'Sala'} size={72} room />
            <Text style={[T.body, { textAlign: 'center' }]}>
              Las salas son espacios abiertos donde cualquier miembro puede conversar en tiempo real.
            </Text>
          </View>

          <Text style={styles.label}>NOMBRE DE LA SALA</Text>
          <View style={styles.inputBox}>
            <Icon name="hash" size={20} color={C.textSecondary} />
            <TextInput
              style={styles.input}
              placeholder="ej. general, proyectos, música"
              placeholderTextColor={C.textSecondary}
              value={name}
              onChangeText={setName}
              autoFocus
              maxLength={MAX}
              returnKeyType="done"
              onSubmitEditing={submit}
            />
            <Text style={styles.counter}>{MAX - name.length}</Text>
          </View>
          {error && <Text style={styles.error}>{error}</Text>}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.35)' },
  sheet: {
    backgroundColor: C.surfaceGrouped,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
  },
  grabber: {
    alignSelf: 'center',
    width: 36,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(0,0,0,0.2)',
    marginTop: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  cancel: { fontSize: 16, color: C.product },
  create: { fontSize: 16, fontWeight: '600', color: C.product },
  preview: { alignItems: 'center', gap: 12, paddingVertical: 12, paddingHorizontal: 24 },
  label: { fontSize: 12, color: C.textSecondary, marginTop: 12, marginBottom: 6, marginLeft: 12 },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: C.surface,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 48,
  },
  input: { flex: 1, fontSize: 16, color: C.textPrimary, paddingVertical: 0 },
  counter: { fontSize: 13, color: C.textSecondary },
  error: { color: C.danger, fontSize: 13, marginTop: 8, marginLeft: 12 },
});
