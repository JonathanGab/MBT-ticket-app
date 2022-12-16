import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';

export default function TimeCounter({
  counter,
  setCounter,
}: {
  counter: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
}) {
  const removeCounter = () => {
    counter <= 0 ? setCounter(0) : setCounter(counter - 1);
  };

  const addCounter = () => {
    setCounter(counter + 1);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => removeCounter()} style={styles.btn}>
        <Text style={styles.text}>-</Text>
      </Pressable>
      <Text>{counter}h</Text>
      <Pressable onPress={() => addCounter()} style={styles.btn}>
        <Text style={styles.text}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 220,
    paddingHorizontal: 10,
  },
  btn: {
    backgroundColor: '#E29578',
    width: 50,
    height: 35,
    borderRadius: 5,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    color: 'white',
  },
});
