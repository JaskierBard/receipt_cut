import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../src/firebaseConfig";
import { mainStyles } from "../styles/main";

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      console.log(response);
    } catch (err) {
      console.log(err);
      alert("błąd logowania");
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      console.log(response);
      if (response.user) {
        await sendEmailVerification(response.user);
        alert("Sprawdź maila w celu weryfikacji konta");
      }    } catch (err) {
      console.log(err);
      alert("błąd rejestracji");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/background.jpeg")}
      style={mainStyles.background}
    >
      <View style={styles.container}>
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          style={styles.input}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Button title="Login" onPress={signIn} />
        <Button title="Stwórz konto" onPress={signUp} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: "50%",
    height: "50%",
    width: "90%",
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderWidth: 1, 
    borderColor: "gold",
  },
  input: {
    width: '90%',
    height: 40,
    borderColor: "gold",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    color: "gold",
    fontSize: 20
  },
  error: {
    color: "red",
    marginBottom: 12,
  },
});

export default LoginScreen;
