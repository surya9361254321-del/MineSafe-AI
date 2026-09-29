import React, { useContext } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthContext } from '../../context/AuthContext';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { mockCertificates } from '../../data/mockData';
import { TraineeStackParamList } from '../../navigation/types';
import { theme } from '../../theme/theme';

type Props = NativeStackScreenProps<TraineeStackParamList, 'CertificateList'>;

export const CertificateListScreen = ({ navigation }: Props) => {
  const { user } = useContext(AuthContext);
  const certificates = mockCertificates.filter((certificate) => certificate.userId === user?.id);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.eyebrow}>ACHIEVEMENTS</Text>
      <Text style={styles.title}>Your Certificates</Text>
      <Text style={styles.subtitle}>
        Recognitions earned by completing MineSafe AI assessments.
      </Text>

      {certificates.length === 0 ? (
        <Card style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>No certificates yet</Text>
          <Text style={styles.emptyText}>
            Complete a passing assessment to earn your first certificate.
          </Text>
        </Card>
      ) : (
        certificates.map((certificate) => (
          <Card key={certificate.id} style={styles.certificateCard}>
            <Text style={styles.certificateLabel}>CERTIFICATE OF COMPLETION</Text>
            <Text style={styles.moduleName}>{certificate.moduleName}</Text>
            <Text style={styles.certificateNumber}>{certificate.certificateNumber}</Text>
            <Text style={styles.score}>{certificate.score}%</Text>
            <Text style={styles.scoreLabel}>Assessment Score</Text>
            <Text style={styles.issueDate}>Issued {certificate.issueDate}</Text>
            <Button
              title="View Certificate"
              onPress={() => navigation.navigate('CertificateDetail', { certId: certificate.id })}
            />
          </Card>
        ))
      )}
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
  certificateCard: {
    padding: theme.spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.accent,
  },
  certificateLabel: {
    ...theme.typography.label,
    color: theme.colors.accent,
    marginBottom: theme.spacing.sm,
  },
  moduleName: {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  certificateNumber: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.secondary,
    letterSpacing: 1,
    marginBottom: theme.spacing.lg,
  },
  score: {
    fontSize: 36,
    fontWeight: '800',
    color: theme.colors.success,
  },
  scoreLabel: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.sm,
  },
  issueDate: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.lg,
  },
  emptyCard: {
    padding: theme.spacing.lg,
  },
  emptyTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  emptyText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
  },
});
