import { Product } from "@/models/productModel";
import axios from "@/utils/lib/axios";

export interface CatalogResponse {  
  status: {  
    code: number;  
    description: string;  
  };  
  result: Product[];  
}  

export interface ProductResponse {  
  status: {  
    code: number;  
    description: string;  
  };  
  result: Product;  
}  

export class CatalogService {  
  static async getAllProducts(): Promise<CatalogResponse> {  
    try {  
      const response = await axios.get<CatalogResponse>('/product/get/all');  
      return response.data;  
    } catch (error: any) {  
      throw new Error(error.response?.data?.message || 'Failed to fetch products');  
    }  
  }  

  static async getProductById(id: number): Promise<ProductResponse> {  
    try {  
      const response = await axios.get<ProductResponse>(`/product/${id}`);  
      return response.data;  
    } catch (error: any) {  
      throw new Error(error.response?.data?.message || 'Failed to fetch product');  
    }  
  }  
}