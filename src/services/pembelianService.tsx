 import { CreatePembelianPayload, PembelianResponse } from '@/models/pembelianModel';  
import axios from '@/utils/lib/axios';

export class PembelianService {  
  static async create(payload: CreatePembelianPayload): Promise<PembelianResponse> {  
    try {  
      const response = await axios.post<PembelianResponse>('/pembelian', payload);  
      return response.data;  
    } catch (error: any) {  
      throw new Error(error.response?.data?.message || 'Gagal membuat pembelian');  
    }  
  }  

  static async getAll(): Promise<PembelianResponse[]> {  
    try {  
      const response = await axios.get<PembelianResponse[]>('/pembelian');  
      return response.data;  
    } catch (error: any) {  
      throw new Error(error.response?.data?.message || 'Gagal mengambil data pembelian');  
    }  
  }  

  static async getById(id: number): Promise<PembelianResponse> {  
    try {  
      const response = await axios.get<PembelianResponse>(`/pembelian/${id}`);  
      return response.data;  
    } catch (error: any) {  
      throw new Error(error.response?.data?.message || 'Gagal mengambil detail pembelian');  
    }  
  }  
}