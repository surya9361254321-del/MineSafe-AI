import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ViroARSceneNavigator } from '@reactvision/react-viro';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { getARSession } from './arService';
import { ARSurfaceScene } from './ARSurfaceScene';
import { TrainingOverlay } from './TrainingOverlay';
import { TrainingCompletionResult, TrainingStep } from './TrainingStep';
import { TraineeStackParamList } from '../../navigation/types';
import { theme } from '../../theme/theme';

type Props = NativeStackScreenProps<TraineeStackParamList, 'ARTraining'>;

export const ARTrainingScreen = ({ navigation, route }: Props) => {
  const [currentStep, setCurrentStep] = React.useState(TrainingStep.SELECT_EXTINGUISHER);
  const [completionResult, setCompletionResult] = React.useState<TrainingCompletionResult | null>(null);
  const session = getARSession(route.params.sessionId);

  React.useEffect(() => {
    navigation.setOptions({ gestureEnabled: false });
  }, [navigation]);

  const handleExtinguisherSelected = () => {
    console.log('Training started');
    setCurrentStep((step) => (step === TrainingStep.SELECT_EXTINGUISHER ? TrainingStep.PULL_PIN : step));
  };

  const handleTrainingAction = () => {
    setCurrentStep((step) => {
      switch (step) {
        case TrainingStep.PULL_PIN:
          return TrainingStep.AIM;
        case TrainingStep.AIM:
          return TrainingStep.SQUEEZE;
        case TrainingStep.SQUEEZE:
          return TrainingStep.SWEEP;
        case TrainingStep.SWEEP: {
          const result: TrainingCompletionResult = {
            status: 'PASS',
            completedAt: new Date().toISOString().slice(0, 10),
          };
          setCompletionResult(result);
          return TrainingStep.COMPLETE;
        }
        default:
          return step;
      }
    });
  };

  if (!session) {
    return (
      <View style={styles.centered}>
        <Text style={styles.title}>AR session unavailable</Text>
        <Text style={styles.subtitle}>Start the scenario again to create a new training session.</Text>
        <Button title="Back to Training" onPress={() => navigation.popToTop()} />
      </View>
    );
  }

  return (
    <View style={styles.arContainer}>
      <ViroARSceneNavigator
        autofocus
        viroAppProps={{
          onExtinguisherSelected: handleExtinguisherSelected,
        }}
        initialScene={{
          scene: ARSurfaceScene,
        }}
        style={styles.arView}
      />
      {/*
      <View style={styles.overlay} pointerEvents="box-none">
        <View style={styles.overlayHeader}>
          <Text style={styles.eyebrow}>AR TRAINING SESSION</Text>
          <Text style={styles.overlayTitle}>{session.scenario.trainingModule}</Text>
          <Text style={styles.overlaySubtitle}>Tap a detected surface to place the extinguisher.</Text>
        </View>
        <TrainingOverlay
          currentStep={currentStep}
          completionResult={completionResult}
          onAction={handleTrainingAction}
          onContinue={() => navigation.navigate('ARAssessment', { sessionId: session.id })}
        />
      </View>
      */}
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
  arContainer: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  arView: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    padding: theme.spacing.lg,
  },
  overlayHeader: {
    backgroundColor: 'rgba(15, 23, 42, 0.82)',
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginTop: theme.spacing.lg,
  },
  overlayTitle: {
    ...theme.typography.h3,
    color: theme.colors.card,
  },
  overlaySubtitle: {
    ...theme.typography.body,
    color: '#FFFFFFCC',
    marginTop: theme.spacing.xs,
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
    borderColor: theme.colors.accent,
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
  sessionText: {
    ...theme.typography.bodySmall,
    color: theme.colors.secondary,
    marginTop: theme.spacing.lg,
  },
});
