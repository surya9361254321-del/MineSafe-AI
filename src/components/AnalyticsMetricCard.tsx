import React from 'react';
import { Text, StyleSheet, ViewStyle } from 'react-native';
import { Card } from './Card';
import { theme } from '../theme/theme';

interface AnalyticsMetricCardProps {
  label: string;
  value: string;
  hint?: string;
  accentColor?: string;
  style?: ViewStyle;
}

export const AnalyticsMetricCard: React.FC<AnalyticsMetricCardProps> = ({
  label,
  value,
  hint,
  accentColor = theme.colors.primary,
  style,
}) => (
  <Card style={[styles.card, style]}>
    <Text style={styles.label}>{label}</Text>
    <Text style={[styles.value, { color: accentColor }]}>{value}</Text>
    {hint ? <Text style={styles.hint}>{hint}</Text> : null}
  </Card>
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: theme.spacing.md,
  },
  label: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.sm,
  },
  value: {
    fontSize: 26,
    fontWeight: '800',
  },
  hint: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.xs,
  },
});
