import React from 'react';
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import { TicketItem } from '../item/TicketItem';
import { useFilterTicket } from '../../hooks/query/useFilterTicket';
import IFilter from '../Interface/IFilter';
import ITicket from '../Interface/ITicket';
import { stylesTicketList } from '../style';

interface IProps {
  filters: IFilter;
}

export default function TickerList({ filters }: IProps): JSX.Element {
  const tickets: ITicket[] | null = useFilterTicket(
    filters.projectId,
    filters.userId
  );

  const renderItem = ({ item }: { item: ITicket }) => (
    <TicketItem
      id={item.id}
      title={item.title}
      priority={item.priority}
      difficulty={item.difficulty}
      status={item.status}
    />
  );

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
