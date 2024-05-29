import { StyleSheet } from "react-native";

export const buttonStyles = StyleSheet.create({
  container: {
    backgroundColor: "grey",
    flexDirection: "row",
    justifyContent: "center",
  },
  touchable: {
    padding: 5,
    backgroundColor: "rgba(238, 245, 39, 0.6)",
    borderRadius: 5,
    alignItems: "center",
    margin: 10,
  },
  text: { color: "#fff", fontSize: 16 },
});
