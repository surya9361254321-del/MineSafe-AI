import { mockQRAssets, mockScenarios, mockAssessmentAnalytics, mockAssessmentResults, mockCertificates, generateCertificateFromAssessment, mockUsers, mockTraineeAnalytics, mockAnalytics, mockScenarioAnalytics } from '../../data/mockData';
import { TrainingModule } from '../../types';
import { ARProvider, ARAssessmentResult, ARResultRecord, ARSession } from './arTypes';
import { mapARResultToAssessment, mapARResultToAssessmentAnalytics, mapAssetToARScenario } from './arMapper';

const activeSessions = new Map<string, ARSession>();

class MockARProvider implements ARProvider {
  async startSession(session: ARSession): Promise<ARSession> {
    return session;
  }

  async completeSession(session: ARSession): Promise<ARAssessmentResult> {
    const scenarioResults: Record<string, Omit<ARAssessmentResult, 'scenarioId'>> = {
      'fire-incident': {
        selectedEquipment: session.asset.assetName,
        reactionTime: 18,
        completionTime: 142,
        mistakes: 1,
        score: 92,
        passed: true,
      },
      'gas-leak': {
        selectedEquipment: session.asset.assetName,
        reactionTime: 24,
        completionTime: 198,
        mistakes: 2,
        score: 84,
        passed: true,
      },
      'electrical-hazard': {
        selectedEquipment: session.asset.assetName,
        reactionTime: 29,
        completionTime: 224,
        mistakes: 3,
        score: 76,
        passed: true,
      },
      'ppe-compliance': {
        selectedEquipment: session.asset.assetName,
        reactionTime: 12,
        completionTime: 96,
        mistakes: 0,
        score: 98,
        passed: true,
      },
    };

    return {
      scenarioId: session.scenario.id,
      ...(scenarioResults[session.scenario.id] ?? {
        selectedEquipment: session.asset.assetName,
        reactionTime: 30,
        completionTime: 240,
        mistakes: 3,
        score: 70,
        passed: false,
      }),
    };
  }
}

export const mockARProvider: ARProvider = new MockARProvider();

export const launchARScenario = async (assetCode: string): Promise<ARSession> => {
  const normalizedCode = assetCode.trim().toUpperCase();
  const asset = mockQRAssets.find((item) => item.assetCode === normalizedCode);

  if (!asset) {
    throw new Error(`QR asset ${normalizedCode} is not registered.`);
  }

  const scenario = mockScenarios.find((item) => item.id === asset.scenarioId);

  if (!scenario) {
    throw new Error(`Scenario ${asset.scenarioId} is not configured for ${normalizedCode}.`);
  }

  const session: ARSession = {
    id: `ar_session_${Date.now()}`,
    asset,
    scenario: mapAssetToARScenario(asset, scenario),
    startedAt: new Date().toISOString(),
  };

  const startedSession = await mockARProvider.startSession(session);
  activeSessions.set(startedSession.id, startedSession);
  return startedSession;
};

export const completeARScenario = (session: ARSession): Promise<ARAssessmentResult> =>
  mockARProvider.completeSession(session);

export const getARSession = (sessionId: string): ARSession | undefined => activeSessions.get(sessionId);

export const recordARAssessmentResult = (
  session: ARSession,
  result: ARAssessmentResult,
  traineeId = 'user_1',
): ARResultRecord => {
  const completedAt = new Date().toISOString().slice(0, 10);
  const assessmentId = `assessment_${Date.now()}`;
  const analytics = mapARResultToAssessmentAnalytics(result, assessmentId, traineeId, completedAt);
  const assessment = mapARResultToAssessment(result, assessmentId, session.asset.id, traineeId, completedAt);

  mockAssessmentAnalytics.push(analytics);
  mockAssessmentResults.push(assessment);

  const previousAssessments = mockTraineeAnalytics.completedAssessments;
  mockTraineeAnalytics.completedAssessments += 1;
  mockTraineeAnalytics.averageScore = Math.round(
    (mockTraineeAnalytics.averageScore * previousAssessments + result.score) / mockTraineeAnalytics.completedAssessments,
  );
  mockTraineeAnalytics.averageResponseTimeSeconds = Math.round(
    (mockTraineeAnalytics.averageResponseTimeSeconds * previousAssessments + result.reactionTime) / mockTraineeAnalytics.completedAssessments,
  );
  mockTraineeAnalytics.passRate = Math.round(
    ((mockTraineeAnalytics.passRate * previousAssessments + (result.passed ? 100 : 0)) / mockTraineeAnalytics.completedAssessments),
  );
  mockTraineeAnalytics.safetyReadinessScore = Math.round(
    (mockTraineeAnalytics.safetyReadinessScore + result.score) / 2,
  );
  mockTraineeAnalytics.passRateTrend = [...mockTraineeAnalytics.passRateTrend.slice(-4), mockTraineeAnalytics.passRate];

  mockAnalytics.averagePassRate = mockTraineeAnalytics.passRate;
  mockAnalytics.averageResponseTimeSeconds = mockTraineeAnalytics.averageResponseTimeSeconds;

  const scenarioAnalytics = mockScenarioAnalytics.find((item) => item.scenarioId === result.scenarioId);
  if (scenarioAnalytics) {
    const previousAttempts = scenarioAnalytics.attempts;
    scenarioAnalytics.attempts += 1;
    scenarioAnalytics.completionCount += 1;
    scenarioAnalytics.averageScore = Math.round(
      (scenarioAnalytics.averageScore * previousAttempts + result.score) / scenarioAnalytics.attempts,
    );
    scenarioAnalytics.averageResponseTimeSeconds = Math.round(
      (scenarioAnalytics.averageResponseTimeSeconds * previousAttempts + result.reactionTime) / scenarioAnalytics.attempts,
    );
    scenarioAnalytics.passRate = Math.round(
      (scenarioAnalytics.passRate * previousAttempts + (result.passed ? 100 : 0)) / scenarioAnalytics.attempts,
    );
    scenarioAnalytics.failureRate = 100 - scenarioAnalytics.passRate;
  }

  if (result.passed) {
    const trainee = mockUsers.find((user) => user.id === traineeId);
    if (trainee) {
      const module: TrainingModule = {
        id: session.asset.id,
        title: session.scenario.trainingModule,
        description: session.scenario.name,
        durationMinutes: Math.ceil(result.completionTime / 60),
        isCompleted: true,
        qrCodeId: session.asset.assetCode,
      };
      mockCertificates.push(generateCertificateFromAssessment(assessment, trainee, module));
      mockTraineeAnalytics.certificatesEarned += 1;
    }
  }

  return { assessmentId, analytics, assessment };
};
