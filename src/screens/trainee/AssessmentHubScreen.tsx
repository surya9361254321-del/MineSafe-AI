import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { TraineeStackParamList } from '../../navigation/types';
import { theme } from '../../theme/theme';

type Navigation = NativeStackNavigationProp<TraineeStackParamList>;

export const AssessmentHubScreen = () => {
  const navigation = useNavigation<BottomTabNavigationProp<import('../../navigation/types').TraineeTabParamList>>();
  const stackNavigation = navigation.getParent<Navigation>();
  const scenarios = [
    { id: 'fire', emoji: '🔥', title: 'Fire Incident', location: 'Crusher Area', risk: 'High', priority: 'High', duration: '5 min', difficulty: 'Beginner' },
    { id: 'gas-leak', emoji: '☣', title: 'Gas Leak', location: 'Processing Plant', risk: 'Critical', priority: 'Medium', duration: '7 min', difficulty: 'Advanced' },
    { id: 'electrical', emoji: '⚡', title: 'Electrical Hazard', location: 'Maintenance Bay', risk: 'High', priority: 'High', duration: '6 min', difficulty: 'Intermediate' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.eyebrow}>ASSESSMENT CENTER</Text>
      <Text style={styles.title}>Respond when it matters.</Text>
      <Text style={styles.subtitle}>
        Choose an emergency scenario and prove you can control the incident safely.
      </Text>

      {scenarios.map((scenario) => (
        <Card key={scenario.id} style={styles.scenarioCard}>
          <Text style={styles.priority}>{scenario.priority.toUpperCase()} PRIORITY</Text>
          <View style={styles.scenarioHeader}>
            <View style={styles.titleRow}>
              <Text style={styles.emoji}>{scenario.emoji}</Text>
              <Text style={styles.scenarioTitle}>{scenario.title}</Text>
            </View>
            <View style={styles.riskBadge}>
              <Text style={styles.risk}>{scenario.risk}</Text>
            </View>
          </View>
          <Text style={styles.location}>{scenario.location}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.metaText}>Duration: {scenario.duration}</Text>
            <Text style={styles.metaText}>Difficulty: {scenario.difficulty}</Text>
          </View>
          <Button
            title="Start Assessment"
            variant={scenario.id === 'fire' ? 'primary' : 'secondary'}
            onPress={() => stackNavigation?.navigate('Assessment', { scenarioId: scenario.id })}
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
  scenarioCard: {
    padding: theme.spacing.lg,
  },
  priority: {
    ...theme.typography.label,
    color: theme.colors.accent,
    marginBottom: theme.spacing.sm,
  },
  scenarioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  emoji: {
    fontSize: 24,
    marginRight: theme.spacing.sm,
  },
  scenarioTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
  },
  riskBadge: {
    backgroundColor: theme.colors.error + '15',
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  risk: {
    ...theme.typography.bodySmall,
    color: theme.colors.error,
    fontWeight: '700',
  },
  location: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.lg,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg,
    paddingTop: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  metaText: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.secondary,
  },
});
