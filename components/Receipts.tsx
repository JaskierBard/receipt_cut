import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView , StyleSheet} from 'react-native';
import { getParagons } from '../src/firebaseChatService'; // Upewnij się, że ścieżka jest poprawna


interface Props {

}

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
    const [selectedParagon, setSelectedParagon] = useState<ReceiptDetails | null>(null);
  
    useEffect(() => {
      const fetchParagons = async () => {
        try {
          const data = await getParagons();
          setParagons(data?.['2024-05-22']);
        } catch (error) {
          console.error("Błąd podczas pobierania paragonów: ", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchParagons();
    }, []);
  
    if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }
  
    if (!paragons) {
      return <Text style={styles.noDataText}>Brak paragonów do wyświetlenia.</Text>;
    }
    
    const renderParagonDetails = (paragon: any) => (
        <>
        
          {paragon.map((entry: any, index: any) => (
            <View key={index} style={styles.detailsContainer}>
              <Text style={styles.detailText}>Nazwa: {entry.description}</Text>
              <Text style={styles.detailText}>Kwota: {entry.price} PLN</Text>
              <Text style={styles.detailText}>Ilość: {entry.quantity}</Text>
              <Text style={styles.detailText}>Kategoria: {entry.category}</Text>
            </View>
          ))}
          <TouchableOpacity style={styles.backButton} onPress={() => setSelectedParagon(null)}>
            <Text style={styles.backButtonText}>Wróć do listy</Text>
          </TouchableOpacity>
        </>
      );
      
    
    return (
      <ScrollView style={styles.container}>
        {selectedParagon ? (
          renderParagonDetails(selectedParagon)
        ) : (
          <View style={styles.dateSection}>
            <Text style={styles.dateText}>2024-05-22</Text>
            {Array.isArray(paragons) ? (
              paragons.map((entry, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.listItem}
                  onPress={() => setSelectedParagon(entry.receipt_details.purchase_items)}
                >
                  <Text style={styles.listItemText}>{entry.receipt_details.seller_details.name} - {entry.receipt_details.total} PLN</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.noDataText}>Brak danych dla tej daty</Text>
            )}
          </View>
        )}
      </ScrollView>
    );
  };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f9f9f9',
      },
      loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      noDataText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#999',
      },
      dateSection: {
        marginBottom: 16,
      },
      dateText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
      },
      listItem: {
        padding: 10,
        backgroundColor: '#fff',
        marginBottom: 8,
        borderRadius: 5,
        borderColor: '#ddd',
        borderWidth: 1,
      },
      listItemText: {
        fontSize: 16,
        color: '#333',
      },
      detailsContainer: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderColor: '#ddd',
        borderWidth: 1,
      },
      detailsHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      detailText: {
        fontSize: 16,
        marginBottom: 8,
        color: '#555',
      },
      backButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
        alignItems: 'center',
      },
      backButtonText: {
        color: '#fff',
        fontSize: 16,
      },
    });
    
    export default ParagonList;