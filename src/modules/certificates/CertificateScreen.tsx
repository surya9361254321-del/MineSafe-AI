import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const CertificateScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Certificate of Completion</Text>
      <View style={styles.certificateBox}>
        <Text style={styles.placeholderText}>[ Certificate PDF View ]</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  certificateBox: {
    width: '100%',
    height: 400,
    backgroundColor: '#fffcf2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 5,
    borderColor: '#d4af37',
  },
  placeholderText: {
    color: '#d4af37',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
