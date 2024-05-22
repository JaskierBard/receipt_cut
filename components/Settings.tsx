import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  Modal,
  Button,
} from "react-native";

import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../src/firebaseConfig";

export const SettingsHandle = ({ navigation }: any) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = async () => {
    await signOut(FIREBASE_AUTH);
    navigation.navigate("Login");
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={toggleModal}>
        <Image
          source={require("../assets/settings.png")}
          style={styles.image}
        />
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Button
              title="Logout"
              onPress={() => {
                handleLogout;
                setModalVisible(!modalVisible);
              }}
            />
            {/* <Button title="Close" onPress={toggleModal} /> */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 0,
    right: 0,
    margin: 10,
  },
  button: {
    width: 40,
    height: 40,
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

export default SettingsHandle;
