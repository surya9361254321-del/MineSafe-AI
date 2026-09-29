import { Assessment, AssessmentAnalytics, QRAsset } from '../../types';

export interface ARAssessmentResult {
  scenarioId: string;
  selectedEquipment: string;
  reactionTime: number;
  completionTime: number;
  mistakes: number;
  score: number;
  passed: boolean;
}

export interface ARScenario {
  id: string;
  name: string;
  riskLevel: string;
  trainingModule: string;
}

export interface ARSession {
  id: string;
  asset: QRAsset;
  scenario: ARScenario;
  startedAt: string;
}

export interface ARProvider {
  startSession(session: ARSession): Promise<ARSession>;
  completeSession(session: ARSession): Promise<ARAssessmentResult>;
}

export interface ARResultRecord {
  assessmentId: string;
  analytics: AssessmentAnalytics;
  assessment: Assessment;
}
