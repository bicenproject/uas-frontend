import axios from "@/utils/lib/axios";  
import {   
  CreatePembelianPayload,   
  PembelianResponse   
} from "@/models/pembelianModel";  

interface ApiResponse<T> {  
  status: {  
    code: number;  
    description: string;  
  };  
  result: T;  
}  

export class PembelianService {  
  static async create(payload: CreatePembelianPayload): Promise<PembelianResponse> {  
    try {  
      const response = await axios.post<ApiResponse<PembelianResponse>>('/pembelian', payload);  
      return response.data.result;  
    } catch (error: any) {  
      throw new Error(error.response?.data?.message || 'Gagal membuat pembelian');  
    }  
  }  

  static async getRecentPembelian() {  
    try {  
      const response = await axios.get('/pembelian/recent');  
      return response.data.result.result || [];  
    } catch (error) {  
      console.error('Error fetching recent Pembelian:', error);  
      return [];  
    }  
  }

  static async getPembelianById(id: number): Promise<PembelianResponse | null> {  
    try {  
      const response = await axios.get<ApiResponse<PembelianResponse>>(`/pembelian/${id}`);  
      return response.data.result;  
    } catch (error: any) {  
      console.error(`Error fetching pembelian with id ${id}:`, error);  
      return null;  
    }  
  }  
}