import React from 'react';
import { Button, Stack } from 'native-base';

interface IBtnSubmitProps {
  isLoading: boolean;
  width: string;
  color: string;
  onPress: (e: any) => void;
}

export default function BtnSubmit({
  isLoading,
  width,
  color,
  onPress,
}: IBtnSubmitProps) {
  return (
    <Stack
      direction={{
        base: 'column',
        md: 'row',
      }}
      space={2}
      alignItems={{
        base: 'center',
        md: 'flex-start',
      }}
    >
      <Button
        isLoading={isLoading}
        isLoadingText="Submitting"
        w={width}
        backgroundColor={color}
        onPress={onPress}
      >
        Submit
      </Button>
    </Stack>
  );
}
