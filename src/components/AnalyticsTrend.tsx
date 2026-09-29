import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from './Card';
import { theme } from '../theme/theme';

interface AnalyticsTrendProps {
  title: string;
  values: number[];
  labels: string[];
  suffix?: string;
  color?: string;
}

export const AnalyticsTrend: React.FC<AnalyticsTrendProps> = ({
  title,
  values,
  labels,
  suffix = '%',
  color = theme.colors.accent,
}) => {
  const maximum = Math.max(...values, 1);

  return (
    <Card style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.chart}>
        {values.map((value, index) => (
          <View key={`${labels[index]}-${value}`} style={styles.column}>
            <View style={styles.barTrack}>
              <View style={[styles.bar, { height: `${Math.max((value / maximum) * 100, 8)}%`, backgroundColor: color }]} />
            </View>
            <Text style={styles.value}>{value}{suffix}</Text>
            <Text style={styles.label}>{labels[index]}</Text>
          </View>
        ))}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: theme.spacing.lg,
  },
  title: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
  },
  chart: {
    height: 170,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
  },
  column: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  barTrack: {
    height: 112,
    width: 24,
    justifyContent: 'flex-end',
    backgroundColor: theme.colors.border,
    borderRadius: theme.borderRadius.sm,
    overflow: 'hidden',
  },
  bar: {
    width: '100%',
    borderRadius: theme.borderRadius.sm,
  },
  value: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.primary,
    fontWeight: '700',
    marginTop: theme.spacing.xs,
  },
  label: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.secondary,
    marginTop: 2,
  },
});
