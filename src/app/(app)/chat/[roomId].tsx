import { useAuthStore } from "@features/auth/presentation/store/authStore";
import { Message } from "@features/chat/domain/entities/Message";
import { useChat } from "@features/chat/presentation/hooks/useChat";
import { useImagePicker } from "@features/chat/presentation/hooks/useImagePicker";
import { useRooms } from "@features/chat/presentation/hooks/useRooms";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Avatar } from "@/components/chat/avatar";
import { ChatInputBar } from "@/components/chat/chat-input-bar";
import { Icon } from "@/components/chat/icon";
import { MessageBubble } from "@/components/chat/message-bubble";
import { C, T } from "@/constants/chat-theme";

type Item =
  | { type: "date"; id: string; label: string }
  | { type: "msg"; id: string; message: Message; isFirstInGroup: boolean };

function dayLabel(d: Date) {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  if (d.toDateString() === today.toDateString()) return "Hoy";
  if (d.toDateString() === yesterday.toDateString()) return "Ayer";
  return d.toLocaleDateString([], { weekday: "long", day: "numeric", month: "long" });
}

export default function ChatScreen() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const { messages, sendMessage, sendImage, imageError, isLoading } = useChat(roomId);
  const { takePhoto, pickFromGallery } = useImagePicker();
  const [viewerUrl, setViewerUrl] = useState<string | null>(null);
  const { rooms } = useRooms();
  const user = useAuthStore((s) => s.user);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [input, setInput] = useState("");
  const listRef = useRef<FlatList<Item>>(null);

  const roomName = rooms.find((r) => r.id === roomId)?.name ?? "Sala";

  // Separadores por día + agrupación de mensajes consecutivos del mismo autor
  const items = useMemo<Item[]>(() => {
    const out: Item[] = [];
    let lastDay = "";
    let lastUser = "";
    for (const m of messages) {
      const day = m.createdAt.toDateString();
      if (day !== lastDay) {
        out.push({ type: "date", id: `d-${day}`, label: dayLabel(m.createdAt) });
        lastDay = day;
        lastUser = "";
      }
      out.push({ type: "msg", id: m.id, message: m, isFirstInGroup: m.userId !== lastUser });
      lastUser = m.userId;
    }
    return out;
  }, [messages]);

  useEffect(() => {
    if (items.length > 0) listRef.current?.scrollToEnd({ animated: true });
  }, [items.length]);

  const handleSend = useCallback(async () => {
    if (!input.trim()) return;
    sendMessage(input.trim());
    setInput("");
  }, [input, sendMessage]);

  const handlePicked = useCallback(
    async (pick: () => Promise<{ uri: string; mimeType?: string } | null>) => {
      const img = await pick();
      if (img) sendImage(img);
    },
    [sendImage],
  );

  const renderItem = ({ item }: { item: Item }) =>
    item.type === "date" ? (
      <View style={styles.dateWrap}>
        <Text style={[T.caption, styles.date]}>{item.label}</Text>
      </View>
    ) : (
      <MessageBubble
        message={item.message}
        isOwn={item.message.userId === user?.id}
        isFirstInGroup={item.isFirstInGroup}
        onPressImage={setViewerUrl}
      />
    );

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 4 }]}>
        <Pressable onPress={() => router.back()} hitSlop={10} style={styles.back}>
          <Icon name="back" size={24} color={C.textPrimary} />
        </Pressable>
        <Avatar name={roomName} size={36} room />
        <View style={{ flex: 1 }}>
          <Text style={T.name} numberOfLines={1}>
            {roomName}
          </Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            {messages.length} mensajes · en tiempo real
          </Text>
        </View>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {isLoading ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color={C.product} />
          </View>
        ) : (
          <FlatList
            ref={listRef}
            data={items}
            keyExtractor={(i) => i.id}
            renderItem={renderItem}
            contentContainerStyle={items.length === 0 ? { flexGrow: 1 } : { paddingVertical: 8 }}
            onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: false })}
            keyboardDismissMode="interactive"
            ListEmptyComponent={
              <View style={styles.centered}>
                <View style={styles.emptyBox}>
                  <Icon name="wave" size={32} color={C.product} weight="duotone" style={{ alignSelf: "center" }} />
                  <Text style={[T.caption, { textAlign: "center" }]}>
                    Aún no hay mensajes en #{roomName}
                  </Text>
                  <Text style={[T.body, { fontSize: 12, textAlign: "center" }]}>
                    Escribe el primero y empieza la conversación
                  </Text>
                </View>
              </View>
            }
          />
        )}
        {imageError && <Text style={styles.error}>{imageError}</Text>}
        <ChatInputBar
          value={input}
          onChangeText={setInput}
          onSend={handleSend}
          onPickGallery={() => handlePicked(pickFromGallery)}
          onTakePhoto={() => handlePicked(takePhoto)}
        />
      </KeyboardAvoidingView>

      {/* Visor de imagen a pantalla completa */}
      <Modal visible={!!viewerUrl} transparent animationType="fade" onRequestClose={() => setViewerUrl(null)}>
        <View style={styles.viewer}>
          {viewerUrl && <Image source={{ uri: viewerUrl }} style={StyleSheet.absoluteFill} contentFit="contain" />}
          <Pressable
            onPress={() => setViewerUrl(null)}
            hitSlop={12}
            accessibilityLabel="Cerrar imagen"
            style={[styles.viewerClose, { top: insets.top + 8 }]}
          >
            <Icon name="close" size={22} color="#fff" weight="bold" />
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.chatBg },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingRight: 16,
    paddingBottom: 8,
    backgroundColor: C.chatPanel,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: C.separator,
  },
  back: { paddingLeft: 8, paddingRight: 2, paddingVertical: 4 },
  subtitle: { fontSize: 12, color: C.textAlpha, letterSpacing: -0.12 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center", padding: 32 },
  dateWrap: { alignItems: "center", paddingTop: 16, paddingBottom: 4 },
  date: {
    backgroundColor: C.surface,
    borderWidth: 0.66,
    borderColor: C.bubbleBorder,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 3,
    minWidth: 100,
    textAlign: "center",
    overflow: "hidden",
  },
  error: { color: C.danger, fontSize: 12, textAlign: "center", paddingVertical: 4, backgroundColor: C.chatPanel },
  viewer: { flex: 1, backgroundColor: "#000" },
  viewerClose: {
    position: "absolute",
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyBox: {
    backgroundColor: "#FFF6D6",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 4,
    maxWidth: 280,
  },
});
