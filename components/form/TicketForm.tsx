import { View, Text, SafeAreaView, StyleSheet, Pressable } from 'react-native';
import React, { useState, useContext } from 'react';
import Selects from '../utils/Selects';
import { useMutation } from '@apollo/client';
import Inputs from '../utils/Inputs';
import BtnSubmit from '../utils/BtnSubmit';
import { useGetAllUsers } from '../../hooks/query/useGetAllUsers';
import { CREATE_TICKET } from '../../hooks/mutations/useCreateTicket';
import Radios from '../utils/Radios';
import { AuthContext, IAuthContextProps } from '../../contexts/AuthContext';
import UserSelects from '../utils/UserSelects';
import Sliders from '../utils/Sliders';

export const statusSample = [
  { id: 1, name: 'OPEN' },
  { id: 2, name: 'IN_PROGRESS' },
  { id: 3, name: 'CLOSE' },
];

export const labelSample = [
  { id: 1, name: 'Front-End' },
  { id: 2, name: 'Back-End' },
];

export const prioritySample = [
  { id: 1, name: 'Low', color: 'green' },
  { id: 2, name: 'Medium', color: 'yellow' },
  { id: 3, name: 'High', color: 'red' },
  { id: 4, name: 'Impossible', color: 'muted' },
];

export default function TicketForm() {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [label, setLabel] = useState<string>('');
  const [difficulty, setDifficulty] = useState<number>(1);
  const [priority, setPriority] = useState<string>('Low');
  const [user, setUser] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [addTicket, { data, loading, error }] = useMutation(CREATE_TICKET);
  const { getProjectId } = useContext(AuthContext) as IAuthContextProps;

  const submitNewTicket = async (e: any) => {
    e.preventDefault();
    setIsLoading(false);
    try {
      const ticket = await addTicket({
        variables: {
          title: title,
          description: description,
          status: status,
          difficulty: difficulty,
          priority: priority,
          labels: label,
          users: [{ id: Number(user) }],
          projectId: Number(getProjectId),
        },
      });
      return ticket;
    } catch (err) {
      console.error(error);
    }
  };

  const users = useGetAllUsers();

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View>
          <Inputs
            label={'Title'}
            value={title}
            onChange={(text) => setTitle(text)}
          />
          <Inputs
            label={'Description'}
            value={description}
            onChange={(text) => setDescription(text)}
          />
        </View>
        <Selects
          label="Status"
          data={statusSample}
          onChange={(itemValue) => setStatus(itemValue)}
        />
        <Selects
          label="Label"
          data={labelSample}
          onChange={(itemValue) => setLabel(itemValue)}
        />
        <UserSelects
          label="Members"
          data={users}
          onChange={(itemValue) => setUser(itemValue)}
        />
        <Sliders
          onChange={(v: number) => {
            setDifficulty(Math.floor(v));
          }}
          difficulty={difficulty}
        />

        <Radios
          data={prioritySample}
          value={priority}
          onChange={(nextValue) => {
            setPriority(nextValue);
          }}
          direction="row"
          marginVertical={3}
        />
        <View>
          <BtnSubmit
            isLoading={isLoading}
            width="300"
            backgroundColor="#E29578"
            onPress={(e: any) => submitNewTicket(e)}
            text="Create"
            height="35"
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDF6F9',
  },
  button: {
    borderWidth: 1,
    alignItems: 'flex-end',
  },
});
