import AsyncStorage from '@react-native-async-storage/async-storage';

export const localstorage = {
  setItem: async (key: string, val: any): Promise<boolean> => {
    try {
      const value = typeof val === 'string' ? val : JSON.stringify(val);
      await AsyncStorage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  },

  getItem: async <T = string>(key: string): Promise<T | null> => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value === null) return null;

      try {
        return JSON.parse(value) as T;
      } catch {
        return value as T;
      }
    } catch {
      return null;
    }
  },

  removeItem: async (key: string): Promise<void> => {
    await AsyncStorage.removeItem(key);
  },

  clearAll: async (): Promise<void> => {
    await AsyncStorage.clear();
  },

  // 👇 equivalent helper
  contains: async (key: string): Promise<boolean> => {
    const value = await AsyncStorage.getItem(key);
    return value !== null;
  },
};
