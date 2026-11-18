import type { ReactNode } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  type TextInputProps,
  View,
} from 'react-native';
import LottieView from 'lottie-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { C, T } from '@/constants/chat-theme';
import { Icon, type IconName } from './icon';

export function AuthLayout({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Animated.View entering={FadeInDown.duration(350)} style={styles.brand}>
          {/* Animación "Messaging" de LottieFiles (Lottie Simple License), recoloreada al verde de la app */}
          <LottieView source={require('../../../assets/animations/chat-login.json')} autoPlay loop style={styles.lottie} />
          <Text style={[T.title, { textAlign: 'center' }]}>{title}</Text>
          <Text style={[T.body, { textAlign: 'center', fontSize: 15 }]}>{subtitle}</Text>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(100).duration(350)} style={styles.form}>
          {children}
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export function AuthInput({ icon, last, ...props }: TextInputProps & { icon: IconName; last?: boolean }) {
  return (
    <View style={styles.inputRow}>
      <Icon name={icon} size={18} color={C.textSecondary} />
      <View style={[styles.inputWrap, !last && styles.divider]}>
        <TextInput style={styles.input} placeholderTextColor={C.textSecondary} {...props} />
      </View>
    </View>
  );
}

export function AuthGroup({ children }: { children: ReactNode }) {
  return <View style={styles.group}>{children}</View>;
}

export function AuthError({ message }: { message: string | null }) {
  if (!message) return null;
  return <Text style={styles.error}>{message}</Text>;
}

export function PrimaryButton({ label, onPress, loading }: { label: string; onPress: () => void; loading?: boolean }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      style={({ pressed }) => [styles.button, (pressed || loading) && { opacity: 0.8 }, pressed && { transform: [{ scale: 0.98 }] }]}
    >
      {loading ? <ActivityIndicator color={C.textInvert} /> : <Text style={styles.buttonText}>{label}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: C.surfaceGrouped },
  container: { flexGrow: 1, justifyContent: 'center', padding: 24, gap: 28 },
  brand: { alignItems: 'center', gap: 8 },
  lottie: { width: 190, height: 190, marginBottom: -12 },
  form: { gap: 14 },
  group: { backgroundColor: C.surface, borderRadius: 12, overflow: 'hidden' },
  inputRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingLeft: 14 },
  inputWrap: { flex: 1, paddingRight: 14 },
  input: { height: 50, fontSize: 16, color: C.textPrimary },
  divider: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: C.separator },
  error: { color: C.danger, textAlign: 'center', fontSize: 14 },
  button: {
    backgroundColor: C.product,
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: { color: C.textInvert, fontWeight: '600', fontSize: 16 },
});
