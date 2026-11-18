import { useAuth } from "@features/auth/presentation/hooks/useAuth";
import { Link } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text } from "react-native";

import { AuthError, AuthGroup, AuthInput, AuthLayout, PrimaryButton } from "@/components/chat/auth-form";
import { C } from "@/constants/chat-theme";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useAuth();

  return (
    <AuthLayout title="Bienvenido" subtitle="Inicia sesión para unirte a tus salas">
      <AuthGroup>
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
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          last
        />
      </AuthGroup>
      <AuthError message={error} />
      <PrimaryButton label="Ingresar" loading={isLoading} onPress={() => login({ email, password })} />
      <Link href="/(auth)/register" style={styles.link}>
        ¿No tienes cuenta? <Text style={styles.linkStrong}>Regístrate</Text>
      </Link>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  link: { marginTop: 4, textAlign: "center", color: C.textSecondary, fontSize: 15 },
  linkStrong: { color: C.product, fontWeight: "600" },
});
