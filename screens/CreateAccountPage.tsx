import { View, Text } from 'react-native';
import React from 'react';
import CreateAccountForm from '../components/form/CreateAccountForm';

export default function CreateAccountPage() {
  return (
    <View style={{ height: '100%' }}>
      <CreateAccountForm />
    </View>
  );
}
