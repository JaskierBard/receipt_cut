import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";

import { saveParagon } from "../src/firebaseChatService";
import { ReceiptItem } from "./common/ReceiptItem";
import { ReceiptSum } from "./common/ReceiptSum";
import { buttonStyles } from "../styles/buttons";
import { receiptStyles } from "../styles/receipt";

interface Props {
  list: any;
  handleDelete: ()=> void;
}

export const ReceiptList = ({ list,  handleDelete}: Props) => {
  const [purchaseItems, setPurchaseItems] = useState(
    list.receipt_details.purchase_items
  );
// console.log(list.receipt_details.purchase_items)
  const handleQuantityChange = (index: number, newQuantity: string) => {
    const updatedItems = [...purchaseItems];
    updatedItems[index].quantity =
      newQuantity === "" ? 0 : parseInt(newQuantity);
    setPurchaseItems(updatedItems);
  };

  const handlePriceChange = (index: number, newPrice: string, discountType:string) => {
    console.log(index, newPrice)
    const updatedItems = [...purchaseItems];
    updatedItems[index][discountType] = newPrice === "" ? 0 : parseFloat(newPrice);
    setPurchaseItems(updatedItems);
  };

  const handleCategoryChange = (index: number, category: string) => {
    const updatedCategories = [...purchaseItems];
    updatedCategories[index].category = category;
    setPurchaseItems(updatedCategories);
  };

  return (
    <View style={receiptStyles.shop_list}>
      <Text style={receiptStyles.seller_name}>
        {list.receipt_details.seller_details.name}
      </Text>
      <Text style={receiptStyles.seller_address}>
        {list.receipt_details.seller_details.address}
      </Text>
      <ScrollView style={receiptStyles.container}>
        {purchaseItems &&
          purchaseItems.map((item: any, index: number) => (
            <View key={index}>
            <ReceiptItem
              index={index}
              item={item}
              handleQuantityChange={handleQuantityChange}
              handlePriceChange={handlePriceChange}
              handleCategoryChange={handleCategoryChange}
            />
            </View>
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
        <TouchableOpacity  onPress={() => {
            handleDelete()
          }}>
          <Image source={require("../assets/images/delete.png")} />
        </TouchableOpacity>
      </View>
    </View>
  );
};


