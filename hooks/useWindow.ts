import { useWindowDimensions } from 'react-native';

export function useWindow() {
  const { width, height, scale, fontScale } = useWindowDimensions();

  return {
    width,
    height,
    scale,
    fontScale,
    isLandscape: width > height,
    isPortrait: height >= width,
  };
}
