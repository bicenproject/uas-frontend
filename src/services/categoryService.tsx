import axios from "@/utils/lib/axios";  

export interface Category {  
  id: number;  
  name: string;  
  created_at: string;  
  updated_at: string;  
}  

export interface CategoryResponse {  
  status: {  
    code: number;  
    description: string;  
  };  
  result: Category | Category[];  
}  

export class CategoryService {  
  static async getAll(): Promise<Category[]> {  
    try {  
      const response = await axios.get<CategoryResponse>('/category');  
      return Array.isArray(response.data.result)   
        ? response.data.result   
        : [response.data.result];  
    } catch (error: any) {  
      throw new Error(error.response?.data?.message || 'Gagal memuat data kategori');  
    }  
  }  
}