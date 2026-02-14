import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackgroundImage } from './BackgroundImage';
import { FloatingHeader } from './navigation/FloatingHeader';

const PrimaryLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#263B49' }}>
      <BackgroundImage>
        <FloatingHeader />
        <View style={styles.container}>{children}</View>
      </BackgroundImage>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default PrimaryLayout;
