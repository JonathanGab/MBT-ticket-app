import React from 'react';
import { Badge, VStack, Box } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

function BadgeComment({ length }: { length: number }) {
  return (
    <Box alignItems="flex-end" zIndex={2}>
      <VStack>
        <Badge
          colorScheme="danger"
          rounded="full"
          mb={-3}
          variant="solid"
          alignSelf="center"
          h={8}
          w={8}
          _text={{
            fontSize: 12,
          }}
        >
          {length}
        </Badge>
      </VStack>
    </Box>
  );
}

export default function ModalButton({
  setOpen,
  length,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  length: number;
}) {
  return (
    <TouchableOpacity
      style={{
        width: 50,
        marginBottom: 10,
      }}
      onPress={() => setOpen(true)}
    >
      <BadgeComment length={length} />
      <FontAwesome5 name="comment-alt" size={30} color="black" />
    </TouchableOpacity>
  );
}
