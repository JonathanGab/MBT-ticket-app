import React, { useContext } from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet } from 'react-native';
import { useGetTicketById } from '../hooks/query/useGetTicketById';
import ITicket from './Interface/ITicket';
import { AuthContext, IAuthContextProps } from '../contexts/AuthContext';
import * as dateFns from 'date-fns';

type CommentProps = {
  content: string;
  user: string;
  time?: string;
};

export default function Comment(): JSX.Element {
  const { getTicketId } = useContext(AuthContext) as IAuthContextProps;

  const commentByTicketID: ITicket | undefined | null = useGetTicketById(
    getTicketId as number
  );

  const publishedSince = (date: string) => {
    const publishedDate = new Date(date);
    const actualDate = new Date();
    const diffInMs: number = dateFns.differenceInMilliseconds(
      actualDate,
      publishedDate
    );
    const diffInDays: number = dateFns.differenceInDays(
      actualDate,
      publishedDate
    );
    const diffInHours: number = dateFns.differenceInHours(
      actualDate,
      publishedDate
    );
    const diffInMinutes: number = dateFns.differenceInMinutes(
      actualDate,
      publishedDate
    );
    const diffInSeconds: number = dateFns.differenceInSeconds(
      actualDate,
      publishedDate
    );

    if (diffInMs < 1000) {
      return 'just now';
    } else if (diffInMs < 60000) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInMs < 3600000) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMs < 86400000) {
      return `${diffInHours} hours ago`;
    } else {
      return `${diffInDays} days ago`;
    }
  };

  const Item = ({ content, user, time }: CommentProps) => (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.author}>
          By {user} since {publishedSince(time as string)}
        </Text>
      </View>
      <View style={styles.bubble}>
        <View style={styles.content}>
          <Text style={styles.message}>{content}</Text>
        </View>
      </View>
    </View>
  );

  const renderItem = ({ item }: any) => (
    <Item
      content={item.content}
      user={item?.User?.name}
      time={item?.published_at}
    />
  );

  return (
    <SafeAreaView>
      <FlatList
        data={commentByTicketID?.Comment}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  bubble: {
    backgroundColor: 'white',
    width: '100%',

    borderRadius: 90,
    borderColor: 'black',
  },
  box: {
    alignContent: 'flex-end',
    width: '100%',
  },
  author: {
    textAlign: 'right',
    fontSize: 12,
    marginVertical: 5,
    fontStyle: 'italic',
  },
  content: {
    paddingTop: 5,
    paddingLeft: 10,
    alignContent: 'center',
    minHeight: 50,
  },
  message: {},
});
