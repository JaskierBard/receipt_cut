import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";

interface Props {
  purchaseItems: any;
  total: any;

}
export const ReceiptSum = ({ purchaseItems, total }: Props) => {
  const [totalValue, setTotalValue] = useState<number>(0);

  useEffect(() => {
    const sum = purchaseItems.reduce(
      (total: number, item: any) => total + item.price * (item.quantity || 0),
      0
    );
    setTotalValue(sum);
  }, [purchaseItems]);

  return (
    <View style={styles.sum_container}>
      <Text style={styles.total}>
        Różnica: (
        {(totalValue - total).toFixed(2)} PLN)
      </Text>
      <Text
        style={[
          styles.total,
          {
            color:
            total === totalValue
                ? "green"
                : "red",
          },
        ]}
      >
        Suma: {total.toFixed(2)} PLN
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
});
