import 'react-native-gesture-handler';
import React, { useState } from 'react';
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import LoginProvider, { AsyncStorageType } from './contexts/LoginContext';
import { NavigationContainer } from '@react-navigation/native';
import DisplayNav from './components/navigation/DisplayNav';
import AuthProvider from './contexts/AuthContext';
import { NativeBaseProvider } from 'native-base';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  // const [asyncStorageValue, setAsyncStorageValue] = useState<string | null>(
  //   null
  // );

  // const httpLink = createHttpLink({
  //   uri: 'http://192.168.1.87:4000/graphql',
  // });

  // const authLink = setContext((_, { headers }) => {
  //   AsyncStorage.getItem('token').then((value: any) => {
  //     const token = JSON.parse(value);
  //     setAsyncStorageValue(token.token);
  //   });
  //   if (asyncStorageValue !== null || asyncStorageValue !== '') {
  //     return {
  //       headers: {
  //         ...headers,
  //         authorization: asyncStorageValue
  //           ? `Bearer ${asyncStorageValue}`
  //           : null,
  //       },
  //     };
  //   } else return null;
  // });

  const client = new ApolloClient({
    uri: 'http://192.168.1.87:4000/graphql',
    // link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <NativeBaseProvider>
      <ApolloProvider client={client}>
        <AuthProvider>
          <LoginProvider>
            <NavigationContainer>
              <DisplayNav />
            </NavigationContainer>
          </LoginProvider>
        </AuthProvider>
      </ApolloProvider>
    </NativeBaseProvider>
  );
}
