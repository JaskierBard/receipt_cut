import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";

interface Props {
  purchaseItems: any;
  total?: any;
}
export const ReceiptSum = ({ purchaseItems, total }: Props) => {
  const [totalValue, setTotalValue] = useState<number>(0);

  useEffect(() => {
    try {
      const sum = purchaseItems.reduce(
        (total: number, item: any) => total + item.price * (item.quantity || 0),
        0
      );
      setTotalValue(sum.toFixed(2));
    } catch (error) {
      console.log("błąd sumowania kwot na paragonie: " + error);
    }
  }, [purchaseItems]);

  return (
    <>
      {total ? (
        <>
          <Text
            style={[
              styles.total,
              {
                color: total === totalValue ? "green" : "red",
              },
            ]}
          >
            Suma: {total.toFixed(2)} PLN
          </Text>
          <Text style={styles.total}>
            ({(totalValue - total).toFixed(2)} PLN)
          </Text>
        </>
      ) : (
        <View style={styles.sum_container_small}>
          <Text style={styles.total_small}>({totalValue} PLN)</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  sum_container: {
    display: "flex",
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "black",
    backgroundColor: "red",
  },
  total: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
    padding: 5,
    marginTop: 10,
  },
  sum_container_small: {
    // display: "flex",
    // flexDirection: "row",
    // borderTopWidth: 1,
    // borderColor: "black",
    // backgroundColor: "red",
    // position: "relative",
  },
  total_small: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
 
  },
});
