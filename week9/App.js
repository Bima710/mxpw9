import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

export default function App() {
  const [uri, setUri] = useState("");

  const openImagePicker = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setUri(result.assets[0].uri);
      } else {
        console.log('Image picker was cancelled or URI is undefined');
      }
    } catch (error) {
      console.error('Error opening image picker:', error);
    }
  };

  const handleCameraLaunch = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setUri(result.assets[0].uri);
      } else {
        console.log('Camera was cancelled or URI is undefined');
      }
    } catch (error) {
      console.error('Error launching camera:', error);
    }
  };

  const saveImage = async (uri) => {
    if (!uri) {
      console.error('Error: URI is undefined');
      return;
    }

    try {
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('Pictures', asset, false);
      console.log('Image saved to Pictures folder');
      return asset.uri;
    } catch (error) {
      console.error('Error saving image:', error);
      return uri;
    }
  };

  const handleSaveImage = async () => {
    if (uri) {
      const newUri = await saveImage(uri);
      setUri(newUri);
    } else {
      console.log('No image to save');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Moch.Bima - 00000045997</Text>
      <Button title="PICK AN IMAGES FROM GALLERY" onPress={openImagePicker} />
      <Button title="TAKE A PHOTO" onPress={handleCameraLaunch} />
      {uri ? <Image source={{ uri }} style={styles.image} /> : null}
      {uri ? <Button title="SAVE PHOTO" onPress={handleSaveImage} /> : null}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});
