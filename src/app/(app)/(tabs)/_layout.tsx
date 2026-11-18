import { Tabs } from "expo-router/js-tabs";
import { type ColorValue, StyleSheet } from "react-native";

import { Icon, type IconName } from "@/components/chat/icon";
import { C } from "@/constants/chat-theme";

const tabIcon =
  (name: IconName) =>
  ({ color }: { color: ColorValue }) => <Icon name={name} size={26} color={color} />;

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: C.textPrimary,
        tabBarInactiveTintColor: C.textSecondary,
        tabBarLabelStyle: { fontSize: 10, fontWeight: "500", letterSpacing: 0.05 },
        tabBarStyle: {
          backgroundColor: C.surfacePanel,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: C.panelBorder,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Chats", tabBarIcon: tabIcon("chats") }} />
      <Tabs.Screen name="explore" options={{ title: "Explorar", tabBarIcon: tabIcon("explore") }} />
      <Tabs.Screen name="profile" options={{ title: "Perfil", tabBarIcon: tabIcon("profile") }} />
    </Tabs>
  );
}
