import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Settings,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { OpenAiChat } from "../src/chatAI";
import { ReceiptList } from "./ReceiptList";
import * as FileSystem from "expo-file-system";
import Loader from "./common/Loader";
import { categories, categoriesPrompt } from "../utils/data";
import ProcessingLoader from "./common/ProcessingLoader";
import ParagonList from "./Receipts";
import TabNavigator from "./Navigation";

const HomeScreen = () => {
  const [image, setImage] = useState<any>(null);
  const [list, setList] = useState<any>(null);
  const [processing, setProcessing] = useState<boolean>(false);

  const [imageInfo, setImageInfo] = useState<{
    size: number;
    format: string;
  } | null>(null);

  const szablon = `
  "receipt_details": {
    "seller_details": {
      "name": "",
      "address": "",
    },
    "purchase_items": [ {
      "description": "item_name1",
      "price": 0.00,
      "price": 0.00,

      "quantity": ?,
      "category": ?,
    },
    {
      "description": "item_name2",
      "price": ?,
      "quantity": ?,
      "category": ?,
    },
  ],
    "total": 0.00,
  }
`;

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
    const aiChat = new OpenAiChat(
      "Weryfikujesz paragony i wypisujesz wszystkie pozycjie"
    );
    const prompt =
      "opisz wedle szablonu kategorią ma być jedna z:" +
      categoriesPrompt +
      "Pamiętaj że liczba elementów w purchase_items ma być równa elementom na paragonie" +
      szablon +
      "Jeśli podana jest waga produktu a nie jedo ilość to wpisz 1. zawsze zwracaj wynik w formacie JSON";
    const ans = await aiChat.say(prompt, image);
    setProcessing(false);
    setList(ans);
    console.log(ans);
  };

  return (
    <ImageBackground
      source={require("../assets/background.jpeg")}
      style={styles.background}
    >
      <View style={styles.container}>
        {list ? (
          <>
            <ReceiptList list={list} />
          </>
        ) : (
          <View style={styles.receipt_container}>
            {!processing ? (
              <View>
                {image && (
                  <>
                    <Image
                      source={{ uri: `data:image/jpeg;base64,${image}` }}
                      style={{ width: "100%", height: "80%" }}
                    />
                    <TouchableOpacity style={styles.button} onPress={convert}>
                      <Text style={styles.buttonText}>Konwertuj paragon</Text>
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
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.buttonText}>
              {image ? "Zrób inne zdjęcie" : "Zrób zdjęcie"}
            </Text>
          </TouchableOpacity>
        )}

      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  button: {
    backgroundColor: "green",
    borderWidth: 1,
    borderColor: "gold",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "gold",
    fontSize: 16,
  },
  container: {
    marginTop: "10%",
    height: "90%",
    width: "90%",
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "gold",
  },
  text: {
    color: "white",
  },
  image: {
    width: 200,
    height: "70%",
  },
  receipt_container: {
    width: "100%",
    height: "80%",
    display: "flex",
  },
});

export default HomeScreen;
