import React, { createContext, useState, useContext, ReactNode } from 'react';
import { MD3Theme } from 'react-native-paper';
import { useColorScheme, StatusBar, View } from 'react-native';
import lightTheme from '@theme/lightTheme'; // Import your light theme
import darkTheme from '@theme/darkTheme'; // Import your dark theme
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

interface CustomColors {
  accent: string;
  white: string;
  textColor: string;
  // Add more custom colors here
}

type ExtendedMD3Colors = MD3Theme['colors'] & CustomColors;
interface ThemeContextType {
  theme: MD3Theme & { colors: ExtendedMD3Colors };
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const isDarkMode = useColorScheme() === 'dark';

  const theme = isDarkTheme || isDarkMode ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const contextValue: ThemeContextType = {
    theme: theme as MD3Theme & { colors: ExtendedMD3Colors },
    toggleTheme,
  };

  const CustomStatusBar: React.FC<{ backgroundColor: string }> = ({
    backgroundColor,
  }) => {
    const insets = useSafeAreaInsets();

    return (
      <View style={{ height: insets.top, backgroundColor }}>
        <StatusBar
          animated={true}
          backgroundColor={backgroundColor}
          barStyle={
            isDarkTheme || isDarkMode ? 'light-content' : 'dark-content'
          }
          translucent={false}
        />
      </View>
    );
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <SafeAreaProvider style={{ flex: 1 }}>
        <CustomStatusBar backgroundColor={theme.colors.background} />

        {children}
      </SafeAreaProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return themeContext;
};
