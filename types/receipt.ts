export interface SellerDetails {
    name: string;
    address: string;
  }
  
  export interface PurchaseItem {
    description: string;
    price: number;
    quantity: number;
    category: string;
  }
  
  export interface ReceiptDetails {
    seller_details: SellerDetails;
    purchase_items: PurchaseItem[];
    total: number;
  }
  