import 'react-native-gesture-handler';
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import LoginProvider from './contexts/LoginContext';
import { NavigationContainer } from '@react-navigation/native';
import DisplayNav from './components/navigation/DisplayNav';
import AuthProvider from './contexts/AuthContext';

export default function App() {
  const client = new ApolloClient({
    uri: 'http://192.168.1.23:4000/graphql',
    //  uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <LoginProvider>
          <NavigationContainer>
            <DisplayNav />
          </NavigationContainer>
        </LoginProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}
