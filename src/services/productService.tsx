import axios from "@/utils/lib/axios";

export interface Product {
    id: number;
    image?: string;
    nama_barang: string;
    category_id: number;
    category?: {
        id: number;
        name: string;
    };
    harga_beli: string;
    harga_jual: string;
    stock: number;
    created_at: string;
    updated_at: string;
}

export interface CreateProductDTO {  
    nama_barang: string;  
    category_id: number;  
    harga_beli: string;  
    harga_jual: string;  
    stock: number;  
    image?: File | string;  
  }  

export interface ProductResponse {
    status: {
        code: number;
        description: string;
    };
    result: Product | Product[];
}


export class ProductService {
    static async getAll(): Promise<Product[]> {
        try {
            const response = await axios.get<ProductResponse>('/product');
            return Array.isArray(response.data.result)
                ? response.data.result
                : [response.data.result];
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Gagal memuat data produk');
        }
    }

    static async getById(id: number): Promise<Product> {
        try {
            const response = await axios.get<ProductResponse>(`/product/${id}`);
            return Array.isArray(response.data.result)
                ? response.data.result[0]
                : response.data.result;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Gagal memuat detail produk');
        }
    }

    static async create(data: CreateProductDTO): Promise<Product> {  
        try {  
           if (data.image instanceof File) {  
            const formData = new FormData();  
            formData.append('nama_barang', data.nama_barang);  
            formData.append('category_id', String(data.category_id));  
            formData.append('harga_beli', data.harga_beli);  
            formData.append('harga_jual', data.harga_jual);  
            formData.append('stock', String(data.stock));  
            formData.append('image', data.image);  
    
            const response = await axios.post<ProductResponse>('/product', formData, {  
              headers: {  
                'Content-Type': 'multipart/form-data',  
              },  
            });  
            return Array.isArray(response.data.result)   
              ? response.data.result[0]   
              : response.data.result;  
          } else {  
             const response = await axios.post<ProductResponse>('/product', data);  
            return Array.isArray(response.data.result)   
              ? response.data.result[0]   
              : response.data.result;  
          }  
        } catch (error: any) {  
          if (error.response?.data?.status?.code === 422) {  
            throw new Error(  
              Object.values(error.response.data.result.errors)  
                .flat()  
                .join(', ')  
            );  
          }  
          throw new Error(error.response?.data?.message || 'Gagal membuat produk');  
        }  
      }  

    static async update(id: number, data: Partial<CreateProductDTO>): Promise<Product> {
        try {
            const response = await axios.patch<ProductResponse>(`/product/${id}`, data);
            return Array.isArray(response.data.result)
                ? response.data.result[0]
                : response.data.result;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Gagal mengupdate produk');
        }
    }

    static async delete(id: number): Promise<void> {
        try {
            await axios.delete(`/product/${id}`);
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Gagal menghapus produk');
        }
    }
}