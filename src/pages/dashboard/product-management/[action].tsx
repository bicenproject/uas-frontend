import { useState, useEffect } from 'react';  
import { Product, CreateProductDTO, ProductService } from '@/services/productService';  
import { Category, CategoryService } from '@/services/categoryService';  
import { toast } from 'sonner';  

interface ProductFormProps {  
  initialData?: Product;  
  onSuccess?: () => void;  
  onCancel?: () => void;  
  isModal?: boolean;  
}  

export function ProductForm({ initialData, onSuccess, onCancel, isModal }: ProductFormProps) {  
  const [loading, setLoading] = useState(false);  
  const [categories, setCategories] = useState<Category[]>([]);  

  const [formData, setFormData] = useState<CreateProductDTO>({  
    nama_barang: initialData?.nama_barang || '',  
    category_id: initialData?.category_id || 0,  
    harga_beli: initialData?.harga_beli || '',  
    harga_jual: initialData?.harga_jual || '',  
    stock: initialData?.stock || 0,  
  });  

  const [errors, setErrors] = useState<{  
    nama_barang?: string[];  
    category_id?: string[];  
    harga_beli?: string[];  
    harga_jual?: string[];  
    stock?: string[];  
  }>({});  

  useEffect(() => {  
    fetchCategories();  
  }, []);  

  const fetchCategories = async () => {  
    try {  
      const data = await CategoryService.getAll();  
      setCategories(data);  
    } catch (error: any) {  
      toast.error('Gagal memuat kategori: ' + error.message);  
    }  
  };  

  const validateForm = () => {  
    const newErrors: typeof errors = {};  

    if (!formData.nama_barang.trim()) {  
      newErrors.nama_barang = ['Nama barang harus diisi'];  
    }  

    if (!formData.category_id) {  
      newErrors.category_id = ['Kategori harus dipilih'];  
    }  

    if (!formData.harga_beli) {  
      newErrors.harga_beli = ['Harga beli harus diisi'];  
    }  

    if (!formData.harga_jual) {  
      newErrors.harga_jual = ['Harga jual harus diisi'];  
    }  

    if (isNaN(Number(formData.stock))) {  
      newErrors.stock = ['Stok harus berupa angka'];  
    }  

    setErrors(newErrors);  
    return Object.keys(newErrors).length === 0;  
  };  

  const handleSubmit = async (e: React.FormEvent) => {  
    e.preventDefault();  

    if (!validateForm()) {  
      return;  
    }  

    try {  
      setLoading(true);  
      const dataToSubmit = {  
        ...formData,  
        category_id: Number(formData.category_id),  
        stock: Number(formData.stock),  
        harga_beli: String(formData.harga_beli),  
        harga_jual: String(formData.harga_jual),  
      };  

      if (initialData?.id) {  
        await ProductService.update(initialData.id, dataToSubmit);  
        toast.success('Produk berhasil diupdate');  
      } else {  
        await ProductService.create(dataToSubmit);  
        toast.success('Produk berhasil dibuat');  
      }  
      onSuccess?.();  
    } catch (error: any) {  
      if (error.response?.data?.status?.code === 422) {  
        setErrors(error.response.data.result.errors);  
        toast.error('Mohon periksa kembali input Anda');  
      } else {  
        toast.error(error.message || 'Terjadi kesalahan');  
      }  
    } finally {  
      setLoading(false);  
    }  
  };  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {  
    const { name, value } = e.target;  
    setFormData(prev => ({  
      ...prev,  
      [name]: value  
    }));  

    if (errors[name as keyof typeof errors]) {  
      setErrors(prev => ({  
        ...prev,  
        [name]: undefined  
      }));  
    }  
  };  

  return (  
    <form onSubmit={handleSubmit} className={`space-y-4 ${isModal ? 'p-4' : ''}`}>  
      <div>  
        <label className="block text-sm font-medium text-gray-700">Nama Barang</label>  
        <input  
          type="text"  
          name="nama_barang"  
          value={formData.nama_barang}  
          onChange={handleChange}  
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.nama_barang ? 'border-red-500' : ''}`}  
        />  
        {errors.nama_barang && (  
          <p className="mt-1 text-sm text-red-600">{errors.nama_barang[0]}</p>  
        )}  
      </div>  

      <div>  
        <label className="block text-sm font-medium text-gray-700">Kategori</label>  
        <select  
          name="category_id"  
          value={formData.category_id}  
          onChange={handleChange}  
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.category_id ? 'border-red-500' : ''}`}  
        >  
          <option value="">Pilih Kategori</option>  
          {categories.map(category => (  
            <option key={category.id} value={category.id}>  
              {category.name}  
            </option>  
          ))}  
        </select>  
        {errors.category_id && (  
          <p className="mt-1 text-sm text-red-600">{errors.category_id[0]}</p>  
        )}  
      </div>  

      <div>  
        <label className="block text-sm font-medium text-gray-700">Harga Beli</label>  
        <input  
          type="number"  
          name="harga_beli"  
          value={formData.harga_beli}  
          onChange={handleChange}  
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.harga_beli ? 'border-red-500' : ''}`}  
        />  
        {errors.harga_beli && (  
          <p className="mt-1 text-sm text-red-600">{errors.harga_beli[0]}</p>  
        )}  
      </div>  

      <div>  
        <label className="block text-sm font-medium text-gray-700">Harga Jual</label>  
        <input  
          type="number"  
          name="harga_jual"  
          value={formData.harga_jual}  
          onChange={handleChange}  
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.harga_jual ? 'border-red-500' : ''}`}  
        />  
        {errors.harga_jual && (  
          <p className="mt-1 text-sm text-red-600">{errors.harga_jual[0]}</p>  
        )}  
      </div>  

      <div>  
        <label className="block text-sm font-medium text-gray-700">Stok</label>  
        <input  
          type="number"  
          name="stock"  
          value={formData.stock}  
          onChange={handleChange}  
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.stock ? 'border-red-500' : ''}`}  
        />  
        {errors.stock && (  
          <p className="mt-1 text-sm text-red-600">{errors.stock[0]}</p>  
        )}  
      </div>  

      <div className="mt-6 flex justify-end space-x-3">  
        {onCancel && (  
          <button  
            type="button"  
            onClick={onCancel}  
            className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"  
          >  
            Batal  
          </button>  
        )}  
        <button  
          type="submit"  
          disabled={loading}  
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"  
        >  
          {loading ? 'Menyimpan...' : 'Simpan'}  
        </button>  
      </div>  
    </form>  
  );  
}