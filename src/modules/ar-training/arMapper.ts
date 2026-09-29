import { Assessment, AssessmentAnalytics, QRAsset, SafetyScenario } from '../../types';
import { ARAssessmentResult, ARScenario } from './arTypes';

export const mapAssetToARScenario = (asset: QRAsset, scenario: SafetyScenario): ARScenario => ({
  id: scenario.id,
  name: scenario.name,
  riskLevel: scenario.riskLevel,
  trainingModule: asset.trainingModule,
});

export const mapARResultToAssessment = (
  result: ARAssessmentResult,
  assessmentId: string,
  moduleId: string,
  traineeId: string,
  completedAt: string,
): Assessment => ({
  id: assessmentId,
  moduleId,
  scenarioId: result.scenarioId,
  traineeId,
  score: result.score,
  passed: result.passed,
  date: completedAt,
  responseTimeSeconds: result.reactionTime,
});

export const mapARResultToAssessmentAnalytics = (
  result: ARAssessmentResult,
  assessmentId: string,
  traineeId: string,
  completedAt: string,
): AssessmentAnalytics => ({
  assessmentId,
  traineeId,
  scenarioId: result.scenarioId,
  score: result.score,
  passed: result.passed,
  responseTimeSeconds: result.reactionTime,
  completedAt,
});
