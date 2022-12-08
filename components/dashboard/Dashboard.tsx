import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useContext } from 'react';
import DashboardIcon from './DashboardIcon';
import { ILoginContext, LoginContext } from '../../contexts/LoginContext';
import ITicket from '../../components/Interface/ITicket';
import { Foundation } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import DashboardRow from './DashboardRow';
import DividerComponent from '../utils/inputs/Divider';
import IProject, {
  useGetProjectByCurrentUser,
  useGetAllProjectsOrderByDateAndCurrentUserId,
} from '../../hooks/query/useGetProjectByCurrentUser';
import {
  useGetAllTicketsByCurrentUserId,
  useGetAllTicketsOrderByDateAndCurrentUserId,
} from '../../hooks/query/useGetAllTicketsByCurrentUserId';
import * as dateFns from 'date-fns';

import IUser, { useGetCurrentUser } from '../../hooks/query/useGetUser';
import { changeBgColor } from '../item/TicketItem';

export default function Dashboard() {
  const { valueAsyncStorage } = useContext(LoginContext) as ILoginContext;

  const projectByUserId: IProject[] | undefined | null =
    useGetProjectByCurrentUser(Number(valueAsyncStorage.userId));

  const ticketByUserId: ITicket[] | undefined | null =
    useGetAllTicketsByCurrentUserId(Number(valueAsyncStorage.userId));

  const ticketOrderByDate: ITicket[] | undefined | null =
    useGetAllTicketsOrderByDateAndCurrentUserId(
      Number(valueAsyncStorage.userId)
    );

  const projectOrderByDate: IProject[] | undefined | null =
    useGetAllProjectsOrderByDateAndCurrentUserId(
      Number(valueAsyncStorage.userId)
    );

  const user: IUser | undefined | null = useGetCurrentUser(
    valueAsyncStorage.userId as any
  );

  const calculateNumberOfItems = (data: IProject[] | ITicket[]): number => {
    if (data) {
      return data.length;
    }
    return 0;
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>
          Welcome Back {user?.name.toUpperCase()} ! 🎉
        </Text>
        <View style={styles.dashCard}>
          <ScrollView horizontal={true}>
            <DashboardIcon
              icon={<Octicons name="project" size={40} />}
              color="#b8f2e6"
              text="Projects"
              number={calculateNumberOfItems(projectByUserId as IProject[])}
            />
            <DashboardIcon
              icon={<Foundation name="ticket" size={40} />}
              color="#aed9e0"
              text="Tickets"
              number={calculateNumberOfItems(ticketByUserId as ITicket[])}
            />
          </ScrollView>
        </View>
        <DividerComponent orientation="horizontal" color="lightgrey" mt="3" />
        <View
          style={{
            backgroundColor: '#fbfbfb',
            borderRadius: 5,
            paddingTop: 10,
            marginVertical: 10,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              paddingBottom: 10,
              marginLeft: 5,
              fontStyle: 'italic',
            }}
          >
            Last created tickets
          </Text>
          {ticketOrderByDate &&
            ticketOrderByDate.map((ticket, index) => (
              <DashboardRow
                key={index}
                date={dateFns.format(new Date(ticket.created_at), 'dd/MM/yy')}
                status={ticket.status.replace(/_/g, ' ')}
                task={ticket.title}
                fill={changeBgColor(ticket.status)}
              />
            ))}
        </View>
        <DividerComponent orientation="horizontal" color="lightgrey" mt="0" />
        <View
          style={{
            backgroundColor: '#fbfbfb',
            borderRadius: 5,
            paddingTop: 10,
            marginVertical: 10,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              paddingBottom: 10,
              marginLeft: 5,
              fontStyle: 'italic',
            }}
          >
            Last created projects
          </Text>
          {projectOrderByDate &&
            projectOrderByDate.map((project, index) => (
              <DashboardRow
                key={index}
                date={dateFns.format(
                  new Date(project.created_at as Date),
                  'dd/MM/yy'
                )}
                status={project.status.toUpperCase()}
                task={project.title}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#EDF6F9',
  },
  title: {
    fontSize: 25,
    marginBottom: 10,
  },
  dashCard: {
    flexDirection: 'row',
  },
});
