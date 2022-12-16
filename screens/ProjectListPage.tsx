import { View, StyleSheet, FlatList } from 'react-native';
import React, { useContext, useEffect } from 'react';
import ProjectList from '../components/card/ProjectList';
import IProject, {
  useGetProjectByCurrentUser,
} from '../hooks/query/useGetProjectByCurrentUser';
import { ILoginContext, LoginContext } from '../contexts/LoginContext';
import { AuthContext, IAuthContextProps } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

type ProjectListScreenProp = DrawerNavigationProp<
  { Project: undefined },
  'Project'
>;

export default function ProjectListPage() {
  const { valueAsyncStorage } = useContext(LoginContext) as ILoginContext;
  const { setGetProjectId } = useContext(AuthContext) as IAuthContextProps;

  const projectNavigation = useNavigation<ProjectListScreenProp>();

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
              getIdOnPress={() => {
                setGetProjectId(item.item.id);
                projectNavigation.navigate('Project');
              }}
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
