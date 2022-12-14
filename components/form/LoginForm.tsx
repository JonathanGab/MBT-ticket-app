import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../hooks/mutations/useLogin';
import { AuthContext, IAuthContextProps } from '../../contexts/AuthContext';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Input, Icon, Stack, Pressable } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import BtnSubmit from '../utils/BtnSubmit';

interface IUser {
  email: string;
  hashedPassword: string;
}

type ListScreenProp = BottomTabNavigationProp<{ List: undefined }, 'List'>;

export default function LoginForm() {
  const [loginForm, setLoginForm] = useState<IUser>({
    email: '',
    hashedPassword: '',
  });
  const [validation, setValidation] = useState('');
  const { setUserId, setToken, setUsername } = useContext(
    AuthContext
  ) as IAuthContextProps;
  const [loginUser, { data, error }] = useMutation(LOGIN);
  const navigation = useNavigation<ListScreenProp>();
  const [show, setShow] = useState(false);

  const login = async (e: any): Promise<void> => {
    // remove default behavior
    e.preventDefault();
    try {
      const userData = await loginUser({
        variables: {
          email: 'test@mail.com',
          hashedPassword: 'azerty',
          //  email: loginForm.email,
          // hashedPassword: loginForm.hashedPassword,
        },
      });
      // store userId in context
      setUserId(userData?.data?.login?.userId);
      // store token in Session Storage
      setToken(userData?.data?.login?.token);
      setUsername(userData?.data?.login?.name);
    } catch (err) {
      // display error message in front-end
      setValidation('⚠️ Email or password is incorrect, please try again.');
      // display error message in console
      console.error({ message: err });
    }
  };

  return (
    <View style={styles.container}>
      <Input
        w={{
          base: '75%',
          md: '25%',
        }}
        marginY={5}
        backgroundColor="white"
        value={loginForm.email}
        onChangeText={(text) => setLoginForm({ ...loginForm, email: text })}
        placeholder="Email"
        //* -------------- ICON --------------
        InputRightElement={
          <Icon
            as={<MaterialIcons name="alternate-email" />}
            size={5}
            ml="2"
            color="muted.400"
            marginRight={1}
          />
        }
      />

      <Input
        w={{
          base: '75%',
          md: '25%',
        }}
        backgroundColor="white"
        type={show ? 'text' : 'password'}
        placeholder="Password"
        value={loginForm.hashedPassword}
        onChangeText={(text) =>
          setLoginForm({ ...loginForm, hashedPassword: text })
        }
        //* -------------- ICON --------------
        InputRightElement={
          <Pressable onPress={() => setShow(!show)}>
            <Icon
              as={
                <MaterialIcons name={show ? 'visibility' : 'visibility-off'} />
              }
              size={5}
              mr="2"
              color="muted.400"
            />
          </Pressable>
        }
      />
      <Text>{validation}</Text>

      <BtnSubmit
        isLoading={false}
        text="Connexion"
        backgroundColor="#E29578"
        width="295"
        height="35"
        onPress={(e) => login(e)}
      />
    </View>
  );
}

// Form style (CSS)
const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDF6F9',
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
