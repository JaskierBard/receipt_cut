import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getParagons } from "../src/firebaseChatService";
import Separate from "./Separate";
import { mainStyles } from "../styles/main";
import { buttonStyles } from "../styles/buttons";
import { receiptStyles } from "../styles/receipt";
import { PurchaseItem, ReceiptDetails } from "../types/receipt";
import { ReceiptList } from "./paragonScan/ReceiptList";

// export interface ParagonsData {
//   [date: string]: ReceiptDetails[];
// }

export const ListOfReceipts = () => {
  const [paragons, setParagons] = useState<ReceiptDetails | any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [separate, setSeparate] = useState<boolean>(false);
  const [selectedParagon, setSelectedParagon] = useState<ReceiptDetails | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const fetchParagons = async (date: string) => {
    try {
      setLoading(true);
      const data = await getParagons();
      setParagons(data?.[date]);
    } catch (error) {
      console.error("Błąd podczas pobierania paragonów: ", error);
    } finally {
      setLoading(false);
    }
  };

  const onDateChange = (event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
      const formattedDate = date.toISOString().split("T")[0];
      fetchParagons(formattedDate);
    }
  };

  const handleSeparate = () => {
    setSeparate(false);
  };

  useEffect(() => {
    const formattedDate = selectedDate.toISOString().split("T")[0];
    fetchParagons(formattedDate);
  }, [selectedDate]);

  // const renderParagonDetails = (paragon: any) => (
  //   <View style={receiptStyles.shop_list}>
  //     <Text style={receiptStyles.seller_name}>{paragon.seller_details.name}</Text>
  //     <Text style={receiptStyles.seller_address}>{paragon.seller_details.address}</Text>

  //     <ScrollView style={{ height: "92%" }}>
  //       {paragon.purchase_items.map((entry: any, index: any) => (
  //         <View key={index} style={receiptStyles.purchase_item}>
  //           <Text style={receiptStyles.item_description}>{entry.description}</Text>
  //           <Text style={receiptStyles.detail_text}>Kwota: {
  //             entry.discount_value === 0
  //               ? String(entry.price_before_discount)
  //               : String(entry.price_after_discount)
  //           } PLN</Text>
  //           <Text style={receiptStyles.detail_text}>Ilość: {entry.quantity}</Text>
  //           <Text style={receiptStyles.detail_text}>Kategoria: {entry.category}</Text>
  //         </View>
  //       ))}
  //     </ScrollView>
  //     <Text style={receiptStyles.seller_address}>{paragon.total}</Text>
  //     <View style={buttonStyles.container}>
  //       <TouchableOpacity
  //         style={buttonStyles.touchable_dark}
  //         onPress={() => setSelectedParagon(null)}
  //       >
  //         <Text style={buttonStyles.text}>Wróć do listy</Text>
  //       </TouchableOpacity>
  //       <TouchableOpacity
  //         style={buttonStyles.touchable_dark}
  //         onPress={() => setSeparate(true)}
  //       >
  //         <Text style={buttonStyles.text}>Podziel</Text>
  //       </TouchableOpacity>
  //     </View>
  //   </View>
  // );

  return (
    <ImageBackground
      source={require("../assets/recent.jpeg")}
      style={mainStyles.background}
    >
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
      <View style={mainStyles.container}>
        {selectedParagon ? (
          <>
            {separate ? (
              <Separate
                paragonsData={selectedParagon.purchase_items}
                handleSeparate={handleSeparate}
              />
            ) : (
              <>
                <ReceiptList
                  list={selectedParagon}
                  handleDelete={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                />
                <TouchableOpacity
                  style={buttonStyles.touchable_dark}
                  onPress={() => setSelectedParagon(null)}
                >
                  <Text style={buttonStyles.text}>Wróć do listy</Text>
                </TouchableOpacity>
              </>
            )}
          </>
        ) : (
          <View>
            <TouchableOpacity
              // style={styles.dateSection}
              onPress={() => {
                setShowDatePicker(true);
                setSelectedParagon(null);
              }}
            >
              <Text style={styles.dateText}>
                {selectedDate.toISOString().split("T")[0]}
              </Text>
            </TouchableOpacity>

            {loading ? (
              <ActivityIndicator size="large" color="gold" />
            ) : Array.isArray(paragons) ? (
              paragons.map((entry, index) => (
                <TouchableOpacity
                  key={index}
                  // style={receiptStyles.purchase_item}
                  onPress={() => {
                    setSelectedParagon(entry);
                  }}
                >
                  <Text style={{ color: "white" }}>
                    {entry.seller_details.name} -{entry.total} PLN
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={{ color: "white" }}>
                Brak dodanych paragonów tego dnia.
              </Text>
            )}
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gold",
    marginBottom: 10,
  },
});
