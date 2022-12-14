import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AuthContext, IAuthContextProps } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

type TicketListScreenProp = DrawerNavigationProp<
  { Ticket: undefined },
  'Ticket'
>;

interface IProjectProps {
  id: number;
  title: string;
  description: string;
  status: string;
  Users: any;
  start_time: Date;
  getIdOnPress: () => void;
}

export default function ProjectList({
  title,
  description,
  status,
  Users,
  getIdOnPress,
}: IProjectProps) {
  const ticketNavigation = useNavigation<TicketListScreenProp>();

  return (
    <TouchableOpacity
      onPress={() => {
        getIdOnPress();
        ticketNavigation.navigate('Ticket');
      }}
    >
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <View style={styles.cardRow}>
            <Text style={styles.title}>{title}</Text>

            <TouchableOpacity>
              <View>
                <TouchableOpacity
                  onPress={(e) => {
                    e.stopPropagation();
                    getIdOnPress();
                  }}
                  activeOpacity={1}
                >
                  <Ionicons name={'create-outline'} size={24} color={'black'} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
          <Text style={styles.description}>{description}</Text>
          <Text
            style={
              status === 'Active' ? styles.statusActive : styles.statusPending
            }
          >
            {status}
          </Text>
          <Text>
            {Users?.map((user: any, index: any) => (
              <Text key={index} style={styles.users}>
                {(index ? ', ' : '') + user.name}
              </Text>
            ))}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: { paddingHorizontal: 20, marginVertical: 10 },
  card: {
    backgroundColor: '#f5f5f7',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#171717',
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: { fontSize: 25, fontWeight: 'bold', paddingBottom: 20 },
  description: { fontSize: 15, fontStyle: 'italic' },
  statusActive: { color: 'green', paddingBottom: 10 },
  statusPending: { color: 'coral', paddingBottom: 10 },
  users: { fontSize: 10, fontStyle: 'italic' },
});
