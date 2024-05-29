import { View, Text, TextInput, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { categories } from "../../utils/data";
import { PurchaseItem } from "../../types/receipt";
import { receiptStyles } from "../../styles/receipt";

interface Props {
  index: number;
  item: PurchaseItem;
  handleQuantityChange: (index: number, value: string) => void;
  handlePriceChange: (index: number, value: string) => void;
  handleCategoryChange: (index: number, value: string) => void;
}
export const ReceiptItem = (props: Props) => {
  return (
    <View key={props.index} style={receiptStyles.purchase_item}>
      <Text style={receiptStyles.item_description}>{props.item.description}</Text>
      <View style={receiptStyles.details}>
       
        <View style={{flexDirection:'row'}}>
          <Text>Ilość: </Text>
          <TextInput
            style={receiptStyles.item_input}
            value={props.item.quantity === 0 ? "" : String(props.item.quantity)}
            keyboardType="numeric"
            onChangeText={(value) =>
              props.handleQuantityChange(props.index, value)
            }
          /><Text>{props.item.unit}</Text>
        </View>
        <View style={{flexDirection:'row'}}>
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
            style={receiptStyles.item_input}
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
        <View style={{flexDirection:'row'}}>
          <Text>Kategoria:</Text>
          <Picker
            selectedValue={props.item.category}
            style={{ height: 20, width: 150, backgroundColor:'grey' }}
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


