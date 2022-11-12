import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import TicketForm from '../components/form/TicketForm';

export default function CreateTicket() {
  return (
    <View style={styles.container}>
      <View>
        <TicketForm />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
  },
});
