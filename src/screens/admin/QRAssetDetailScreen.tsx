import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { mockQRAssets, mockScenarios } from '../../data/mockData';
import { AdminStackParamList } from '../../navigation/types';
import { theme } from '../../theme/theme';

type Props = NativeStackScreenProps<AdminStackParamList, 'QRAssetDetail'>;

export const QRAssetDetailScreen = ({ navigation, route }: Props) => {
  const asset = mockQRAssets.find((item) => item.id === route.params.assetId);
  const scenario = asset ? mockScenarios.find((item) => item.id === asset.scenarioId) : undefined;

  if (!asset) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Asset unavailable</Text>
        <Text style={styles.subtitle}>This mock QR asset could not be found.</Text>
        <Button title="Back to Asset Registry" onPress={() => navigation.goBack()} />
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.eyebrow}>QR ASSET DETAILS</Text>
      <Text style={styles.assetCode}>{asset.assetCode}</Text>
      <Text style={styles.title}>{asset.assetName}</Text>
      <Text style={styles.subtitle}>Registered safety equipment and training trigger.</Text>

      <Card style={styles.detailsCard}>
        <Text style={styles.sectionTitle}>Asset Information</Text>
        <Text style={styles.detailLabel}>Location</Text>
        <Text style={styles.detailValue}>{asset.location}</Text>
        <Text style={styles.detailLabel}>Asset ID</Text>
        <Text style={styles.detailValue}>{asset.id}</Text>
      </Card>

      <Card style={styles.linkCard}>
        <Text style={styles.sectionTitle}>Linked Scenario</Text>
        <Text style={styles.linkTitle}>{scenario?.name ?? asset.scenarioId}</Text>
        <Text style={styles.risk}>Risk Level: {scenario?.riskLevel ?? 'Unassigned'}</Text>
      </Card>

      <Card style={styles.linkCard}>
        <Text style={styles.sectionTitle}>Linked Training Module</Text>
        <Text style={styles.linkTitle}>{asset.trainingModule}</Text>
        <Text style={styles.linkDescription}>
          Scanning {asset.assetCode} resolves this asset to the linked scenario and launches this module.
        </Text>
      </Card>

      <Button title="Back to Asset Registry" onPress={() => navigation.goBack()} />
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
  assetCode: {
    ...theme.typography.label,
    color: theme.colors.secondary,
    letterSpacing: 1,
    marginBottom: theme.spacing.xs,
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
  detailsCard: {
    padding: theme.spacing.lg,
  },
  linkCard: {
    padding: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  detailLabel: {
    ...theme.typography.label,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.sm,
  },
  detailValue: {
    ...theme.typography.bodyLarge,
    color: theme.colors.text.primary,
    fontWeight: '600',
  },
  linkTitle: {
    ...theme.typography.bodyLarge,
    color: theme.colors.text.primary,
    fontWeight: '700',
  },
  risk: {
    ...theme.typography.body,
    color: theme.colors.error,
    fontWeight: '700',
    marginTop: theme.spacing.sm,
  },
  linkDescription: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.sm,
  },
});
