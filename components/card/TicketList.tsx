import React, { useContext } from 'react';
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import { TicketItem } from '../item/TicketItem';
import IFilter from '../Interface/IFilter';
import ITicket from '../Interface/ITicket';
import { useFilterTicket } from '../../hooks/query/useFilterTicket';
import { AuthContext, IAuthContextProps } from '../../contexts/AuthContext';
import { stylesTicketList } from '../style';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

interface IProps {
  filters: IFilter;
}

type ListScreenProp = DrawerNavigationProp<
  { 'Edit Ticket': undefined },
  'Edit Ticket'
>;

export default function TickerList({ filters }: IProps): JSX.Element {
  const { setGetTicketId } = useContext(AuthContext) as IAuthContextProps;
  const navigation = useNavigation<ListScreenProp>();

  const tickets: ITicket[] | null = useFilterTicket(
    filters.user,
    filters.project as number
  );

  const renderItem = ({ item }: { item: ITicket }) => (
    <TicketItem
      id={item.id}
      title={item.title}
      priority={item.priority}
      difficulty={item.difficulty}
      status={item.status}
      description={item.description}
      labels={item.labels}
      estimatedTime={item.estimated_time}
      users={item.Users}
      getIdOnPress={() => {
        setGetTicketId(item.id);
        navigation.navigate('Edit Ticket');
      }}
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
