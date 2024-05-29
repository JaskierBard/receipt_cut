import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { ReceiptSum } from "./common/ReceiptSum";
import { buttonStyles } from "../styles/buttons";
import { PurchaseItem } from "../types/receipt";

interface SeparateProps {
  paragonsData: PurchaseItem[];
  handleSeparate: () => void;
}

const Separate: React.FC<SeparateProps> = ({
  paragonsData,
  handleSeparate,
}) => {
  const [firstList, setFirstList] = useState<PurchaseItem[]>(
    Object.values(paragonsData).flat()
  );
  const [secondList, setSecondList] = useState<PurchaseItem[]>([]);

  const onDropFirstToSecond = (item: PurchaseItem) => {
    const newFirstList = firstList
      .map((listItem) => {
        if (listItem === item) {
          return { ...listItem, quantity: listItem.quantity - 1 };
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
      setSecondList(newSecondList);
    } else {
      setSecondList([...secondList, { ...item, quantity: 1 }]);
    }

    setFirstList(newFirstList);
  };

  const onDropSecondToFirst = (item: PurchaseItem) => {
    const newSecondList = secondList
      .map((listItem) => {
        if (listItem === item) {
          return { ...listItem, quantity: listItem.quantity - 1 };
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
      setFirstList(newFirstList);
    } else {
      setFirstList([...firstList, { ...item, quantity: 1 }]);
    }

    setSecondList(newSecondList);
  };

  const renderItem = (
    item: PurchaseItem,
    dropFunction: (item: PurchaseItem) => void
  ) => (
    <TouchableOpacity
      onPress={() => dropFunction(item)}
      style={{
        padding: 2,
        marginVertical: 1,
        backgroundColor: "lightgray",
        borderRadius: 5,
      }}
    >
      <Text>{item.description}</Text>
      <Text>Cena: {
              item.discount_value === 0
                ? String(item.price_before_discount)
                : String(item.price_after_discount)
            }</Text>
      <Text>Ilość: {item.quantity}</Text>
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
        <TouchableOpacity
          style={buttonStyles.touchable}
          onPress={() => handleSeparate()}
        >
          <Text style={buttonStyles.text}>Wróć do listy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={buttonStyles.touchable}
          onPress={() => handleSeparate()}
        >
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
