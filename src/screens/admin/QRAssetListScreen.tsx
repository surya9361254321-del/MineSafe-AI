import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { mockQRAssets, mockScenarios } from '../../data/mockData';
import { AdminStackParamList } from '../../navigation/types';
import { theme } from '../../theme/theme';

type Props = NativeStackScreenProps<AdminStackParamList, 'QRAssetList'>;

export const QRAssetListScreen = ({ navigation }: Props) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.eyebrow}>ASSET MANAGEMENT</Text>
      <Text style={styles.title}>QR Asset Registry</Text>
      <Text style={styles.subtitle}>
        Manage the physical safety assets that launch MineSafe AI training experiences.
      </Text>

      {mockQRAssets.map((asset) => {
        const scenario = mockScenarios.find((item) => item.id === asset.scenarioId);

        return (
          <Card key={asset.id} style={styles.assetCard}>
            <Text style={styles.assetCode}>{asset.assetCode}</Text>
            <Text style={styles.assetName}>{asset.assetName}</Text>
            <Text style={styles.location}>{asset.location}</Text>
            <Text style={styles.linkedScenario}>{scenario?.name ?? asset.scenarioId}</Text>
            <Button
              title="View Asset Details"
              variant="secondary"
              onPress={() => navigation.navigate('QRAssetDetail', { assetId: asset.id })}
            />
          </Card>
        );
      })}
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
  assetCard: {
    padding: theme.spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.accent,
  },
  assetCode: {
    ...theme.typography.label,
    color: theme.colors.accent,
    letterSpacing: 1,
    marginBottom: theme.spacing.xs,
  },
  assetName: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
  },
  location: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.xs,
  },
  linkedScenario: {
    ...theme.typography.bodySmall,
    color: theme.colors.secondary,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
});
