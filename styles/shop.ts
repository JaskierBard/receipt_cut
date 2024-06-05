import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const base = {
  width: width * 0.9,
  height: height * 0.82,
  // margin: width * 0.05,
  borderRadius: 10,
  padding: 10,
  borderWidth: 2,
  elevation: 1,
};

export const colors = {
  default: {
    backgroundColor: "wheat",
    borderColor: "green",
  },
  biedronka: {
    backgroundColor: "rgb(253, 237, 20)",
    borderColor: "rgb(224, 33, 48)",
  },
  dealz: {
    backgroundColor: "rgb(1, 124, 139)",
    borderColor: "rgb(254, 193, 4)",
  },
};

export const dynamicStyles = (shopName: keyof typeof colors) => {
  return {
    shop_list: {
      ...base,
      backgroundColor: colors[shopName].backgroundColor,
      borderColor: colors[shopName].borderColor,
    },
    purchase_item: {
      backgroundColor: "white",
      borderBottomWidth: 1,
      borderColor: colors[shopName].borderColor,
    },
    receipt: {
      height: height * 0.6,
      // maxHeight: height * 0.72,
      borderWidth: 1,
      borderColor: colors[shopName].borderColor,
    },
  };
};
