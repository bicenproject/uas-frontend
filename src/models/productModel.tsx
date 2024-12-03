 export interface Product {  
    id: number;  
    image?: string | null;  
    nama_barang: string;  
    category_id: number;  
    category?: {  
      id: number;  
      name: string;  
    };  
    harga_beli: string;  
    harga_jual: string;  
    stock: number
    created_at: string;  
    updated_at: string;  
    deleted_at?: Date | null;  
  }  
  
  export interface CategoryType {  
    id: number;  
    name: string;  
  }

  export interface DetailItem {  
    key: number;  
    id_barang: number;  
    barang?: Product;  
    qty: number;  
    harga: string;  
    subtotal: number;  
  }  