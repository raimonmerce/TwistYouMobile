import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { useTranslation } from 'react-i18next';

interface CameraCaptureProps {
  captureMode: 'user' | 'environment';
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ captureMode }) => {
  const { t } = useTranslation();
  const [image, setImage] = useState<string | null>(null);

  const handleCapture = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(t('permissions.denied', 'Permission to access camera was denied'));
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      cameraType: captureMode === 'user' ? ImagePicker.CameraType.front : ImagePicker.CameraType.back,
      quality: 1,
      base64: false,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      setImage(result.assets[0].uri);
    }
  };

  const handleDownload = async () => {
    if (image) {
      const permission = await MediaLibrary.requestPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(t('permissions.denied', 'Permission to save image was denied'));
        return;
      }

      await MediaLibrary.saveToLibraryAsync(image);
      Alert.alert(t('game.camera.saved', 'Image saved to gallery'));
    }
  };

  return (
    <View style={styles.container}>
      {image ? (
        <View>
          <Image source={{ uri: image }} style={styles.image} />
          <Button title={t('game.camera.download', 'Download')} onPress={handleDownload} />
        </View>
      ) : (
        <Button title={t(`game.camera.${captureMode}`, 'Take Photo')} onPress={handleCapture} />
      )}
    </View>
  );
};

export default CameraCapture;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    alignItems: 'center',
  },
  image: {
    marginTop: 16,
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});
