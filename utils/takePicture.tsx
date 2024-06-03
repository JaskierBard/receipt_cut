import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { base64Photo } from "../types/base64Photo";
import * as ImageManipulator from "expo-image-manipulator";


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
    const manipResult = await ImageManipulator.manipulateAsync(uri, []);

    const sizeInMB = info.exists ? Number((info.size / (1024 * 1024)).toFixed(2)) : 0;
    return {
      base64Picture: result.assets[0].base64!,
      size: sizeInMB,
      format: format!,
      width: manipResult.width,
      height: manipResult.height
    };
  } else {
    console.error("błąd podczas robienia zdjęcia!");
  }
};
