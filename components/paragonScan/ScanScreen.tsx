import React, { useState } from "react";
import { View, ImageBackground, Image } from "react-native";
import { buttonStyles } from "../../styles/buttons";
import { OpenAiChat } from "../../src/chatAI";
import { ReceiptList } from "../ReceiptList";
import { systemPrompt, prompt } from "../../utils/data";
import ProcessingLoader from "../common/ProcessingLoader";
import { mainStyles } from "../../styles/main";
import { receiptStyles } from "../../styles/receipt";
import { takePicture } from "../../utils/takePicture";
import { base64Photo } from "../../types/base64photo";
import { SimpleButton } from "../common/SimpleButton";
import { imageStyles } from "../../styles/image";

const ScanScreen = () => {
  const [image, setImage] = useState<base64Photo>();
  const [list, setList] = useState<any>(null);
  const [processing, setProcessing] = useState<boolean>(false);

  const handlePicture = async () => {
    const result = await takePicture(0.4);
    result && setImage(result);
  };

  const handleDelete = () => {
    setList(null);
  };
  const convert = async () => {
    setProcessing(true);
    const aiChat = new OpenAiChat(systemPrompt);
    const ans = await aiChat.say(prompt, image?.base64Picture);
    setProcessing(false);
    setList(ans);
  };

  return (
    <ImageBackground
      source={require("../../assets/background.jpeg")}
      style={mainStyles.background}
    >
      <View style={mainStyles.container}>
        {list ? (
          <ReceiptList list={list} handleDelete={handleDelete} />
        ) : (
          <View >
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
                    <SimpleButton
                      text={"Konwertuj paragon"}
                      buttonAction={convert}
                    />
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
            <SimpleButton text={"Zrób zdjęcie"} buttonAction={handlePicture} />
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

export default ScanScreen;
