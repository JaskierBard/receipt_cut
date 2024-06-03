import React, { useState, useEffect } from "react";
import { View, ImageBackground, Image, Text } from "react-native";
import { buttonStyles } from "../../styles/buttons";
import { OpenAiChat } from "../../src/chatAI";
import { ReceiptList } from "./ReceiptList";
import { systemPrompt, prompt } from "../../utils/data";
import ProcessingLoader from "../common/ProcessingLoader";
import { mainStyles } from "../../styles/main";
import { takePicture } from "../../utils/takePicture";
import { base64Photo } from "../../types/base64Photo";
import { SimpleButton } from "../common/SimpleButton";
import { imageStyles } from "../../styles/image";
import { ReceiptDetails } from "../../types/receipt";

const ScanScreen = () => {
  const [image, setImage] = useState<base64Photo>();
  const [list, setList] = useState<{ receipt_details: ReceiptDetails } | null>(
    null
  );
  const [processing, setProcessing] = useState<boolean>(false);
  const [processingTime, setProcessingTime] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const handlePicture = async () => {
    const result = await takePicture(0.5);
    result && setImage(result);
  };

  const handleDelete = () => {
    setList(null);
  };

  const convert = async () => {
    setProcessing(true);
    const startTime = Date.now();
    const id = setInterval(() => {
      setProcessingTime(Math.round((Date.now() - startTime) / 1000));
    }, 1000);
    setIntervalId(id);

    const aiChat = new OpenAiChat(systemPrompt);
    const ans = await aiChat.say(prompt, image?.base64Picture);
    clearInterval(id);
    setProcessing(false);
    console.log(ans?.receipt_details);
    console.log('kupione produkty:' + ans?.receipt_details.purchase_items);
    setList(ans);
  };

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <ImageBackground
      source={require("../../assets/background.jpeg")}
      style={mainStyles.background}
    >
      <View style={mainStyles.container}>
        {list ? (
          <>
            <Text style={{ color: "white" }}>
              Czas przetwarzania: {processingTime} sekund
            </Text>
            <ReceiptList
              list={list.receipt_details}
              handleDelete={handleDelete}
            />
          </>
        ) : (
          <View>
            {!processing ? (
              <View>
                {image && (
                  <>
                    <Image
                      source={{
                        uri: `data:image/jpeg;base64,${image.base64Picture}`,
                      }}
                      style={imageStyles.regular}
                    />
                    <Text style={{ color: "white" }}>
                      Rozmiar zdjęcia: {image.size} MB
                    </Text>
                    <Text style={{ color: "white" }}>
                      Rozmiar zdjęcia: {image.width}px X {image.height}px
                    </Text>

                    <SimpleButton
                      text={"Konwertuj paragon"}
                      buttonAction={convert}
                    />
                  </>
                )}
              </View>
            ) : (
              <ProcessingLoader processingTime={processingTime} />
            )}
          </View>
        )}
        {list == null && (
          <View style={buttonStyles.container}>
            <SimpleButton text={"Zrób zdjęcie"} buttonAction={handlePicture} />
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

export default ScanScreen;
