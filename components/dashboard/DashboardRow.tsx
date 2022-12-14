import { View, Text, StyleSheet } from 'react-native';
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
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingVertical: 10,
      paddingHorizontal: 5,
    },
    rowText: {
      flex: 1,
      alignItems: 'flex-start',
      paddingVertical: 3,
      paddingLeft: 5,
      borderRadius: 5,
    },
    rowTask: {
      flex: 2,
      alignItems: 'flex-start',
      paddingVertical: 3,
      paddingLeft: 5,
      borderRadius: 5,
    },
    rowFill: {
      flex: 1.5,
      alignItems: 'center',
      backgroundColor: fill,
      paddingVertical: 3,
      borderRadius: 5,
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.rowText}>
        <Text>{date.toString()}</Text>
      </View>
      <View style={styles.rowTask}>
        <Text numberOfLines={1}>{task}</Text>
      </View>
      <View style={styles.rowFill}>
        <Text>{status.replace(/_/g, ' ')}</Text>
      </View>
    </View>
  );
}
