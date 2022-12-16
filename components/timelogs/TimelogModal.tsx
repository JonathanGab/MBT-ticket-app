import { View, Text, StyleSheet } from 'react-native';
import React, { useContext, useState } from 'react';
import { Modal } from 'native-base';
import BtnSubmit from '../utils/BtnSubmit';
import TimeCounter from './TimeCounter';
import { ADD_TIMELOG } from '../../hooks/mutations/useAddTimelog';
import { useMutation } from '@apollo/client';
import { AuthContext, IAuthContextProps } from '../../contexts/AuthContext';

type TimelogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // submitNewTimeLog: () => void;
  userId: number;
};

export default function TimelogModal({ open, setOpen, userId }: TimelogProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { getTicketId } = useContext(AuthContext) as IAuthContextProps;
  const [addTimelog, { data, loading, error }] = useMutation(ADD_TIMELOG);
  const [counter, setCounter] = useState<number>(0);

  const submitTimelog = async () => {
    setIsLoading(false);
    try {
      await addTimelog({
        variables: {
          spentTime: counter,
          users: { id: Number(userId) },
          ticket: { id: Number(getTicketId) },
        },
      });
      setOpen(false);
    } catch (err) {
      console.error(error);
    }
  };

  return (
    <Modal isOpen={open}>
      <Modal.Content
        style={{
          backgroundColor: '#EDF6F9',
        }}
      >
        <Modal.CloseButton onPress={() => setOpen(false)} />
        <Modal.Header>Add Timelogs</Modal.Header>
        <Modal.Footer>
          <View style={styles.footer}>
            <TimeCounter counter={counter} setCounter={setCounter} />
            <BtnSubmit
              isLoading={isLoading}
              onPress={submitTimelog}
              text="Add"
              backgroundColor="#E29578"
              width="50px"
              height="35px"
            />
          </View>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
  },
});
