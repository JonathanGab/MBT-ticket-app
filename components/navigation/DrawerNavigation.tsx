import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProjectListPage from '../../screens/ProjectListPage';
import ProjectCreationPage from '../../screens/ProjectCreationPage';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './Navigation';
import ProfilePage from '../../screens/ProfilePage';
import SettingsPage from '../../screens/SettingsPage';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Navigation} />
      <Drawer.Screen name="Profile" component={ProfilePage} />
      <Drawer.Screen name="Settings" component={SettingsPage} />
    </Drawer.Navigator>
  );
}
