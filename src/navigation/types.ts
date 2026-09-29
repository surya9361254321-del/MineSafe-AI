export type AuthStackParamList = {
  Login: undefined;
};

export type AdminStackParamList = {
  AdminDashboard: undefined;
  Analytics: undefined;
  ScenarioAnalytics: { scenarioId: string };
  QRAssetList: undefined;
  QRAssetDetail: { assetId: string };
};

export type TraineeStackParamList = {
  TraineeTabs: undefined;
  QRScanner: undefined;
  ARLaunch: {
    moduleId: string;
    assetCode?: string;
    assetName?: string;
    scenarioId?: string;
    scenarioName?: string;
    trainingModule?: string;
    riskLevel?: string;
  };
  ARTraining: { sessionId: string };
  ARAssessment: { sessionId: string };
  ARModule: { moduleId: string };
  Assessment: { moduleId?: string; scenarioId?: string } | undefined;
  CertificateList: undefined;
  CertificateDetail: { certId: string };
};

export type TraineeTabParamList = {
  Home: undefined;
  Training: undefined;
  Assessment: undefined;
  Performance: undefined;
  Profile: undefined;
};
