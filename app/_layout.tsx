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

  if (!isReady) {
    return null;
  }

  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
