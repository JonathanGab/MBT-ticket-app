import { Modal, Text, TextArea } from 'native-base';
import React, { useState, useContext } from 'react';
import { AuthContext, IAuthContextProps } from '../../contexts/AuthContext';
import { useMutation, useQuery } from '@apollo/client';
import { View, FlatList, StyleSheet } from 'react-native';
import * as dateFns from 'date-fns';
import {
  useGetTicketById,
  GET_TICKETS_BY_ID,
} from '../../hooks/query/useGetTicketById';
import ITicket from '../Interface/ITicket';
import { ADD_COMMENT } from '../../hooks/mutations/useAddComment';
import BtnSubmit from '../utils/BtnSubmit';

type CommentProps = {
  content: string;
  user: string;
  time?: string;
};

export default function ModalView({ open, setOpen, userId }: any) {
  const { getTicketId } = useContext(AuthContext) as IAuthContextProps;

  const [addComment, { data, loading, error }] = useMutation(ADD_COMMENT);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [textAreaValue, setTextAreaValue] = useState('');

  const commentByTicketID: ITicket | undefined | null = useGetTicketById(
    getTicketId as number
  );

  const {
    loading: loadingQuery,
    error: errorQuery,
    data: dataQuery,
    refetch,
  } = useQuery(GET_TICKETS_BY_ID, {
    variables: { getTicketByIdId: getTicketId as number },
  });

  const submitNewComment = async () => {
    setIsLoading(false);
    try {
      await addComment({
        variables: {
          content: textAreaValue,
          publishedAt: new Date(),
          user: { id: Number(userId) },
          ticket: { id: Number(getTicketId) },
        },
      });
      setTextAreaValue('');
      refetch();
    } catch (err) {
      console.error(error);
    }
  };

  // function for displaying the time since the comment was published
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

  const CommentComponent = ({ content, user, time }: CommentProps) => (
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
    <CommentComponent
      content={item.content}
      user={item?.User?.name}
      time={item?.published_at}
    />
  );
  return (
    <Modal isOpen={open}>
      <Modal.Content
        h="400px"
        maxHeight="600"
        style={{
          backgroundColor: '#EDF6F9',
        }}
      >
        <Modal.CloseButton onPress={() => setOpen(false)} />
        <Modal.Header>Comments</Modal.Header>
        <FlatList
          data={commentByTicketID?.Comment}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
        <Modal.Footer>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextArea
              autoCompleteType={false}
              value={textAreaValue}
              onChangeText={(text) => setTextAreaValue(text)}
              w="75%"
              placeholder="Add a comment"
              h={'100%'}
              maxH={10}
              marginRight={2}
            />
            <BtnSubmit
              isLoading={isLoading}
              onPress={submitNewComment}
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
  container: {
    marginVertical: 10,
    paddingHorizontal: 10,
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
