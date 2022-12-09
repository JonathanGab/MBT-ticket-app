import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

type CardType = {
  icon: JSX.Element;
  text: string;
  number: number;
  color?: string;
};
export default function DashboardIcon({
  icon,
  text,
  color,
  number = 10,
}: CardType) {
  const styles = StyleSheet.create({
    icon: {
      backgroundColor: color,
      height: 110,
      width: 105,
      borderRadius: 10,
      marginHorizontal: 10,
    },
    iconContainer: {
      paddingHorizontal: 10,
    },
    iconBorder: {
      alignItems: 'flex-start',
      justifyContent: 'center',
      height: 50,
      borderRadius: 10,
    },
    iconContentContainer: {
      fontSize: 10,
      maxWidth: '100%',
      maxHeight: '100%',
    },
    iconContent: {
      height: 50,
      justifyContent: 'center',
    },
    textAlign: {
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.icon}>
      <View style={styles.iconContainer}>
        <View style={styles.iconContentContainer}>
          <View style={styles.iconBorder}>{icon}</View>
          <View style={styles.iconContent}>
            <Text style={styles.textAlign}>{number}</Text>
            <Text style={styles.textAlign}>{text}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
