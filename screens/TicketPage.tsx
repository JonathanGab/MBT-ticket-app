import React, { useState, useContext } from 'react';
import { View, Text, Pressable } from 'react-native';
import { stylesTicketList } from '../components/style';
import IFilter from '../components/Interface/IFilter';
import FilterItem from '../components/item/FilterItem';
import TickerList from '../components/card/TicketList';
import { LoginContext, ILoginContext } from '../contexts/LoginContext';
import { AuthContext, IAuthContextProps } from '../contexts/AuthContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

type ListScreenProp = DrawerNavigationProp<
  { 'Create Ticket': undefined },
  'Create Ticket'
>;

export default function TicketPage() {
  const { getProjectId } = useContext(AuthContext) as IAuthContextProps;
  const { valueAsyncStorage } = useContext(LoginContext) as ILoginContext;
  // const [filters, setFilters] = useState<IFilter>({
  //   project: Number(getProjectId),
  //   user: Number(valueAsyncStorage.userId),
  // });
  const [filters, setFilters] = useState<IFilter>({
    project: Number(getProjectId),
    user: Number(valueAsyncStorage.userId),
  });

  const navigation = useNavigation<ListScreenProp>();
  const handleFiltersValue = (newFilters: IFilter): void => {
    setFilters({ ...newFilters });
  };

  return (
    <View style={stylesTicketList.container}>
      <Text style={stylesTicketList.title}>Ticket List</Text>
      <FilterItem setFilterValue={handleFiltersValue} actualValues={filters} />
      <TickerList filters={filters} />
      <View style={stylesTicketList.addTicket}>
        <Pressable onPress={() => navigation.navigate('Create Ticket')}>
          <Ionicons name={'add-circle-outline'} size={50} color={'black'} />
        </Pressable>
      </View>
    </View>
  );
}
