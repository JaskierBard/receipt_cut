import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { ReceiptDetails, ParagonsData } from "./Receipts";

interface SeparateProps {
  paragonsData: ParagonsData;
  handleSeparate: () => void;
}

const Separate: React.FC<SeparateProps> = ({
  paragonsData,
  handleSeparate,
}) => {
  const [firstList, setFirstList] = useState<ReceiptDetails[]>(
    Object.values(paragonsData).flat()
  );
  const [secondList, setSecondList] = useState<ReceiptDetails[]>([]);

  const onDropFirstToSecond = (item: ReceiptDetails) => {
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

  const onDropSecondToFirst = (item: ReceiptDetails) => {
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
    item: ReceiptDetails,
    dropFunction: (item: ReceiptDetails) => void
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
      <Text>Price: {item.price}</Text>
      <Text>Quantity: {item.quantity}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 20,
          marginVertical: 10,
          color: "white",
        }}
      >
        Wszystkie zakupy
      </Text>
      <FlatList
        data={firstList}
        renderItem={({ item }) => renderItem(item, onDropFirstToSecond)}
        keyExtractor={(item, index) => index.toString()}
        style={{ height: "50%" }}
      />
      <Text
        style={{
          textAlign: "center",
          fontSize: 20,
          marginVertical: 10,
          color: "white",
          borderWidth: 1,
          borderTopColor: "gold",
        }}
      >
        Moje zakupy
      </Text>
      <FlatList
        data={secondList}
        renderItem={({ item }) => renderItem(item, onDropSecondToFirst)}
        keyExtractor={(item, index) => index.toString()}
        style={{ height: "50%" }}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => handleSeparate()}
        >
          <Text style={styles.backButtonText}>Wróć do listy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  backButton: {
    padding: 5,
    backgroundColor: "rgba(238, 245, 39, 0.6)",
    borderRadius: 5,
    alignItems: "center",
    margin: 10,
  },
  backButtonText: { color: "#fff", fontSize: 16 },
});
export default Separate;
