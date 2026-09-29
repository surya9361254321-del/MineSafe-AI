import React, { useEffect, useState } from 'react';
import {
  ViroARScene,
  ViroAmbientLight,
  ViroDirectionalLight,
} from '@reactvision/react-viro';
import { FireExtinguisher } from './FireExtinguisher';

interface ARSurfaceSceneProps {
  sceneNavigator: {
    viroAppProps?: {
      onExtinguisherSelected?: () => void;
    };
  };
}

export const ARSurfaceScene = (props?: ARSurfaceSceneProps) => {
  const onExtinguisherSelected =
    props?.sceneNavigator?.viroAppProps?.onExtinguisherSelected;

  const [extinguisherPosition, setExtinguisherPosition] =
    useState<[number, number, number] | null>(null);

  useEffect(() => {
    console.log('ARSurfaceScene Mounted');
  }, []);

  const handleAnchor = (anchor: any) => {
    if (
      anchor.type === 'plane' &&
      anchor.classification === 'Floor' &&
      !extinguisherPosition
    ) {
      console.log('FLOOR DETECTED');

      const pos = anchor.position as [number, number, number];

      setExtinguisherPosition([
        pos[0],
        pos[1] + 0.3,
        pos[2],
      ]);
    }
  };

  return (
    <ViroARScene
      anchorDetectionTypes={[
        'PlanesHorizontal',
        'PlanesVertical',
      ]}
      onTrackingUpdated={(state, reason) => {
        console.log('TRACKING', state, reason);
      }}
      onAnchorFound={handleAnchor}
      onAnchorUpdated={handleAnchor}
    >
      <ViroAmbientLight color="#ffffff" />
      <ViroDirectionalLight
        color="#ffffff"
        direction={[0, -1, -1]}
      />

      {extinguisherPosition && (
        <FireExtinguisher
          position={extinguisherPosition}
          onSelected={onExtinguisherSelected}
        />
      )}
    </ViroARScene>
  );
};
