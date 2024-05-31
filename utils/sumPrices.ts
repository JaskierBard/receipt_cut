import { PurchaseItem } from "../types/receipt";

export const sumPrices = (purchaseItems: PurchaseItem[]) => {
  console.log(purchaseItems);
  try {
    const sum = purchaseItems.reduce(
      (total: number, item: any) => total + (item.discount_value === 0 ? item.price_before_discount: item.price_after_discount) * (item.quantity || 0),
      0
    );
    return sum.toFixed(2);
  } catch (error) {
    console.log("błąd sumowania kwot na paragonie: " + error);
  }
};
