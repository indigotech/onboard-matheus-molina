import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (value: string) => {
    try {
      await AsyncStorage.setItem('token', value);
    } catch (error) {
      console.log(error);
    }
  };