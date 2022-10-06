import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import ProjectCreateForm from '../components/form/ProjectCreateForm'

export default function ProjectCreationPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ProjectCreationPage</Text>
      <Text style={styles.text}>Create a Project</Text>
      <ProjectCreateForm></ProjectCreateForm>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c5d5e4',
  },
  text: {
    fontWeight: 'bold',
    fontsize:60
    
  }
})