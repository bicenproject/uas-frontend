 export interface CreatePenjualanPayload {  
    id_customer: number;  
    tanggal: Date;  
    details: {  
      id_barang: number;  
      qty: number;  
      harga_jual: string;  
    }[];  
  }  
  
  export interface PenjualanResponse {  
    id: number;  
    code: string;  
    id_customer: number;  
    tanggal: Date;  
    customer?: {  
      id: number;  
      customer_name: string;  
    };  
    DetailPenjualan?: {  
      id: number;  
      harga: string;  
      id_barang: number;  
      id_penjualan: number;  
      qty: number;  
      barang?: {  
        id: number;  
        nama_barang: string;  
        stock: number;  
      };  
    }[];  
  }