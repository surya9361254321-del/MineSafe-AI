import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { TraineeStackParamList } from '../../navigation/types';
import { theme } from '../../theme/theme';

type Navigation = NativeStackNavigationProp<TraineeStackParamList>;

export const TrainingScreen = () => {
  const navigation = useNavigation<BottomTabNavigationProp<import('../../navigation/types').TraineeTabParamList>>();
  const stackNavigation = navigation.getParent<Navigation>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.eyebrow}>TRAINING CENTER</Text>
      <Text style={styles.title}>Build your response instinct.</Text>
      <Text style={styles.subtitle}>
        Practice the decisions that keep your crew safe before an incident happens.
      </Text>

      <Card style={styles.primaryCard}>
        <Text style={styles.cardEyebrow}>RECOMMENDED NEXT</Text>
        <Text style={styles.cardTitle}>Emergency procedures</Text>
        <Text style={styles.cardText}>
          Scan a module QR code to launch an immersive training session.
        </Text>
        <Button title="Scan Training Module" onPress={() => stackNavigation?.navigate('QRScanner')} />
      </Card>

      <Text style={styles.sectionTitle}>Training Library</Text>
      <Card style={styles.libraryCard}>
        <Text style={styles.libraryTitle}>Incident readiness fundamentals</Text>
        <Text style={styles.libraryText}>Evacuation, communication, and first response.</Text>
        <Button
          title="Open AR Preview"
          variant="secondary"
          onPress={() => stackNavigation?.navigate('ARLaunch', { moduleId: 'fundamentals' })}
        />
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
  },
  eyebrow: {
    ...theme.typography.label,
    color: theme.colors.accent,
    marginBottom: theme.spacing.sm,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    ...theme.typography.bodyLarge,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.lg,
  },
  primaryCard: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
  },
  cardEyebrow: {
    ...theme.typography.label,
    color: '#FFFFFF99',
    marginBottom: theme.spacing.sm,
  },
  cardTitle: {
    ...theme.typography.h2,
    color: theme.colors.card,
    marginBottom: theme.spacing.sm,
  },
  cardText: {
    ...theme.typography.body,
    color: '#FFFFFFCC',
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  libraryCard: {
    padding: theme.spacing.lg,
  },
  libraryTitle: {
    ...theme.typography.bodyLarge,
    color: theme.colors.text.primary,
    fontWeight: '700',
    marginBottom: theme.spacing.xs,
  },
  libraryText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.lg,
  },
});
