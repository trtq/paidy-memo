import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MainScreen } from './screens/MainScreen';

// App.tsx is used for various wrappers, like this SafeArea here.
export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar style="dark" />
      <MainScreen />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
