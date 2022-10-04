import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import ProfileCard from '../components/card/ProfileCard';

export default function ProfilePage() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [hashedPassword, setHashedPassword] = React.useState('');

  const userProfile = {
    id: 1,
    name: 'John Doe',
    email: 'John_Doe@MBT.com',
    hashedPassword: '123456789',
    autobiography: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
    profilePicture: 'https://i.pravatar.cc/300',
  };

  return (
    <View style={styles.container}>
      <ProfileCard
        name={userProfile.name}
        autobiography={userProfile.autobiography}
        setName={setName}
        email={userProfile.email}
        setEmail={setEmail}
        hashedPassword={userProfile.hashedPassword}
        setHashedPassword={setHashedPassword}
        imageUrl={userProfile.profilePicture}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});
