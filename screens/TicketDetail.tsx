import { stylesTicketDetail } from '../components/style';
import React from 'react';
import { Text, View, Image } from 'react-native';

const description =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel tortor aliquam, gravida odio at, molestie dui. In ut vestibulum sem, vitae mollis justo. Proin suscipit, ligula vitae pretium egestas, purus velit varius ex, nec dignissim diam est ac dolor. Nulla a mauris nisl. Donec vitae lacus enim. Aliquam auctor eu leo eget eleifend. Mauris posuere malesuada metus, ut suscipit sem rutrum non. Pellentesque porta ullamcorper libero. In hac habitasse platea dictumst. Vivamus volutpat, elit sit amet sagittis ultricies, nulla massa congue diam, ac maximus est enim sit amet massa.';
const priorityValue = 3;
const difficultyValue = 5;
const statusValue = 'Done !';

export default function TicketDetail() {
  return (
    <View style={stylesTicketDetail.container}>
      <Image
        source={require('../assets/Logo_MBT.png')}
        style={{ width: 100, height: 100 }}
      />
      <Text style={stylesTicketDetail.title}>Login Page Front End</Text>
      <View style={stylesTicketDetail.bodyContainer}>
        <Text style={stylesTicketDetail.description}>{description}</Text>
        <View style={stylesTicketDetail.priority}>
          <Text style={stylesTicketDetail.priorityText}>
            Priority : {priorityValue}
          </Text>
        </View>
        <View style={stylesTicketDetail.difficulty}>
          <Text style={stylesTicketDetail.priorityText}>
            Difficulty : {difficultyValue}
          </Text>
        </View>
        <View style={stylesTicketDetail.status}>
          <Text style={stylesTicketDetail.priorityText}>
            Status : {statusValue}
          </Text>
        </View>
      </View>
    </View>
  );
}
