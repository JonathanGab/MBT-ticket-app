import React, { useContext } from 'react';
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import { gql, useQuery } from '@apollo/client';
import { TicketItem } from '../item/TicketItem';
import IFilter from '../Interface/IFilter';
import ITicket from '../Interface/ITicket';
import { useFilterTicket } from '../../hooks/query/useFilterTicket';
import { LoginContext, ILoginContext } from '../../contexts/LoginContext';
import { AuthContext, IAuthContextProps } from '../../contexts/AuthContext';
import { stylesTicketList } from '../style';

interface IProps {
  filters: IFilter;
}

export default function TickerList({ filters }: IProps): JSX.Element {
  const { valueAsyncStorage } = useContext(LoginContext) as ILoginContext;
  const { getProjectId } = useContext(AuthContext) as IAuthContextProps;

  const tickets: ITicket[] | null = useFilterTicket(
    filters.user,
    filters.project as number
  );

  // console.log('filter project', filters.project);
  const renderItem = ({ item }: { item: ITicket }) => (
    <TicketItem
      id={item.id}
      title={item.title}
      priority={item.priority}
      difficulty={item.difficulty}
      status={item.status}
    />
  );

  // console.log('Tickets', tickets);

  if (!tickets || tickets?.length < 1) {
    return <Text>No tickets :/</Text>;
  }
  return (
    <View style={stylesTicketList.containerList}>
      <SafeAreaView>
        <FlatList
          data={tickets}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </SafeAreaView>
    </View>
  );
}
