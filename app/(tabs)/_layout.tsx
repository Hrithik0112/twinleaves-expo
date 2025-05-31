import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { View, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import Header from "@/components/Header";
import { Provider } from "react-redux";
import { store } from "@/store/store";


function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: route.name !== "profile",
        header: () => (route.name !== "profile" ? <Header /> : null),
        tabBarStyle: styles.tabBar,
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="shopping-cart" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
    </Provider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    paddingBottom: 5,
    paddingTop: 5,
  },
  centerButton: {
    width: 48,
    height: 48,
    backgroundColor: "#4CAF50",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
});