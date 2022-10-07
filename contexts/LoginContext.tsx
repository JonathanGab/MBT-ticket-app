import React, { useContext, useEffect } from 'react';
import { createContext, useState, Dispatch, SetStateAction } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext, IAuthContextProps } from './AuthContext';

export type AsyncStorageType = {
  token: string | null;
  userId: string | null;
};
export interface ILoginContext {
  valueAsyncStorage: AsyncStorageType;
  setValueAsyncStorage: Dispatch<SetStateAction<AsyncStorageType>>;
  removeData: () => void;
}

export const LoginContext = createContext<ILoginContext | null>(null);

export default function LoginProvider({ children }: any) {
  const [valueAsyncStorage, setValueAsyncStorage] = useState<AsyncStorageType>({
    token: null,
    userId: null,
  });
  const { token, userId } = useContext(AuthContext) as IAuthContextProps;

  const storeData = async (value: object) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('token', jsonValue);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (token) {
      storeData({ token: token, userId: userId });
    }
  }, [token]);

  const getData = async () => {
    try {
      const getJson = await AsyncStorage.getItem('token');
      return getJson != null ? setValueAsyncStorage(JSON.parse(getJson)) : null;
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getData();
  }, [token]);

  const removeData = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setValueAsyncStorage({ token: null, userId: null });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <LoginContext.Provider
      value={{ valueAsyncStorage, setValueAsyncStorage, removeData }}
    >
      {children}
    </LoginContext.Provider>
  );
}
