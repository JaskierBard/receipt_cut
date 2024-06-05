import { View, Text, TextInput, StyleSheet } from "react-native";
import { categories } from "../../utils/data";
import { DiscountType, PurchaseItem } from "../../types/receipt";
import { receiptStyles } from "../../styles/receipt";
import ModalSelector from "react-native-modal-selector";
import { useEffect, useState } from "react";
import { dynamicStyles } from "../../styles/shop";

interface Props {
  index: number;
  item: PurchaseItem;
  handleQuantityChange: (index: number, value: string) => void;
  handlePriceChange: (
    index: number,
    value: string,
    discountType: DiscountType
  ) => void;
  handleCategoryChange: (index: number, value: string) => void;
}
export const ReceiptItem = (props: Props) => {
  const [correct, setCorrect] = useState<boolean>(false);
  const shopDynamicStyles = dynamicStyles('dealz');

  useEffect(() => {
    const result1 = (props.item.quantity * props.item.unit_price).toFixed(2);
    const result2 = (
      props.item.price_before_discount - props.item.discount_value
    ).toFixed(2);

    if (
      props.item.price_before_discount - Number(result1) === 0 &&
      props.item.discount_value === 0
    ) {
      // setCorrect(true);
    } else if (props.item.price_after_discount === Number(result2) && props.item.price_after_discount> props.item.price_before_discount) {
      // setCorrect(true);
    } else false;
  }, []);

  return (
    <View key={props.index} style={shopDynamicStyles.purchase_item}>
      <Text style={receiptStyles.name}>{props.item.item_name}</Text>
      <View style={receiptStyles.details}>
        <View style={{ flexDirection: "row" }}>
          <ModalSelector
            data={categories.map((category: string, index: number) => ({
              key: index,
              label: category,
            }))}
            initValue={props.item.category}
            onChange={(option: any) =>
              props.handleCategoryChange(props.index, option.label)
            }
            style={{
              height: 20,
              width: 90,
              padding: 0,
              margin: 0,
              justifyContent: "center",
            }}
            initValueTextStyle={{ color: "black", fontSize: 15 }}
            selectTextStyle={{ color: "black", fontSize: 15 }}
          >
            <Text style={receiptStyles.text}>
              {props.item.category}
            </Text>
          </ModalSelector>
        </View>
        <View style={{ flexDirection: "row" }}>
          {!correct ? (
            <TextInput
              style={receiptStyles.item_input}
              value={
                props.item.quantity === 0 ? "" : String(props.item.quantity)
              }
              keyboardType="numeric"
              onChangeText={(value) =>
                props.handleQuantityChange(props.index, value)
              }
            />
          ) : (
            <Text style={receiptStyles.text}>{props.item.quantity}</Text>
          )}
          <View style={{display:'flex', flexDirection: 'row'}}>
          <Text style={receiptStyles.text}>{props.item.unit} </Text>
          <Text style={receiptStyles.text}>
            { props.item.unit_price +" zł/szt" }
          </Text>
          </View>
          
        </View>

        <View style={receiptStyles.price}>
          
          {props.item.discount_value > 0 && (
            <View>
              <Text style={receiptStyles.text}>
                {props.item.price_before_discount}PLN
              </Text>
              <Text style={receiptStyles.text}>
                -{props.item.discount_value} PLN
              </Text>
            </View>
          )}
          {!correct ? (
            <TextInput
              style={receiptStyles.item_input}
              value={
                props.item.discount_value == 0
                  ? String(props.item.price_before_discount)
                  : String(props.item.price_after_discount)
              }
              keyboardType="numeric"
              onChangeText={(value) =>
                props.handlePriceChange(
                  props.index,
                  value,
                  props.item.discount_value == 0
                    ? "price_before_discount"
                    : "price_after_discount"
                )
              }
            />
          ) : (
            <Text>
              {props.item.discount_value == 0
                ? String(props.item.price_before_discount)
                : String(props.item.price_after_discount)}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};
