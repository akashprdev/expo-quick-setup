import { Platform } from 'react-native';

export const isIos = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

let DeviceInfo: any = null;
try {
  DeviceInfo = require('react-native-device-info').default;
} catch (error) {
  console.warn('react-native-device-info not available:', error);
}

export const getDeviceAndIpInfo = async (): Promise<{
  device_type: string;
  user_agent?: string;
  ip_address?: string;
}> => {
  let deviceType = 'web';
  let userAgent = '';
  let ipAddress: string | undefined;

  try {
    if (isAndroid) {
      deviceType = 'mobile_android';
      if (DeviceInfo && DeviceInfo.getUserAgent) {
        userAgent = await DeviceInfo.getUserAgent();
      } else {
        // Fallback user agent for Android
        userAgent = 'Mozilla/5.0 (Linux; Android) AppleWebKit/537.36';
      }
    } else if (isIos) {
      deviceType = 'mobile_ios';
      if (DeviceInfo && DeviceInfo.getUserAgent) {
        userAgent = await DeviceInfo.getUserAgent();
      } else {
        // Fallback user agent for iOS
        userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS like Mac OS X) AppleWebKit/605.1.15';
      }
    } else {
      deviceType = 'web';
      // Fallback for web environment
      userAgent = 'Mozilla/5.0 (compatible; Web)';
    }
  } catch (error) {
    console.warn('Error getting user agent:', error);
    userAgent = '';
  }

  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    ipAddress = data?.ip;
  } catch {
    ipAddress = undefined;
  }

  return {
    device_type: deviceType,
    user_agent: userAgent,
    ip_address: ipAddress,
  };
};
