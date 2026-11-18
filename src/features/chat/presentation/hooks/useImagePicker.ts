import * as ImagePicker from "expo-image-picker";
import { Alert, Linking } from "react-native";

export type PickedImage = { uri: string; mimeType?: string };

const OPTIONS: ImagePicker.ImagePickerOptions = {
  mediaTypes: ["images"],
  quality: 0.7, // comprime para subir más rápido (bucket limitado a 5 MB)
  allowsEditing: false,
};

function askSettings(what: string) {
  Alert.alert(
    "Permiso necesario",
    `Activa el acceso a ${what} en los ajustes para enviar fotos.`,
    [
      { text: "Cancelar", style: "cancel" },
      { text: "Abrir ajustes", onPress: () => Linking.openSettings() },
    ],
  );
}

const toPicked = (r: ImagePicker.ImagePickerResult): PickedImage | null =>
  r.canceled || !r.assets?.[0]
    ? null
    : { uri: r.assets[0].uri, mimeType: r.assets[0].mimeType ?? "image/jpeg" };

export function useImagePicker() {
  const takePhoto = async (): Promise<PickedImage | null> => {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      askSettings("la cámara");
      return null;
    }
    return toPicked(await ImagePicker.launchCameraAsync(OPTIONS));
  };

  const pickFromGallery = async (): Promise<PickedImage | null> => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      askSettings("tus fotos");
      return null;
    }
    return toPicked(await ImagePicker.launchImageLibraryAsync(OPTIONS));
  };

  return { takePhoto, pickFromGallery };
}
