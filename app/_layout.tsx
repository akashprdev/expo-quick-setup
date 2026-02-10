import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import './global.css';

import { AuthProvider } from '@/contexts/AuthContext';
// import { useColorScheme } from '@/hooks/use-color-scheme';
import { useEffect, useState } from 'react';

export const unstable_settings = {
  initialRouteName: 'splash-first',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // const colorScheme = useColorScheme();
  const [isReady, setIsReady] = useState(false);

  const [loaded, error] = useFonts({
    'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
    'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
    'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.ttf'),
    'Satoshi-Regular': require('../assets/fonts/Satoshi-Regular.otf'),
    'Satoshi-Bold': require('../assets/fonts/Satoshi-Bold.otf'),
    'Satoshi-Black': require('../assets/fonts/Satoshi-Black.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500)); // example delay
      } finally {
        setIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!isReady && !error) {
    return null;
  }

  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
