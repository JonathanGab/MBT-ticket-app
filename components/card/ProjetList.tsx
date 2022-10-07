import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';

interface IUsers {
  id: number;
  name: string;
}

interface IProjectListProps {
  title: string;
  description: string;
  status: string;
  users: IUsers[];
}

export default function ProjetList({
  title,
  description,
  status,
  users,
}: IProjectListProps) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text
          style={
            status === 'Active' ? styles.statusActive : styles.statusPending
          }
        >
          {status}
        </Text>
        <Text>
          {users?.map((user: any, index: any) => (
            <Text key={user.id} style={styles.users}>
              {(index ? ', ' : '') + user.name}
            </Text>
          ))}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: { borderWidth: 1, borderColor: 'grey' },
  card: {},
  title: { fontSize: 25, fontWeight: 'bold', paddingBottom: 20 },
  description: { fontSize: 15, fontStyle: 'italic' },
  statusActive: { color: 'green', paddingBottom: 10 },
  statusPending: { color: 'coral', paddingBottom: 10 },
  users: { fontSize: 10 },
});
