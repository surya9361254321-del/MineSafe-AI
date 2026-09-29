import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AnalyticsMetricCard } from '../../components/AnalyticsMetricCard';
import { AnalyticsTrend } from '../../components/AnalyticsTrend';
import { Card } from '../../components/Card';
import { mockScenarioAnalytics } from '../../data/mockData';
import { AdminStackParamList } from '../../navigation/types';
import { theme } from '../../theme/theme';

type Props = NativeStackScreenProps<AdminStackParamList, 'ScenarioAnalytics'>;

export const ScenarioAnalyticsScreen = ({ route }: Props) => {
  const scenario = mockScenarioAnalytics.find((item) => item.scenarioId === route.params.scenarioId) ?? mockScenarioAnalytics[0];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.eyebrow}>SCENARIO ANALYTICS</Text>
      <Text style={styles.title}>{scenario.scenarioName}</Text>
      <Text style={styles.subtitle}>Performance and response patterns across the workforce.</Text>

      <View style={styles.metricRow}>
        <AnalyticsMetricCard label="Pass Rate" value={`${scenario.passRate}%`} accentColor={theme.colors.success} />
        <AnalyticsMetricCard label="Avg Score" value={`${scenario.averageScore}%`} />
      </View>
      <View style={styles.metricRow}>
        <AnalyticsMetricCard label="Avg Response" value={`${scenario.averageResponseTimeSeconds}s`} accentColor={theme.colors.secondary} />
        <AnalyticsMetricCard label="Attempts" value={`${scenario.attempts}`} />
      </View>

      <AnalyticsTrend
        title="Scenario Pass Trend"
        values={[scenario.passRate - 12, scenario.passRate - 8, scenario.passRate - 4, scenario.passRate]}
        labels={['JUN', 'JUL', 'AUG', 'SEP']}
      />

      <Card style={styles.insightCard}>
        <Text style={styles.sectionTitle}>Scenario Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Completed Training</Text>
          <Text style={styles.summaryValue}>{scenario.completionCount}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Failure Rate</Text>
          <Text style={styles.failureValue}>{scenario.failureRate}%</Text>
        </View>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
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
  },
  subtitle: {
    ...theme.typography.bodyLarge,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.lg,
  },
  metricRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  insightCard: {
    padding: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  summaryLabel: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
  },
  summaryValue: {
    ...theme.typography.bodyLarge,
    color: theme.colors.text.primary,
    fontWeight: '700',
  },
  failureValue: {
    ...theme.typography.bodyLarge,
    color: theme.colors.error,
    fontWeight: '700',
  },
});
