import React, { useState } from "react";
import { View, Text, Button, StyleSheet, ImageBackground, Image } from "react-native";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../src/firebaseConfig";
import * as ImagePicker from 'expo-image-picker';

const HomeScreen = ({ navigation }: any) => {
  const [image, setImage] = useState<string | null>(null);

  const handleLogout = async () => {
    await signOut(FIREBASE_AUTH);
    navigation.navigate("Login");
  };

  const takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/background.jpeg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Scan me </Text>
        {image && <Image source={{ uri: image }} style={styles.image} />}

        <Button title="Take Picture" onPress={takePicture} />

        {/* <Button title="Logout" onPress={handleLogout} /> */}
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
    marginTop: "3%",
    height: "95%",
    width: "90%",
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderWidth: 1, 
    borderColor: "gold",
  },
  text: {
    color: "white",
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default HomeScreen;
