import { Text, View } from 'react-native';

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
