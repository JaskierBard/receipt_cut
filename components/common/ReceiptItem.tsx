import { View, Text, TextInput, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { categories } from "../../utils/data";
import { PurchaseItem } from "../../types/receipt";
import { receiptStyles } from "../../styles/receipt";
import ModalSelector from "react-native-modal-selector";

interface Props {
  index: number;
  item: PurchaseItem;
  handleQuantityChange: (index: number, value: string) => void;
  handlePriceChange: (index: number, value: string, discountType:string) => void;
  handleCategoryChange: (index: number, value: string) => void;
}
export const ReceiptItem = (props: Props) => {
  return (
    <View key={props.index} style={receiptStyles.purchase_item}>
      <Text style={receiptStyles.item_description}>{props.item.description}</Text>
      <View style={receiptStyles.details}>
      <View style={{flexDirection:'row'}}>
      <ModalSelector
            data={categories.map((category: string, index: number) => ({ key: index, label: category }))}
            initValue={props.item.category}
            onChange={(option: any) => props.handleCategoryChange(props.index, option.label)}
            style={{ height: 20, width: 90, padding: 0, margin: 0, justifyContent: 'center'}}
            initValueTextStyle={{ color: 'black', fontSize: 15 }}
            selectTextStyle={{ color: 'black', fontSize: 15 }}
          >
            <Text style={{ color: 'black', padding: 0, fontSize: 15 }}>
              {props.item.category}
            </Text>
          </ModalSelector>
        </View>
        <View style={{flexDirection:'row'}}>
          <TextInput
            style={receiptStyles.item_input}
            value={props.item.quantity === 0 ? "" : String(props.item.quantity)}
            keyboardType="numeric"
            onChangeText={(value) =>
              props.handleQuantityChange(props.index, value)
            }
          /><Text>{props.item.unit}</Text>
        </View>
        
        <View style={receiptStyles.price}>
          {props.item.discount_value > 0 && (
          <View >
            <Text style={{textAlign: 'center'}}>
              {props.item.price_before_discount}PLN
            </Text>
            <Text style={{textAlign: 'center'}}>
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
              props.handlePriceChange(props.index, value, (props.item.discount_value == 0 ? 'price_before_discount': 'price_after_discount'))
            }
          />
        </View>
        
      </View>
    </View>
  );
};


