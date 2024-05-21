import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal, ImageBackground } from 'react-native';

const FullScreenLoader: React.FC = () => (
    <ImageBackground
    source={require("../../assets/background.jpeg")}
    style={styles.background}
  >
  <Modal transparent={true} animationType="none" visible={true}>
    <View style={styles.container}>
      <ActivityIndicator size="large" color="gold" />
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
});

export default FullScreenLoader;
