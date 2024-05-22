// TabNavigator.tsx

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, StyleSheet } from "react-native";
import Receipts from "./Receipts";
import HomeScreen from "./HomeScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleStyle: { color: "white" },
        tabBarHideOnKeyboard: true,
        headerStyle: {
          borderBottomWidth: 0,
        },
        headerTransparent: true,
        tabBarStyle: {
          borderTopWidth: 0.5,
          borderTopColor: "yellow",
          backgroundColor: "rgba(0,0,0,0.9)",
        },
      }}
    >
      <Tab.Screen
        name="missions"
        component={HomeScreen} // Zastąp Receipts odpowiednim komponentem

        options={{
          title: "Skanuj paragon",
          tabBarIcon: () => (
            <Image
              source={require("../assets/images/camera.png")}
              style={styles.backgroundImage}
            />
          ),
        }}
      >
      </Tab.Screen>
      <Tab.Screen
        name="npc"
        component={Receipts} // Zastąp Receipts odpowiednim komponentem

        options={{
          title: "Wcześniejsze paragony",
          tabBarIcon: () => (
            <Image
              source={require("../assets/images/list.png")}
              style={styles.backgroundImage}
            />
          ),
        }}
      >
      </Tab.Screen>
      <Tab.Screen
        name="settings"
        component={Receipts} // Zastąp Receipts odpowiednim komponentem

        options={{
          title: "Ustawienia",
          tabBarIcon: () => (
            <Image
              source={require("../assets/images/settings.png")}
              style={styles.backgroundImage}
            />
          ),
        }}
      >
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: 40,
  },
});
