import { View, Text,  } from 'react-native';
import { stylesTaskList } from '../components/style';
import React, { useState } from 'react';
import  IFilter from '../components/Interface/IFilter';
import FilterItem from '../components/item/FilterItem';
import TickerList from '../components/card/TicketList';

export default function Ticket() {

    const [filters, setFilters] = useState<IFilter>({
        project: 1,
        user: 1,
      });

    const handleFiltersValue = (newFilters: IFilter): void  => {
        setFilters({ ...newFilters });
    }

    return (
        <View style={stylesTaskList.container}>
            <Text style={stylesTaskList.title}>Task List</Text>
            <FilterItem setFilterValue={handleFiltersValue} actualValues={filters}/>
            <TickerList filters={filters}/>
        </View>
    )
}