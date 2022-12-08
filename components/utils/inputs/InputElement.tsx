import { useState } from 'react';
import {
  Input,
  Icon,
  Stack,
  Pressable,
  Center,
  NativeBaseProvider,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

type iconType = {
  icon: any;
  placeholder: string | undefined;
};

export default function InputElement({
  icon,
  placeholder,
}: iconType): JSX.Element {
  const [show, setShow] = useState(false);
  return (
    <Stack space={4} w="100%" alignItems="center">
      <Input
        w={{
          base: '75%',
          md: '25%',
        }}
        type={show ? 'text' : 'password'}
        InputRightElement={
          <Pressable onPress={() => setShow(!show)}>
            <Icon
              as={
                <MaterialIcons name={show ? 'visibility' : 'visibility-off'} />
              }
              size={5}
              mr="2"
              color="muted.400"
            />
          </Pressable>
        }
        placeholder="Password"
      />
    </Stack>
  );
}
