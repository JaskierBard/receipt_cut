import { View, Text, TextInput, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { categories } from "../../utils/data";
import { PurchaseItem } from "../../types/receipt";

interface Props {
  index: number;
  item: PurchaseItem;
  handleQuantityChange: (index: number, value: string) => void;
  handlePriceChange: (index: number, value: string) => void;
  handleCategoryChange: (index: number, value: string) => void;
}
export const ReceiptItem = (props: Props) => {
  return (
    <View key={props.index} style={styles.purchase_item}>
      <Text style={styles.item_description}>{props.item.description}</Text>
      <View style={styles.details}>
       
        <View>
          <Text>Ilość: </Text>
          <TextInput
            style={styles.item_quantity_input}
            value={props.item.quantity === 0 ? "" : String(props.item.quantity)}
            keyboardType="numeric"
            onChangeText={(value) =>
              props.handleQuantityChange(props.index, value)
            }
          />
        </View>
        <View>
          <Text>Cena: </Text>
          {props.item.discount_value > 0 && (
          <View>
            <Text>
              {props.item.price_before_discount}PLN
            </Text>
            <Text>
              -{props.item.discount_value} PLN
            </Text>
          </View>
        )}
          <TextInput
            style={styles.item_price_input}
            value={
              props.item.discount_value === 0
                ? String(props.item.price_before_discount)
                : String(props.item.price_after_discount)
            }
            keyboardType="numeric"
            onChangeText={(value) =>
              props.handlePriceChange(props.index, value)
            }
          />
        </View>
        <View>
          <Text>Kategoria:</Text>
          <Picker
            selectedValue={props.item.category}
            style={{ height: 50, width: 200 }}
            onValueChange={(itemValue: any) =>
              props.handleCategoryChange(props.index, itemValue)
            }
          >
            {categories.map((category: string, index: number) => (
              <Picker.Item key={index} label={category} value={category} />
            ))}
          </Picker>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});
