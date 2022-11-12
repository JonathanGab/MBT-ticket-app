import { useState, useContext } from 'react';
import { View, Text, Pressable } from 'react-native';
import { stylesTicketItem } from '../style.js';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AuthContext, IAuthContextProps } from '../../contexts/AuthContext';
import IUser from '../Interface/IUser.js';

interface ITicketItemProps {
  id: number;
  title: string;
  description: string;
  priority: string;
  difficulty: number;
  status: string;
  labels: string;
  estimatedTime: any;
  users: UserType[];
  getIdOnPress: () => void;
}

type UserType = {
  id: number;
  name: string;
};

export const TicketItem = ({
  id,
  title,
  description,
  priority,
  difficulty,
  status,
  labels,
  estimatedTime,
  users,
  getIdOnPress,
}: ITicketItemProps) => {
  const [isMore, setIsMore] = useState(false);

  const changeBgColor = (status: string) => {
    switch (status) {
      case 'OPEN':
        return '#68d89b';
      case 'IN_PROGRESS':
        return '#fde74c';
      case 'CLOSE':
        return '#e55934';
      default:
        return '#ffffff';
    }
  };

  return (
    <View style={stylesTicketItem.item}>
      <View style={stylesTicketItem.edit}>
        <View
          style={{
            backgroundColor: changeBgColor(status),
            borderRadius: 5,
          }}
        >
          <Text style={stylesTicketItem.status}>{status}</Text>
        </View>
        <Pressable onPress={getIdOnPress}>
          <Ionicons name={'create-outline'} size={24} color={'black'} />
        </Pressable>
      </View>
      <View style={stylesTicketItem.body}>
        <Text style={stylesTicketItem.title}>{title}</Text>
        <View style={stylesTicketItem.containerRow}>
          <Text style={stylesTicketItem.priority}>Priority : {priority}</Text>
          <Text style={stylesTicketItem.difficulty}>
            Difficulty : {difficulty}
          </Text>
        </View>
      </View>
      <View>
        <Pressable
          onPress={() => setIsMore(!isMore)}
          style={stylesTicketItem.showMore}
        >
          {!isMore ? (
            <Ionicons name={'chevron-down-outline'} size={24} color={'black'} />
          ) : (
            <Ionicons name={'chevron-up-outline'} size={24} color={'black'} />
          )}
        </Pressable>
      </View>

      {isMore && (
        <View>
          <Text style={stylesTicketItem.more}>{description}</Text>
          <Text>Labels : {labels}</Text>
          <Text>Estimated Time : {estimatedTime}</Text>
          <View>
            <Text>Assigned at :</Text>
            {users.map((user: { id: number; name: string }, index: number) => (
              <View key={index}>
                <Text>{user.name}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};
