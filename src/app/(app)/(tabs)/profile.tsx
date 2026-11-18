import { useAuth } from "@features/auth/presentation/hooks/useAuth";
import { useRooms } from "@features/chat/presentation/hooks/useRooms";
import type { ReactNode } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { Avatar } from "@/components/chat/avatar";
import { Icon, type IconName } from "@/components/chat/icon";
import { ScreenHeader } from "@/components/chat/screen-header";
import { C, T } from "@/constants/chat-theme";

function Row({
  icon,
  iconBg,
  label,
  value,
  onPress,
  last,
  danger,
}: {
  icon: IconName;
  iconBg: string;
  label: string;
  value?: ReactNode;
  onPress?: () => void;
  last?: boolean;
  danger?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => [styles.row, pressed && { backgroundColor: "#ECECEC" }]}
    >
      <View style={[styles.rowIcon, { backgroundColor: iconBg }]}>
        <Icon name={icon} size={17} color="#fff" weight="fill" />
      </View>
      <View style={[styles.rowText, !last && styles.divider]}>
        <Text style={[styles.rowLabel, danger && { color: C.danger }]}>{label}</Text>
        {value != null && (
          <Text style={[T.body, { flexShrink: 1 }]} numberOfLines={1}>
            {value}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const { rooms } = useRooms();
  const name = user?.username || user?.email?.split("@")[0] || "Usuario";
  const myRooms = rooms.filter((r) => r.createdBy === user?.id).length;

  return (
    <View style={styles.container}>
      <ScreenHeader title="Perfil" />
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <View style={styles.card}>
          <Avatar name={name} size={64} />
          <View style={{ flex: 1 }}>
            <Text style={[T.name, { fontSize: 20 }]} numberOfLines={1}>
              {name}
            </Text>
            <Text style={T.body} numberOfLines={1}>
              @{user?.username || "sin-usuario"}
            </Text>
          </View>
        </View>

        <Text style={styles.section}>CUENTA</Text>
        <View style={styles.group}>
          <Row icon="person" iconBg={C.read} label="Usuario" value={user?.username || "—"} />
          <Row icon="mail" iconBg="#F29C1F" label="Correo" value={user?.email} />
          <Row icon="group" iconBg={C.product} label="Salas creadas" value={String(myRooms)} last />
        </View>

        <Text style={styles.section}>SESIÓN</Text>
        <View style={styles.group}>
          <Row icon="logout" iconBg={C.danger} label="Cerrar sesión" onPress={logout} danger last />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.surfaceGrouped },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: C.surface,
    marginHorizontal: 16,
    marginTop: 12,
    padding: 14,
    borderRadius: 12,
  },
  section: { fontSize: 12, color: C.textSecondary, marginTop: 24, marginBottom: 6, marginLeft: 32 },
  group: { backgroundColor: C.surface, marginHorizontal: 16, borderRadius: 12, overflow: "hidden" },
  row: { flexDirection: "row", alignItems: "center", gap: 12, paddingLeft: 14 },
  rowIcon: { width: 30, height: 30, borderRadius: 7, alignItems: "center", justifyContent: "center" },
  rowText: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    paddingVertical: 13,
    paddingRight: 16,
  },
  rowLabel: { fontSize: 16, color: C.textPrimary },
  divider: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: C.separator },
});
