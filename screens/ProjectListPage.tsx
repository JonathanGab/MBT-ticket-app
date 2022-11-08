import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native';
import React, { useContext } from 'react';
import ProjectList from '../components/card/ProjectList';
import IProject, {
  GET_PROJECT_BY_CURRENT_USER,
  useGetProjectByCurrentUser,
} from '../hooks/query/useGetProjectByCurrentUser';
import { ILoginContext, LoginContext } from '../contexts/LoginContext';

export default function ProjectListPage() {
  const { valueAsyncStorage } = useContext(LoginContext) as ILoginContext;

  const projectByUserId: IProject[] | undefined | null =
    useGetProjectByCurrentUser(Number(valueAsyncStorage.userId));

  return (
    <View style={styles.container}>
      <FlatList
        data={projectByUserId}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(item) => {
          return (
            <ProjectList
              id={item.item.id}
              title={item.item.title}
              start_time={item.item.start_time}
              description={item.item.description}
              status={item.item.status}
              Users={item.item.Users}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
});
