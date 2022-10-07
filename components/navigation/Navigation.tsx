import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginPage from '../../screens/LoginPage';
import ProjectListPage from '../../screens/ProjectListPage';
import ProjectCreationPage from '../../screens/ProjectCreationPage';
import AboutPage from '../../screens/AboutPage';
import CreateAccountPage from '../../screens/CreateAccountPage';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LoginContext, ILoginContext } from '../../contexts/LoginContext';
import { AsyncStorageType } from '../../contexts/LoginContext';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  const { valueAsyncStorage } = useContext(LoginContext) as ILoginContext;
  // kill async on logout

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;
          if (route.name === 'Sign In') {
            iconName = focused ? 'log-in' : 'log-in-outline';
            size = 24;
          } else if (route.name === 'Sign Up') {
            iconName = focused ? 'person-add' : 'person-add-outline';
            size = 24;
          } else if (route.name === 'List') {
            iconName = focused ? 'list' : 'list-outline';
            size = 24;
          } else if (route.name === 'Create') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
            size = 24;
          } else if (route.name === 'About') {
            iconName = focused
              ? 'information-circle'
              : 'information-circle-outline';
            size = 24;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#E29578',
        tabBarInactiveTintColor: '#ced4da',
      })}
    >
      {valueAsyncStorage.token === null ? (
        <Tab.Group>
          <Tab.Screen name="Sign In" component={LoginPage} />
          <Tab.Screen name="Sign Up" component={CreateAccountPage} />
        </Tab.Group>
      ) : (
        <Tab.Group>
          <Tab.Screen
            name="List"
            component={ProjectListPage}
            options={{ headerStyle: { backgroundColor: 'transparent' } }}
          />
          <Tab.Screen name="Create" component={ProjectCreationPage} />
          <Tab.Screen name="About" component={AboutPage} />
        </Tab.Group>
      )}
    </Tab.Navigator>
  );
}
