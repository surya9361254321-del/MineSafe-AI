import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { TraineeStackParamList } from '../../navigation/types';
import { theme } from '../../theme/theme';
import { launchARScenario } from './arService';

type Props = NativeStackScreenProps<TraineeStackParamList, 'ARLaunch'>;

export const ARLaunchScreen = ({ navigation, route }: Props) => {
  const {
    scenarioName = 'Fire Incident Scenario',
    trainingModule = 'Fire Extinguisher Safety Training',
    riskLevel = 'High',
  } = route.params;

  const handleLaunch = async () => {
    try {
      const session = await launchARScenario(route.params.assetCode ?? 'FIRE_001');
      navigation.navigate('ARTraining', { sessionId: session.id });
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Unable to launch AR scenario.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.eyebrow}>IMMERSIVE TRAINING</Text>
      <Text style={styles.title}>{trainingModule.toUpperCase()}</Text>
      <Text style={styles.subtitle}>{scenarioName.toUpperCase()}</Text>

      <View style={styles.riskBadge}>
        <Text style={styles.riskText}>{riskLevel.toUpperCase()} RISK SCENARIO</Text>
      </View>

      <View style={styles.metaRow}>
        <View>
          <Text style={styles.metaLabel}>DURATION</Text>
          <Text style={styles.metaValue}>5 min</Text>
        </View>
        <View>
          <Text style={styles.metaLabel}>DIFFICULTY</Text>
          <Text style={styles.metaValue}>Beginner</Text>
        </View>
      </View>

      <Card style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Objectives</Text>
        <Text style={styles.objective}>Identify the correct extinguisher</Text>
        <Text style={styles.objective}>Pull the safety pin</Text>
        <Text style={styles.objective}>Aim at the base of the fire</Text>
        <Text style={styles.objective}>Sweep effectively</Text>
      </Card>

      <Card style={styles.equipmentCard}>
        <Text style={styles.sectionTitle}>Equipment Required</Text>
        <Text style={styles.equipment}>✓ {route.params.assetName ?? 'Fire Extinguisher'}</Text>
      </Card>

      <Button
        title="Launch AR Training"
        onPress={handleLaunch}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
  },
  eyebrow: {
    ...theme.typography.label,
    color: theme.colors.accent,
    marginBottom: theme.spacing.lg,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: theme.colors.card,
    letterSpacing: 1,
  },
  subtitle: {
    ...theme.typography.h2,
    color: '#FFFFFFCC',
    marginBottom: theme.spacing.xl,
  },
  riskBadge: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.error,
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  riskText: {
    ...theme.typography.label,
    color: theme.colors.card,
  },
  metaRow: {
    flexDirection: 'row',
    gap: theme.spacing.xxl,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#FFFFFF33',
    paddingVertical: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  metaLabel: {
    ...theme.typography.label,
    color: '#FFFFFF99',
    marginBottom: theme.spacing.xs,
  },
  metaValue: {
    ...theme.typography.bodyLarge,
    color: theme.colors.card,
    fontWeight: '700',
  },
  sectionCard: {
    padding: theme.spacing.lg,
  },
  equipmentCard: {
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  objective: {
    ...theme.typography.bodyLarge,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.sm,
  },
  equipment: {
    ...theme.typography.bodyLarge,
    color: theme.colors.success,
    fontWeight: '700',
  },
});
