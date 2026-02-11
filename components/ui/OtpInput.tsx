import React, { useEffect, useRef } from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from 'react-native';

type OtpInputProps = {
  value: string;
  field?: number;
  onChange: (otp: string) => void;
  className?: string;
  autoFocus?: boolean;
};

const OtpInput = ({ value, field = 6, onChange, className, autoFocus = true }: OtpInputProps) => {
  const digits = value.split('').concat(Array(field - value.length).fill(''));
  const inputsRef = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (autoFocus && inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, [autoFocus]);

  const handleOtpChange = (val: string, index: number) => {
    if (!/^[0-9]?$/.test(val)) return;

    const otpArray = [...digits];
    otpArray[index] = val;
    const newOtp = otpArray.join('');
    onChange(newOtp);

    if (val && index < otpArray.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    if (val && index === otpArray.length - 1) {
      inputsRef.current[index]?.blur();
    }
  };

  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && digits[index] === '' && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <View className="flex-row justify-center">
      {digits.map((digit, index) => (
        <TextInput
          key={index}
          style={styles.otpBox}
          className="border text-black bg-white border-gray-300 mx-1 text-center rounded-xl"
          maxLength={1}
          keyboardType="number-pad"
          onChangeText={(val) => handleOtpChange(val, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          value={digit}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  otpBox: {
    fontSize: 18,
    height: 50,
    width: 50,
  },
});

export default OtpInput;
