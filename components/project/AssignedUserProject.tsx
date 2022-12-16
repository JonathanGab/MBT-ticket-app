import { View, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import { Avatar, HStack, Center, NativeBaseProvider } from 'native-base';
import IUser from '../Interface/IUser';

export const UserAvatar = ({ initial }: { initial: string }) => {
  const randomBg = (): string => {
    const colors = [
      'primary.300',
      'secondary.400',
      'red.500',
      'blue.500',
      'pink.500',
      'teal.500',
      'lime.500',
      'amber.500',
      'cyan.500',
    ];
    const random = colors[Math.floor(Math.random() * colors.length)];
    return random;
  };

  randomBg();
  return (
    <HStack
      justifyContent="center"
      mx={{
        base: 'auto',
        md: '0',
      }}
      space={2}
    >
      <Avatar bg={randomBg()} mr="1">
        {initial.slice(0, 1)}
      </Avatar>
    </HStack>
  );
};

export default function AssignedUserProject({ data }: { data: IUser[] }) {
  const Item = ({ name }: { name: string }): JSX.Element => (
    <View style={styles.avatarContainer}>
      <UserAvatar initial={name} />
    </View>
  );

  const renderItem = ({ item }: any) => <Item name={item.name} />;

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item: any) => item.id}
      horizontal={true}
    />
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    flexDirection: 'row',
  },
});
