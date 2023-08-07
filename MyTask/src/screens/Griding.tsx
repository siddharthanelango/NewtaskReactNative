import React, { useEffect, useState, useCallback } from 'react';
import { View,Text, FlatList, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import GridImageItem from '../components/GridImageItem';
import { useTheme } from '@src/providers/ThemeProvider';

import {  Provider } from 'react-native-paper';
import Header from '@src/components/Header';

const PhotoGrid: React.FC = () => {

    const [photos, setPhotos] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true); 
    const [page, setPage] = useState<number>(1); 
    const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false); 
    const perPage = 10;

  
  const { theme } = useTheme();
 
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.unsplash.com/photos/?client_id=NJigkAfJKH2JZqLFkmUlcr0h7wrEe-nUm99si61RLhg&page=${page}&per_page=${perPage}`
      );
      const data = await response.json();
      const imageUrls = data.map((item: any) => item.urls.small);
      setPhotos((prevPhotos) => [...prevPhotos, ...imageUrls]);
      setPage(page + 1);
      setLoading(false);
      setIsFetchingMore(false);
    } catch (error) {
      console.error('Error fetching images:', error);
      setLoading(false);
      setIsFetchingMore(false);
    }
  };

  const handleLoadMore = useCallback(() => {

    if (!isFetchingMore) {
      setIsFetchingMore(true);
      fetchImages();
    }
  }, [isFetchingMore]);

  const renderFooter = () => {
    if (isFetchingMore) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator animating={true} />
        </View>
      );
    }
    return null;
  };

  return (
   <Provider>

    <View style={[styles.container,{backgroundColor:theme.colors.background}]}>
      {loading && <ActivityIndicator animating={true} />}
      <Header headerText =  'Grid Images Task' />
      <FlatList
        data={photos}
        renderItem={({ item }) => <GridImageItem imageUrl={item}  fullScreen ={false}/>}
        numColumns={3} 
        keyExtractor={(item, index) => index.toString()}
        removeClippedSubviews={true} // Optimize performance by rendering only visible items
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore} // Call handleLoadMore
        onEndReachedThreshold={0.1} 
      />
    </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  text:{
    fontSize:15,
    fontWeight:'600',
    alignSelf:'center',
}
});

export default PhotoGrid;
