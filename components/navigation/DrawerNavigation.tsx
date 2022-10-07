import React, { useContext } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Navigation from './Navigation';
import ProfilePage from '../../screens/ProfilePage';
import SettingsPage from '../../screens/SettingsPage';
import TicketPage from '../../screens/TicketPage';
import TicketDetail from '../../screens/TicketDetail';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ILoginContext, LoginContext } from '../../contexts/LoginContext';

const Drawer = createDrawerNavigator();

function DrawerItemProps(props: any) {
  const { removeData } = useContext(LoginContext) as ILoginContext;
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <DrawerItemList {...props} />
      <DrawerItem
        label={({ focused }) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#9A031E',
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
        onPress={removeData}
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
      drawerContent={(props) => <DrawerItemProps {...props} />}
      screenOptions={{
        // headerShown: false,
        headerShown: true,
      }}
    >
      <Drawer.Screen name="Home" component={Navigation} />
      <Drawer.Screen name="Profile" component={ProfilePage} />
      <Drawer.Screen name="TaskDetail" component={TicketDetail} />
      <Drawer.Screen name="Ticket" component={TicketPage} />
      <Drawer.Screen name="Settings" component={SettingsPage} />
    </Drawer.Navigator>
  );
}
