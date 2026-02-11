import { IMAGE_PATH } from '@/constants/imagePath';
import { ImageBackground } from 'expo-image';
import React, { ReactNode } from 'react';

export const BackgroundImage = ({ children }: { children: ReactNode }) => {
  return (
    <ImageBackground source={IMAGE_PATH.BLUR_BACKGROUND_IMAGE} style={{ flex: 1 }} blurRadius={10}>
      {children}
    </ImageBackground>
  );
};
