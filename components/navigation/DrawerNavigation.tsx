import React from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import ProjectListPage from '../../screens/ProjectListPage';
import ProjectCreationPage from '../../screens/ProjectCreationPage';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './Navigation';
import ProfilePage from '../../screens/ProfilePage';
import SettingsPage from '../../screens/SettingsPage';
import Ionicons from '@expo/vector-icons/Ionicons';

const Drawer = createDrawerNavigator();

function DrawerItemProps(props: any) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      {/*all of the drawer items*/}
      <DrawerItemList {...props} />
      {/* here's where you put your logout drawer item*/}

      <DrawerItem
        label={({ focused }) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#d7263d',
              width: '100%',
              borderRadius: 10,
              padding: 10,
            }}
          >
            <Text style={{ color: 'white' }}>Exit</Text>
            <Ionicons
              color={'white'}
              size={20}
              name={focused ? 'log-out' : 'log-out-outline'}
              style={{ marginLeft: '5%' }}
            />
          </View>
        )}
        onPress={() => {
          alert('Log out');
        }}
        style={{
          flex: 1,
          width: '100%',
          justifyContent: 'flex-end',
        }}
      />
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <DrawerItemProps {...props} />}
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
      }}
    >
      <Drawer.Screen name="Home" component={Navigation} />
      <Drawer.Screen name="Profile" component={ProfilePage} />
      <Drawer.Screen name="Settings" component={SettingsPage} />
    </Drawer.Navigator>
  );
}
