import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_CURRENT_USER_PASSWORD } from '../../hooks/mutations/UseUpdateCurrentUserPassword';
import { LoginContext, ILoginContext } from '../../contexts/LoginContext';
import Ionicons from '@expo/vector-icons/Ionicons';

interface IProfileProps {
  imageUrl: string;
  name: string | undefined;
  email: string | undefined;
  hashedPassword: string | undefined;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setHashedPassword: React.Dispatch<React.SetStateAction<string>>;
  autobiography: string;
}

export default function ProfileCard(props: IProfileProps) {
  const [editPwd, setEditPwd] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { valueAsyncStorage } = useContext(LoginContext) as ILoginContext;

  const [updateCurrentUserPassword, { data, error }] = useMutation(
    UPDATE_CURRENT_USER_PASSWORD
  );

  const updatePassword = async (e: any): Promise<void> => {
    e.preventDefault();
    try {
      await updateCurrentUserPassword({
        variables: {
          updateCurrentUserPasswordId: valueAsyncStorage.userId,
          currentPassword,
          newPassword,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.image_container}>
          <Image
            source={{ uri: 'https://picsum.photos/1000/1000?random' }}
            style={styles.image}
          />
          <View style={styles.avatar_box}>
            <Image source={{ uri: props.imageUrl }} style={styles.avatar} />
            <Text style={styles.autobiography}>{props.autobiography}</Text>
          </View>
        </View>
        <View style={styles.bottom}>
          <View style={styles.input_container}>
            <View>
              <Text>Your name</Text>
              <TextInput
                style={styles.input}
                defaultValue={props.name}
                placeholder="Name"
                onChangeText={(text) => props.setName(text)}
              />
            </View>
            <View style={styles.margin_input}>
              <Text>Your email</Text>
              <TextInput
                style={styles.input}
                defaultValue={props.email}
                placeholder="Email"
                onChangeText={(text) => props.setEmail(text)}
              />
            </View>
            <TouchableOpacity style={styles.saveButton}>
              <Text style={styles.saveTextButton}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.editPasswordButton}
              onPress={() => setEditPwd(!editPwd)}
            >
              <Text style={styles.text}>Edit your password</Text>
            </TouchableOpacity>
            {editPwd && (
              <View style={styles.editPwd}>
                <Text>Your current password</Text>
                <TextInput
                  secureTextEntry
                  placeholder="**********"
                  style={styles.input}
                  value={currentPassword}
                  onChangeText={(text) => setCurrentPassword(text)}
                />
                <View style={styles.margin_input}>
                  <Text>Your new password</Text>
                  <TextInput
                    secureTextEntry
                    style={styles.input}
                    placeholder="**********"
                    value={newPassword}
                    onChangeText={(text) => setNewPassword(text)}
                  />
                </View>
                <View>
                  <TouchableOpacity
                    style={styles.savePwdButton}
                    onPress={(e) => updatePassword(e)}
                  >
                    <Text style={styles.saveTextButton}>Change password</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  box: {
    height: '100%',
  },
  image_container: {
    position: 'relative',
    maxHeight: 250,
    width: '100%',
  },
  image: {
    height: '100%',
  },
  avatar_box: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    zIndex: 3,
    width: '40%',
    height: '65%',
    borderRadius: 90,
  },
  autobiography: {
    position: 'absolute',
    color: 'white',
    bottom: '10%',
    textAlign: 'center',
    width: '100%',
  },
  bottom: {
    backgroundColor: '#f6f6f6',
    height: '65%',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  input_container: {
    marginTop: '10%',
    width: '95%',
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  margin_input: {
    marginVertical: 30,
  },
  editPasswordButton: {
    flexDirection: 'row',
    marginTop: 30,
    height: 20,
    width: '100%',
    alignItems: 'center',
  },
  text: {
    height: '100%',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  editPwd: {
    marginTop: 30,
  },
  saveButton: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#E29578',
  },
  savePwdButton: {
    width: '100%',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#E29578',
  },
  saveTextButton: {
    textAlign: 'center',
  },
});
