import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { CheckIcon, FormControl, Select } from 'native-base';
import { useMutation } from '@apollo/client';
import { CREATE_PROJECT } from '../../hooks/mutations/useCreateProject';
import dayjs from 'dayjs';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LoginContext, ILoginContext } from '../../contexts/LoginContext';

import { useGetAllUsers } from '../../hooks/query/useGetAllUsers';

import Sticker from '../utils/Sticker';

export default function ProjectCreateForm(): JSX.Element {
  const { valueAsyncStorage } = useContext(LoginContext) as ILoginContext;

  const [projectName, setProjectName] = useState<string>('');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [desc, setDesc] = useState<string>('');
  const [projectMembers, setProjectMembers] = useState<
    Array<{ id: string; name: string }>
  >([
    {
      id: valueAsyncStorage?.userId?.toString() as string,
      name: valueAsyncStorage?.name as string,
    },
  ]);

  const [addProject, { data, loading, error }] = useMutation(CREATE_PROJECT);

  const addOneDay = (date: Date) => {
    const dateCopy = new Date(date);
    dateCopy.setDate(date.getDate() + 1);
    return dateCopy;
  };

  const projectCrea = async (e: any): Promise<void> => {
    e.preventDefault();
    try {
      await addProject({
        variables: {
          title: projectName,
          startTime: startDate,
          endTime: endDate,
          description: desc,
          status: 'OPEN',
          users: projectMembers?.map((user) => {
            return {
              id: Number(user.id),
            };
          }),
        },
      });
      setProjectName('');
      setStartDate(new Date());
      setEndDate(null);
      setDesc('');
      setProjectMembers([]);
    } catch (err) {
      console.error({ message: err });
    }
  };
  //* FROM DOC
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
  return (
    <View style={styles.cardStyle}>
      <View style={styles.cardStyleBox}>
        <View>
          <TextInput
            placeholder="Title"
            style={styles.input}
            value={projectName}
            onChangeText={(text) => setProjectName(text)}
          />
        </View>
        <View>
          <TextInput
            placeholder="Description"
            style={styles.input}
            value={desc}
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
                value={startDate}
                minimumDate={new Date()}
                is24Hour={true}
                onChange={onChangeStartDates}
              />
              {/* <Text style={styles.textDate}>
                Start Time: {dayjs(startDate).format('DD/MM/YYYY')}
              </Text> */}
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
                value={endDate === null ? addOneDay(startDate) : endDate}
                minimumDate={addOneDay(startDate)}
                is24Hour={true}
                onChange={onChangeEndDates}
              />
              {/* <Text style={styles.textDate}>
                End Time:
                {endDate === null
                  ? addOneDay(startDate).toLocaleDateString('fr-FR')
                  : endDate.toLocaleDateString('fr-FR')}
              </Text> */}
            </View>
          </View>
          <ScrollView horizontal={true}>
            {projectMembers?.map((item, index) => (
              <Sticker
                user={item.name}
                onPress={() => {
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
          <TouchableOpacity
            onPress={(e) => projectCrea(e)}
            style={styles.submit}
          >
            <Text style={styles.textButton}>Create</Text>
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
});
