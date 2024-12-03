// src/models/pembelianModel.ts  
export interface CreatePembelianPayload {  
    id_supplier: number;  
    tanggal_pembelian: Date;  
    details: {  
      id_barang: number;  
      quantity: number; 
      harga_beli: string;  
    }[];  
  }  
  
  export interface PembelianResponse {  
    id: number;  
    code: string;  
    id_supplier: number;  
    tanggal_pembelian: Date;  
    supplier?: {  
      id: number;  
      name: string;  
     };  
    DetailPembelian?: {  
      id: number;  
      harga_beli: string;  
      id_barang: number;  
      id_pembelian: number;  
      quantity: number;  
      barang?: {  
        id: number;  
        nama_barang: string;  
        stock: string;
        harga_jual: string;
        harga_beli: string;
      };  
    }[];  
  }