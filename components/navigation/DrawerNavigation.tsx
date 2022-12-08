import React, { useContext } from 'react';
import { Text, View } from 'react-native';
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
import Ionicons from '@expo/vector-icons/Ionicons';
import { ILoginContext, LoginContext } from '../../contexts/LoginContext';
import CreateTicket from '../../screens/CreateTicket';
import Dashboard from '../dashboard/Dashboard';

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
            <Text style={{ color: 'white' }}>Logout</Text>
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
        headerShown: false,
        // headerShown: true,
      }}
    >
      <Drawer.Screen name="Home" component={Dashboard} />
      <Drawer.Screen name="Nav" component={Navigation} />
      <Drawer.Screen name="Profile" component={ProfilePage} />
      <Drawer.Screen name="Ticket" component={TicketPage} />
      <Drawer.Screen name="Settings" component={SettingsPage} />
      <Drawer.Screen name="Create Ticket" component={CreateTicket} />
    </Drawer.Navigator>
  );
}
