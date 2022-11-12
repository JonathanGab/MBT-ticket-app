import { View, Text } from 'react-native';
import React from 'react';
import { Center, CheckIcon, FormControl, Select } from 'native-base';
import IUser from '../../hooks/query/useGetUser';

interface ISelectProps {
  data: IUser[] | SelectProps[];
  label: string;
  onChange: (text: string) => void;
}

type SelectProps = {
  id: number | string;
  name: string;
};

export default function UserSelects({ data, label, onChange }: ISelectProps) {
  return (
    <Center>
      <FormControl w="100%" maxW="350px" isRequired isInvalid>
        <FormControl.Label>Select {label}</FormControl.Label>
        <Select
          minWidth="200"
          accessibilityLabel={label}
          placeholder={label}
          _selectedItem={{
            bg: 'teal.600',
            endIcon: <CheckIcon size={5} />,
          }}
          mt="1"
          backgroundColor={'white'}
          onValueChange={onChange}
        >
          {data.map((item, index) => (
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
    </Center>
  );
}
