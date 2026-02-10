import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { Input, InputField, InputSlot } from '@/components/ui/input';
import { IMAGE_PATH } from '@/constants/imagePath';
import { useAuth } from '@/contexts/AuthContext';
import { Image, ImageBackground } from 'expo-image';
import { useRouter } from 'expo-router';

import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function SignIn() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      // Simulate API call - replace with your actual authentication logic
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock user data - replace with actual API response
      const userData = {
        id: '1',
        email: email,
        name: 'User Name',
      };

      await login(userData);
      router.replace('/(drawer)/(tabs)');
    } catch (error) {
      Alert.alert('Error', 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ImageBackground
        source={IMAGE_PATH.BLUR_BACKGROUND_IMAGE}
        style={{ flex: 1 }}
        blurRadius={10}
      >
        <View className="flex-1 px-6 justify-between">
          {/* TOP */}
          <View className="items-center mt-10">
            <Image source={IMAGE_PATH.TITLE_LOGO} style={styles.titleLogo} contentFit="contain" />
            <Text className="text-white font-satoshi-bold text-2xl mt-4">Welcome!</Text>
            <Text className="text-white/80 mt-2 text-center">Enter your phone number below</Text>
            <Text className="text-white/80 mt-1 text-center">to access your account</Text>
          </View>

          {/* MIDDLE */}
          <View className="w-full gap-6">
            <Input variant="outline" size="lg" className="bg-white rounded-lg h-12">
              <InputSlot className="pl-3">
                <Text>+91</Text>
              </InputSlot>
              <InputField className="text-md" placeholder="Enter Phone Number" />
            </Input>

            <Button
              size="lg"
              className="h-12 rounded-md bg-primary-500"
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <ButtonSpinner color="gray" />
                  <ButtonText className="font-medium text-md ml-2">Please wait...</ButtonText>
                </>
              ) : (
                <ButtonText className="font-medium text-md">Send Otp</ButtonText>
              )}
            </Button>
          </View>

          {/* BOTTOM */}
          <View className="items-center mb-6">
            <Text className="text-white/70 text-sm text-center">I agree to the Aumbrams</Text>

            <View className="flex-row gap-1">
              <Pressable>
                <Text className="text-white/70 underline text-sm">terms of service</Text>
              </Pressable>

              <Text className="text-white/70 text-sm">and</Text>

              <Pressable>
                <Text className="text-white/70 underline text-sm">privacy policy</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  titleLogo: {
    width: 200,
    height: 80,
  },
});
