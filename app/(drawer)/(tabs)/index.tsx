import { StyleSheet, Text, View } from 'react-native';

import PrimaryLayout from '@/components/PrimaryLayout';

export default function HomeScreen() {
  return (
    <PrimaryLayout>
      <View style={{ flex: 1 }}>
        <Text>Home Screen</Text>
      </View>
    </PrimaryLayout>
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
