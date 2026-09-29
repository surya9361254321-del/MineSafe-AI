import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthContext } from '../../context/AuthContext';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { mockCertificates } from '../../data/mockData';
import { TraineeStackParamList, TraineeTabParamList } from '../../navigation/types';
import { theme } from '../../theme/theme';

export const ProfileScreen = () => {
  const { user, logout } = useContext(AuthContext);
  const navigation = useNavigation<BottomTabNavigationProp<TraineeTabParamList>>();
  const stackNavigation = navigation.getParent<NativeStackNavigationProp<TraineeStackParamList>>();
  const certificateCount = mockCertificates.filter((certificate) => certificate.userId === user?.id).length;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.eyebrow}>PROFILE</Text>
      <Text style={styles.title}>Keep your account ready.</Text>

      <Card style={styles.profileCard}>
        <Text style={styles.profileLabel}>SIGNED IN AS</Text>
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.role}>Trainee Portal</Text>
      </Card>

      <Card style={styles.infoCard}>
        <Text style={styles.infoTitle}>Safety commitment</Text>
        <Text style={styles.infoText}>
          Complete your assigned training before entering a new work area.
        </Text>
      </Card>

      <Card style={styles.certificateCard}>
        <Text style={styles.infoTitle}>Certificates</Text>
        <Text style={styles.certificateCount}>{certificateCount}</Text>
        <Text style={styles.infoText}>Verified safety credentials earned.</Text>
        <Button
          title="View Certificates"
          variant="secondary"
          onPress={() => stackNavigation?.navigate('CertificateList')}
        />
      </Card>

      <Button title="Sign Out" variant="danger" onPress={logout} />
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
    marginBottom: theme.spacing.lg,
  },
  profileCard: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
  },
  profileLabel: {
    ...theme.typography.label,
    color: '#FFFFFF99',
    marginBottom: theme.spacing.sm,
  },
  name: {
    ...theme.typography.h2,
    color: theme.colors.card,
  },
  role: {
    ...theme.typography.body,
    color: '#FFFFFFCC',
    marginTop: theme.spacing.xs,
  },
  infoCard: {
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  infoTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  infoText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
  },
  certificateCard: {
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  certificateCount: {
    fontSize: 32,
    fontWeight: '800',
    color: theme.colors.accent,
    marginBottom: theme.spacing.xs,
  },
});
