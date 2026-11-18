import { StyleSheet, TextInput, View } from 'react-native';

import { C } from '@/constants/chat-theme';
import { Icon } from './icon';

type Props = { value: string; onChangeText: (t: string) => void; placeholder?: string };

export function SearchInput({ value, onChangeText, placeholder = 'Buscar' }: Props) {
  return (
    <View style={styles.box}>
      <Icon name="search" size={20} color={C.textSecondary} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={C.textSecondary}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: C.surfaceSearch,
    borderRadius: 10,
    paddingHorizontal: 8,
    height: 38,
    marginHorizontal: 16,
  },
  input: { flex: 1, fontSize: 16.4, color: C.textPrimary, paddingVertical: 0 },
});
