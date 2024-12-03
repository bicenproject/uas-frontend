 import axios from '@/utils/lib/axios';  
import { CreatePenjualanPayload, PenjualanResponse } from '@/models/penjualanModel';  

export class PenjualanService {  
  static async create(payload: CreatePenjualanPayload): Promise<PenjualanResponse> {  
    try {  
      const response = await axios.post<PenjualanResponse>('/penjualan', payload);  
      return response.data;  
    } catch (error: any) {  
      throw new Error(error.response?.data?.message || 'Gagal membuat penjualan');  
    }  
  }  

  static async getAll(): Promise<PenjualanResponse[]> {  
    try {  
      const response = await axios.get<PenjualanResponse[]>('/penjualan');  
      return response.data;  
    } catch (error: any) {  
      throw new Error(error.response?.data?.message || 'Gagal mengambil data penjualan');  
    }  
  }  
}