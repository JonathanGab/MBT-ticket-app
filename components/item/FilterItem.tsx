import React, { Dispatch, useContext } from 'react';
import { View, Text } from 'react-native';
import { AuthContext, IAuthContextProps } from '../../contexts/AuthContext';
import { LoginContext, ILoginContext } from '../../contexts/LoginContext';
import { useGetProject } from '../../hooks/mutations/useGetProject';
import { useGetUsers } from '../../hooks/mutations/useGetUser';
import IFilter from '../Interface/IFilter';
import IProject from '../Interface/IProject';
import IUser from '../Interface/IUser';
import DropdownComponent from './DropdownComponent';

interface IProps {
  setFilterValue: Function;
  actualValues: IFilter;
}

export default function FilterItem({ setFilterValue }: IProps): JSX.Element {
  const { valueAsyncStorage } = useContext(LoginContext) as ILoginContext;

  function setProject(projectId: number): void {
    setFilterValue({
      project: Number(projectId),
      user: Number(valueAsyncStorage.userId),
    });
  }

  // function setUser(newV: string): void {
  //     setFilterValue({
  //         project: actualValues.project,
  //         user: parseInt(newV),
  //     });
  // }
  // a modifier
  const dataProject: IProject[] | null = useGetProject();
  // const dataUser: IUser[] | null = useGetUsers();

  if (
    /*!dataUser || dataUser?.length < 1 ||*/ !dataProject ||
    dataProject?.length < 1
  ) {
    return (
      <View>
        <Text>loading</Text>
      </View>
    );
  }

  return (
    <View>
      <DropdownComponent
        data={dataProject}
        callback={setProject}
        label="Project"
      />
      {/* <DropdownComponent data={dataUser} callback={setUser} label="User" /> */}
    </View>
  );
}
