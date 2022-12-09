import { Pressable } from 'react-native';
import React, { SetStateAction, useState } from 'react';
import { stylesTicketItem } from '../style.js';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ArrowPressable({
  setShow,
  show,
}: {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
}) {
  return (
    <Pressable onPress={() => setShow(!show)} style={stylesTicketItem.showMore}>
      {!show ? (
        <Ionicons name={'chevron-down-outline'} size={24} color={'black'} />
      ) : (
        <Ionicons name={'chevron-up-outline'} size={24} color={'black'} />
      )}
    </Pressable>
  );
}
