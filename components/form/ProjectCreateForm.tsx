import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  Platform,
} from 'react-native';
import { useMutation } from '@apollo/client';
import { CREATE_PROJECT } from '../../hooks/mutations/useCreateProject';
import dayjs from 'dayjs';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LoginContext, ILoginContext } from '../../contexts/LoginContext';
interface IProject {
  id: number;
  title: string;
  description: string;
  start_time: Date;
  end_time?: Date;
  daysLeft?: string;
  status: string;
  user_id: [object];
  numUsers?: number;
  Tickets?: [{ id: number }];
  nbTicket?: number;
  picture_id?: number;
}

export default function ProjectCreateForm(): JSX.Element {
  const dateFormat = 'yyyy-MM-DD';
  // State
  const [projectName, setProjectName] = useState<string>('');
  const [projectStatus, setProjectStatus] = useState<string>('');
  const [projectMembers, setProjectMembers] = useState<string>(''); // TODO: change to array of user ids
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [desc, setDesc] = useState<string>('');
  const [validation, setValidation] = useState('');
  const [addProject, { data, loading, error }] = useMutation(CREATE_PROJECT);
  const { valueAsyncStorage } = useContext(LoginContext) as ILoginContext;

  const HandleProjectStatusChanges = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setProjectStatus(e.target.value);
  };

  const HandleProjectMembersChanges = (e: any): void => {
    setProjectMembers(e.target.value);
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
          status: 'active',
          users: [
            {
              id: valueAsyncStorage.userId,
            },
          ],
        },
      });
      setProjectName('');
      setStartDate(new Date());
      setEndDate(new Date());
      setDesc('');
    } catch (err) {
      setValidation('⚠️ Incomplete data, please try again.');
      console.error({ message: err });
    }
  };

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

        <View {...HandleProjectMembersChanges}></View>
        <View {...HandleProjectStatusChanges}></View>
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
              <Text style={styles.textDate}>
                Start Time: {dayjs(startDate).format('DD/MM/YYYY')}
              </Text>
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
                value={endDate}
                minimumDate={new Date()}
                is24Hour={true}
                onChange={onChangeEndDates}
              />
              <Text style={styles.textDate}>
                End Time: {dayjs(endDate).format('DD/MM/YYYY')}
              </Text>
            </View>
          </View>

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
    transform: [{ translateX: -40 }],
  },
  endPickerDate: {
    position: 'absolute',
    height: 30,
    left: '60%',
  },
  endDateTimePicker: {
    height: 30,
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
