import { useUserStore } from '@/store/useUserStore';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useShallow } from 'zustand/react/shallow';

function SecondSplashScreen() {
  const { isloggedIn } = useUserStore(
    useShallow((state) => ({
      isloggedIn: state.isloggedIn,
    }))
  );
  const router = useRouter();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Animate welcome message
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate based on auth status after 2 seconds
    const timer = setTimeout(() => {
      if (isloggedIn) {
        router.replace('/(drawer)/(tabs)/explore');
      } else {
        router.replace('/(auth)/sign-In');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isloggedIn, router, fadeAnim, slideAnim]);
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={styles.appName}>Aumbram</Text>
        <Text style={styles.tagline}>Your Amazing App Experience</Text>
      </Animated.View>

      <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
        <View style={styles.loadingDots}>
          <View style={[styles.dot, styles.dot1]} />
          <View style={[styles.dot, styles.dot2]} />
          <View style={[styles.dot, styles.dot3]} />
        </View>
      </Animated.View>
    </View>
  );
}

export default SecondSplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4f46e5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  welcomeText: {
    fontSize: 24,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 10,
  },
  appName: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  footer: {
    position: 'absolute',
    bottom: 80,
  },
  loadingDots: {
    flexDirection: 'row',
    gap: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  dot1: {
    opacity: 0.4,
  },
  dot2: {
    opacity: 0.7,
  },
  dot3: {
    opacity: 1,
  },
});
