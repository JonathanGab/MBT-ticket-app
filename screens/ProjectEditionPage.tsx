import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { CheckIcon, FormControl, Select } from 'native-base';
import { useMutation } from '@apollo/client';
import { LoginContext, ILoginContext } from '../contexts/LoginContext';
import dayjs from 'dayjs';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from '@expo/vector-icons/Ionicons';
import { UPDATE_PROJECT } from '../hooks/mutations/useUpdateProject';
import { REMOVE_USER_FROM_PROJECT } from '../hooks/mutations/useRemoveUserFromProject';
import IProject, { useGetProjectById } from '../hooks/query/useGetProjectById';
import { AuthContext, IAuthContextProps } from '../contexts/AuthContext';
import { statusProjectSample } from '../components/form/TicketForm';
import { useGetAllUsers } from '../hooks/query/useGetAllUsers';
import Sticker from '../components/utils/Sticker';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

type ListScreenProp = DrawerNavigationProp<{ List: undefined }, 'List'>;

export default function ProjectEditionPage() {
  const { valueAsyncStorage } = useContext(LoginContext) as ILoginContext;
  const { getProjectId } = useContext(AuthContext) as IAuthContextProps;
  const navigation = useNavigation<ListScreenProp>();

  // State
  const [projectName, setProjectName] = useState<string>('');
  const [projectStatus, setProjectStatus] = useState<string>('');
  const [projectMembers, setProjectMembers] = useState<
    Array<{ id: string; name: string }>
  >([
    {
      id: valueAsyncStorage?.userId?.toString() as string,
      name: valueAsyncStorage?.name as string,
    },
  ]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [desc, setDesc] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  const [updateProject, { data, loading, error }] = useMutation(UPDATE_PROJECT);
  const [
    removeUserFromProject,
    { data: dataRemove, loading: loadingRemove, error: errorRemove },
  ] = useMutation(REMOVE_USER_FROM_PROJECT);
  const HandleProjectStatusChanges = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setProjectStatus(e.target.value);
  };

  const HandleProjectMembersChanges = (e: any): void => {
    setProjectMembers(e.target.value);
  };

  const getProjectData: IProject | undefined | null = useGetProjectById(
    Number(getProjectId)
  );

  const startFromApi = new Date(
    dayjs(getProjectData?.start_time).format('YYYY-MM-DD')
  );

  const endFromApi = new Date(
    dayjs(getProjectData?.end_time).format('YYYY-MM-DD')
  );

  // * FOR EDIT RPOJECT
  const projectEdit = async (e: any): Promise<void> => {
    e.preventDefault();
    try {
      const data = await updateProject({
        variables: {
          updateProjectByIdId: getProjectId,
          title: projectName === '' ? getProjectData?.title : projectName,
          startTime: startDate === null ? startFromApi : startDate,
          endTime: endDate === null ? endFromApi : endDate,
          description: desc === '' ? getProjectData?.description : desc,
          status: projectStatus === '' ? getProjectData?.status : projectStatus,
          users: projectMembers?.map((user) => {
            return {
              id: Number(user.id),
            };
          }),
        },
      });
      navigation.navigate('List');
    } catch (err) {
      console.error({ message: err });
    }
  };

  const removeUserFromCurrentProject = async (item: number) => {
    try {
      const data = await removeUserFromProject({
        variables: {
          removeUserFromProjectId: getProjectId,
          users: [
            {
              id: item,
            },
          ],
        },
      });
    } catch (err) {
      console.error({ message: err });
    }
  };

  const usersArray = getProjectData?.Users?.map(
    (user: { id: number; name: string }) => {
      return {
        id: user.id,
        name: user.name,
      };
    }
  );

  const onChangeStartDates = (event: any, selectedDate: any) => {
    // on cancel set date value to previous date
    if (event?.type === 'dismissed') {
      setStartDate(startDate);
      return;
    }
    setStartDate(selectedDate);
  };
  const onChangeEndDates = (event: any, selectedDate: any) => {
    // on cancel set date value to previous date
    if (event?.type === 'dismissed') {
      setEndDate(endDate);
      return;
    }
    setEndDate(selectedDate);
  };

  const users = useGetAllUsers();

  useEffect(() => {
    setProjectMembers(usersArray as any);
  }, [getProjectData]);

  return (
    <View style={styles.cardStyle}>
      <View style={styles.cardStyleBox}>
        <View>
          <TextInput
            placeholder="Title"
            style={styles.input}
            defaultValue={getProjectData?.title}
            onChangeText={(text) => setProjectName(text)}
          />
        </View>

        <View {...HandleProjectMembersChanges}></View>
        <View {...HandleProjectStatusChanges}></View>
        <View>
          <TextInput
            placeholder="Description"
            style={styles.input}
            defaultValue={getProjectData?.description}
            onChangeText={(text) => setDesc(text)}
          />
        </View>
        {/* ------------------------ PICKER ------------------------- */}
        <View style={styles.datePickerContainer}>
          <View style={styles.datePickerBox}>
            {/* FIRST PICKER */}
            <View style={styles.startPickerDate}>
              <Ionicons
                name="calendar-outline"
                size={24}
                color={'black'}
                style={{ position: 'absolute' }}
              />
              <DateTimePicker
                style={styles.startDateTimePicker}
                testID="dateTimePicker"
                mode={'date'}
                value={startDate !== null ? startDate : (startFromApi as Date)}
                minimumDate={getProjectData?.start_time as Date}
                is24Hour={true}
                onChange={onChangeStartDates}
              />
              {/*  END FIRST PICKER */}
            </View>
            <View style={styles.endPickerDate}>
              <Ionicons
                name="calendar-outline"
                size={24}
                color={'black'}
                style={{ position: 'absolute', left: -7 }}
              />
              <DateTimePicker
                style={styles.endDateTimePicker}
                testID="dateTimePicker"
                mode={'date'}
                value={endDate !== null ? endDate : endFromApi}
                is24Hour={true}
                onChange={onChangeEndDates}
              />
            </View>
          </View>
          <ScrollView horizontal={true}>
            {projectMembers?.map((item, index) => (
              <Sticker
                user={item.name}
                onPress={(e: any) => {
                  removeUserFromCurrentProject(Number(item.id));
                  setProjectMembers((prev: any) => {
                    const newArr = [...prev];
                    newArr.splice(index, 1);
                    return newArr;
                  });
                }}
                isCurrentUser={
                  item.id !== valueAsyncStorage?.userId?.toString()
                }
                key={index}
              />
            ))}
          </ScrollView>
          <FormControl>
            <FormControl.Label>Members</FormControl.Label>
            <Select
              minWidth="200"
              accessibilityLabel="Members"
              placeholder="Members"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size={5} />,
              }}
              mt="1"
              backgroundColor={'white'}
              onValueChange={(v: any) =>
                setProjectMembers((prev: any) => [
                  ...prev,
                  { id: v.id, name: v.name },
                ])
              }
              // Currently selected value. Useful for controlling the Select state
              selectedValue={projectMembers as any}
            >
              {users.map((item, index) => (
                <Select.Item key={index} label={item?.name} value={item as any}>
                  {item?.name}
                </Select.Item>
              ))}
            </Select>
          </FormControl>
          <FormControl style={styles.statusController}>
            <FormControl.Label>Status</FormControl.Label>
            <Select
              minWidth="200"
              accessibilityLabel="Status"
              placeholder="Status"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size={5} />,
              }}
              mt="1"
              backgroundColor={'white'}
              selectedValue={status !== '' ? status : getProjectData?.status}
              onValueChange={(v) => setStatus(v)}
            >
              {statusProjectSample.map((item, index) => (
                <Select.Item key={index} label={item?.name} value={item?.name}>
                  {item?.name}
                </Select.Item>
              ))}
            </Select>
          </FormControl>
          <TouchableOpacity
            onPress={(e) => projectEdit(e)}
            style={styles.submit}
          >
            <Text style={styles.textButton}>Edit</Text>
          </TouchableOpacity>
        </View>
        {/* ------- END PICKER */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardStyle: {
    height: '100%',
    width: '100%',
    backgroundColor: '#EDF6F9',
    justifyContent: 'center',
  },
  cardStyleBox: {
    paddingHorizontal: 20,
  },
  input: {
    height: 50,
    width: '100%',
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    marginVertical: 10,
  },
  datePickerContainer: {
    flexDirection: 'column',
    marginTop: 20,
  },
  datePickerBox: {
    position: 'relative',
    flexDirection: 'row',
    height: 60,
    width: '100%',
  },
  startPickerDate: {
    height: 60,
    width: '50%',
    position: 'absolute',
  },
  startDateTimePicker: {
    height: 30,
    width: '100%',
    transform: [{ translateX: -15 }],
  },
  endPickerDate: {
    position: 'absolute',
    height: 30,
    left: '55%',
    width: '50%',
  },
  endDateTimePicker: {
    height: 30,
    width: '100%',
    transform: [{ translateX: -20 }],
  },
  textDate: {
    marginTop: 10,
  },
  submit: {
    backgroundColor: '#FFDDD2',
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 30,
    justifyContent: 'center',
    width: '100%',
    height: 50,
  },
  textButton: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  statusController: {},
});
