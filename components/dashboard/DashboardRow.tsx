import { View, Text } from 'react-native';
import React from 'react';

type DashboardRowType = {
  date: Date | string;
  task: string;
  status: string;
  fill?: string;
  backgroundColor?: string;
};

export default function DashboardRow({
  date,
  task,
  status,
  fill,
}: DashboardRowType) {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 5,
      }}
    >
      <View
        style={{
          flex: 0.6,
          alignItems: 'center',
          paddingVertical: 3,
          borderRadius: 5,
        }}
      >
        <Text>{date.toString()}</Text>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          paddingVertical: 3,
          borderRadius: 5,
        }}
      >
        <Text numberOfLines={1}>{task}</Text>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: fill,
          paddingVertical: 3,
          borderRadius: 5,
        }}
      >
        <Text>{status}</Text>
      </View>
    </View>
  );
}
