import { View, Text, StyleSheet, Pressable } from 'react-native';

import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Sticker({
  user,
  onPress,
  isCurrentUser,
}: {
  user: string;
  onPress: (e: any) => void;
  isCurrentUser: boolean;
}): JSX.Element {
  const styles = StyleSheet.create({
    stickerContainer: {
      borderWidth: 1,
      borderRadius: 15,
      alignItems: 'center',
      flexDirection: 'row',
      alignSelf: 'flex-start',
      margin: 5,
      minHeight: 30,
      backgroundColor: '#ffffff',
      marginBottom: 20,
      borderColor: isCurrentUser !== true ? 'gold' : 'black',
    },
  });

  return (
    <View style={styles.stickerContainer}>
      <Text style={{ paddingHorizontal: 5 }}>{user}</Text>
      {isCurrentUser === true ? (
        <Pressable onPress={onPress}>
          <Text style={{ marginLeft: 0 }}>
            <Entypo name="cross" size={20} color="red" />
          </Text>
        </Pressable>
      ) : (
        <Text style={{ marginLeft: 0 }}>
          <MaterialCommunityIcons
            name="shield-crown-outline"
            size={20}
            color="black"
          />
        </Text>
      )}
    </View>
  );
}
