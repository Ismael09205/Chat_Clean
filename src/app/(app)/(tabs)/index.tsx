import { useAuthStore } from "@features/auth/presentation/store/authStore";
import { Room } from "@features/chat/domain/entities/Room";
import { useRooms } from "@features/chat/presentation/hooks/useRooms";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";

import { CreateRoomSheet } from "@/components/chat/create-room-sheet";
import { FilterChips } from "@/components/chat/filter-chips";
import { Icon } from "@/components/chat/icon";
import { RoomRow } from "@/components/chat/room-row";
import { CircleButton, ScreenHeader } from "@/components/chat/screen-header";
import { SearchInput } from "@/components/chat/search-input";
import { C, T } from "@/constants/chat-theme";

type Filter = "all" | "mine" | "recent";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "Todas" },
  { key: "mine", label: "Mis salas" },
  { key: "recent", label: "Recientes" },
];

const WEEK = 7 * 24 * 60 * 60 * 1000;

export default function RoomsScreen() {
  const { rooms, isLoading, error, createRoom, isCreating, createError } = useRooms();
  const userId = useAuthStore((s) => s.user?.id);
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const visibleRooms = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rooms.filter((r) => {
      if (q && !r.name.toLowerCase().includes(q)) return false;
      if (filter === "mine") return r.createdBy === userId;
      if (filter === "recent") return Date.now() - r.createdAt.getTime() < WEEK;
      return true;
    });
  }, [rooms, query, filter, userId]);

  const handleCreate = (name: string, done: () => void) => {
    createRoom(name, {
      onSuccess: () => {
        done();
        setModalVisible(false);
      },
    });
  };

  const openRoom = (room: Room) =>
    router.push({ pathname: "/chat/[roomId]", params: { roomId: room.id } });

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Chats"
        right={
          <CircleButton primary label="Crear sala" onPress={() => setModalVisible(true)}>
            <Icon name="add" size={20} color={C.textInvert} />
          </CircleButton>
        }
      >
        <SearchInput value={query} onChangeText={setQuery} placeholder="Buscar salas" />
        <FilterChips options={FILTERS} value={filter} onChange={setFilter} />
      </ScreenHeader>

      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={C.product} />
        </View>
      ) : (
        <FlatList
          data={visibleRooms}
          keyExtractor={(r) => r.id}
          renderItem={({ item, index }) => (
            <RoomRow
              room={item}
              index={index}
              isMine={item.createdBy === userId}
              subtitle="Toca para entrar a la conversación"
              onPress={() => openRoom(item)}
            />
          )}
          contentContainerStyle={visibleRooms.length === 0 ? { flexGrow: 1 } : { paddingBottom: 24 }}
          keyboardDismissMode="on-drag"
          ListEmptyComponent={
            <View style={styles.centered}>
              <View style={styles.emptyIcon}>
                <Icon name="chats" size={34} color={C.product} />
              </View>
              <Text style={T.name}>
                {error ? "No se pudieron cargar las salas" : query || filter !== "all" ? "Sin resultados" : "Aún no hay salas"}
              </Text>
              <Text style={[T.body, { textAlign: "center" }]}>
                {error ?? (query || filter !== "all" ? "Prueba con otro nombre o filtro." : "Crea la primera con el botón +")}
              </Text>
            </View>
          }
          ListFooterComponent={
            visibleRooms.length > 0 ? (
              <View style={styles.footer}>
                <Icon name="lock" size={12} color={C.textSecondary} />
                <Text style={styles.footerText}>
                  Los mensajes se sincronizan <Text style={{ color: C.product }}>en tiempo real</Text>
                </Text>
              </View>
            ) : null
          }
        />
      )}

      <CreateRoomSheet
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onCreate={handleCreate}
        isCreating={isCreating}
        error={createError}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.surface },
  centered: { flex: 1, justifyContent: "center", alignItems: "center", gap: 8, padding: 32 },
  emptyIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: C.productSoft,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  footer: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 4, paddingTop: 18 },
  footerText: { fontSize: 11, color: C.textSecondary },
});
