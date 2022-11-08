import { View, Text, Button } from 'react-native';
import { stylesTicketItem } from '../style.js';
import TicketDetail from '../../screens/TicketDetail';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export const TicketItem = ({
  id,
  title,
  description,
  priority,
  difficulty,
  status,
}: any) => {
  // const _onPressButton = () => {
  // }

  return (
    <View style={stylesTicketItem.item}>
      <Text style={stylesTicketItem.title}>{title}</Text>
      <View style={stylesTicketItem.containerRow}>
        <Text style={stylesTicketItem.priority}>Priority : {priority}</Text>
        <Text style={stylesTicketItem.difficulty}>
          Difficulty :{difficulty}
        </Text>
      </View>
      <Text style={stylesTicketItem.status}>Status : {status}</Text>
      {/* <Button title={"More..."} onPress={_onPressButton}></Button> */}
    </View>
  );
};
