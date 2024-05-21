import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView, TextInput, Button } from "react-native";
import { Picker } from '@react-native-picker/picker';

import { saveParagon } from "../src/firebaseChatService";

interface Props {
  list: any;
}

const categories = ['ubrania', 'akcesoria', 'słodycze', 'żywność', 'elektronika', 'książki', 'kosmetyki', 'meble', 'narzędzia', 'biżuteria'];

export const ReceiptList = ({ list }: Props) => {
  const [purchaseItems, setPurchaseItems] = useState(list.receipt_details.purchase_items);
  const [selectedCategories, setSelectedCategories] = useState(Array(purchaseItems.length).fill(''));

  const totalValue = purchaseItems.reduce((total: number, item: any) => total + item.price * (item.quantity || 0), 0);

  const handleQuantityChange = (index: number, newQuantity: string) => {
    const updatedItems = [...purchaseItems];
    updatedItems[index].quantity = newQuantity === "" ? 0 : parseInt(newQuantity);
    setPurchaseItems(updatedItems);
  };

  const handlePriceChange = (index: number, newPrice: string) => {
    const updatedItems = [...purchaseItems];
    updatedItems[index].price = newPrice === "" ? 0 : parseFloat(newPrice);
    setPurchaseItems(updatedItems);
  };

  const handleCategoryChange = (index: number, category: string) => {
    const updatedCategories = [...selectedCategories];
    updatedCategories[index] = category;
    setSelectedCategories(updatedCategories);
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
        {purchaseItems.map((item: any, index: any) => (
          <View key={index} style={styles.purchase_item}>
            <Text style={styles.item_description}>{item.description}</Text>
            <View style={styles.details}>
              <View>
                <Text>Ilość: </Text>
                <TextInput
                  style={styles.item_quantity_input}
                  value={item.quantity === 0 ? "" : String(item.quantity)}
                  keyboardType="numeric"
                  onChangeText={(value) => handleQuantityChange(index, value)}
                />
              </View>
              <View>
                <Text>Cena: </Text>
                <TextInput
                  style={styles.item_price_input}
                  value={item.price === 0 ? "" : String(item.price)}
                  keyboardType="numeric"
                  onChangeText={(value) => handlePriceChange(index, value)}
                />
              </View>
              <View>
                <Text>Kategoria:</Text>
                <Picker
                  selectedValue={selectedCategories[index]}
                  style={{ height: 50, width: 200 }}
                  onValueChange={(itemValue:any) => handleCategoryChange(index, itemValue)}
                >
                  {categories.map((category, index) => (
                    <Picker.Item key={index} label={category} value={category} />
                  ))}
                </Picker>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.sum_container}>
        <Text style={styles.total}>
          Różnica: ({(totalValue - list.receipt_details.total).toFixed(2)} PLN)
        </Text>
        <Text
          style={[
            styles.total,
            {
              color: list.receipt_details.total === totalValue ? "green" : "red",
            },
          ]}
        >
          Suma: {totalValue.toFixed(2)} PLN
        </Text>
      </View>
      <Button
        title="Zapisz"
        onPress={() => {
          saveParagon("1", list);
        }}
      />
      <Button title="Podziel" onPress={() => {}} />
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
    borderBottomWidth: 1,
    borderColor: "#ddd",
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
    color: 'grey',
    borderBottomWidth: 1,
    borderColor: "black",
  },
  container: {
    maxHeight: "50%",
  },
});

export default styles;
