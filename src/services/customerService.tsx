import { Customer } from "@/models/customerModel";
import axios from "@/utils/lib/axios";  


export interface ApiResponse<T> {  
  status: {  
    code: number;  
    description: string;  
  };  
  result: T;  
}  

export interface CustomerCreateInput {  
  customer_name: string;  
  alamat: string;  
  phone: string;  
}  

export class CustomerService {  
  static async getAll(): Promise<ApiResponse<Customer[]>> {  
    try {  
      const response = await axios.get<ApiResponse<Customer[]>>('/customer');  
      
       if (!response.data || !response.data.status) {  
        throw new Error('Format response tidak valid');  
      }  
      
      return response.data;  
    } catch (error: any) {  
      if (error.response?.data?.status) {  
        throw new Error(error.response.data.status.description);  
      }  
      throw new Error(error.message || 'Gagal mengambil data customer');  
    }  
  }  

  static async getOne(id: number): Promise<ApiResponse<Customer>> {  
    try {  
      const response = await axios.get<ApiResponse<Customer>>(`/customer/${id}`);  
      
      if (!response.data || !response.data.status) {  
        throw new Error('Format response tidak valid');  
      }  
      
      return response.data;  
    } catch (error: any) {  
      if (error.response?.data?.status) {  
        throw new Error(error.response.data.status.description);  
      }  
      throw new Error(error.message || 'Customer tidak ditemukan');  
    }  
  }  

  static async create(data: CustomerCreateInput): Promise<ApiResponse<Customer>> {  
    try {  
      const response = await axios.post<ApiResponse<Customer>>('/customer', data);  
      
      if (!response.data || !response.data.status) {  
        throw new Error('Format response tidak valid');  
      }  
      
      return response.data;  
    } catch (error: any) {  
      if (error.response?.data?.status) {  
        throw new Error(error.response.data.status.description);  
      }  
      throw new Error(error.message || 'Gagal membuat customer');  
    }  
  }  

  static async update(id: number, data: Partial<CustomerCreateInput>): Promise<ApiResponse<Customer>> {  
    try {  
      const response = await axios.patch<ApiResponse<Customer>>(`/customer/${id}`, data);  
      
      if (!response.data || !response.data.status) {  
        throw new Error('Format response tidak valid');  
      }  
      
      return response.data;  
    } catch (error: any) {  
      if (error.response?.data?.status) {  
        throw new Error(error.response.data.status.description);  
      }  
      throw new Error(error.message || 'Gagal mengupdate customer');  
    }  
  }  

  static async delete(id: number): Promise<ApiResponse<null>> {  
    try {  
      const response = await axios.delete<ApiResponse<null>>(`/customer/${id}`);  
      
      if (!response.data || !response.data.status) {  
        throw new Error('Format response tidak valid');  
      }  
      
      return response.data;  
    } catch (error: any) {  
      if (error.response?.data?.status) {  
        throw new Error(error.response.data.status.description);  
      }  
      throw new Error(error.message || 'Gagal menghapus customer');  
    }  
  }  
}