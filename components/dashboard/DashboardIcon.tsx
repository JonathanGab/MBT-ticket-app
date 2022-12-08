import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import DividerComponent from '../utils/inputs/Divider';

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
  return (
    <View
      style={{
        backgroundColor: color,
        height: 100,
        width: 98,
        borderRadius: 10,
        marginHorizontal: 10,
      }}
    >
      <View style={styles.iconContainer}>
        <View>
          <View style={styles.contentContainer}>
            <View style={styles.iconBorder}>{icon}</View>
            <View>
              <Text style={styles.textAlign}>{number}</Text>
              <Text style={styles.textAlign}>{text}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    padding: 3,
  },
  iconBorder: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: 60,
    borderRadius: 10,
  },
  contentContainer: {
    fontSize: 10,
    maxWidth: '100%',
    maxHeight: '100%',
  },
  textAlign: {
    textAlign: 'center',
  },
});
