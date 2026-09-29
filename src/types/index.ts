export type Role = 'TRAINEE' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  role: Role;
  email: string;
}

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  isCompleted: boolean;
  qrCodeId: string; // Used to trigger the AR module via QR scan
}

export interface SafetyScenario {
  id: string;
  name: string;
  riskLevel: 'High' | 'Critical' | 'Medium';
}

export interface QRAsset {
  id: string;
  assetCode: string;
  assetName: string;
  location: string;
  scenarioId: string;
  trainingModule: string;
}

export interface Assessment {
  id: string;
  moduleId: string;
  scenarioId?: string;
  traineeId?: string;
  score: number;
  passed: boolean;
  date: string;
  responseTimeSeconds?: number;
}

export interface AssessmentAnalytics {
  assessmentId: string;
  traineeId: string;
  scenarioId: string;
  score: number;
  passed: boolean;
  responseTimeSeconds: number;
  completedAt: string;
}

export interface ScenarioAnalytics {
  scenarioId: string;
  scenarioName: string;
  attempts: number;
  passRate: number;
  averageScore: number;
  averageResponseTimeSeconds: number;
  completionCount: number;
  failureRate: number;
}

export interface TraineeAnalytics {
  traineeId: string;
  safetyReadinessScore: number;
  passRate: number;
  averageScore: number;
  averageResponseTimeSeconds: number;
  certificatesEarned: number;
  completedAssessments: number;
  trainingStreakDays: number;
  passRateTrend: number[];
}

export interface Certificate {
  id: string;
  userId: string;
  traineeName: string;
  moduleId: string;
  moduleName: string;
  score: number;
  issueDate: string;
  certificateNumber: string;
}

export interface AnalyticsData {
  totalTrainees: number;
  modulesCompleted: number;
  averageScore: number;
  averagePassRate: number;
  averageResponseTimeSeconds: number;
  mostFailedScenario: string;
  mostCompletedTraining: string;
  certificationRate: number;
}
