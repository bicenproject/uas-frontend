 import { Supplier } from "@/models/supplierModel";
import axios from "@/utils/lib/axios";  

export interface SupplierResponse {  
  status: {  
    code: number;  
    description: string;  
  };  
  result: Supplier[];  
}  

export class SupplierService {  
  static async getAll(): Promise<SupplierResponse> {  
    try {  
      const response = await axios.get<SupplierResponse>('/supplier');  
      return response.data;  
    } catch (error: any) {  
      throw new Error(error.response?.data?.message || 'Gagal mengambil data supplier');  
    }  
  }  

  static async create(data: Partial<Supplier>): Promise<SupplierResponse> {  
    try {  
      const response = await axios.post<SupplierResponse>('/supplier', data);  
      return response.data;  
    } catch (error: any) {  
      throw new Error(error.response?.data?.message || 'Gagal membuat supplier');  
    }  
  }  

  static async update(id: number, data: Partial<Supplier>): Promise<SupplierResponse> {  
    try {  
      const response = await axios.patch<SupplierResponse>(`/supplier/${id}`, data);  
      return response.data;  
    } catch (error: any) {  
      throw new Error(error.response?.data?.message || 'Gagal mengupdate supplier');  
    }  
  }  

  static async delete(id: number): Promise<void> {  
    try {  
      await axios.delete(`/supplier/${id}`);  
    } catch (error: any) {  
      throw new Error(error.response?.data?.message || 'Gagal menghapus supplier');  
    }  
  }  
}