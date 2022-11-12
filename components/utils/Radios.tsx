import React from 'react';
import { Radio, Stack, Center } from 'native-base';

interface RadioInterface {
  data: RadioProps[];
  direction?: 'row' | 'column';
  marginVertical?: number;
  onChange: (value: string) => void;
  value: string;
}
type RadioProps = {
  id: number;
  name: string;
  color: string;
};

export default function Radios({
  direction,
  marginVertical,
  data,
  onChange,
  value,
}: RadioInterface) {
  return (
    <Center>
      <Radio.Group
        name="exampleGroup"
        defaultValue="1"
        accessibilityLabel="pick a size"
        onChange={onChange}
        value={value}
      >
        <Stack
          direction={{
            base: direction,
            md: 'row',
          }}
          alignItems={{
            base: 'flex-start',
            md: 'center',
          }}
          space={4}
          w="75%"
          maxW="300px"
          my={marginVertical}
        >
          {data.map((item, index) => (
            <Radio
              key={index}
              value={item.name}
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
  );
}
