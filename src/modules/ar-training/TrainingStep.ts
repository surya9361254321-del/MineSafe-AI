export enum TrainingStep {
  SELECT_EXTINGUISHER = 'SELECT_EXTINGUISHER',
  PULL_PIN = 'PULL_PIN',
  AIM = 'AIM',
  SQUEEZE = 'SQUEEZE',
  SWEEP = 'SWEEP',
  COMPLETE = 'COMPLETE',
}

export type TrainingCompletionResult = {
  status: 'PASS';
  completedAt: string;
};
