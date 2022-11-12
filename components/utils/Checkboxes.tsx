import { View, Text } from 'react-native';
import React from 'react';
import { Checkbox, Stack, Box } from 'native-base';

interface ICheckBoxProps {
  data: CheckBoxProps[];
  direction?: 'row' | 'column';
  marginVertical?: number;
  onChange: (values: any) => any;
  value: string[];
}

type CheckBoxProps = {
  id: number;
  name: string;
  color: string;
};

export default function Checkboxes({
  data,
  direction,
  marginVertical,
  onChange,
  value,
}: ICheckBoxProps) {
  return (
    <Box alignItems="center">
      <Stack
        direction={{
          base: direction,
          md: 'row',
        }}
        space={3}
        alignItems="flex-start"
        my={marginVertical}
      >
        <Checkbox.Group onChange={onChange} value={value}>
          {data.map((item, index) => (
            <Checkbox key={index} value={item.name} colorScheme={item.color}>
              {item.name}
            </Checkbox>
          ))}
        </Checkbox.Group>
      </Stack>
    </Box>
  );
}
