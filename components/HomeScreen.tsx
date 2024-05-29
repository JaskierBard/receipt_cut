import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { buttonStyles } from "../styles/buttons";
import * as ImagePicker from "expo-image-picker";
import { OpenAiChat } from "../src/chatAI";
import { ReceiptList } from "./ReceiptList";
import * as FileSystem from "expo-file-system";
import { systemPrompt, prompt } from "../utils/data";
import ProcessingLoader from "./common/ProcessingLoader";
import { mainStyles } from "../styles/main";
import { receiptStyles } from "../styles/receipt";

const HomeScreen = () => {
  const [image, setImage] = useState<any>(null);
  const [list, setList] = useState<any>(null);
  const [processing, setProcessing] = useState<boolean>(false);

  const [imageInfo, setImageInfo] = useState<{
    size: number;
    format: string;
  } | null>(null);

  const takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 6],
      quality: 1,
      base64: true,
    });

    if (!result.canceled && result.assets) {
      setImage(result.assets[0].base64);

      const uri = result.assets[0].uri;
      const format = uri.split(".").pop();
      const info = await FileSystem.getInfoAsync(uri);
      if (info.exists) {
        const sizeInMB = info.size / (1024 * 1024);
        setImageInfo({ size: sizeInMB, format: format || "unknown" });
        console.log({ size: sizeInMB, format: format });
      }
    }
  };

  const convert = async () => {
    setProcessing(true);
    const aiChat = new OpenAiChat(systemPrompt);
    const ans = await aiChat.say(prompt, image);
    setProcessing(false);
    setList(ans);
  };

  return (
    <ImageBackground
      source={require("../assets/background.jpeg")}
      style={mainStyles.background}
    >
      <View style={mainStyles.container}>
        {list ? (
          <>
            <ReceiptList list={list} />
          </>
        ) : (
          <View style={receiptStyles.container}>
            {!processing ? (
              <View>
                {image && (
                  <>
                    <Image
                      source={{ uri: `data:image/jpeg;base64,${image}` }}
                      style={{ width: "100%", height: "80%" }}
                    />
                    <TouchableOpacity
                      style={buttonStyles.touchable}
                      onPress={convert}
                    >
                      <Text style={mainStyles.text}>Konwertuj paragon</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            ) : (
              <ProcessingLoader />
            )}
          </View>
        )}
        {list == null && (
          <View style={buttonStyles.container}>
            <TouchableOpacity
              style={buttonStyles.touchable}
              onPress={takePicture}
            >
              <Text style={buttonStyles.text}>
                {image ? "Zrób inne zdjęcie" : "Zrób zdjęcie"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={buttonStyles.touchable}
              onPress={takePicture}
            >
              <Text style={buttonStyles.text}>Dodaj krótkie zakupy</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: "70%",
  },
  
});

export default HomeScreen;
