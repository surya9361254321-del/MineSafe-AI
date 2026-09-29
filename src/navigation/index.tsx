import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AuthContext } from '../context/AuthContext';
import { AuthStackParamList, AdminStackParamList, TraineeStackParamList, TraineeTabParamList } from './types';

// Screens
import { LoginScreen } from '../screens/auth/LoginScreen';
import { TraineeDashboard } from '../screens/trainee/TraineeDashboard';
import { TrainingScreen } from '../screens/trainee/TrainingScreen';
import { AssessmentHubScreen } from '../screens/trainee/AssessmentHubScreen';
import { PerformanceScreen } from '../screens/trainee/PerformanceScreen';
import { ProfileScreen } from '../screens/trainee/ProfileScreen';
import { AdminDashboard } from '../screens/admin/AdminDashboard';
import { QRAssetListScreen } from '../screens/admin/QRAssetListScreen';
import { QRAssetDetailScreen } from '../screens/admin/QRAssetDetailScreen';
import { QRScannerScreen } from '../modules/qr-scanner/QRScannerScreen';
import { ARLaunchScreen } from '../modules/ar-training/ARLaunchScreen';
import { ARTrainingScreen } from '../modules/ar-training/ARTrainingScreen';
import { ARAssessmentScreen } from '../modules/ar-training/ARAssessmentScreen';
import { ARPlaceholderScreen } from '../modules/ar-training/ARPlaceholderScreen';
import { AssessmentScreen } from '../modules/assessments/AssessmentScreen';
import { AnalyticsScreen } from '../modules/analytics/AnalyticsScreen';
import { ScenarioAnalyticsScreen } from '../modules/analytics/ScenarioAnalyticsScreen';
import { CertificateListScreen } from '../modules/certificates/CertificateListScreen';
import { CertificateDetailScreen } from '../modules/certificates/CertificateDetailScreen';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AdminStack = createNativeStackNavigator<AdminStackParamList>();
const TraineeStack = createNativeStackNavigator<TraineeStackParamList>();
const TraineeTabs = createBottomTabNavigator<TraineeTabParamList>();

const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
  </AuthStack.Navigator>
);

const AdminNavigator = () => (
  <AdminStack.Navigator>
    <AdminStack.Screen name="AdminDashboard" component={AdminDashboard} options={{ title: 'Admin Dashboard' }} />
    <AdminStack.Screen name="Analytics" component={AnalyticsScreen} options={{ title: 'Analytics' }} />
    <AdminStack.Screen name="ScenarioAnalytics" component={ScenarioAnalyticsScreen} options={{ title: 'Scenario Analytics' }} />
    <AdminStack.Screen name="QRAssetList" component={QRAssetListScreen} options={{ title: 'QR Asset Registry' }} />
    <AdminStack.Screen name="QRAssetDetail" component={QRAssetDetailScreen} options={{ title: 'QR Asset Details' }} />
  </AdminStack.Navigator>
);

const TraineeTabNavigator = () => (
  <TraineeTabs.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#F97316',
      tabBarInactiveTintColor: '#64748B',
    }}
  >
    <TraineeTabs.Screen name="Home" component={TraineeDashboard} />
    <TraineeTabs.Screen name="Training" component={TrainingScreen} />
    <TraineeTabs.Screen name="Assessment" component={AssessmentHubScreen} />
    <TraineeTabs.Screen name="Performance" component={PerformanceScreen} />
    <TraineeTabs.Screen name="Profile" component={ProfileScreen} />
  </TraineeTabs.Navigator>
);

const TraineeNavigator = () => (
  <TraineeStack.Navigator>
    <TraineeStack.Screen name="TraineeTabs" component={TraineeTabNavigator} options={{ headerShown: false }} />
    <TraineeStack.Screen name="QRScanner" component={QRScannerScreen} options={{ title: 'Scan QR Code' }} />
    <TraineeStack.Screen name="ARLaunch" component={ARLaunchScreen} options={{ title: 'Training Brief', headerShown: false }} />
    <TraineeStack.Screen name="ARTraining" component={ARTrainingScreen} options={{ title: 'AR Training' }} />
    <TraineeStack.Screen name="ARAssessment" component={ARAssessmentScreen} options={{ title: 'AR Assessment' }} />
    <TraineeStack.Screen name="ARModule" component={ARPlaceholderScreen} options={{ title: 'Training Module', headerShown: false }} />
    <TraineeStack.Screen name="Assessment" component={AssessmentScreen} options={{ title: 'Assessment', headerBackVisible: false }} />
    <TraineeStack.Screen name="CertificateList" component={CertificateListScreen} options={{ title: 'Certificates' }} />
    <TraineeStack.Screen name="CertificateDetail" component={CertificateDetailScreen} options={{ title: 'Certificate' }} />
  </TraineeStack.Navigator>
);

export const RootNavigator = () => {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return null; // Return a loading spinner here in a real app
  }

  return (
    <NavigationContainer>
      {!user ? (
        <AuthNavigator />
      ) : user.role === 'ADMIN' ? (
        <AdminNavigator />
      ) : (
        <TraineeNavigator />
      )}
    </NavigationContainer>
  );
};
