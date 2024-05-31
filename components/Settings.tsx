import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  ImageBackground,
} from "react-native";

import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../src/firebaseConfig";

const Settings = ({ navigation }: any) => {
  const handleLogout = async () => {
    await signOut(FIREBASE_AUTH);
    navigation.navigate("Login");
  };

  return (
    <ImageBackground
      source={require("../assets/settings.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Wyloguj</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    marginTop: "10%",
    height: "94%",
    width: "96%",
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "gold",
  },
  button: {
    backgroundColor: "orange",
    borderWidth: 1,
    borderColor: "gold",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 200,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Settings;
