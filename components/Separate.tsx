import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { ReceiptSum } from "./common/ReceiptSum";
import { buttonStyles } from "../styles/buttons";
import { PurchaseItem } from "../types/receipt";

interface SeparateProps {
  paragonsData: PurchaseItem[];
  handleSeparate: () => void;
}

const Separate: React.FC<SeparateProps> = ({ paragonsData, handleSeparate }) => {
  const [firstList, setFirstList] = useState<PurchaseItem[]>(
    Object.values(paragonsData)
      .flat()
      .filter(item => item && item.description && item.price_before_discount)
  );
  const [secondList, setSecondList] = useState<PurchaseItem[]>([]);

  const formatPrice = (price: number) => price.toFixed(2);

  const calculateUnitPrice = (item: PurchaseItem) => {
    const totalPrice = item.discount_value === 0 ? item.price_before_discount : item.price_after_discount;
    return item.quantity === Math.floor(item.quantity) 
      ? totalPrice / item.quantity 
      : totalPrice;
  };

  const calculatePriceForWeight = (item: PurchaseItem) => {
    return item.price_before_discount / item.quantity;
  };

  const onDropFirstToSecond = (item: PurchaseItem) => {
    const unitPrice = calculateUnitPrice(item);

    const newFirstList = firstList
      .map((listItem) => {
        if (listItem === item) {
          return { ...listItem, quantity: listItem.quantity - 1, price_before_discount: listItem.price_before_discount - unitPrice, price_after_discount: listItem.price_after_discount - unitPrice };
        }
        return listItem;
      })
      .filter((listItem) => listItem.quantity > 0);

    const existingItemIndex = secondList.findIndex(
      (existingItem) => existingItem.description === item.description
    );

    if (existingItemIndex !== -1) {
      const newSecondList = [...secondList];
      newSecondList[existingItemIndex].quantity += 1;
      newSecondList[existingItemIndex].price_before_discount += unitPrice;
      newSecondList[existingItemIndex].price_after_discount += unitPrice;
      setSecondList(newSecondList);
    } else {
      setSecondList([...secondList, { ...item, quantity: 1, price_before_discount: unitPrice, price_after_discount: unitPrice }]);
    }

    setFirstList(newFirstList);
  };

  const onDropSecondToFirst = (item: PurchaseItem) => {
    const unitPrice = calculateUnitPrice(item);

    const newSecondList = secondList
      .map((listItem) => {
        if (listItem === item) {
          return { ...listItem, quantity: listItem.quantity - 1, price_before_discount: listItem.price_before_discount - unitPrice, price_after_discount: listItem.price_after_discount - unitPrice };
        }
        return listItem;
      })
      .filter((listItem) => listItem.quantity > 0);

    const existingItemIndex = firstList.findIndex(
      (existingItem) => existingItem.description === item.description
    );

    if (existingItemIndex !== -1) {
      const newFirstList = [...firstList];
      newFirstList[existingItemIndex].quantity += 1;
      newFirstList[existingItemIndex].price_before_discount += unitPrice;
      newFirstList[existingItemIndex].price_after_discount += unitPrice;
      setFirstList(newFirstList);
    } else {
      setFirstList([...firstList, { ...item, quantity: 1, price_before_discount: unitPrice, price_after_discount: unitPrice }]);
    }

    setSecondList(newSecondList);
  };

  const renderItem = (item: PurchaseItem, dropFunction: (item: PurchaseItem) => void) => (
    <TouchableOpacity
      onPress={() => dropFunction(item)}
      style={{ padding: 2, marginVertical: 1, backgroundColor: "lightgray", borderRadius: 5 }}
    >
      <Text>{item.description}</Text>
      {item.quantity === Math.floor(item.quantity) ? (
        <Text>Cena za sztukę: {formatPrice(calculateUnitPrice(item))}</Text>
      ) : (
        <Text>Cena za 1 kg: {formatPrice(calculatePriceForWeight(item))}</Text>
      )}
      <Text>Ilość: {item.quantity}</Text>
      <Text>Łączna cena: {item.discount_value === 0 ? formatPrice(item.price_before_discount) : formatPrice(item.price_after_discount)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.basket}>
        <Text style={styles.basketName}>Moje zakupy </Text>
        <ReceiptSum purchaseItems={firstList} notify={false}/>
      </View>

      <FlatList
        data={firstList}
        renderItem={({ item }) => renderItem(item, onDropFirstToSecond)}
        keyExtractor={(item, index) => index.toString()}
        style={{ height: "50%" }}
      />
      <View style={styles.basket}>
        <Text style={styles.basketName}>Zakupy dłużnika </Text>
        <ReceiptSum purchaseItems={secondList} notify={true}/>
      </View>

      <FlatList
        data={secondList}
        renderItem={({ item }) => renderItem(item, onDropSecondToFirst)}
        keyExtractor={(item, index) => index.toString()}
        style={{ height: "50%" }}
      />
      <View style={buttonStyles.container}>
        <TouchableOpacity style={buttonStyles.touchable} onPress={() => handleSeparate()}>
          <Text style={buttonStyles.text}>Wróć do listy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={buttonStyles.touchable} onPress={() => handleSeparate()}>
          <Text style={buttonStyles.text}>Podziel zakupy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  basket: {
    display: "flex",
    flexDirection: "row",
    padding: 5,
    justifyContent: "center",
  },
  basketName: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
  },
});

export default Separate;
