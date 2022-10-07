import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useContext } from 'react';
import { useQuery } from '@apollo/client';
import IProject from '../../hooks/query/useGetProjectByCurrentUser';
export default function ProjectList({
  title,
  description,
  status,
  Users,
}: IProject) {
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
          {Users?.map((user: any, index: any) => (
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
  card: { width: '100%', paddingHorizontal: 10, paddingVertical: 10 },
  title: { fontSize: 25, fontWeight: 'bold', paddingBottom: 20 },
  description: { fontSize: 15, fontStyle: 'italic' },
  statusActive: { color: 'green', paddingBottom: 10 },
  statusPending: { color: 'coral', paddingBottom: 10 },
  users: { fontSize: 10, fontStyle: 'italic' },
});
