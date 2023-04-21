import { useNavigation } from '@react-navigation/native';
import { useEffect, useLayoutEffect } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import HeaderRight from '../components/HeaderRight';
import * as MediaLibrary from 'expo-media-library';

const ImagePickerScreen = () => {
  const navigation = useNavigation();
  const [status, requestPermission] = MediaLibrary.usePermissions();

  const getPhotos = async () => {
    const options = {
      first: 30,
      sortBy: [MediaLibrary.SortBy.creationTime],
    };
    const res = await MediaLibrary.getAssetsAsync(options);
    console.log(res.assets);
    console.log(res.endCursor, res.hasNextPage, res.totalCount);
  };

  useEffect(() => {
    if (status?.granted) {
      getPhotos();
    }
  }, [status?.granted]);

  useLayoutEffect(() => {
    navigation.setOptions({
      HeaderRight: () => <HeaderRight onPress={() => {}} />,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Image Picker</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ImagePickerScreen;
