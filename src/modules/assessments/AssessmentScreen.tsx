import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TraineeStackParamList } from '../../navigation/types';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { theme } from '../../theme/theme';

type Props = {
  navigation: NativeStackNavigationProp<TraineeStackParamList, 'Assessment'>;
  route: any;
};

export const AssessmentScreen = ({ navigation, route }: Props) => {
  const [isStarted, setIsStarted] = useState(false);
  const scenarioTitle = route.params?.scenarioId === 'gas-leak' ? 'Gas Leak' : 'Fire Incident';
  const scenarioLocation = scenarioTitle === 'Gas Leak' ? 'Processing Plant' : 'Crusher Area';

  const handleFinish = () => {
    alert('Assessment completed successfully!');
    navigation.popToTop();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.eyebrow}>EMERGENCY RESPONSE SIMULATION</Text>
      <Text style={styles.title}>{scenarioTitle}</Text>
      <Text style={styles.subtitle}>
        Make the right decision under pressure and protect your crew.
      </Text>

      <Card style={styles.scenarioCard}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Location</Text>
          <Text style={styles.detailValue}>{scenarioLocation}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Risk Level</Text>
          <Text style={styles.riskValue}>High</Text>
        </View>
        <View style={styles.objectiveBlock}>
          <Text style={styles.detailLabel}>Objective</Text>
          <Text style={styles.objective}>Control the incident safely</Text>
        </View>
      </Card>

      {isStarted ? (
        <Card style={styles.questionCard}>
          <Text style={styles.questionLabel}>RESPONSE CHECK</Text>
          <Text style={styles.question}>
            What is your first action when the alarm is confirmed?
          </Text>
          <Button title="Submit Response" onPress={handleFinish} />
        </Card>
      ) : (
        <Button title="Start Assessment" onPress={() => setIsStarted(true)} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  scenarioCard: {
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  detailLabel: {
    ...theme.typography.label,
    color: theme.colors.text.secondary,
  },
  detailValue: {
    ...theme.typography.bodyLarge,
    color: theme.colors.text.primary,
    fontWeight: '600',
  },
  riskValue: {
    ...theme.typography.bodyLarge,
    color: theme.colors.error,
    fontWeight: '700',
  },
  objectiveBlock: {
    paddingTop: theme.spacing.md,
  },
  objective: {
    ...theme.typography.bodyLarge,
    color: theme.colors.text.primary,
    marginTop: theme.spacing.xs,
  },
  questionCard: {
    padding: theme.spacing.lg,
  },
  questionLabel: {
    ...theme.typography.label,
    color: theme.colors.accent,
    marginBottom: theme.spacing.md,
  },
  question: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
  },
});
