import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../hooks/mutations/useLogin';
import { LoginContext, ILoginContext } from '../../contexts/LoginContext';
import { AuthContext, IAuthContextProps } from '../../contexts/AuthContext';
import ProjectListPage from '../../screens/ProjectListPage';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
interface IUser {
  email: string;
  hashedPassword: string;
}

type ListScreenProp = BottomTabNavigationProp<{ List: undefined }, 'List'>;

export default function LoginForm() {
  const [email, setEmail] = useState<string>('');
  const [hashedPassword, setHashedPassword] = useState<string>('');
  const [validation, setValidation] = useState('');
  const { setUserId, setToken } = useContext(AuthContext) as IAuthContextProps;
  const [loginUser, { data, error }] = useMutation(LOGIN);
  const navigation = useNavigation<ListScreenProp>();

  const login = async (e: any): Promise<void> => {
    e.preventDefault();
    try {
      const logUser = await loginUser({
        variables: {
          email: email,
          hashedPassword: hashedPassword,
        },
      });
      setUserId(logUser?.data?.login?.userId);
      setToken(logUser?.data?.login?.token);
      navigation.navigate('List');
    } catch (err) {
      setValidation('⚠️ Email or password is incorrect, please try again.');
      console.error({ message: err });
    }
  };

  return (
    <View style={styles.container}>
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
        <Text>{validation}</Text>
      </View>
      <View>
        <TouchableOpacity onPress={(e) => login(e)} style={styles.connexion}>
          <Text style={styles.textButton}>Connexion</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Form style (CSS)
const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f4c5c',
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
    backgroundColor: '#e36414',
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
