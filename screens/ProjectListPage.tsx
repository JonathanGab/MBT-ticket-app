import { View, StyleSheet, FlatList } from 'react-native';
import React, { useContext } from 'react';
import ProjectList from '../components/card/ProjectList';
import IProject, {
  GET_PROJECT_BY_CURRENT_USER,
  useGetProjectByCurrentUser,
} from '../hooks/query/useGetProjectByCurrentUser';
import { ILoginContext, LoginContext } from '../contexts/LoginContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext, IAuthContextProps } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

type ListScreenProp = DrawerNavigationProp<{ Ticket: undefined }, 'Ticket'>;

export default function ProjectListPage() {
  const { valueAsyncStorage } = useContext(LoginContext) as ILoginContext;
  const { setGetProjectId } = useContext(AuthContext) as IAuthContextProps;
  const navigation = useNavigation<ListScreenProp>();

  const projectByUserId: IProject[] | undefined | null =
    useGetProjectByCurrentUser(Number(valueAsyncStorage.userId));

  return (
    <View style={styles.container}>
      <FlatList
        data={projectByUserId}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(item) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setGetProjectId(item.item.id);
                navigation.navigate('Ticket');
              }}
            >
              <ProjectList
                id={item.item.id}
                title={item.item.title}
                start_time={item.item.start_time}
                description={item.item.description}
                status={item.item.status}
                Users={item.item.Users}
              />
            </TouchableOpacity>
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
