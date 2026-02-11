import { StyleSheet, View } from 'react-native';

import { BackgroundImage } from '@/components/BackgroundImage';
import { FloatingHeader } from '@/components/navigation/FloatingHeader';

export default function HomeScreen() {
  return (
    <BackgroundImage>
      <View style={{ flex: 1 }}>
        <FloatingHeader title="Home" />
      </View>
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
