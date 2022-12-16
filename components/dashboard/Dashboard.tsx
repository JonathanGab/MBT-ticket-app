import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useContext } from 'react';
import DashboardIcon from './DashboardIcon';
import { ILoginContext, LoginContext } from '../../contexts/LoginContext';
import ITicket from '../../components/Interface/ITicket';
import { Foundation } from '@expo/vector-icons';
import IProject, {
  useGetProjectByCurrentUser,
  useGetAllProjectsOrderByDateAndCurrentUserId,
  useGetAllProjectsCompletedByCurrentUserId,
  useGetLastCompletedProjectsByCurrentUserId,
} from '../../hooks/query/useGetProjectByCurrentUser';
import {
  useGetAllTicketsByCurrentUserId,
  useGetAllTicketsOrderByDateAndCurrentUserId,
  useGetLastCompletedTicketsByCurrentUserId,
} from '../../hooks/query/useGetAllTicketsByCurrentUserId';
import { MaterialIcons } from '@expo/vector-icons';
import IUser, { useGetCurrentUser } from '../../hooks/query/useGetUser';
import { Entypo } from '@expo/vector-icons';
import DashboardCard from './DashboardCard';
import DashboardChart from './DashboardChart';
import DividerComponent from '../utils/inputs/Divider';

export function chooseRandomColor(): string {
  const arrayColor = [
    '#b8f2e6',
    '#aed9e0',
    '#dec5e3',
    '#FFC8DD',
    '#B6DCFE',
    '#A9F8FB',
    '#69EBD0',
    '#DBFEB8',
  ];
  const randomColor = arrayColor[Math.floor(Math.random() * arrayColor.length)];

  return randomColor;
}

export default function Dashboard() {
  const { valueAsyncStorage } = useContext(LoginContext) as ILoginContext;

  //* ------------------ GET ALL DATA ------------------ //
  //* QUERY FOR PROJECTS
  const projectByUserId: IProject[] | undefined | null =
    useGetProjectByCurrentUser(Number(valueAsyncStorage.userId));
  const projectOrderByDate: IProject[] | undefined | null =
    useGetAllProjectsOrderByDateAndCurrentUserId(
      Number(valueAsyncStorage.userId)
    );
  const lastProjectOrderByDate: IProject[] | undefined | null =
    useGetLastCompletedProjectsByCurrentUserId(
      Number(valueAsyncStorage.userId)
    );
  const projectCompleted: IProject[] | undefined | null =
    useGetAllProjectsCompletedByCurrentUserId(valueAsyncStorage.userId as any);
  //* QUERY FOR TICKETS
  const ticketByUserId: ITicket[] | undefined | null =
    useGetAllTicketsByCurrentUserId(Number(valueAsyncStorage.userId));
  const ticketOrderByDate: ITicket[] | undefined | null =
    useGetAllTicketsOrderByDateAndCurrentUserId(
      Number(valueAsyncStorage.userId)
    );
  const lastTicketOrderByDate: ITicket[] | undefined | null =
    useGetLastCompletedTicketsByCurrentUserId(Number(valueAsyncStorage.userId));
  //* QUERY FOR USER
  const user: IUser | undefined | null = useGetCurrentUser(
    valueAsyncStorage.userId as any
  );
  //* ------------------ FEATURES ------------------ //

  function calculateNumberOfItems(data: IProject[] | ITicket[]): number {
    if (data) {
      return data.length;
    }
    return 0;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>
          Welcome Back {user?.name.toUpperCase()} ! 🎉
        </Text>
        <View style={styles.dashCard}>
          <ScrollView horizontal={true}>
            <DashboardIcon
              icon={<MaterialIcons name="work-outline" size={40} />}
              color={chooseRandomColor()}
              text={
                (projectByUserId?.length as number) > 1 ? 'projects' : 'project'
              }
              number={calculateNumberOfItems(projectByUserId as IProject[])}
            />
            <DashboardIcon
              icon={<Foundation name="ticket" size={40} />}
              color={chooseRandomColor()}
              text={
                (ticketByUserId?.length as number) > 1
                  ? 'assigned tickets'
                  : 'assigned ticket'
              }
              number={calculateNumberOfItems(ticketByUserId as ITicket[])}
            />
            <DashboardIcon
              icon={<MaterialIcons name="work-off" size={40} />}
              color={chooseRandomColor()}
              text={
                (projectCompleted?.length as number) > 1
                  ? 'projects completed'
                  : 'project completed'
              }
              number={calculateNumberOfItems(projectCompleted as IProject[])}
            />
            <DashboardIcon
              icon={<Entypo name="ticket" size={40} />}
              color={chooseRandomColor()}
              text={
                (ticketByUserId?.length as number) > 1
                  ? 'tickets completed'
                  : 'ticket completed'
              }
              number={calculateNumberOfItems(ticketByUserId as ITicket[])}
            />
          </ScrollView>
        </View>
        <DividerComponent orientation="horizontal" color="lightgrey" mt="3" />
        <DashboardChart
          arrayOfData={projectByUserId as IProject[]}
          section="Pecan Pie 📈"
        />
        <DashboardCard
          section="Last created projects"
          data={projectOrderByDate as IProject[]}
        />
        <DashboardCard
          section="Last created tickets"
          data={ticketOrderByDate as ITicket[]}
        />
        <DashboardCard
          section="Last completed projects"
          data={lastProjectOrderByDate as IProject[]}
        />
        <DashboardCard
          section="Last completed tickets"
          data={lastTicketOrderByDate as ITicket[]}
        />
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
