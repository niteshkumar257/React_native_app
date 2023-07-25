import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';

const ForceUpdateModal = ({ isVisible, latestVersion, whatsNew, onClose }) => {
    const logo=require("../assets/gwlogo.png");
  return (
    <Modal visible={isVisible} transparent>
      <View style={styles.container}>
        <View style={styles.modalContent}>
          <Image
            source={logo} // Replace with your app logo image source
            style={styles.logo}
          />
          <Text style={styles.message}>A new version (v{latestVersion}) is available.</Text>
          <Text style={styles.whatsNew}>What's New:</Text>
          <Text style={styles.whatsNewContent}>{whatsNew}</Text>
          <TouchableOpacity onPress={onClose} style={styles.updateButton}>
            <Text style={styles.updateButtonText}>Update Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  whatsNew: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  whatsNewContent: {
    fontSize: 14,
    marginBottom: 15,
    textAlign: 'center',
  },
  updateButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  updateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ForceUpdateModal;
