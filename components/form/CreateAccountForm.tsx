import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { CREATE_USER } from '../../hooks/mutations/useCreateUser';
import { useMutation } from '@apollo/client';

export default function CreateAccountForm() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [hashedPassword, setHashedPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const [addUser, { data, error }] = useMutation(CREATE_USER);

  const createUser = async (e: any): Promise<void> => {
    e.preventDefault();
    try {
      await addUser({
        variables: {
          name: name,
          email: email,
          hashedPassword: hashedPassword,
        },
      });
      if (!error) {
        setMessage('A mail has been sent to you to confirm your account.');
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <TextInput
          placeholder="Name"
          style={styles.input}
          // eslint-disable-next-line no-shadow
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View>
        <TextInput
          placeholder="Email"
          style={styles.input}
          // eslint-disable-next-line no-shadow
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View>
        <TextInput
          secureTextEntry
          placeholder="Password"
          style={styles.input}
          value={hashedPassword}
          onChangeText={(text) => setHashedPassword(text)}
        />
      </View>
      <View>
        <TouchableOpacity
          style={styles.connexion}
          onPress={(e) => createUser(e)}
        >
          <Text style={styles.textButton}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDF6F9',
  },
  logo: {
    height: 150,
    width: 150,
  },
  log: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: 300,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    marginVertical: 10,
  },
  connexion: {
    backgroundColor: '#E29578',
    borderRadius: 10,
    marginTop: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 35,
  },
  text: {
    fontWeight: 'bold',
    color: 'black',
  },
  textButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
