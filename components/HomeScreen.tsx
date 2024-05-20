import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../src/firebaseConfig";

const HomeScreen = ({ navigation }: any) => {
  const handleLogout = async () => {
    await signOut(FIREBASE_AUTH);
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text>Welcome to the Home Screen!</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
