import { StyleSheet } from "react-native";

export const receiptStyles = StyleSheet.create({
  container: {
    width: "100%",
    // height: "100%",
    // maxHeight: "65%",
    // display: "flex",
  },
  logo: {
    width: "100%",
    height: "10%",
    marginBottom: 10,
  },


 
text:{
  fontFamily: "monospace",

},
 
 
 
  details: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",

  },
  name: {
    fontWeight: "bold",
    fontFamily: "monospace",

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
    backgroundColor:' orange',
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
