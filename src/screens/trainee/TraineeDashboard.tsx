import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TraineeStackParamList, TraineeTabParamList } from '../../navigation/types';
import { AuthContext } from '../../context/AuthContext';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { theme } from '../../theme/theme';

type Props = {
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<TraineeTabParamList, 'Home'>,
    NativeStackNavigationProp<TraineeStackParamList>
  >;
};

export const TraineeDashboard = ({ navigation }: Props) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerLabel}>Trainee Portal</Text>
          <Text style={styles.welcome}>Hi, {user?.name}</Text>
        </View>
        <Button title="Sign Out" onPress={logout} variant="danger" />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <Text style={styles.heroLabel}>MINE SAFETY READINESS</Text>
          <Text style={styles.heroScore}>92%</Text>
          <Text style={styles.heroDesc}>
            Your current safety preparedness based on training and assessments.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Today's Status</Text>
        <View style={styles.statusRow}>
          <Card style={styles.statusCard}>
            <Text style={styles.statusValue}>12 days</Text>
            <Text style={styles.statusLabel}>Training Streak</Text>
          </Card>
          <Card style={styles.statusCard}>
            <Text style={styles.statusValue}>92%</Text>
            <Text style={styles.statusLabel}>Last Assessment</Text>
          </Card>
          <Card style={styles.statusCard}>
            <Text style={styles.statusValue}>2</Text>
            <Text style={styles.statusLabel}>Pending Certifications</Text>
          </Card>
        </View>

        <View style={styles.statusRow}>
          <Card style={styles.statusCard}>
            <Text style={styles.statusValue}>Today</Text>
            <Text style={styles.statusLabel}>Last Training Date</Text>
          </Card>
          <Card style={styles.statusCard}>
            <Text style={styles.statusValue}>+14%</Text>
            <Text style={styles.statusLabel}>Readiness Trend</Text>
          </Card>
          <View style={styles.statusSpacer} />
        </View>

        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <Card style={styles.activityCard}>
          <View style={styles.activityRow}>
            <Text style={styles.activityTitle}>Fire response assessment</Text>
            <Text style={styles.activityScore}>92%</Text>
          </View>
          <Text style={styles.activityMeta}>Completed today · Crusher Area</Text>
        </Card>

        <View style={styles.actionGrid}>
          <Card style={styles.featureCard}>
            <Text style={styles.featureEmoji}>🦺</Text>
            <Text style={styles.featureTitle}>Start Training</Text>
            <Text style={styles.featureText}>
              Learn emergency procedures through AR simulations.
            </Text>
            <Button
              title="Training"
              onPress={() => navigation.navigate('QRScanner')}
            />
          </Card>

          <Card style={styles.featureCard}>
            <Text style={styles.featureEmoji}>🔥</Text>
            <Text style={styles.featureTitle}>Assessment</Text>
            <Text style={styles.featureText}>
              Test your response without hints or guidance.
            </Text>
            <Button
              title="Assessment"
              variant="secondary"
              onPress={() => navigation.navigate('Assessment')}
            />
          </Card>
        </View>

        <Text style={styles.sectionTitle}>Performance Overview</Text>

        <View style={styles.statsRow}>
          <Card style={styles.statCard}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </Card>

          <Card style={styles.statCard}>
            <Text style={styles.statNumber}>92%</Text>
            <Text style={styles.statLabel}>Pass Rate</Text>
          </Card>
        </View>

        <View style={styles.statsRow}>
          <Card style={styles.statCard}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Certificates</Text>
          </Card>

          <Card style={styles.statCard}>
            <Text style={styles.statNumber}>18s</Text>
            <Text style={styles.statLabel}>Avg Response</Text>
          </Card>
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
  heroCard: {
    backgroundColor: theme.colors.primary,
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
  },
  heroLabel: {
    color: '#FFFFFF99',
    fontSize: 12,
    letterSpacing: 2,
  },
  heroScore: {
    color: '#FFF',
    fontSize: 48,
    fontWeight: '800',
    marginTop: 8,
  },
  heroDesc: {
    color: '#FFFFFFCC',
    marginTop: 8,
    lineHeight: 22,
  },
  statusRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  statusCard: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
  },
  statusValue: {
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.primary,
    textAlign: 'center',
  },
  statusLabel: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginTop: 4,
  },
  statusSpacer: {
    flex: 1,
    marginVertical: theme.spacing.sm,
  },
  activityCard: {
    padding: 16,
    marginBottom: 20,
  },
  activityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityTitle: {
    ...theme.typography.bodyLarge,
    color: theme.colors.text.primary,
    fontWeight: '700',
  },
  activityScore: {
    ...theme.typography.bodyLarge,
    color: theme.colors.success,
    fontWeight: '700',
  },
  activityMeta: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.secondary,
    marginTop: 4,
  },
  actionGrid: {
    gap: 16,
    marginBottom: 20,
  },
  featureCard: {
    padding: 20,
  },
  featureEmoji: {
    fontSize: 30,
    marginBottom: 10,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
  },
  featureText: {
    marginBottom: 16,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '800',
    color: theme.colors.primary,
  },
  statLabel: {
    marginTop: 4,
    color: theme.colors.text.secondary,
  },
});
