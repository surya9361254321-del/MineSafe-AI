export const theme = {
  colors: {
    primary: '#0F172A', // Deep Navy
    secondary: '#1E3A8A', // Industrial Blue
    accent: '#F97316', // Safety Orange
    success: '#22C55E', // Green
    warning: '#FACC15', // Yellow
    error: '#DC2626', // Red (for destructive actions like logout)
    background: '#F8FAFC', // Light Gray
    card: '#FFFFFF', // White
    text: {
      primary: '#1E293B',
      secondary: '#64748B',
      inverse: '#FFFFFF',
    },
    border: '#E2E8F0',
  },
  typography: {
    h1: {
      fontFamily: 'Inter_700Bold',
      fontSize: 32,
      lineHeight: 40,
    },
    h2: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 24,
      lineHeight: 32,
    },
    h3: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 20,
      lineHeight: 28,
    },
    bodyLarge: {
      fontFamily: 'Inter_400Regular',
      fontSize: 16,
      lineHeight: 24,
    },
    body: {
      fontFamily: 'Inter_400Regular',
      fontSize: 14,
      lineHeight: 20,
    },
    bodySmall: {
      fontFamily: 'Inter_400Regular',
      fontSize: 12,
      lineHeight: 16,
    },
    label: {
      fontFamily: 'Inter_500Medium',
      fontSize: 14,
      lineHeight: 20,
      textTransform: 'uppercase' as const,
    },
    button: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 16,
      lineHeight: 24,
    }
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  shadows: {
    sm: {
      shadowColor: '#0F172A',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#0F172A',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 4,
    },
    lg: {
      shadowColor: '#0F172A',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.15,
      shadowRadius: 15,
      elevation: 8,
    },
  },
};
