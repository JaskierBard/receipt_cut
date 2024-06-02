export interface SellerDetails {
    name: string;
    address: string;
  }
  
  export interface PurchaseItem {
    item_name: string;
    price_before_discount: number;
    discount_value: number,
    price_after_discount: number,
    quantity: number;
    unit: string;
    unit_price: number;
    category: string;
  }
  
  export interface ReceiptDetails {
    seller_details: SellerDetails;
    purchase_items: PurchaseItem[];
    total: number;
  }
  
  export type DiscountType = 'price_before_discount' | 'price_after_discount';
