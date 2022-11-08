import { View, Text } from 'react-native';
import { stylesTicketList } from '../components/style';
import React, { useState, useContext } from 'react';
import IFilter from '../components/Interface/IFilter';
import FilterItem from '../components/item/FilterItem';
import TickerList from '../components/card/TicketList';
import { LoginContext, ILoginContext } from '../contexts/LoginContext';

export default function TicketPage() {
  const { valueAsyncStorage } = useContext(LoginContext) as ILoginContext;
  const [filters, setFilters] = useState<IFilter>({
    projectId: 1,
    userId: Number(valueAsyncStorage.userId),
  });

  const handleFiltersValue = (newFilters: IFilter): void => {
    setFilters({ ...newFilters });
  };

  return (
    <View style={stylesTicketList.container}>
      <Text style={stylesTicketList.title}>Ticket List</Text>
      <FilterItem setFilterValue={handleFiltersValue} actualValues={filters} />
      <TickerList filters={filters} />
    </View>
  );
}
