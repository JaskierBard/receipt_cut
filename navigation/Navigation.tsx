import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, StyleSheet } from "react-native";
import HomeScreen from "../screens/ScanScreen";
import Settings from "../screens/Settings";
import ShortReceipt from "../screens/ShortReceipt";
import {ListOfReceipts} from "../components/ListOfReceipts";

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
        name="scan"
        component={HomeScreen}

        options={{
          title: "Skanuj paragon",
          tabBarIcon: () => (
            <Image
              source={require("../assets/images/camera.png")}
              style={styles.backgroundImage}
            />
          ),
          headerShown: false,

        }}
      >
      </Tab.Screen>
      <Tab.Screen
        name="short"
        component={ShortReceipt}
        options={{
          title: "Dodaj paragon",
          tabBarIcon: () => (
            <Image
              source={require("../assets/images/receipt.png")}
              style={styles.backgroundImage}
            />
          ),
          headerShown: false,

        }}
      >
      </Tab.Screen>
      <Tab.Screen
        name="receipts"
        component={ListOfReceipts}
        options={{
          title: "Wcześniejsze paragony",
          tabBarIcon: () => (
            <Image
              source={require("../assets/images/list.png")}
              style={styles.backgroundImage}
            />
          ),
          headerShown: false,

        }}
      >
      </Tab.Screen>
      <Tab.Screen
        name="settings"
        component={Settings}

        options={{
          title: "Ustawienia",
          tabBarIcon: () => (
            <Image
              source={require("../assets/images/settings.png")}
              style={styles.backgroundImage}
            />
          ),
          headerShown: false,

        }}
      >
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  backgroundImage: {
    width: 30,
    height: 30,
  },
});
