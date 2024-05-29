import { PurchaseItem } from "../types/receipt";

export const sumPrices = (purchaseItems: PurchaseItem[]) => {
  console.log(purchaseItems);
  try {
    const sum = purchaseItems.reduce(
      (total: number, item: any) => total + item.price * (item.quantity || 0),
      0
    );
    return sum.toFixed(2);
  } catch (error) {
    console.log("błąd sumowania kwot na paragonie: " + error);
  }
};
