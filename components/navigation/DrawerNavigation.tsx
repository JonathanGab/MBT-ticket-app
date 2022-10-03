import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import ProjectListPage from '../../screens/ProjectListPage';
import ProjectCreationPage from '../../screens/ProjectCreationPage';
import AboutPage from '../../screens/AboutPage';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <NavigationContainer>
      {/* <Drawer.Group> */}
      <Drawer.Navigator initialRouteName="ProjectListPage">
        <Drawer.Screen name="ProjectListPage" component={ProjectListPage} />
        <Drawer.Screen
          name="ProjectCreationPage"
          component={ProjectCreationPage}
        />
        <Drawer.Screen name="AboutPage" component={AboutPage} />
      </Drawer.Navigator>
      {/* </Drawer.Group> */}
    </NavigationContainer>
  );
}
