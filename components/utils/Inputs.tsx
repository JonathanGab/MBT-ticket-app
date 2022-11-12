import React from 'react';
import { Input, Stack, Center } from 'native-base';

interface IInputProps {
  label: string;
  value?: string;
  onChange: (text: string) => void;
}

export default function Inputs({ label, value, onChange }: IInputProps) {
  return (
    <Center>
      <Stack space={4} w="350px" my="10px">
        <Input
          value={value}
          w="100%"
          onChangeText={onChange}
          placeholder={label}
          variant="outline"
          backgroundColor="white"
        />
      </Stack>
    </Center>
  );
}
