import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal } from 'react-native';

const FullScreenLoader: React.FC = () => (
  <Modal transparent={true} animationType="none" visible={true}>
    <View style={styles.container}>
      <ActivityIndicator size="large" color="gold" />
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default FullScreenLoader;
