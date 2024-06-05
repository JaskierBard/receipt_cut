import React from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  Text,
} from "react-native";
interface Props {
  processingTime:number
}

const ProcessingLoader = ({processingTime}:Props) => (
  <View style={styles.container}>
    <ImageBackground
    source={require("../../../assets/background.jpeg")}
    style={styles.background}
    >
      <ActivityIndicator size={100} color="gold" style={styles.spinner} />
      <View style={styles.funny}>
        <Text style={styles.text}>Trwa przepisywanie...</Text>
        <Text style={styles.text}>{processingTime}</Text>
      </View>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    height: "95%",
    margin: "5%",
    justifyContent: "center",
    alignSelf: "center",
  },
  spinner: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    alignSelf: "center",
  },
  background: {
    flex: 1,
    borderRadius: 10,
  },

  funny: {
    width: "100%",
    height: "100%",
    position: "absolute",
    marginTop: "25%",
    justifyContent: "center",
  },

  text: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
});

export default ProcessingLoader;
