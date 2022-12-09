import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import ArrowPressable from './ArrowPressable';
import DashboardRow from './DashboardRow';
import * as dateFns from 'date-fns';
import IProject from '../../hooks/query/useGetProjectByCurrentUser';
import ITicket from '../Interface/ITicket';
import DividerComponent from '../utils/inputs/Divider';
import { changeBgColor } from '../item/TicketItem';

export default function DashboardCard({
  section,
  data,
}: {
  section: string;
  data: IProject[] | ITicket[];
}) {
  const [show, setShow] = useState(true);
  console.log('data', data);
  return (
    <View>
      <DividerComponent orientation="horizontal" color="lightgrey" mt="3" />
      <View style={styles.container}>
        <View style={styles.containerDirection}>
          <Text style={styles.section}>{section}</Text>
          <ArrowPressable show={show} setShow={setShow} />
        </View>
        {data &&
          show &&
          data?.map((item, index) => (
            <DashboardRow
              key={index}
              date={dateFns.format(
                new Date(item.created_at as Date),
                'dd/MM/yy'
              )}
              status={item.status.toUpperCase()}
              task={item.title}
              fill={changeBgColor(item.status)}
            />
          ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fbfbfb',
    borderRadius: 5,
    paddingTop: 10,
    marginVertical: 10,
  },
  containerDirection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  section: {
    fontSize: 20,
    paddingBottom: 10,
    marginLeft: 5,
    fontStyle: 'italic',
  },
});
