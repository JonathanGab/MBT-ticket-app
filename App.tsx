import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './components/navigation/Navigation';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import LoginProvider from './contexts/LoginContext';
import DrawerNavigation from './components/navigation/DrawerNavigation';
import { NavigationContainer } from '@react-navigation/native';
import DisplayNav from './components/navigation/DisplayNav';

export default function App() {
  const client = new ApolloClient({
    uri: 'http://192.168.1.23:4000/graphql',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <LoginProvider>
        <NavigationContainer>
          <DisplayNav />
        </NavigationContainer>
      </LoginProvider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// jg@null.com
