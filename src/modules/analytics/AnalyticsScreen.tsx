import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AnalyticsMetricCard } from '../../components/AnalyticsMetricCard';
import { AnalyticsTrend } from '../../components/AnalyticsTrend';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { mockAnalytics, mockScenarioAnalytics } from '../../data/mockData';
import { AdminStackParamList } from '../../navigation/types';
import { theme } from '../../theme/theme';

type Props = NativeStackScreenProps<AdminStackParamList, 'Analytics'>;

export const AnalyticsScreen = ({ navigation }: Props) => {
  return (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.eyebrow}>WORKFORCE ANALYTICS</Text>
          <Text style={styles.title}>Operational readiness</Text>
          <Text style={styles.subtitle}>A single view of trainee performance, risk, and certification coverage.</Text>

          <View style={styles.metricRow}>
            <AnalyticsMetricCard label="Total Trainees" value={`${mockAnalytics.totalTrainees}`} />
            <AnalyticsMetricCard label="Average Pass Rate" value={`${mockAnalytics.averagePassRate}%`} accentColor={theme.colors.success} />
          </View>
          <View style={styles.metricRow}>
            <AnalyticsMetricCard label="Avg Response Time" value={`${mockAnalytics.averageResponseTimeSeconds}s`} accentColor={theme.colors.secondary} />
            <AnalyticsMetricCard label="Certification Rate" value={`${mockAnalytics.certificationRate}%`} accentColor={theme.colors.accent} />
          </View>

          <AnalyticsTrend
            title="Average Pass Rate Trend"
            values={[78, 82, 87, 89, mockAnalytics.averagePassRate]}
            labels={['MAY', 'JUN', 'JUL', 'AUG', 'SEP']}
          />

          <Card style={styles.insightCard}>
            <Text style={styles.sectionTitle}>Operational Highlights</Text>
            <View style={styles.highlightRow}>
              <Text style={styles.highlightLabel}>Most Failed Scenario</Text>
              <Text style={styles.failure}>{mockAnalytics.mostFailedScenario}</Text>
            </View>
            <View style={styles.highlightRow}>
              <Text style={styles.highlightLabel}>Most Completed Training</Text>
              <Text style={styles.highlightValue}>{mockAnalytics.mostCompletedTraining}</Text>
            </View>
          </Card>

          <Text style={styles.sectionTitle}>Scenario Breakdown</Text>
          {mockScenarioAnalytics.map((scenario) => (
            <Card key={scenario.scenarioId} style={styles.scenarioCard}>
              <View style={styles.scenarioHeader}>
                <Text style={styles.scenarioName}>{scenario.scenarioName}</Text>
                <Text style={styles.scenarioPass}>{scenario.passRate}% pass</Text>
              </View>
              <Text style={styles.scenarioMeta}>{scenario.attempts} assessments · {scenario.averageResponseTimeSeconds}s average response</Text>
              <Button
                title="View Scenario Analytics"
                variant="secondary"
                onPress={() => navigation.navigate('ScenarioAnalytics', { scenarioId: scenario.scenarioId })}
              />
            </Card>
          ))}
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
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  highlightRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  highlightLabel: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
  },
  highlightValue: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
    fontWeight: '700',
    maxWidth: '48%',
    textAlign: 'right',
  },
  failure: {
    ...theme.typography.body,
    color: theme.colors.error,
    fontWeight: '700',
    maxWidth: '48%',
    textAlign: 'right',
  },
  scenarioCard: {
    padding: theme.spacing.lg,
  },
  scenarioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scenarioName: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    flex: 1,
  },
  scenarioPass: {
    ...theme.typography.body,
    color: theme.colors.success,
    fontWeight: '700',
  },
  scenarioMeta: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.sm,
  },
});
