import * as SecureStore from "expo-secure-store";

export const setStorage = async (key: string, value: string) => {
  await SecureStore.setItemAsync(key, value);
};

export const getStorage = async (key: string) => {
  const response = await SecureStore.getItemAsync(key, {});
  return response || undefined;
};

export const removeStorage = async (key: string) => {
  const response = await SecureStore.getItemAsync(key, {});
  if (response) {
    return SecureStore.deleteItemAsync(key, {});
  }
};
