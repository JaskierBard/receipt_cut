import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  Button,
} from "react-native";
import { saveParagon } from "../src/firebaseChatService";

interface Props {
  list: any;
}

export const ReceiptList = ({ list }: Props) => {
  const [purchaseItems, setPurchaseItems] = useState(
    list.receipt_details.purchase_items
  );

  const totalValue = purchaseItems.reduce(
    (total: number, item: any) => total + item.price,
    0
  );

  const handleQuantityChange = (index: number, newQuantity: number) => {
    const updatedItems = [...purchaseItems];
    updatedItems[index].quantity = newQuantity;
    setPurchaseItems(updatedItems);
  };

  const handlePriceChange = (index: number, newPrice: number) => {
    const updatedItems = [...purchaseItems];
    updatedItems[index].price = newPrice;
    setPurchaseItems(updatedItems);
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
                  value={String(item.quantity)}
                  keyboardType="numeric"
                  onChangeText={(value) =>
                    handleQuantityChange(index, parseInt(value))
                  }
                />
              </View>
              <View style={styles.item_price}>
                <Text>Cena: </Text>
                <TextInput
                  style={styles.item_price_input}
                  value={String(item.price)}
                  keyboardType="numeric"
                  onChangeText={(value) =>
                    handlePriceChange(index, parseFloat(value))
                  }
                />
              </View>
              <View style={styles.item_quantity}>
                <Text>Kategoria:</Text>
                <Text>{item.category}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <Text style={styles.total}>{list.receipt_details.total} PLN</Text>
      <Text
        style={[
          styles.total,
          {
            color: list.receipt_details.total === totalValue ? "green" : "red",
          },
        ]}
      >
        {totalValue.toFixed(2)} PLN
      </Text>
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
    width: "100%",
    height: "80%",
    backgroundColor: "rgba(255,255,255,0.4)",
    color: "white",
    borderWidth: 1,
    borderColor: "#000000",
    // borderRadius: 5,
    display: "flex",
    // fontFamily: 'Verdana',
  },
  purchase_item: {
    borderWidth: 1,
    margin: 2,
    padding: 10,
    borderRadius: 5,
    // backgroundColor: '#517b9e54',
  },
  details: {
    marginTop: 10,
    flexDirection: "row",
  },
  item_description: {
    fontWeight: "bold",
  },
  item_quantity: {
    // fontFamily: 'Courier New',
  },
  item_quantity_input: {
    backgroundColor: "transparent",
    borderWidth: 0,
    fontSize: 20,
    width: 80,
  },
  item_price: {
    marginTop: 0,
    fontWeight: "bold",
  },
  item_price_input: {
    backgroundColor: "transparent",
    borderWidth: 0,
    fontSize: 20,
    width: 80,
  },
  total: {
    // position: 'absolute',
    // bottom: 12,
    fontSize: 30,
    textAlign: "center",
    padding: 2,
  },
  seller_name: {
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
  },
  seller_address: {
    textAlign: "center",
    marginBottom: 10,
  },
  container: {
    height: 720,
    overflow: "scroll",
    // backgroundColor: 'linear-gradient(to right bottom, rgb(131, 130, 129), rgb(76, 79, 126))',
  },
  input_no_spinner: {
    margin: 0,
  },
});

export default styles;
