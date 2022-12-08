import 'react-native-gesture-handler';
import React, { useState } from 'react';
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import LoginProvider from './contexts/LoginContext';
import { NavigationContainer } from '@react-navigation/native';
import DisplayNav from './components/navigation/DisplayNav';
import AuthProvider from './contexts/AuthContext';
import { NativeBaseProvider } from 'native-base';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const httpLink = createHttpLink({
    uri: 'http://192.168.1.87:4000/graphql',
    //  uri: 'http://localhost:4000/graphql',
  });

  const authLink = setContext(async (_, { headers }) => {
    let token;
    const getJson = await AsyncStorage.getItem('token');
    if (getJson !== null) {
      token = JSON.parse(getJson);
    } else {
      token = null;
    }
    return {
      headers: {
        ...headers,
        authorization: getJson !== null ? `Bearer ${token.token}` : '',
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
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
