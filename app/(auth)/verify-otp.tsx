import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import OtpInput from '@/components/ui/OtpInput';
import { useToast } from '@/components/ui/toast';
import { IMAGE_PATH } from '@/constants/imagePath';
import {
  useVerifyOtpMutation,
  VerifyOtpRequest,
} from '@/services/mutate/auth/user/verifyVendorOtp';
import { useUserStore } from '@/store/useUserStore';
import { encryptCrypto } from '@/utility/crypto';
import { getDeviceAndIpInfo } from '@/utility/getDeviceAndIpInfo';
import { useForm } from '@tanstack/react-form';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useShallow } from 'zustand/react/shallow';

import { BackgroundImage } from '@/components/BackgroundImage';
import { AppToast } from '@/components/ui/toast/AppToast';
import { CircleCheckBigIcon, CircleXIcon } from 'lucide-react-native';
import React from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

function VerifyOtp() {
  const { setUser, setLoggedIn } = useUserStore(
    useShallow((state) => ({
      setUser: state.setUser,
      setLoggedIn: state.setLoggedIn,
    }))
  );

  const params = useLocalSearchParams();

  const router = useRouter();
  const toast = useToast();

  const phoneNumber = params.phone as string;
  const phonePrefix = params.phone_prefix as string;

  const { mutate: otpVerify, status } = useVerifyOtpMutation();

  const form = useForm({
    defaultValues: {
      otp: '',
    },
    onSubmit: async ({ value }) => {
      const deviceInfo = await getDeviceAndIpInfo();

      const payload = {
        phone: encryptCrypto('7504587810'), // Replace with actual phone number
        otp: encryptCrypto(value.otp),
        //    fcmtoken: fcmToken || '',
        device_type: deviceInfo?.device_type || '',
        ip_address: deviceInfo?.ip_address || '',
        user_agent: deviceInfo?.user_agent || '',
      } as VerifyOtpRequest;

      otpVerify(
        { payload },
        {
          onSuccess: (data) => {
            toast.show({
              placement: 'bottom',
              render: ({ id }) => (
                <AppToast id={id} title={'OTP verified successfully'} icon={CircleCheckBigIcon} />
              ),
            });

            const { is_signup_complete, is_category_selected, user_details } = data.data;

            const userData = {
              id: user_details.id,
              name: user_details.name,
              email: user_details.email,
              phone: user_details.phone,
              signupComplete: is_signup_complete,
              categorySelected: is_category_selected,
            };
            setUser(userData);

            if (!is_signup_complete) {
              router.push('/(auth)/accountSetup');
            }
            // else if (!is_category_selected) {
            //   router.push('/(auth)/selectCategory');
            // }
            else {
              setLoggedIn(true);
              router.push('/(drawer)/(tabs)/explore');
            }
          },
          onError: (error: any) => {
            toast.show({
              placement: 'bottom',
              render: ({ id }) => <AppToast id={id} title={error.message} icon={CircleXIcon} />,
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
            <Text className="text-white font-satoshi-bold text-2xl mt-4">Enter Code</Text>
            <Text className="text-white/80 mt-2 text-center">
              We’ve sent an SMS with an activation code \nto your phone
            </Text>
            <Text className="text-white/80 mt-1 text-center">
              {phonePrefix} {phoneNumber}
            </Text>
          </View>

          <View className="w-full gap-6">
            <form.Field
              name="otp"
              validators={{
                onChange: (val) =>
                  !/^[0-9]{6}$/.test(val.value) ? 'Enter a valid 6-digit OTP' : undefined,
              }}
            >
              {({ state, handleChange }) => (
                <View>
                  <OtpInput
                    value={state.value}
                    onChange={(text) => handleChange(text)}
                    autoFocus={false}
                  />
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
                    className="h-12 rounded-md bg-primary-500"
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

export default VerifyOtp;
