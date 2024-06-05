import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const base = {
  width: width * 0.9,
  margin: width * 0.05,
  borderRadius: 10,
  padding: 10,
  borderWidth: 2,
  elevation: 1,
};

const colors = {
  biedronka: {
    backgroundColor: "rgb(253, 237, 20)",
    borderColor: "rgb(224, 33, 48)",
  },
  dealz: {
    backgroundColor: "rgb(1, 124, 139)",
    borderColor: "rgb(254, 193, 4)",
  },
};

// export const shopStyles = StyleSheet.create({
//   biedronka: {
//     ...base,
//     ...colors.biedronka
//   },
//   dealz: {
//     ...base,
//     ...colors.dealz
//   }
// });

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
      maxHeight: height * 0.72, // 72% of the screen height
      borderWidth: 1,
      borderColor: colors[shopName].borderColor,
    },
  };
};
