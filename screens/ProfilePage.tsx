import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import ProfileCard from '../components/card/ProfileCard';
import { useGetCurrentUser } from '../hooks/query/useGetUser';
import IUser from '../hooks/query/useGetUser';
import { ILoginContext, LoginContext } from '../contexts/LoginContext';
import { ScrollView } from 'react-native-gesture-handler';

export default function ProfilePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [hashedPassword, setHashedPassword] = useState('');
  const { valueAsyncStorage } = useContext(LoginContext) as ILoginContext;

  const user: IUser | undefined | null = useGetCurrentUser(
    valueAsyncStorage.userId as string
  );

  const userProfile = {
    autobiography: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
    profilePicture: 'https://i.pravatar.cc/300',
  };

  return (
    <ScrollView style={styles.container}>
      <ProfileCard
        name={user?.name}
        autobiography={userProfile.autobiography}
        setName={setName}
        email={user?.email}
        setEmail={setEmail}
        hashedPassword={user?.hashedPassword}
        setHashedPassword={setHashedPassword}
        imageUrl={userProfile.profilePicture}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#f6f6f6',
  },
});
