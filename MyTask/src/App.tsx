/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

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

// import { Button } from 'react-native-paper';

import { Colors, Header } from 'react-native/Libraries/NewAppScreen';
import { ThemeProvider, useTheme } from './providers/ThemeProvider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({ children, title }: SectionProps): JSX.Element {
  const { theme, toggleTheme } = useTheme();
  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <View style={{flexDirection: 'row',justifyContent:'center',alignItems:'center'}}>
           <Icon name="account" color={Colors.primary} size={24} />
           <Text style={{ color: theme.colors.textColor }}>Hello, World!</Text>
      </View>

      <Button onPress={toggleTheme} title={'Sign'} />
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
        <ThemeProvider>
          <SafeAreaView style={backgroundStyle}>
            <View
              style={{
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
              }}
            >
              <Section title="Toggle theme" />
   
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
