import React from 'react';
import { View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { ButtonOutline } from './ButtonOutline';
import { Button } from './Button';

type Props = {
  photo: string | null;
  onTakePhoto: () => void;
  onChooseGallery: () => void;
};

export default function PhotoPicker({ photo, onTakePhoto, onChooseGallery }: Props) {
  return (
    <View>
      <View className="items-center my-6">
        {photo ? (
          <Image source={{ uri: photo }} style={{ width: 120, height: 120, borderRadius: 60 }} />
        ) : (
          <View
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              borderWidth: 1,
              borderColor: '#ccc',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text>Foto</Text>
          </View>
        )}
      </View>

      <View className="flex flex-col gap-4">
        <Button text="Ambil Foto dari Kamera" margin="0" onPress={onTakePhoto} />
        <ButtonOutline
          text="Pilih dari Galeri"
          icon={<Icon name="image" size={18} color="#00BFA6" />}
          onPress={onChooseGallery}
        />
      </View>
    </View>
  );
}
