'use client';

import React from 'react';
import { StartVideo } from './StartVideo';

interface LoadingScreenProps {
  coupleNames?: string;
  onFinish?: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  coupleNames = 'Nuha & Thakkif',
  onFinish,
  isOpen = true,
  onClose,
}) => {
  return (
    <StartVideo
      videoUrl="/vdo.mp4"
      coupleNames={coupleNames}
      onComplete={onFinish}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
};
