import React, { useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import Animated, { SlideOutLeft } from 'react-native-reanimated';

type TAuthentification = {
  onAuth: () => void;
};

// this component shows the request to auth. If user presses the button we ask expo-local-authentication to authenticate
// if all is good then we send that we are done back to MainScreen
export const Authentification = ({ onAuth }: TAuthentification) => {
  const [triedAndFailed, setTriedAndFailed] = useState(false);

  const authenticate = useCallback(async () => {
    try {
      // I could use hasHardwareAsync() to check if biometrics are available
      // or isEnrolledAsync() to check if any biometrics data is saved
      // but we call here in any way so it's not needed.
      const result = await LocalAuthentication.authenticateAsync();
      if (result?.success) {
        onAuth();
      } else {
        // if something goes wrong we can only ask the user to try again.
        setTriedAndFailed(true);
      }
    } catch (e) {
      setTriedAndFailed(true);
    }
  }, [onAuth]);

  return (
    <Animated.View
      exiting={SlideOutLeft.duration(300)}
      style={styles.container}
    >
      <Text style={styles.logo}>MEMO</Text>
      {!triedAndFailed ? (
        <Text style={styles.desc}>
          To start working with MEMO, you have to authenticate yourself
        </Text>
      ) : (
        <Text style={[styles.desc, { color: 'red' }]}>
          It seems something didn&apos;t work. Could you try again?
        </Text>
      )}
      <TouchableOpacity onPress={authenticate} style={styles.authButton}>
        <Text style={styles.authButtonText}>authenticate</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    marginHorizontal: 30,
  },
  logo: {
    fontWeight: '200',
    fontSize: 50,
    textTransform: 'uppercase',
  },
  desc: {
    fontWeight: '200',
    fontSize: 15,
    textTransform: 'uppercase',
    marginTop: 10,
    marginBottom: 40,
  },
  authButton: {
    backgroundColor: 'seagreen',
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
    width: 200,
    borderRadius: 10,
  },
  authButtonText: {
    color: 'white',
    fontWeight: '200',
    fontSize: 20,
    textTransform: 'uppercase',
  },
});
