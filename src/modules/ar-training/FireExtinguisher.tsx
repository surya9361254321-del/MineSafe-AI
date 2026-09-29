import React, { useEffect, useRef, useState } from 'react';
import {
  Viro3DObject,
  ViroNode,
} from '@reactvision/react-viro';

type FireExtinguisherProps = {
  position?: [number, number, number];
  onSelected?: () => void;
};

export const FireExtinguisher = ({
  position,
  onSelected,
}: FireExtinguisherProps) => {
  const [selected, setSelected] = useState(false);
  const selectionReportedRef = useRef(false);

  useEffect(() => {
    console.log('Extinguisher rendered');
  }, []);

  const handleSelected = () => {
    if (selectionReportedRef.current) {
      return;
    }

    selectionReportedRef.current = true;
    setSelected(true);
    console.log('Extinguisher selected');
    onSelected?.();
  };

  return (
    <ViroNode position={position} onClick={handleSelected}>
      <Viro3DObject
        source={require('../../assets/models/fire_extinguisher.glb')}
        type="GLB"
        position={[0, 0, 0]}
        scale={[0.2, 0.2, 0.2]}
        rotation={[0, 0, 0]}
        onClick={handleSelected}
      />
    </ViroNode>
  );
};
