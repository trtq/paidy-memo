import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type TTopBumper = {
  onButton: () => void;
};

// Very simple components that has styles for the header of the list.
export const Header = ({ onButton }: TTopBumper) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.topBumper,
        { paddingTop: insets.top || 10, height: 60 + (insets.top || 10) },
      ]}
    >
      <Text style={styles.appName}>PAIDY MEMO</Text>
      <TouchableOpacity style={styles.addMemoCircle} onPress={onButton}>
        <Text style={styles.addMemoInside}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  topBumper: {
    width: '100%',
    height: 60,
    borderColor: '#0b0a0f',
    alignItems: 'center',
    paddingHorizontal: 30,
    flexDirection: 'row',
    backgroundColor: 'mintcream',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    zIndex: 10,
  },
  appName: {
    color: '#0b0a0f',
    flex: 1,
    fontSize: 20,
    fontWeight: '200',
    textTransform: 'uppercase',
  },
  addMemoCircle: {
    width: 25,
    height: 25,
    borderWidth: 2,
    borderColor: '#0b0a0f',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addMemoInside: {
    color: '#0b0a0f',
    fontSize: 20,
    lineHeight: 20,
    fontWeight: '500',
  },
});
