import { User, TrainingModule, Assessment, AssessmentAnalytics, AnalyticsData, Certificate, QRAsset, SafetyScenario, ScenarioAnalytics, TraineeAnalytics } from '../types';

export const mockUsers: User[] = [
  {
    id: 'user_1',
    name: 'Alice Trainee',
    role: 'TRAINEE',
    email: 'alice@minesafe.ai',
  },
  {
    id: 'user_2',
    name: 'Bob Admin',
    role: 'ADMIN',
    email: 'bob@minesafe.ai',
  },
];

export const mockModules: TrainingModule[] = [
  {
    id: 'mod_1',
    title: 'Hazard Identification',
    description: 'Learn to identify common hazards in the mine.',
    durationMinutes: 45,
    isCompleted: false,
    qrCodeId: 'qr_hazard_01',
  },
  {
    id: 'mod_2',
    title: 'Emergency Evacuation',
    description: 'Protocol for safely evacuating during an emergency.',
    durationMinutes: 30,
    isCompleted: true,
    qrCodeId: 'qr_evac_02',
  },
];

export const mockScenarios: SafetyScenario[] = [
  { id: 'fire-incident', name: 'Fire Incident Scenario', riskLevel: 'High' },
  { id: 'gas-leak', name: 'Gas Leak Scenario', riskLevel: 'Critical' },
  { id: 'electrical-hazard', name: 'Electrical Hazard Scenario', riskLevel: 'High' },
  { id: 'ppe-compliance', name: 'PPE Compliance Scenario', riskLevel: 'Medium' },
];

export const mockQRAssets: QRAsset[] = [
  {
    id: 'asset_fire_001',
    assetCode: 'FIRE_001',
    assetName: 'Fire Extinguisher',
    location: 'Crusher Area',
    scenarioId: 'fire-incident',
    trainingModule: 'Fire Extinguisher Safety Training',
  },
  {
    id: 'asset_gas_001',
    assetCode: 'GAS_001',
    assetName: 'Gas Detector',
    location: 'Processing Plant',
    scenarioId: 'gas-leak',
    trainingModule: 'Gas Leak Response Training',
  },
  {
    id: 'asset_elec_001',
    assetCode: 'ELEC_001',
    assetName: 'Insulated Rescue Hook',
    location: 'Maintenance Bay',
    scenarioId: 'electrical-hazard',
    trainingModule: 'Electrical Hazard Isolation Training',
  },
  {
    id: 'asset_ppe_001',
    assetCode: 'PPE_001',
    assetName: 'PPE Inspection Station',
    location: 'Main Entrance',
    scenarioId: 'ppe-compliance',
    trainingModule: 'PPE and Site Readiness Training',
  },
];

export const mockAssessmentResults: Assessment[] = [
  {
    id: 'assessment_1',
    moduleId: 'mod_2',
    scenarioId: 'fire-incident',
    traineeId: 'user_1',
    score: 92,
    passed: true,
    date: '2026-09-18',
    responseTimeSeconds: 18,
  },
];

export const mockAssessmentAnalytics: AssessmentAnalytics[] = [
  { assessmentId: 'assessment_1', traineeId: 'user_1', scenarioId: 'fire-incident', score: 92, passed: true, responseTimeSeconds: 18, completedAt: '2026-09-18' },
  { assessmentId: 'assessment_2', traineeId: 'user_1', scenarioId: 'gas-leak', score: 84, passed: true, responseTimeSeconds: 23, completedAt: '2026-09-12' },
  { assessmentId: 'assessment_3', traineeId: 'user_1', scenarioId: 'electrical-hazard', score: 76, passed: true, responseTimeSeconds: 28, completedAt: '2026-09-06' },
  { assessmentId: 'assessment_4', traineeId: 'user_1', scenarioId: 'fire-incident', score: 68, passed: false, responseTimeSeconds: 35, completedAt: '2026-08-29' },
];

export const mockScenarioAnalytics: ScenarioAnalytics[] = [
  { scenarioId: 'fire-incident', scenarioName: 'Fire Incident', attempts: 48, passRate: 92, averageScore: 88, averageResponseTimeSeconds: 18, completionCount: 48, failureRate: 8 },
  { scenarioId: 'gas-leak', scenarioName: 'Gas Leak', attempts: 41, passRate: 79, averageScore: 81, averageResponseTimeSeconds: 24, completionCount: 41, failureRate: 21 },
  { scenarioId: 'electrical-hazard', scenarioName: 'Electrical Hazard', attempts: 56, passRate: 71, averageScore: 76, averageResponseTimeSeconds: 29, completionCount: 56, failureRate: 29 },
  { scenarioId: 'ppe-compliance', scenarioName: 'PPE Safety', attempts: 62, passRate: 96, averageScore: 94, averageResponseTimeSeconds: 12, completionCount: 62, failureRate: 4 },
];

export const mockTraineeAnalytics: TraineeAnalytics = {
  traineeId: 'user_1',
  safetyReadinessScore: 92,
  passRate: 92,
  averageScore: 85,
  averageResponseTimeSeconds: 22,
  certificatesEarned: 1,
  completedAssessments: 8,
  trainingStreakDays: 12,
  passRateTrend: [74, 78, 82, 88, 92],
};

export const generateCertificateFromAssessment = (
  assessment: Assessment,
  trainee: User,
  module: TrainingModule,
): Certificate => ({
  id: `cert_${assessment.id}`,
  userId: trainee.id,
  traineeName: trainee.name,
  moduleId: module.id,
  moduleName: module.title,
  score: assessment.score,
  issueDate: assessment.date,
  certificateNumber: `MSAI-${assessment.date.replace(/-/g, '')}-${assessment.id.slice(-3).toUpperCase()}`,
});

export const mockCertificates: Certificate[] = mockAssessmentResults
  .filter((assessment) => assessment.passed)
  .map((assessment) => {
    const trainee = mockUsers.find((user) => user.id === 'user_1');
    const module = mockModules.find((item) => item.id === assessment.moduleId);

    if (!trainee || !module) {
      throw new Error(`Unable to generate certificate for ${assessment.id}`);
    }

    return generateCertificateFromAssessment(assessment, trainee, module);
  });

export const mockAnalytics: AnalyticsData = {
  totalTrainees: 150,
  modulesCompleted: 432,
  averageScore: 88.5,
  averagePassRate: 91,
  averageResponseTimeSeconds: 14,
  mostFailedScenario: 'Electrical Hazard',
  mostCompletedTraining: 'PPE Safety',
  certificationRate: 76,
};
