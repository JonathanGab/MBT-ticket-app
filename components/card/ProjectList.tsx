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
            <Text key={index} style={styles.users}>
              {(index ? ', ' : '') + user.name}
            </Text>
          ))}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: { paddingHorizontal: 20, marginVertical: 10 },
  card: {
    backgroundColor: '#f5f5f7',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#171717',
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  title: { fontSize: 25, fontWeight: 'bold', paddingBottom: 20 },
  description: { fontSize: 15, fontStyle: 'italic' },
  statusActive: { color: 'green', paddingBottom: 10 },
  statusPending: { color: 'coral', paddingBottom: 10 },
  users: { fontSize: 10, fontStyle: 'italic' },
});
