export interface SellerDetails {
    name: string;
    address: string;
  }
  
  export interface PurchaseItem {
    description: string;
    price_before_discount: number;
    discount_value: number,
    price_after_discount: number,
    quantity: number;
    category: string;
  }
  
  export interface ReceiptDetails {
    seller_details: SellerDetails;
    purchase_items: PurchaseItem[];
    total: number;
  }
  