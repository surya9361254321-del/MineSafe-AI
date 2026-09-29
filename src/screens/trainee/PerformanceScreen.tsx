import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AnalyticsMetricCard } from '../../components/AnalyticsMetricCard';
import { AnalyticsTrend } from '../../components/AnalyticsTrend';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { mockTraineeAnalytics } from '../../data/mockData';
import { TraineeStackParamList, TraineeTabParamList } from '../../navigation/types';
import { theme } from '../../theme/theme';

export const PerformanceScreen = () => {
  const navigation = useNavigation<BottomTabNavigationProp<TraineeTabParamList>>();
  const stackNavigation = navigation.getParent<NativeStackNavigationProp<TraineeStackParamList>>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.eyebrow}>PERFORMANCE</Text>
      <Text style={styles.title}>Your readiness over time.</Text>
      <Text style={styles.subtitle}>
        Track the habits and response times that shape safer decisions underground.
      </Text>

      <AnalyticsTrend
        title="Pass Rate Trend"
        values={mockTraineeAnalytics.passRateTrend}
        labels={['MAY', 'JUN', 'JUL', 'AUG', 'SEP']}
      />

      <View style={styles.statsRow}>
        <AnalyticsMetricCard label="Safety Readiness" value={`${mockTraineeAnalytics.safetyReadinessScore}%`} accentColor={theme.colors.success} />
        <AnalyticsMetricCard label="Average Score" value={`${mockTraineeAnalytics.averageScore}%`} />
      </View>

      <View style={styles.statsRow}>
        <AnalyticsMetricCard label="Response Time" value={`${mockTraineeAnalytics.averageResponseTimeSeconds}s`} accentColor={theme.colors.secondary} />
        <AnalyticsMetricCard label="Training Streak" value={`${mockTraineeAnalytics.trainingStreakDays}d`} accentColor={theme.colors.accent} />
      </View>

      <View style={styles.statsRow}>
        <AnalyticsMetricCard label="Pass Rate" value={`${mockTraineeAnalytics.passRate}%`} accentColor={theme.colors.success} />
        <AnalyticsMetricCard label="Completed Assessments" value={`${mockTraineeAnalytics.completedAssessments}`} />
      </View>

      <Text style={styles.sectionTitle}>Certificates Earned</Text>
      <Card style={styles.certificateCard}>
        <View>
          <Text style={styles.certificateCount}>{mockTraineeAnalytics.certificatesEarned}</Text>
          <Text style={styles.certificateText}>Verified safety credentials</Text>
        </View>
        <Button
          title="View Certificates"
          variant="secondary"
          onPress={() => stackNavigation?.navigate('CertificateList')}
        />
      </Card>

      <Text style={styles.sectionTitle}>Most Common Mistakes</Text>
      <Card style={styles.mistakesCard}>
        <View style={styles.mistakeRow}>
          <Text style={styles.mistakeName}>Delayed evacuation call</Text>
          <Text style={styles.mistakeCount}>4</Text>
        </View>
        <View style={styles.mistakeRow}>
          <Text style={styles.mistakeName}>Incorrect extinguisher aim</Text>
          <Text style={styles.mistakeCount}>2</Text>
        </View>
        <View style={styles.mistakeRow}>
          <Text style={styles.mistakeName}>Missed radio confirmation</Text>
          <Text style={styles.mistakeCount}>1</Text>
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
  statsRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '800',
    color: theme.colors.primary,
  },
  statLabel: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginTop: theme.spacing.xs,
  },
  progressTrack: {
    width: '100%',
    height: 6,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.border,
    marginTop: theme.spacing.md,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.success,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  trendCard: {
    padding: theme.spacing.lg,
  },
  trendHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  trendValue: {
    ...theme.typography.h2,
    color: theme.colors.primary,
  },
  trendDelta: {
    ...theme.typography.body,
    color: theme.colors.success,
    fontWeight: '700',
  },
  chartRow: {
    height: 120,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    marginTop: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  chartBar: {
    width: 28,
    backgroundColor: theme.colors.accent,
    borderTopLeftRadius: theme.borderRadius.sm,
    borderTopRightRadius: theme.borderRadius.sm,
  },
  chartBarShort: {
    height: 44,
  },
  chartBarMedium: {
    height: 68,
  },
  chartBarTall: {
    height: 88,
  },
  chartBarHighest: {
    height: 110,
    backgroundColor: theme.colors.success,
  },
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: theme.spacing.sm,
  },
  chartLabel: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.secondary,
  },
  mistakesCard: {
    padding: theme.spacing.lg,
  },
  certificateCard: {
    padding: theme.spacing.lg,
  },
  certificateCount: {
    fontSize: 32,
    fontWeight: '800',
    color: theme.colors.accent,
  },
  certificateText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.lg,
  },
  mistakeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  mistakeName: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
  },
  mistakeCount: {
    ...theme.typography.bodyLarge,
    color: theme.colors.error,
    fontWeight: '700',
  },
});
