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

interface ParagonsData {
  [date: string]: ReceiptDetails[];
}

interface ReceiptDetails {
  description: string;
  price: number;
  quantity: string;
  category: string;
}

const ParagonList = () => {
  const [paragons, setParagons] = useState<ParagonsData | any>(null);
  const [loading, setLoading] = useState<boolean>(true);
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

  useEffect(() => {
    const formattedDate = selectedDate.toISOString().split("T")[0];
    fetchParagons(formattedDate);
  }, [selectedDate]);

  const renderParagonDetails = (paragon: any) => (
    <View>
      <ScrollView style={{ height: "92%" }}>
        {paragon.map((entry: any, index: any) => (
          <View key={index} style={styles.detailsContainer}>
            <Text style={styles.detailText}>{entry.description}</Text>
            <Text style={styles.detailText}>Kwota: {entry.price} PLN</Text>
            <Text style={styles.detailText}>Ilość: {entry.quantity}</Text>
            <Text style={styles.detailText}>Kategoria: {entry.category}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setSelectedParagon(null)}
        >
          <Text style={styles.backButtonText}>Wróć do listy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>Podziel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ImageBackground
      source={require("../assets/recent.jpeg")}
      style={styles.background}
    >
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
      <View style={styles.container}>
        {selectedParagon ? (
          renderParagonDetails(selectedParagon)
        ) : (
          <View>
            <TouchableOpacity
              style={styles.dateSection}
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
                  onPress={() =>
                    setSelectedParagon(entry.receipt_details.purchase_items)
                  }
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
  buttonContainer: {
    flexDirection: "row",
       justifyContent: "center",

  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    marginTop: "10%",
    height: "90%",
    width: "90%",
    backgroundColor: "rgba(0,0,0,0.8)",
    // justifyContent: "center",
    // alignItems: "center",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "gold",
  },
  datePickerButton: {
    padding: 10,
    backgroundColor: "grey",
    borderRadius: 50,
    alignItems: "center",
    bottom: 20,
    position: "absolute",
  },
  dateSection: { marginVertical: 10 },
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
  detailsContainer: {
    paddingLeft: 10,
    paddingVertical: 3,
    backgroundColor: "rgba(139, 223, 244, 0.7)",
    margin: 1,
  },
  detailText: { fontSize: 16 },
  backButton: {
    padding: 5,
    backgroundColor: "rgba(238, 245, 39, 0.6)",
    borderRadius: 5,
    alignItems: "center",
    margin: 10,
  },
  backButtonText: { color: "#fff", fontSize: 16 },
  noDataText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "white",
  },
});

export default ParagonList;
