import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { mainStyles } from "../styles/main";
import { buttonStyles } from "../styles/buttons";
import { ReceiptSum } from "./common/ReceiptSum";
import { saveParagon } from "../src/firebaseChatService";
import { sumPrices } from "../utils/sumPrices";
import Loader from "./common/Loader";
import { PurchaseItem } from "../types/receipt";

const ShortReceipt = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [sellerDetails, setSellerDetails] = useState({ name: "", address: "" });
  const [purchaseItems, setPurchaseItems] = useState<PurchaseItem[]>([
    { description: "", price_after_discount: 0, discount_value:0, price_before_discount:0, unit: "", quantity: 1, category: "" },
  ]);
  const handleSellerChange = (key: string, value: string) => {
    setSellerDetails({ ...sellerDetails, [key]: value });
  };

  const handleItemChange = (index: number, key: string, value: string) => {
    console.log(key)
    const newItems = [...purchaseItems];
    if ( key === "price_before_discount"  || key === "quantity") {
      newItems[index] = { ...newItems[index], [key]: Number(value) };
      console.log(newItems)
    } else {
      newItems[index] = { ...newItems[index], [key]: (value) };
    }
    setPurchaseItems(newItems);
  };

  const addItem = () => {
    setPurchaseItems([
      ...purchaseItems,
      { description: "", price_after_discount: 0, discount_value:0, price_before_discount:0, unit: "", quantity: 1, category: "" },
    ]);
  };

  const removeItem = () => {
    if (purchaseItems.length > 1) {
      setPurchaseItems(purchaseItems.slice(0, -1));
    }
  };

  const handleSave = async () => {
    sumPrices(purchaseItems)
    setLoader(true);
    const ans = await saveParagon(
      "1",
      {
        receipt_details: {
          purchase_items: purchaseItems,
          seller_details: sellerDetails,
          total: sumPrices(purchaseItems),
        },
      },
      "recipes"
    );

    if (ans) {
      setPurchaseItems([
        { description: "", price_after_discount: 0, discount_value:0, price_before_discount:0, unit: "", quantity: 1, category: "" },
      ]);
      setSellerDetails({ name: "", address: "" });
      setLoader(false);
    } else {
      setLoader(false);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/background.jpeg")}
      style={mainStyles.background}
    >
      {loader ? (
        <View style={mainStyles.container}>
          <Loader text={"Zapisywanie w bazie danych"} />
        </View>
      ) : (
        <View style={mainStyles.container}>
          <TextInput
            style={styles.inputBig}
            placeholder="Nazwa sklepu"
            value={sellerDetails.name}
            onChangeText={(text) => handleSellerChange("name", text)}
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.inputBig}
            placeholder="Adres"
            value={sellerDetails.address}
            onChangeText={(text) => handleSellerChange("address", text)}
            placeholderTextColor="#888"
          />
          <ScrollView style={styles.container}>
            {purchaseItems.map((item, index) => (
              <View key={index} style={styles.itemContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Produkt"
                  value={item.description}
                  onChangeText={(text) =>
                    handleItemChange(index, "description", text)
                  }
                  placeholderTextColor="#888"
                />
                <View key={index} style={styles.input_container}>
                  <TextInput
                    style={styles.input_small}
                    placeholder="Cena"
                    value={ String(item.price_before_discount)}
                    onChangeText={(text) =>
                      handleItemChange(index, (item.discount_value === 0 ? 'price_before_discount': 'price_after_discount'), text)
                    }
                    keyboardType="numeric"
                    placeholderTextColor="#888"
                  />
                  <TextInput
                    style={styles.input_small}
                    placeholder="Ilość"
                    value={item.quantity === 0 ? "" : String(item.quantity)}
                    onChangeText={(text) =>
                      handleItemChange(index, "quantity", text)
                    }
                    keyboardType="numeric"
                    placeholderTextColor="#888"
                  />
                </View>
              </View>
            ))}
            <View style={buttonStyles.container}>
              <TouchableOpacity
                style={buttonStyles.touchable}
                onPress={addItem}
              >
                <Text style={buttonStyles.text}>Dodaj produkt</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={buttonStyles.touchable_warning}
                onPress={removeItem}
              >
                <Text style={buttonStyles.text}>Usuń produkt</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <ReceiptSum purchaseItems={purchaseItems} notify={false} type="short"/>
          <TouchableOpacity
            style={buttonStyles.touchable}
            onPress={() => {
              handleSave();
            }}
          >
            <Text style={buttonStyles.text}>Zapisz paragon</Text>
          </TouchableOpacity>
        </View>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxHeight: "70%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginVertical: 10,
  },
  inputBig: {
    width: "80%",
    backgroundColor: "black",
    borderWidth: 1,
    borderColor: "gold",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    color: "white",
  },
  input: {
    width: "80%",
    backgroundColor: "black",
    borderWidth: 1,
    borderColor: "gold",
    borderRadius: 5,
    padding: 5,
    marginVertical: 3,
    color: "white",
  },
  input_small: {
    width: "50%",
    backgroundColor: "black",
    borderWidth: 1,
    borderColor: "gold",
    borderRadius: 5,
    padding: 5,
    marginVertical: 3,
    color: "white",
  },
  itemContainer: {
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  input_container: {
    width: "80%",
    display: "flex",
    flexDirection: "row",
  },
});

export default ShortReceipt;
