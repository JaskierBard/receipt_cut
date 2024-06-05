import React, { useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { saveParagon } from "../../src/firebaseChatService";
import { ReceiptItem } from "../common/ReceiptItem";
import { ReceiptSum } from "../common/ReceiptSum";
import { buttonStyles } from "../../styles/buttons";
import { receiptStyles } from "../../styles/receipt";
import {
  DiscountType,
  PurchaseItem,
  ReceiptDetails,
} from "../../types/receipt";
import { dynamicStyles } from "../../styles/shop";

interface Props {
  list: ReceiptDetails;
  handleDelete: () => void;
}

export const ReceiptList = ({ list, handleDelete }: Props) => {
  const [purchaseItems, setPurchaseItems] = useState<PurchaseItem[]>(
    list.purchase_items
  );

  const shopDynamicStyles = dynamicStyles('dealz');

  const [finished, setFinished] = useState<boolean>(false);
  const finishEdit = () => {
    setFinished(true);
  };
  const handleQuantityChange = (index: number, newQuantity: string) => {
    const updatedItems = [...purchaseItems];
    updatedItems[index].quantity =
      newQuantity === "" ? 0 : parseInt(newQuantity);
    setPurchaseItems(updatedItems);
  };

  const handlePriceChange = (
    index: number,
    newPrice: string,
    discountType: DiscountType
  ) => {
    const updatedItems = [...purchaseItems];
    updatedItems[index][discountType] =
      newPrice === "" ? 0 : parseFloat(newPrice);
    setPurchaseItems(updatedItems);
  };

  const handleCategoryChange = (index: number, category: string) => {
    const updatedCategories = [...purchaseItems];
    updatedCategories[index].category = category;
    setPurchaseItems(updatedCategories);
  };

  return (
    <View style={shopDynamicStyles.shop_list}>
      <View style={receiptStyles.logo}>
        <Image
          style={{ width: "100%", maxWidth: "100%", maxHeight: "100%" }}
          source={require("../../assets/logos/dealz.png")}
          resizeMode="contain"
        />
      </View>
      {/* <Text style={receiptStyles.seller_name}>{list.seller_details.name}</Text> */}
      {/* <Text style={receiptStyles.seller_address}>
        {list.seller_details.address}
      </Text> */}
      <View style={shopDynamicStyles.receipt}>
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
      </View>

      <ReceiptSum
        purchaseItems={purchaseItems}
        total={list.total}
        notify={false}
        finishEdit={finishEdit}
      />
      <View style={buttonStyles.container}>
        {finished && (
          <>
            <TouchableOpacity
              onPress={() => {
                saveParagon("1", list, "recipes");
              }}
            >
              <Image source={require("../../assets/images/save.png")} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require("../../assets/images/separate.png")} />
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity
          onPress={() => {
            handleDelete();
          }}
        >
          <Image source={require("../../assets/images/delete.png")} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
