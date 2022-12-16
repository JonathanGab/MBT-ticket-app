import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useContext } from 'react';
import { Modal } from 'native-base';
import DashboardIcon from '../dashboard/DashboardIcon';
import { chooseRandomColor } from '../dashboard/Dashboard';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useGetProjectById } from '../../hooks/query/useGetProjectById';
import { AuthContext, IAuthContextProps } from '../../contexts/AuthContext';
import IProject from '../../hooks/query/useGetProjectById';
import ProjectChart from './ProjectChart';
import AssignedUserProject, { UserAvatar } from './AssignedUserProject';
import IUser from '../Interface/IUser';

export default function DashboardProject({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { getProjectId } = useContext(AuthContext) as IAuthContextProps;
  const getProjectDataById = useGetProjectById(Number(getProjectId));

  return (
    <Modal isOpen={open}>
      <Modal.Content
        w="90%"
        h="70%"
        maxHeight="70%"
        style={{
          backgroundColor: '#EDF6F9',
        }}
      >
        <Modal.CloseButton onPress={() => setOpen(false)} />
        <Modal.Header>Dashboard</Modal.Header>
        <Modal.Body>
          <ScrollView style={styles.row} horizontal={true}>
            <DashboardIcon
              icon={
                <MaterialIcons
                  name="auto-awesome-motion"
                  size={24}
                  color="black"
                />
              }
              text={
                (getProjectDataById?.nbrOfTickets as number) > 1
                  ? 'tickets'
                  : 'ticket'
              }
              number={getProjectDataById?.nbrOfTickets}
              color={chooseRandomColor()}
            />
            <DashboardIcon
              icon={<FontAwesome5 name="door-open" size={24} color="black" />}
              text={
                (getProjectDataById?.nbrOfOpenTickets as number) > 1
                  ? 'open tickets'
                  : 'open ticket'
              }
              number={getProjectDataById?.nbrOfOpenTickets}
              color={chooseRandomColor()}
            />
            <DashboardIcon
              icon={
                <MaterialCommunityIcons
                  name="traffic-cone"
                  size={24}
                  color="black"
                />
              }
              text={
                (getProjectDataById?.nbrOfTicketsInProgress as number) > 1
                  ? 'tickets in progress'
                  : 'ticket in progress'
              }
              number={getProjectDataById?.nbrOfTicketsInProgress}
              color={chooseRandomColor()}
            />
            <DashboardIcon
              icon={<FontAwesome5 name="door-closed" size={24} color="black" />}
              text={
                (getProjectDataById?.nbrOfClosedTickets as number) > 1
                  ? 'closed tickets'
                  : 'closed ticket'
              }
              number={getProjectDataById?.nbrOfClosedTickets}
              color={chooseRandomColor()}
            />
          </ScrollView>
          <ProjectChart
            object={getProjectDataById as IProject}
            section={'Peppa Pie'}
          />
          <AssignedUserProject data={getProjectDataById?.Users as IUser[]} />
        </Modal.Body>
        <Modal.Footer style={styles.footer}>
          <Text style={styles.text}>Time spent on this project</Text>
          <Text style={styles.hours}>
            {getProjectDataById?.timeSpentOnProject} Hours
          </Text>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  hours: {
    fontWeight: 'bold',
  },
  footer: {
    justifyContent: 'space-between',
  },
});
