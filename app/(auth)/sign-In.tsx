import { BackgroundImage } from '@/components/BackgroundImage';
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { Input, InputField, InputSlot } from '@/components/ui/input';
import { useToast } from '@/components/ui/toast';
import { AppToast } from '@/components/ui/toast/AppToast';
import { IMAGE_PATH } from '@/constants/imagePath';
import { useLogInMutation } from '@/services/mutate/auth/user/login';
import { encryptCrypto } from '@/utility/crypto';
import { useForm } from '@tanstack/react-form';
import { AxiosError } from 'axios';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { CheckCircle2, SendIcon } from 'lucide-react-native';

import React from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

export default function SignIn() {
  const router = useRouter();
  const toast = useToast();

  const { mutate: loginMutate, status } = useLogInMutation();

  const form = useForm({
    defaultValues: {
      phone: '',
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      loginMutate(
        { phone: encryptCrypto(value.phone), phone_prefix: '+91' },
        {
          onSuccess: (response) => {
            toast.show({
              placement: 'bottom',
              render: ({ id }) => (
                <AppToast
                  id={id}
                  title={response?.message || 'OTP sent successfully'}
                  icon={SendIcon}
                />
              ),
            });

            router.push({
              pathname: '/(auth)/verify-otp',
              params: {
                phone: value.phone,
                phone_prefix: '+91',
              },
            });

            // navigate(navigationStrings.PUBLIC.OTP_VERIFY, {
            //   phoneNumber: cleanNumber,
            //   phone_prefix: formValues.phone_prefix,
            // });
          },
          onError: (error: Error) => {
            const axiosError = error as AxiosError<any>;
            toast.show({
              placement: 'bottom',
              render: ({ id }) => (
                <AppToast
                  id={id}
                  title={
                    axiosError?.response?.data?.message || 'Failed to send OTP. Please try again.'
                  }
                  icon={CheckCircle2}
                />
              ),
            });
          },
        }
      );
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <BackgroundImage>
        <View className="flex-1 px-6 justify-between">
          {/* TOP */}
          <View className="items-center mt-10">
            <Image source={IMAGE_PATH.TITLE_LOGO} style={styles.titleLogo} contentFit="contain" />
            <Text className="text-white font-satoshi-bold text-2xl mt-4">Welcome!</Text>
            <Text className="text-white/80 mt-2 text-center">Enter your phone number below</Text>
            <Text className="text-white/80 mt-1 text-center">to access your account</Text>
          </View>

          <View className="w-full gap-6">
            <form.Field
              name="phone"
              validators={{
                onChange: (val) =>
                  !/^[0-9]{10}$/.test(val.value) ? 'Enter a valid phone number' : undefined,
              }}
            >
              {({ state, handleChange }) => (
                <View>
                  <Input variant="outline" size="lg" className="bg-white rounded-lg h-12">
                    <InputSlot className="pl-3">
                      <Text>+91</Text>
                    </InputSlot>
                    <InputField
                      className="text-md"
                      placeholder="Enter Phone Number"
                      onChangeText={(text) => handleChange(text)}
                      value={state.value}
                      keyboardType="number-pad"
                    />
                  </Input>
                  {!state.meta.isValid && state.meta.isTouched && (
                    <Text className="text-red-500 text-sm">{state.meta.errors.join(', ')}</Text>
                  )}
                </View>
              )}
            </form.Field>

            <form.Subscribe
              selector={(state) => ({
                isSubmitting: state.isSubmitting,
                isDirty: state.isDirty,
                canSubmit: state.canSubmit,
                isDefaultValue: state.isDefaultValue,
              })}
            >
              {({ isSubmitting, canSubmit }) => (
                <>
                  <Button
                    onPress={form.handleSubmit}
                    size="lg"
                    style={{
                      height: 50,
                      borderRadius: 10,
                      backgroundColor: '#20323e6f',
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      borderWidth: 1,
                      shadowOpacity: 0.15,
                      shadowRadius: 20,
                      shadowColor: '#000',
                    }}
                    disabled={!canSubmit || isSubmitting || status === 'pending'}
                  >
                    {isSubmitting || status === 'pending' ? (
                      <>
                        <ButtonSpinner color="gray" />
                        <ButtonText className="font-medium text-md ml-2">Please wait...</ButtonText>
                      </>
                    ) : (
                      <ButtonText className="font-medium text-md">Send OTP</ButtonText>
                    )}
                  </Button>
                </>
              )}
            </form.Subscribe>
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
      </BackgroundImage>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  titleLogo: {
    width: 200,
    height: 80,
  },
});
