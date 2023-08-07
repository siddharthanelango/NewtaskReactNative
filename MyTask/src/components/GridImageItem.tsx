import { useTheme } from '@src/providers/ThemeProvider';
import React, { useCallback } from 'react';
import { View, StyleSheet, Dimensions ,TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

interface GridImageItemProps {
  imageUrl: string;
  fullScreen:boolean
}

const GridImageItem: React.FC<GridImageItemProps> = ({ imageUrl,fullScreen }) => {
    const imageWidth = fullScreen ? Dimensions.get('window').width  - 10 :   Dimensions.get('window').width / 3 - 10;
    const { theme, toggleTheme } = useTheme();
  return (
    <TouchableOpacity onPress={()=>console.log(imageUrl)}>
    <FastImage
      source={{ uri: imageUrl }}
      style={{ ...styles.image, width: imageWidth ,borderColor:theme.colors.textColor}}
      resizeMode={FastImage.resizeMode.cover}
    />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    image: {
        height: 150,
        margin: 5,
        borderWidth:1,
        borderRadius:5
      },
});

export default GridImageItem;
