import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AdminStackParamList } from '../../navigation/types';
import { AuthContext } from '../../context/AuthContext';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { mockAnalytics, mockCertificates, mockScenarioAnalytics } from '../../data/mockData';
import { theme } from '../../theme/theme';

type Props = {
  navigation: NativeStackNavigationProp<AdminStackParamList, 'AdminDashboard'>;
};

export const AdminDashboard = ({ navigation }: Props) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerLabel}>Admin Portal</Text>
          <Text style={styles.welcome}>{user?.name}</Text>
        </View>
        <Button title="Sign Out" onPress={logout} variant="danger" />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.commandTitle}>MINESAFE AI COMMAND CENTER</Text>
        <Text style={styles.commandSubtitle}>Live operational readiness across your workforce.</Text>
        
        <View style={styles.statsGrid}>
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>{mockAnalytics.totalTrainees}</Text>
            <Text style={styles.statLabel}>Total Trainees</Text>
          </Card>
          
          <Card style={styles.statCard}>
            <Text style={[styles.statValue, { color: theme.colors.success }]}>{mockAnalytics.averagePassRate}%</Text>
            <Text style={styles.statLabel}>Pass Rate</Text>
          </Card>
        </View>

        <View style={styles.statsGrid}>
          <Card style={styles.statCard}>
            <Text style={[styles.statValue, { color: theme.colors.accent }]}>18</Text>
            <Text style={styles.statLabel}>Active Sessions</Text>
          </Card>

          <Card style={styles.statCard}>
            <Text style={[styles.statValue, { color: theme.colors.secondary }]}>{mockAnalytics.averageResponseTimeSeconds}s</Text>
            <Text style={styles.statLabel}>Avg Response Time</Text>
          </Card>
        </View>

        <Card style={styles.certificateCard}>
          <View>
            <Text style={styles.certificateLabel}>CERTIFICATION PROGRAM</Text>
            <Text style={styles.certificateTitle}>Certificates Issued</Text>
            <Text style={styles.certificateMeta}>Generated from passed assessments</Text>
          </View>
          <Text style={styles.certificateCount}>{mockCertificates.length}</Text>
        </Card>

        <Text style={styles.sectionTitle}>Most Failed Scenario</Text>
        <Card style={styles.alertCard}>
          <Text style={styles.alertLabel}>NEEDS ATTENTION</Text>
          <Text style={styles.alertTitle}>{mockAnalytics.mostFailedScenario}</Text>
          <Text style={styles.alertText}>29% of trainees need a repeat assessment in this scenario.</Text>
        </Card>

        <Text style={styles.sectionTitle}>Recent Assessments</Text>
        <Card style={styles.recentCard}>
          <View style={styles.assessmentRow}>
            <View>
              <Text style={styles.assessmentName}>Jordan Lee</Text>
              <Text style={styles.assessmentMeta}>Fire Incident · 2 min ago</Text>
            </View>
            <Text style={styles.pass}>Passed</Text>
          </View>
          <View style={styles.assessmentRow}>
            <View>
              <Text style={styles.assessmentName}>Maya Patel</Text>
              <Text style={styles.assessmentMeta}>Electrical Hazard · 11 min ago</Text>
            </View>
            <Text style={styles.review}>Review</Text>
          </View>
          <View style={styles.assessmentRow}>
            <View>
              <Text style={styles.assessmentName}>Sam Carter</Text>
              <Text style={styles.assessmentMeta}>Gas Leak · 24 min ago</Text>
            </View>
            <Text style={styles.pass}>Passed</Text>
          </View>
        </Card>

        <Text style={styles.sectionTitle}>Recent Activity Feed</Text>
        <Card style={styles.activityCard}>
          <View style={styles.activityRow}>
            <Text style={styles.activityText}>Surya completed Fire Assessment</Text>
            <Text style={styles.activityTime}>2m</Text>
          </View>
          <View style={styles.activityRow}>
            <Text style={styles.activityText}>Asha earned Certificate</Text>
            <Text style={styles.activityTime}>18m</Text>
          </View>
          <View style={styles.activityRow}>
            <Text style={styles.activityText}>Rahul failed Electrical Hazard</Text>
            <Text style={styles.activityTime}>32m</Text>
          </View>
        </Card>

        <View style={styles.actionSection}>
          <Button
            title="Open Scenario Analytics"
            variant="secondary"
            onPress={() => navigation.navigate('ScenarioAnalytics', { scenarioId: mockScenarioAnalytics[2].scenarioId })}
          />
          <Button
            title="Manage QR Assets"
            variant="secondary"
            onPress={() => navigation.navigate('QRAssetList')}
          />
          <Button
            title="View Detailed Analytics"
            onPress={() => navigation.navigate('Analytics')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.card,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    ...theme.shadows.sm,
  },
  headerLabel: {
    ...theme.typography.label,
    color: theme.colors.accent,
    marginBottom: 4,
  },
  welcome: {
    ...theme.typography.h2,
    color: theme.colors.primary,
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  commandTitle: {
    ...theme.typography.h3,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  commandSubtitle: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.lg,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  statValue: {
    ...theme.typography.h1,
    marginBottom: theme.spacing.xs,
    color: theme.colors.primary,
  },
  statLabel: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.secondary,
    textTransform: 'uppercase',
  },
  certificateCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.lg,
    marginTop: theme.spacing.sm,
  },
  certificateLabel: {
    ...theme.typography.label,
    color: theme.colors.accent,
    marginBottom: theme.spacing.xs,
  },
  certificateTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
  },
  certificateMeta: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.xs,
  },
  certificateCount: {
    fontSize: 36,
    fontWeight: '800',
    color: theme.colors.accent,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  alertCard: {
    padding: theme.spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.error,
  },
  alertLabel: {
    ...theme.typography.label,
    color: theme.colors.error,
    marginBottom: theme.spacing.xs,
  },
  alertTitle: {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
  },
  alertText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.xs,
  },
  recentCard: {
    padding: theme.spacing.lg,
  },
  assessmentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  assessmentName: {
    ...theme.typography.bodyLarge,
    color: theme.colors.text.primary,
    fontWeight: '700',
  },
  assessmentMeta: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.xs,
  },
  pass: {
    ...theme.typography.bodySmall,
    color: theme.colors.success,
    fontWeight: '700',
  },
  review: {
    ...theme.typography.bodySmall,
    color: theme.colors.error,
    fontWeight: '700',
  },
  activityCard: {
    padding: theme.spacing.lg,
  },
  activityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  activityText: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
    flex: 1,
  },
  activityTime: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.secondary,
    marginLeft: theme.spacing.sm,
  },
  actionSection: {
    marginBottom: theme.spacing.xxl,
    marginTop: theme.spacing.lg,
  },
});
