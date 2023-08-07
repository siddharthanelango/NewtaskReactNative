
import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Button,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { ThemeProvider } from './providers/ThemeProvider';
import PhotoGrid from './screens/Griding';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,

  };
  return (
        <ThemeProvider>
          <SafeAreaView style={{...backgroundStyle,flex:1}}>
            <View
              style={{
                flex:1,
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
              }}
            >
      
            <PhotoGrid/>
            </View>
          </SafeAreaView>
        </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  butStyle: {
    width: 50,
    height: 40,
  },
});

export default App;
