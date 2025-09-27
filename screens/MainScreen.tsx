import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Authentification } from '../components/Authentification';
import { MemoList } from '../components/MemoList';

// the role of this screen is to show authentification, followed by the memo list - main part of the app
// potentially this file can be used to track auth that survives between sessions
export const MainScreen = () => {
  const [isAuthed, setIsAuthed] = useState(false);

  return (
    <View style={styles.container}>
      {!isAuthed && <Authentification onAuth={() => setIsAuthed(true)} />}
      {isAuthed && <MemoList />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'azure',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
