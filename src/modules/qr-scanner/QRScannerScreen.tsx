import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TraineeStackParamList } from '../../navigation/types';
import { theme } from '../../theme/theme';
import { Card } from '../../components/Card';
import { mockQRAssets } from '../../data/mockData';
import { launchARScenario } from '../ar-training/arService';

type Props = {
  navigation: NativeStackNavigationProp<TraineeStackParamList, 'QRScanner'>;
};

export const QRScannerScreen = ({ navigation }: Props) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    const assetCode = data.trim().toUpperCase();
    const asset = mockQRAssets.find((item) => item.assetCode === assetCode);

    if (!asset) {
      setScanned(false);
      alert(`QR asset ${assetCode} is not registered.`);
      return;
    }

    launchARScenario(asset.assetCode)
      .then((session) => {
        alert(`${asset.assetCode} recognized. Preparing ${asset.trainingModule}...`);
        navigation.replace('ARTraining', { sessionId: session.id });
      })
      .catch((error: unknown) => {
        setScanned(false);
        alert(error instanceof Error ? error.message : 'Unable to launch AR scenario.');
      });
  };

  if (hasPermission === null) {
    return (
      <View style={styles.centered}>
        <Text style={styles.message}>Requesting camera permission...</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.centered}>
        <Text style={styles.message}>No access to camera</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        style={styles.camera}
      />
      
      <View style={styles.overlayContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>Close</Text>
          </TouchableOpacity>
        </View>

        {/* Scanner target box placeholder */}
        <View style={styles.scannerFrame}>
          <View style={styles.scannerCornerTL} />
          <View style={styles.scannerCornerTR} />
          <View style={styles.scannerCornerBL} />
          <View style={styles.scannerCornerBR} />
        </View>

        <View style={styles.footer}>
          {scanned ? (
            <TouchableOpacity 
              style={styles.rescanButton} 
              onPress={() => setScanned(false)}
            >
              <Text style={styles.rescanButtonText}>Tap to Scan Again</Text>
            </TouchableOpacity>
          ) : (
            <Card style={styles.instructionCard}>
              <Text style={styles.instructionText}>
                Align the module QR code within the frame to start your training session.
              </Text>
            </Card>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  camera: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  message: {
    ...theme.typography.bodyLarge,
    color: theme.colors.text.secondary,
  },
  overlayContainer: {
    flex: 1,
    justifyContent: 'space-between',
    padding: theme.spacing.xl,
  },
  header: {
    alignItems: 'flex-start',
    marginTop: theme.spacing.lg,
  },
  backButton: {
    backgroundColor: 'rgba(15, 23, 42, 0.7)', // Dark semi-transparent
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.full,
  },
  backButtonText: {
    ...theme.typography.button,
    color: theme.colors.card,
  },
  scannerFrame: {
    width: 250,
    height: 250,
    alignSelf: 'center',
    position: 'relative',
  },
  scannerCornerTL: {
    position: 'absolute',
    top: 0, left: 0,
    width: 40, height: 40,
    borderColor: theme.colors.accent,
    borderTopWidth: 4, borderLeftWidth: 4,
    borderTopLeftRadius: theme.borderRadius.lg,
  },
  scannerCornerTR: {
    position: 'absolute',
    top: 0, right: 0,
    width: 40, height: 40,
    borderColor: theme.colors.accent,
    borderTopWidth: 4, borderRightWidth: 4,
    borderTopRightRadius: theme.borderRadius.lg,
  },
  scannerCornerBL: {
    position: 'absolute',
    bottom: 0, left: 0,
    width: 40, height: 40,
    borderColor: theme.colors.accent,
    borderBottomWidth: 4, borderLeftWidth: 4,
    borderBottomLeftRadius: theme.borderRadius.lg,
  },
  scannerCornerBR: {
    position: 'absolute',
    bottom: 0, right: 0,
    width: 40, height: 40,
    borderColor: theme.colors.accent,
    borderBottomWidth: 4, borderRightWidth: 4,
    borderBottomRightRadius: theme.borderRadius.lg,
  },
  footer: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  instructionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: theme.spacing.lg,
  },
  instructionText: {
    ...theme.typography.body,
    color: theme.colors.primary,
    textAlign: 'center',
  },
  rescanButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.full,
    ...theme.shadows.md,
  },
  rescanButtonText: {
    ...theme.typography.button,
    color: theme.colors.card,
  },
});
