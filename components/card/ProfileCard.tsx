import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

interface IProfileProps {
  imageUrl: string;
  name: string;
  email: string;
  hashedPassword: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setHashedPassword: React.Dispatch<React.SetStateAction<string>>;
  autobiography: string;
}

export default function ProfileCard(props: IProfileProps) {
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
              <Text>Name</Text>
              <TextInput
                style={styles.input}
                defaultValue={props.name}
                placeholder="Name"
                onChangeText={(text) => props.setName(text)}
              />
            </View>
            <View style={styles.margin_input}>
              <Text>Email</Text>
              <TextInput
                style={styles.input}
                defaultValue={props.email}
                placeholder="Email"
                onChangeText={(text) => props.setEmail(text)}
              />
            </View>
            <View>
              <Text>Password</Text>
              <TextInput
                secureTextEntry
                style={styles.input}
                defaultValue={props.hashedPassword}
                onChangeText={(text) => props.setHashedPassword(text)}
              />
            </View>
            <TouchableOpacity style={styles.saveButton}>
              <Text style={styles.saveTextButton}>Save</Text>
            </TouchableOpacity>
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
    height: '35%',
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
    height: '53%',
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
  saveButton: {
    marginTop: '50%',
    width: '100%',
    padding: 15,

    borderRadius: 10,
    backgroundColor: '#f9a03f',
  },
  saveTextButton: {
    textAlign: 'center',
  },
});
