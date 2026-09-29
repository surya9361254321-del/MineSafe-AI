import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../../context/AuthContext';
import { Button } from '../../components/Button';
import { Role } from '../../types';
import { theme } from '../../theme/theme';
import { Card } from '../../components/Card';

export const LoginScreen = () => {
  const { login } = useContext(AuthContext);

  const handleLogin = (role: Role) => {
    login(role);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.branding}>MineSafe AI</Text>
      </View>
      
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>AR-Powered Mining Safety Training</Text>

        <Text style={styles.heroSubtitle}>
          Train workers, improve emergency response, and monitor performance
          through immersive safety simulations.
        </Text>
      </View>

      <View style={styles.content}>
        <Card style={styles.loginCard}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Select your portal to continue</Text>
          
          <View style={styles.buttonContainer}>
            <Button title="Trainee Portal" onPress={() => handleLogin('TRAINEE')} />
            <Button title="Admin Portal" onPress={() => handleLogin('ADMIN')} variant="secondary" />
          </View>
        </Card>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingTop: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
    alignItems: 'center',
  },
  branding: {
    ...theme.typography.h2,
    color: theme.colors.primary,
    letterSpacing: 1,
  },
  heroSection: {
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    color: theme.colors.primary,
    marginBottom: 16,
  },
  heroSubtitle: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 26,
    color: theme.colors.text.secondary,
  },
  content: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
  },
  loginCard: {
    padding: theme.spacing.xl,
    alignItems: 'center',
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xl,
  },
  buttonContainer: {
    width: '100%',
    gap: theme.spacing.sm,
  },
});
