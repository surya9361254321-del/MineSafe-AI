import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { mockCertificates } from '../../data/mockData';
import { TraineeStackParamList } from '../../navigation/types';
import { theme } from '../../theme/theme';

type Props = NativeStackScreenProps<TraineeStackParamList, 'CertificateDetail'>;

export const CertificateDetailScreen = ({ navigation, route }: Props) => {
  const certificate = mockCertificates.find((item) => item.id === route.params.certId);

  if (!certificate) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Certificate unavailable</Text>
        <Text style={styles.subtitle}>This mock certificate could not be found.</Text>
        <Button title="Back to Certificates" onPress={() => navigation.goBack()} />
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.certificate}>
        <Text style={styles.brand}>MINESAFE AI</Text>
        <Text style={styles.certificateLabel}>CERTIFICATE OF COMPLETION</Text>
        <Text style={styles.recipientLabel}>Presented to</Text>
        <Text style={styles.traineeName}>{certificate.traineeName}</Text>
        <Text style={styles.bodyText}>for successfully completing the safety assessment</Text>
        <Text style={styles.moduleName}>{certificate.moduleName}</Text>

        <Text style={styles.score}>{certificate.score}%</Text>
        <Text style={styles.scoreLabel}>Assessment Score</Text>

        <View style={styles.rule} />
        <Text style={styles.detailLabel}>Issue Date</Text>
        <Text style={styles.detailValue}>{certificate.issueDate}</Text>
        <Text style={styles.detailLabel}>Certificate Number</Text>
        <Text style={styles.detailValue}>{certificate.certificateNumber}</Text>
      </Card>

      <Button title="Back to Certificates" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
  },
  certificate: {
    padding: theme.spacing.xl,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.accent,
    backgroundColor: '#FFFCF2',
  },
  brand: {
    ...theme.typography.label,
    color: theme.colors.primary,
    letterSpacing: 2,
    marginBottom: theme.spacing.xl,
  },
  certificateLabel: {
    ...theme.typography.h3,
    color: theme.colors.accent,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  recipientLabel: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
  },
  traineeName: {
    ...theme.typography.h1,
    color: theme.colors.primary,
    textAlign: 'center',
    marginVertical: theme.spacing.sm,
  },
  bodyText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  moduleName: {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginTop: theme.spacing.sm,
  },
  score: {
    fontSize: 42,
    fontWeight: '800',
    color: theme.colors.success,
    marginTop: theme.spacing.xl,
  },
  scoreLabel: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.secondary,
  },
  rule: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    marginVertical: theme.spacing.xl,
  },
  detailLabel: {
    ...theme.typography.label,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.sm,
  },
  detailValue: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
    fontWeight: '700',
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
});
