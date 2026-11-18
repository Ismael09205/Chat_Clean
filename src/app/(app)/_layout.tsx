import { Stack } from "expo-router";

import { C } from "@/constants/chat-theme";

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: C.surface },
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="chat/[roomId]" options={{ animation: "slide_from_right" }} />
    </Stack>
  );
}
