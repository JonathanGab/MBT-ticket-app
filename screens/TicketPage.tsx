import React, { useState, useContext } from 'react';
import { View, Text } from 'react-native';
import { stylesTicketList } from '../components/style';
import IFilter from '../components/Interface/IFilter';
import FilterItem from '../components/item/FilterItem';
import TickerList from '../components/card/TicketList';
import { LoginContext, ILoginContext } from '../contexts/LoginContext';
import { AuthContext, IAuthContextProps } from '../contexts/AuthContext';

export default function TicketPage() {
  const { getProjectId } = useContext(AuthContext) as IAuthContextProps;
  const { valueAsyncStorage } = useContext(LoginContext) as ILoginContext;
  const [filters, setFilters] = useState<IFilter>({
    project: Number(getProjectId),
    user: Number(valueAsyncStorage.userId),
  });

  const handleFiltersValue = (newFilters: IFilter): void => {
    setFilters({ ...newFilters });
  };
  // console.log('filters.project', filters.project);
  return (
    <View style={stylesTicketList.container}>
      <Text style={stylesTicketList.title}>Ticket List</Text>
      <FilterItem
        setFilterValue={() =>
          setFilters({
            project: Number(getProjectId),
            user: Number(valueAsyncStorage.userId),
          })
        }
        actualValues={filters}
      />
      <TickerList filters={filters} />
    </View>
  );
}
