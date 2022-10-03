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

interface IUser {
  email: string;
  hashedPassword: string;
}

export default function LoginForm() {
  const [email, setEmail] = useState<string>('');
  const [hashedPassword, setHashedPassword] = useState<string>('');
  const [validation, setValidation] = useState('');
  const { setIsLogged } = useContext(LoginContext) as ILoginContext;

  const [loginUser, { data, error }] = useMutation(LOGIN);

  const login = async (e: any): Promise<void> => {
    e.preventDefault();
    try {
      await loginUser({
        variables: {
          email: email,
          hashedPassword: hashedPassword,
        },
      });
      setIsLogged(true);
    } catch (err) {
      setValidation('⚠️ Email or password is incorrect, please try again.');
      console.error({ message: err });
      // setIsLogged(false);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          placeholder="Email..."
          style={styles.input}
          // eslint-disable-next-line no-shadow
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View>
        <TextInput
          secureTextEntry
          placeholder="Password..."
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
    backgroundColor: '#c5d5e4',
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
    backgroundColor: 'orange',
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
