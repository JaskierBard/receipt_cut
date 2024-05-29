import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";

import { saveParagon } from "../src/firebaseChatService";
import { ReceiptItem } from "./common/ReceiptItem";
import { ReceiptSum } from "./common/ReceiptSum";
import { buttonStyles } from "../styles/buttons";

interface Props {
  list: any;
}

export const ReceiptList = ({ list }: Props) => {
  const [purchaseItems, setPurchaseItems] = useState(
    list.receipt_details.purchase_items
  );
console.log(list.receipt_details.purchase_items)
  const handleQuantityChange = (index: number, newQuantity: string) => {
    const updatedItems = [...purchaseItems];
    updatedItems[index].quantity =
      newQuantity === "" ? 0 : parseInt(newQuantity);
    setPurchaseItems(updatedItems);
  };

  const handlePriceChange = (index: number, newPrice: string) => {
    const updatedItems = [...purchaseItems];
    updatedItems[index].price_after_discount = newPrice === "" ? 0 : parseFloat(newPrice);
    setPurchaseItems(updatedItems);
  };

  const handleCategoryChange = (index: number, category: string) => {
    const updatedCategories = [...purchaseItems];
    updatedCategories[index].category = category;
    setPurchaseItems(updatedCategories);
  };

  return (
    <View style={styles.shop_list}>
      <Text style={styles.seller_name}>
        {list.receipt_details.seller_details.name}
      </Text>
      <Text style={styles.seller_address}>
        {list.receipt_details.seller_details.address}
      </Text>
      <ScrollView style={styles.container}>
        {purchaseItems &&
          purchaseItems.map((item: any, index: number) => (
            <ReceiptItem
              index={index}
              item={item}
              handleQuantityChange={handleQuantityChange}
              handlePriceChange={handlePriceChange}
              handleCategoryChange={handleCategoryChange}
            />
          ))}
      </ScrollView>
      <ReceiptSum
        purchaseItems={purchaseItems}
        total={list.receipt_details.total}
        notify={false}
      />
      <View style={buttonStyles.container}>
        <TouchableOpacity
          onPress={() => {
            saveParagon("1", list, "recipes");
          }}
        >
          <Image source={require("../assets/images/save.png")} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require("../assets/images/separate.png")} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require("../assets/images/delete.png")} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shop_list: {
    width: "90%",
    margin: "5%",
    backgroundColor: "white",
    padding: 10,
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  purchase_item: {
    borderBottomWidth: 2,
    borderColor: "darkgrey",
    marginBottom: 10,
    paddingBottom: 10,
  },
  details: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  item_description: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  item_quantity_input: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
    padding: 5,
    width: 80,
    textAlign: "center",
  },
  item_price_input: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
    padding: 5,
    width: 80,
    textAlign: "center",
  },
  sum_container: {
    borderTopWidth: 1,
    borderColor: "black",
  },
  total: {
    fontSize: 20,
    textAlign: "center",
    padding: 5,
    marginTop: 10,
  },
  seller_name: {
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
    fontSize: 18,
  },
  seller_address: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 14,
    color: "grey",
    borderBottomWidth: 1,
    borderColor: "black",
  },
  container: {
    maxHeight: "65%",
  },
  
});

export default styles;
