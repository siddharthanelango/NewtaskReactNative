import React, { useState } from 'react';
import { View, Text, StyleSheet ,useColorScheme} from 'react-native';

import { ToggleButton } from 'react-native-paper';
import { useTheme } from '@src/providers/ThemeProvider';

interface HeaderProps {
  headerText: string;
}

const Header: React.FC<HeaderProps> = ({  headerText }) => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = useColorScheme() === 'dark'? true:false;
  const [value, setValue] = useState<string>('left');

  return (
    <View style={{ height: 50, backgroundColor: theme.colors.background, flexDirection: 'row', justifyContent: 'space-between' }}>
    <Text style={styles.text}>{headerText}</Text>
     {!isDarkMode && 
       <ToggleButton.Row onValueChange={value =>{ setValue(value);toggleTheme()}} value={value} style={{marginRight:10}}>
       <ToggleButton icon="sun-compass" value="left" />
       <ToggleButton icon="moon-full" value="right" />
     </ToggleButton.Row>
    }
    </View>
  );
};

const styles = StyleSheet.create({
text:{ 
    fontSize: 15,
    alignSelf: 'center',
    fontWeight:'700',
    marginLeft:10
   }
});

export default Header;
