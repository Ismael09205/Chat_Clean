import { useAuthStore } from "@features/auth/presentation/store/authStore";
import { Room } from "@features/chat/domain/entities/Room";
import { useRooms } from "@features/chat/presentation/hooks/useRooms";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { ActivityIndicator, Pressable, SectionList, StyleSheet, Text, View } from "react-native";

import { Avatar } from "@/components/chat/avatar";
import { Icon } from "@/components/chat/icon";
import { ScreenHeader } from "@/components/chat/screen-header";
import { SearchInput } from "@/components/chat/search-input";
import { C, T } from "@/constants/chat-theme";

const WEEK = 7 * 24 * 60 * 60 * 1000;

export default function ExploreScreen() {
  const { rooms, isLoading } = useRooms();
  const userId = useAuthStore((s) => s.user?.id);
  const router = useRouter();
  const [query, setQuery] = useState("");

  // Organización tipo "comunidad": salas nuevas destacadas + directorio A–Z
  const sections = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matches = rooms.filter((r) => !q || r.name.toLowerCase().includes(q));
    const fresh = matches.filter((r) => Date.now() - r.createdAt.getTime() < WEEK);
    const all = [...matches].sort((a, b) => a.name.localeCompare(b.name));
    return [
      ...(fresh.length && !q ? [{ title: "NUEVAS ESTA SEMANA", data: fresh.slice(0, 5) }] : []),
      ...(all.length ? [{ title: q ? "RESULTADOS" : "TODAS LAS SALAS", data: all }] : []),
    ];
  }, [rooms, query]);

  const openRoom = (room: Room) =>
    router.push({ pathname: "/chat/[roomId]", params: { roomId: room.id } });

  return (
    <View style={styles.container}>
      <ScreenHeader title="Explorar">
        <SearchInput value={query} onChangeText={setQuery} placeholder="Descubre salas por nombre" />
      </ScreenHeader>

      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={C.product} />
        </View>
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(r, i) => `${r.id}-${i}`}
          stickySectionHeadersEnabled={false}
          keyboardDismissMode="on-drag"
          contentContainerStyle={sections.length === 0 ? { flexGrow: 1 } : { paddingBottom: 24 }}
          renderSectionHeader={({ section }) => (
            <Text style={styles.section}>{section.title}</Text>
          )}
          renderItem={({ item, index, section }) => (
            <Pressable
              onPress={() => openRoom(item)}
              style={({ pressed }) => [
                styles.item,
                index === 0 && styles.first,
                index === section.data.length - 1 && styles.last,
                pressed && { backgroundColor: "#ECECEC" },
              ]}
            >
              <Avatar name={item.name} size={40} room />
              <View style={[styles.itemText, index < section.data.length - 1 && styles.divider]}>
                <View style={{ flex: 1 }}>
                  <Text style={T.name} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={[T.body, { fontSize: 13 }]}>
                    {item.createdBy === userId ? "Creada por ti" : "Sala pública"} ·{" "}
                    {item.createdAt.toLocaleDateString()}
                  </Text>
                </View>
                <Icon name="chevron" size={14} color={C.textSecondary} />
              </View>
            </Pressable>
          )}
          ListEmptyComponent={
            <View style={styles.centered}>
              <Icon name="explore" size={40} color={C.textSecondary} />
              <Text style={T.name}>{query ? "Sin coincidencias" : "Nada por explorar aún"}</Text>
              <Text style={[T.body, { textAlign: "center" }]}>
                {query ? `No hay salas que contengan "${query}".` : "Cuando se creen salas aparecerán aquí."}
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.surfaceGrouped },
  centered: { flex: 1, justifyContent: "center", alignItems: "center", gap: 8, padding: 32 },
  section: { fontSize: 12, color: C.textSecondary, marginTop: 20, marginBottom: 6, marginLeft: 32 },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: C.surface,
    marginHorizontal: 16,
    paddingLeft: 12,
  },
  first: { borderTopLeftRadius: 12, borderTopRightRadius: 12 },
  last: { borderBottomLeftRadius: 12, borderBottomRightRadius: 12 },
  itemText: { flex: 1, flexDirection: "row", alignItems: "center", paddingVertical: 10, paddingRight: 14, gap: 8 },
  divider: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: C.separator },
});
