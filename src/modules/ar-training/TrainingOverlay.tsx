import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from '../../components/Button';
import { theme } from '../../theme/theme';
import { TrainingCompletionResult, TrainingStep } from './TrainingStep';

interface TrainingOverlayProps {
  currentStep: TrainingStep;
  completionResult: TrainingCompletionResult | null;
  onAction: () => void;
  onContinue: () => void;
}

const stepLabels: Record<TrainingStep, string> = {
  [TrainingStep.SELECT_EXTINGUISHER]: 'Select extinguisher',
  [TrainingStep.PULL_PIN]: 'Pull pin',
  [TrainingStep.AIM]: 'Aim',
  [TrainingStep.SQUEEZE]: 'Squeeze',
  [TrainingStep.SWEEP]: 'Sweep',
  [TrainingStep.COMPLETE]: 'Complete',
};

const instructions: Record<TrainingStep, string> = {
  [TrainingStep.SELECT_EXTINGUISHER]: 'Tap the extinguisher to begin the training sequence.',
  [TrainingStep.PULL_PIN]: 'Pull the safety pin from the extinguisher handle.',
  [TrainingStep.AIM]: 'Aim the nozzle at the base of the fire.',
  [TrainingStep.SQUEEZE]: 'Squeeze the handle to release the extinguishing agent.',
  [TrainingStep.SWEEP]: 'Sweep the nozzle from side to side across the base of the fire.',
  [TrainingStep.COMPLETE]: 'All extinguisher safety steps are complete.',
};

const progressByStep: Record<TrainingStep, number> = {
  [TrainingStep.SELECT_EXTINGUISHER]: 0,
  [TrainingStep.PULL_PIN]: 20,
  [TrainingStep.AIM]: 40,
  [TrainingStep.SQUEEZE]: 60,
  [TrainingStep.SWEEP]: 80,
  [TrainingStep.COMPLETE]: 100,
};

const actionLabels: Partial<Record<TrainingStep, string>> = {
  [TrainingStep.PULL_PIN]: 'Pull Pin',
  [TrainingStep.AIM]: 'Aim',
  [TrainingStep.SQUEEZE]: 'Squeeze',
  [TrainingStep.SWEEP]: 'Sweep',
};

export const TrainingOverlay = ({
  currentStep,
  completionResult,
  onAction,
  onContinue,
}: TrainingOverlayProps) => {
  const isComplete = currentStep === TrainingStep.COMPLETE;
  const progress = progressByStep[currentStep];

  return (
    <View style={styles.container} pointerEvents="box-none">
      <View style={styles.card} pointerEvents="auto">
        <Text style={styles.brand}>MINESAFE AI TRAINING</Text>
        {isComplete ? (
          <>
            <Text style={styles.title}>Training Completed</Text>
            <Text style={styles.instruction}>{instructions[currentStep]}</Text>
            <Text style={styles.result}>PASS</Text>
            <Text style={styles.completedAt}>
              Completed {completionResult?.completedAt ?? 'now'}
            </Text>
            <Button title="Continue to AR Assessment" onPress={onContinue} />
          </>
        ) : (
          <>
            <View style={styles.stepRow}>
              <Text style={styles.stepLabel}>CURRENT STEP</Text>
              <Text style={styles.stepName}>{stepLabels[currentStep]}</Text>
            </View>
            <Text style={styles.instruction}>{instructions[currentStep]}</Text>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>PROGRESS</Text>
              <Text style={styles.progressValue}>{progress}%</Text>
            </View>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
            {actionLabels[currentStep] ? (
              <Button title={actionLabels[currentStep] ?? ''} onPress={onAction} />
            ) : null}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: theme.spacing.lg,
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.lg,
  },
  brand: {
    ...theme.typography.label,
    color: theme.colors.accent,
    marginBottom: theme.spacing.sm,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  stepRow: {
    marginBottom: theme.spacing.sm,
  },
  stepLabel: {
    ...theme.typography.label,
    color: theme.colors.text.secondary,
  },
  stepName: {
    ...theme.typography.h3,
    color: theme.colors.primary,
    marginTop: theme.spacing.xs,
  },
  instruction: {
    ...theme.typography.bodyLarge,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    ...theme.typography.label,
    color: theme.colors.text.secondary,
  },
  progressValue: {
    ...theme.typography.label,
    color: theme.colors.accent,
  },
  progressTrack: {
    height: 8,
    borderRadius: theme.borderRadius.full,
    backgroundColor: '#E2E8F0',
    overflow: 'hidden',
    marginTop: theme.spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.accent,
  },
  result: {
    ...theme.typography.h1,
    color: theme.colors.success,
    marginVertical: theme.spacing.sm,
  },
  completedAt: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.secondary,
  },
});
