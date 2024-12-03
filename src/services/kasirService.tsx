// services/transactionService.ts  
import axios from "@/utils/lib/axios";  

interface TransactionItem {  
  product_id: number;  
  quantity: number;  
  price: string;  
}  

interface CreatePurchaseDTO {  
  supplier_id: number;  
  items: TransactionItem[];  
  total_amount: string;  
}  

interface CreateSaleDTO {  
  customer_id: number;  
  items: TransactionItem[];  
  total_amount: string;  
}  

export class TransactionService {  
  static async createPurchase(data: CreatePurchaseDTO) {  
    try {  
      const response = await axios.post('/pembelian', data);  
      return response.data;  
    } catch (error: any) {  
      throw new Error(error.response?.data?.message || 'Gagal membuat pembelian');  
    }  
  }  

  static async createSale(data: CreateSaleDTO) {  
    try {  
      const response = await axios.post('/penjualan', data);  
      return response.data;  
    } catch (error: any) {  
      throw new Error(error.response?.data?.message || 'Gagal membuat penjualan');  
    }  
  }  

  static async generateTransactionCode(type: 'purchase' | 'sale'): Promise<string> {  
    const date = new Date();  
    const year = date.getFullYear().toString().slice(-2);  
    const month = (date.getMonth() + 1).toString().padStart(2, '0');  
    const day = date.getDate().toString().padStart(2, '0');  
    const random = Math.floor(Math.random() * 9999).toString().padStart(4, '0');  
    
    const prefix = type === 'purchase' ? 'PB' : 'PJ';  
    return `${prefix}${year}${month}${day}${random}`;  
  }  
}