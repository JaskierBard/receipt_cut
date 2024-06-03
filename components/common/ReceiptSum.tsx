import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { sendMessage } from "../../utils/sendMessage";
import { PurchaseItem } from "../../types/receipt";

interface Props {
  purchaseItems: PurchaseItem[];
  total?: any;
  notify: boolean;
  type?: string;
  finishEdit: () => void;
}
export const ReceiptSum = ({
  purchaseItems,
  total,
  notify,
  type,
  finishEdit,
}: Props) => {
  const [totalValue, setTotalValue] = useState<number>(0);

  useEffect(() => {
    try {
      const sum = purchaseItems.reduce((total: number, item: any) => {
        const itemPrice = item.discount_value
          ? item.price_after_discount
          : item.price_before_discount;
        // if (type === "short") {
          return total + itemPrice * item.quantity;
        // }
        return total + itemPrice;
      }, 0);
      setTotalValue(parseFloat(sum.toFixed(2)));
    } catch (error) {
      console.log("błąd sumowania kwot na paragonie: " + error);
    }
  }, [purchaseItems]);

  useEffect(() => {
    if (total === totalValue) {
      finishEdit();
    }
  }, [totalValue]);

  return (
    <>
      {total ? (
        <View style={{backgroundColor: 'lightgray',width: '100%',flexDirection:'row', display: 'flex'}}>
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
          {total !== totalValue && (
            <Text style={styles.total}>
              ({(totalValue - total).toFixed(2)} PLN)
            </Text>
          )}
        </View>
      ) : (
        <View style={styles.sum_container_small}>
          <Text style={styles.total_small}>({totalValue} PLN)</Text>
          {notify && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() =>
                sendMessage(
                  `Kwota do zwrotu za zakupy: ${String(totalValue)} PLN`
                )
              }
            >
              <Text style={styles.backButtonText}>Powiadom</Text>
            </TouchableOpacity>
          )}
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
    color: "black",
    padding: 5,
    marginTop: 10,
  },
  sum_container_small: {
    display: "flex",
    flexDirection: "row",
    // borderTopWidth: 1,
    // borderColor: "black",
    // backgroundColor: "red",
    // position: "relative",
  },
  backButton: {
    padding: 5,
    backgroundColor: "rgba(238, 245, 39, 0.6)",
    borderRadius: 5,
    alignItems: "center",
    margin: 10,
  },
  backButtonText: { color: "#fff", fontSize: 16 },
  total_small: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
  },
});
