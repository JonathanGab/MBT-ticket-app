import React from 'react';
import { View,Text, SafeAreaView, FlatList } from 'react-native';
import { TaskItem } from '../item/TaskItem';
import { useFilterTicket } from '../../hooks/mutations/useFilterTicket';
import IFilter from '../Interface/IFilter';
import ITicket from '../Interface/ITicket';
import { stylesTaskList } from '../style';

interface IProps {
    filters: IFilter;
}

export default function TickerList({ filters }: IProps): JSX.Element {
    const tickets: ITicket[] | null = useFilterTicket(
        filters.project,
        filters.user
    );

    const renderItem = ({ item }: { item: ITicket }) => (
        <TaskItem id={item.id} title={item.title} priority={item.priority} difficulty={item.difficulty} status={item.status} />
    );

    if (!tickets || tickets?.length < 1) {
        return <Text>No tickets :/</Text>;
    }
    return (
        <View style={stylesTaskList.containerList}>
            <SafeAreaView>
                <FlatList
                    data={tickets}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                />
            </SafeAreaView>
        </View>
    );
}
