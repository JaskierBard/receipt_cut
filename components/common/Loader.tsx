import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal,Text, ImageBackground } from 'react-native';

interface Props {
  text: string
}

const FullScreenLoader = ({text}:Props) => (
    <ImageBackground
    source={require("../../assets/background.jpeg")}
    style={styles.background}
  >
  <Modal transparent={true} animationType="none" visible={true}>
    <View style={styles.container}>
      <ActivityIndicator size="large" color="gold" />
      <Text style={styles.text}>{text}</Text>
    </View>
  </Modal>
  </ImageBackground>

);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  text: {
    marginTop: 10,
    color: 'white',
    fontSize: 20
  }
});

export default FullScreenLoader;
