'use client';

import React from 'react';

interface LoadingScreenProps {
  coupleNames?: string;
  onFinish?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = () => {
  // Return null so no loading overlay screen is shown at all
  return null;
};
