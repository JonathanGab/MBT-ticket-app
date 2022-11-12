import { View, SafeAreaView, StyleSheet } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext, IAuthContextProps } from '../contexts/AuthContext';
import { useGetTicketById } from '../hooks/query/useGetTicketById';
import {
  Center,
  Input,
  Stack,
  CheckIcon,
  FormControl,
  Select,
  Box,
  Slider,
  Text,
  Radio,
  TextArea,
} from 'native-base';
import BtnSubmit from '../components/utils/BtnSubmit';
import {
  statusSample,
  labelSample,
  prioritySample,
} from '../components/form/TicketForm';
import { UPDATE_TICKET } from '../hooks/mutations/useUpdateTicket';
import { useMutation } from '@apollo/client';
import { useGetAllUsers } from '../hooks/query/useGetAllUsers';

export default function TicketEditionPage() {
  const { getTicketId } = useContext(AuthContext) as IAuthContextProps;
  const ticketId = useGetTicketById(getTicketId as number);
  const [updateTicket, { loading, error, data }] = useMutation(UPDATE_TICKET);

  //! -------------------- STATES --------------------
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [label, setLabel] = useState<string>('');
  const [user, setUser] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<number | null | undefined>(null);
  const [priority, setPriority] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const users = useGetAllUsers();

  useEffect(() => {
    if (ticketId) {
      setDifficulty(ticketId.difficulty);
      setPriority(ticketId.priority);
    }
  }, [ticketId]);

  const ajustColor = (difficulty: number | null | undefined) => {
    switch (difficulty) {
      case 0:
        return 'primary';
      case 1:
        return 'green';
      case 2:
        return 'yellow';
      case 3:
        return 'orange';
      case 4:
        return 'red';
      case 5:
        return 'muted';
      default:
        return 'green';
    }
  };

  const submitUpdatedTicket = async (e: any) => {
    e.preventDefault();
    setIsLoading(false);
    try {
      setIsLoading(true);
      const updatedTicket = await updateTicket({
        variables: {
          updateTicketByIdId: getTicketId,
          title: title !== '' ? title : ticketId?.title,
          description: description !== '' ? description : ticketId?.description,
          status: status !== '' ? status : ticketId?.status,
          labels: label !== '' ? label : ticketId?.labels,
          users: [
            {
              id: user,
            },
          ],
          priority: priority !== '' ? priority : ticketId?.priority,
          difficulty: difficulty !== null ? difficulty : ticketId?.difficulty,
        },
      });
      console.log('up', updatedTicket.data);
      return updatedTicket;
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View>
          <Center>
            <Stack space={4} w="350px" my="10px">
              <Input
                variant="outline"
                placeholder="Outline"
                defaultValue={ticketId?.title}
                backgroundColor="white"
                onChangeText={(text) => setTitle(text)}
              />
            </Stack>
            <Stack space={4} w="350px" my="10px">
              <Input
                variant="outline"
                placeholder="Outline"
                defaultValue={ticketId?.description}
                backgroundColor="white"
                onChangeText={(text) => setDescription(text)}
              />
            </Stack>
            <FormControl>
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
                onValueChange={(v) => setStatus(v)}
                selectedValue={status !== '' ? status : ticketId?.status}
              >
                {statusSample.map((item, index) => (
                  <Select.Item
                    key={index}
                    label={item?.name}
                    value={item?.name}
                  >
                    {item?.name}
                  </Select.Item>
                ))}
              </Select>
              <FormControl.Label>Label</FormControl.Label>
              <Select
                minWidth="200"
                accessibilityLabel="Label"
                placeholder="Label"
                _selectedItem={{
                  bg: 'teal.600',
                  endIcon: <CheckIcon size={5} />,
                }}
                mt="1"
                backgroundColor={'white'}
                selectedValue={label !== '' ? label : ticketId?.labels}
                onValueChange={(v) => setLabel(v)}
              >
                {labelSample.map((item, index) => (
                  <Select.Item
                    key={index}
                    label={item?.name}
                    value={item?.name}
                  >
                    {item?.name}
                  </Select.Item>
                ))}
              </Select>
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
                onValueChange={(v) => setUser(v)}
                selectedValue={user as any}
              >
                {users.map((item, index) => (
                  <Select.Item
                    key={index}
                    label={item?.name}
                    value={item?.id as string}
                  >
                    {item?.name}
                  </Select.Item>
                ))}
              </Select>
            </FormControl>
            <Box alignItems="center" w="100%">
              <Stack space={4} alignItems="center" w="75%" maxW="300">
                <Text textAlign="center">{difficulty}</Text>
                <Slider
                  defaultValue={ticketId?.difficulty}
                  colorScheme={ajustColor(difficulty)}
                  step={1}
                  onChange={(v) => setDifficulty(Math.floor(v))}
                  maxValue={5}
                >
                  <Slider.Track>
                    <Slider.FilledTrack />
                  </Slider.Track>
                  <Slider.Thumb />
                </Slider>
              </Stack>
            </Box>
            <Radio.Group
              name="Priority"
              defaultValue={ticketId?.priority}
              accessibilityLabel="Pick a priority"
              onChange={(nextValue) => setPriority(nextValue)}
              value={priority}
            >
              <Stack
                direction={{
                  base: 'row',
                  md: 'row',
                }}
                alignItems={{
                  base: 'flex-start',
                  md: 'center',
                }}
                space={4}
                w="75%"
                maxW="300px"
                my={3}
              >
                {prioritySample.map((item, index) => (
                  <Radio
                    key={index}
                    value={item?.name}
                    colorScheme={item.color}
                    size="sm"
                    my={1}
                  >
                    {item.name}
                  </Radio>
                ))}
              </Stack>
            </Radio.Group>
          </Center>
        </View>
        <View>
          <BtnSubmit
            isLoading={isLoading}
            width={'100%'}
            color={'#E29578'}
            onPress={(e: any) => submitUpdatedTicket(e)}
          />
        </View>
        <View>
          <View>
            <Text>+ Add comment</Text>
            <TextArea
              autoCompleteType={'off'}
              backgroundColor={'white'}
              h={20}
              placeholder="Text Area Placeholder"
              w="75%"
              maxW="300"
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDF6F9',
  },
});
