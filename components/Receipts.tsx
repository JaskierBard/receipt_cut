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

export interface ParagonsData {
  [date: string]: ReceiptDetails[];
}

export interface ReceiptDetails {
  description: string;
  price: number;
  quantity: number;
  category: string;
}

const ParagonList = () => {
  const [paragons, setParagons] = useState<ParagonsData | any>(null);
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

  const renderParagonDetails = (paragon: any) => (
    <View style={{width: '100%'}}>
      <ScrollView style={{ height: "92%" }}>
        {paragon.map((entry: any, index: any) => (
          <View key={index} style={receiptStyles.single_item}>
            <Text style={receiptStyles.detail_text}>{entry.description}</Text>
            <Text style={receiptStyles.detail_text}>Kwota: {entry.price} PLN</Text>
            <Text style={receiptStyles.detail_text}>Ilość: {entry.quantity}</Text>
            <Text style={receiptStyles.detail_text}>Kategoria: {entry.category}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={buttonStyles.container}>
        <TouchableOpacity
          style={buttonStyles.touchable}
          onPress={() => setSelectedParagon(null)}
        >
          <Text style={buttonStyles.text}>Wróć do listy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={buttonStyles.touchable}
          onPress={() => setSeparate(true)}
        >
          <Text style={buttonStyles.text}>Podziel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

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
                paragonsData={selectedParagon as any}
                handleSeparate={handleSeparate}
              />
            ) : (
              renderParagonDetails(selectedParagon)
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
                  style={styles.listItem}
                  onPress={() => {
                    setSelectedParagon(entry.receipt_details.purchase_items),
                      console.log(entry.receipt_details.purchase_items);
                  }}
                >
                  <Text style={styles.listItemText}>
                    {entry.receipt_details.seller_details.name} -{" "}
                    {entry.receipt_details.total} PLN
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.noDataText}>Brak danych dla tej daty</Text>
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
  },
  listItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: "gold" },
  listItemText: { fontSize: 16, color: "white" },
 
  noDataText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "white",
  },
});

export default ParagonList;
