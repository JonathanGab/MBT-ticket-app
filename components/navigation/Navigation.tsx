import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import LoginPage from '../../screens/LoginPage';
import ProjectListPage from '../../screens/ProjectListPage';
import ProjectCreationPage from '../../screens/ProjectCreationPage';
import AboutPage from '../../screens/AboutPage';
import CreateAccountPage from '../../screens/CreateAccountPage';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LoginContext, ILoginContext } from '../../contexts/LoginContext';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  const { isLogged } = useContext(LoginContext) as ILoginContext;
  console.log(isLogged);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;
          if (route.name === 'Login') {
            iconName = focused ? 'log-in' : 'log-in-outline';
            size = 24;
          } else if (route.name === 'CreateAccountPage') {
            iconName = focused ? 'person-add' : 'person-add-outline';
            size = 24;
          } else if (route.name === 'ProjectListPage') {
            iconName = focused ? 'list' : 'list-outline';
            size = 24;
          } else if (route.name === 'ProjectCreationPage') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
            size = 24;
          } else if (route.name === 'AboutPage') {
            iconName = focused
              ? 'information-circle'
              : 'information-circle-outline';
            size = 24;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'orange',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      {!isLogged ? (
        <Tab.Group>
          <Tab.Screen name="Login" component={LoginPage} />
          <Tab.Screen name="CreateAccountPage" component={CreateAccountPage} />
        </Tab.Group>
      ) : (
        <Tab.Group>
          <Tab.Screen name="ProjectListPage" component={ProjectListPage} />
          <Tab.Screen
            name="ProjectCreationPage"
            component={ProjectCreationPage}
          />
          <Tab.Screen name="AboutPage" component={AboutPage} />
        </Tab.Group>
      )}
    </Tab.Navigator>
  );
}
