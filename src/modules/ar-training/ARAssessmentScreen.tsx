import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { completeARScenario, getARSession, recordARAssessmentResult } from './arService';
import { TraineeStackParamList } from '../../navigation/types';
import { theme } from '../../theme/theme';

type Props = NativeStackScreenProps<TraineeStackParamList, 'ARAssessment'>;

export const ARAssessmentScreen = ({ navigation, route }: Props) => {
  const [result, setResult] = useState<Awaited<ReturnType<typeof completeARScenario>> | null>(null);
  const session = getARSession(route.params.sessionId);

  const handleComplete = async () => {
    if (!session) {
      return;
    }

    const assessmentResult = await completeARScenario(session);
    recordARAssessmentResult(session, assessmentResult);
    setResult(assessmentResult);
  };

  if (!session) {
    return (
      <View style={styles.centered}>
        <Text style={styles.title}>Assessment session unavailable</Text>
        <Button title="Back to Training" onPress={() => navigation.popToTop()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>AR ASSESSMENT</Text>
      <Text style={styles.title}>{session.scenario.name}</Text>
      <Text style={styles.subtitle}>Simulated assessment boundary for future AR interactions.</Text>

      {!result ? (
        <>
          <Card style={styles.placeholderCard}>
            <Text style={styles.placeholderTitle}>Assessment Placeholder</Text>
            <Text style={styles.placeholderText}>
              Future AR gesture selections, reaction timing, and mistake tracking will be collected here.
            </Text>
          </Card>
          <Button title="Complete Mock AR Assessment" onPress={handleComplete} />
        </>
      ) : (
        <Card style={styles.resultCard}>
          <Text style={styles.resultLabel}>SIMULATED RESULT</Text>
          <Text style={styles.score}>{result.score}%</Text>
          <Text style={styles.status}>{result.passed ? 'Assessment Passed' : 'Assessment Needs Review'}</Text>
          <Text style={styles.resultText}>Reaction time: {result.reactionTime}s</Text>
          <Text style={styles.resultText}>Completion time: {result.completionTime}s</Text>
          <Text style={styles.resultText}>Mistakes: {result.mistakes}</Text>
          <Button title="Return to Dashboard" onPress={() => navigation.popToTop()} />
        </Card>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
  },
  centered: {
    flex: 1,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
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
    textAlign: 'center',
  },
  subtitle: {
    ...theme.typography.bodyLarge,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  placeholderCard: {
    padding: theme.spacing.xl,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.secondary,
    borderStyle: 'dashed',
  },
  placeholderTitle: {
    ...theme.typography.h3,
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  placeholderText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  resultCard: {
    padding: theme.spacing.xl,
    alignItems: 'center',
  },
  resultLabel: {
    ...theme.typography.label,
    color: theme.colors.accent,
  },
  score: {
    fontSize: 52,
    fontWeight: '800',
    color: theme.colors.success,
    marginTop: theme.spacing.sm,
  },
  status: {
    ...theme.typography.h3,
    color: theme.colors.primary,
    marginBottom: theme.spacing.lg,
  },
  resultText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.xs,
  },
});
