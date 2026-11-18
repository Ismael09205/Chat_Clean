import { useAuth } from "@features/auth/presentation/hooks/useAuth";
import { Link } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text } from "react-native";

import { AuthError, AuthGroup, AuthInput, AuthLayout, PrimaryButton } from "@/components/chat/auth-form";
import { C } from "@/constants/chat-theme";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { register, isLoading, error } = useAuth();

  return (
    <AuthLayout title="Crear cuenta" subtitle="Elige un nombre de usuario para que te reconozcan">
      <AuthGroup>
        <AuthInput
          icon="person"
          placeholder="Usuario (sin espacios)"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <AuthInput
          icon="mail"
          placeholder="Correo"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <AuthInput
          icon="lock"
          placeholder="Contraseña (mín. 6 caracteres)"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          last
        />
      </AuthGroup>
      <AuthError message={error} />
      <PrimaryButton
        label="Registrarse"
        loading={isLoading}
        onPress={() => register({ email, password, username })}
      />
      <Link href="/(auth)/login" style={styles.link}>
        ¿Ya tienes cuenta? <Text style={styles.linkStrong}>Inicia sesión</Text>
      </Link>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  link: { marginTop: 4, textAlign: "center", color: C.textSecondary, fontSize: 15 },
  linkStrong: { color: C.product, fontWeight: "600" },
});
