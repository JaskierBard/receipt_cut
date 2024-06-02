import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { base64Photo } from "../types/base64photo";


export const takePicture = async (quality: number): Promise<base64Photo | void> => {
  let result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [3, 6],
    quality: quality,
    base64: true,
  });

  if (!result.canceled && result.assets) {
    const uri = result.assets[0].uri;
    const format = uri.split(".").pop();
    const info = await FileSystem.getInfoAsync(uri);
    const sizeInMB = info.exists ? info.size / (1024 * 1024) : 0;
    return {
      base64Picture: result.assets[0].base64!,
      size: sizeInMB,
      format: format!,
    };
  } else {
    console.error("błąd podczas robienia zdjęcia!");
  }
};
