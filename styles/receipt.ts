import { StyleSheet } from "react-native";

export const receiptStyles = StyleSheet.create({
  container: {
    width: "100%",
    height: "80%",
    maxHeight: "65%",
    display: "flex",
  },

 
  detail_text: { fontSize: 16 },

  shop_list: {
    width: "90%",
    margin: "5%",
    maxHeight: "95%",
    backgroundColor: "white",
    padding: 10,
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  purchase_item: {
    borderBottomWidth: 2,
    borderColor: "darkgrey",
    marginBottom: 10,
    paddingBottom: 10,
    display: "flex",
  },
  purchase_item_text: {
    color: "white",
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
  item_input: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
    fontWeight: 'bold',
    width: 80,
    height: 20,
    textAlign: "center",
  },

  sum_container: {
    borderTopWidth: 1,
    borderColor: "black",
  },
  total: {
    fontSize: 20,
    textAlign: "center",
    padding: 5,
    marginTop: 10,
  },
  price: {
    // backgroundColor: 'red',
    width: 100,

  },

  seller_name: {
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
    fontSize: 18,
  },
  seller_address: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 14,
    color: "grey",
    borderBottomWidth: 1,
    borderColor: "black",
  },
});
