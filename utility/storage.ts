import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV();

export const localstorage = {
  setItem: (key: string, val: any): Promise<boolean> => {
    const value = typeof val === 'string' ? val : JSON.stringify(val);
    storage.set(key, value);
    return Promise.resolve(true);
  },

  getItem: <T = string>(key: string): Promise<T | null> => {
    const value = storage.getString(key);
    if (value === undefined) return Promise.resolve(null);

    try {
      return Promise.resolve(JSON.parse(value) as T);
    } catch {
      return Promise.resolve(value as T);
    }
  },

  removeItem: (key: string): Promise<void> => {
    storage.remove(key);
    return Promise.resolve();
  },

  clearAll: (): Promise<void> => {
    storage.clearAll();
    return Promise.resolve();
  },

  // 👇 nice extra helper
  contains: (key: string): boolean => {
    return storage.contains(key);
  },
};
