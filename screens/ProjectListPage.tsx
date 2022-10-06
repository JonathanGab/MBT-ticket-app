import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import ProjectList from '../components/card/ProjectList';

export default function ProjectListPage() {
  const projectList = [
    {
      id: 1,
      title: 'Mont-Blanc Project',
      description: 'A project class with mountain.',
      status: 'Active',
      users: [
        {
          id: 1,
          name: 'Jo',
        },
        {
          id: 2,
          name: 'Brand',
        },
      ],
    },
    {
      id: 2,
      title: 'Coffee Time Project',
      description: 'A project class with coffee.',
      status: 'Pending',
      users: [
        {
          id: 3,
          name: 'Pet',
        },
        {
          id: 4,
          name: 'Axe',
        },
      ],
    },
    {
      id: 3,
      title: 'Scooby-Gang Project',
      description: 'A project class with dog.',
      status: 'Active',
      users: [
        {
          id: 5,
          name: 'Will',
        },
        {
          id: 6,
          name: 'Sél',
        },
      ],
    },
  ];
  return (
    <View style={styles.container}>
      <ScrollView>
        {projectList.map((project: any) => (
          <ProjectList
            key={project.id}
            title={project.title}
            description={project.description}
            status={project.status}
            users={project.users}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edf2ef',
  },
});
