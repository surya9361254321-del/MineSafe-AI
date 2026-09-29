import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TraineeStackParamList } from '../../navigation/types';
import { Button } from '../../components/Button';

type Props = {
  navigation: NativeStackNavigationProp<TraineeStackParamList, 'ARModule'>;
  route: any; // Assuming route has params like moduleId
};

export const ARPlaceholderScreen = ({ navigation, route }: Props) => {
  const { moduleId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AR Training Module</Text>
      <Text style={styles.subtitle}>Module ID: {moduleId}</Text>
      <View style={styles.placeholderBox}>
        <Text style={styles.placeholderText}>[ AR Camera & Overlays will render here ]</Text>
      </View>
      <Button 
        title="Finish & Take Assessment" 
        onPress={() => navigation.replace('Assessment', { moduleId })} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 20,
    textAlign: 'center',
  },
  placeholderBox: {
    flex: 1,
    backgroundColor: '#e9ecef',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#ced4da',
    borderStyle: 'dashed',
  },
  placeholderText: {
    color: '#6c757d',
    fontWeight: 'bold',
  },
});
