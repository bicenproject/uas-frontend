 import { useState } from 'react';  
import { useRouter } from 'next/router';  
import { toast } from 'sonner';  
import { SupplierService } from '@/services/supplierService';  
import { useAuth } from '@/utils/lib/AuthContext';  

export default function CreateSupplier() {  
  const router = useRouter();  
  const { isAuthenticated } = useAuth();  
  const [loading, setLoading] = useState(false);  
  const [formData, setFormData] = useState({  
    name: '',  
    address: '',  
    phone: '',  
    description: '',  
    established_date: '',  
    business_license: ''  
  });  

  const handleSubmit = async (e: React.FormEvent) => {  
    e.preventDefault();  
    setLoading(true);  

    try {  
      await SupplierService.create(formData);  
      toast.success('Supplier berhasil ditambahkan');  
      router.push('/dashboard/supplier-management');  
    } catch (error: any) {  
      toast.error(error.message);  
    } finally {  
      setLoading(false);  
    }  
  };  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {  
    const { name, value } = e.target;  
    setFormData(prev => ({  
      ...prev,  
      [name]: value  
    }));  
  };  

  if (!isAuthenticated) {  
    router.replace('auth/sign-in');  
    return null;  
  }  

  return (  
    <div className="container mx-auto px-4 py-8">  
      <div className="max-w-2xl mx-auto">  
        <div className="flex justify-between items-center mb-6">  
          <h1 className="text-2xl font-bold">Tambah Supplier</h1>  
          <button  
            onClick={() => router.back()}  
            className="text-gray-600 hover:text-gray-800"  
          >  
            Kembali  
          </button>  
        </div>  

        <form onSubmit={handleSubmit} className="space-y-6">  
          <div>  
            <label className="block text-sm font-medium text-gray-700 mb-1">  
              Nama Supplier <span className="text-red-500">*</span>  
            </label>  
            <input  
              type="text"  
              name="name"  
              value={formData.name}  
              onChange={handleChange}  
              required  
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"  
              placeholder="Masukkan nama supplier"  
            />  
          </div>  

          <div>  
            <label className="block text-sm font-medium text-gray-700 mb-1">  
              Alamat  
            </label>  
            <textarea  
              name="address"  
              value={formData.address}  
              onChange={handleChange}  
              rows={3}  
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"  
              placeholder="Masukkan alamat lengkap"  
            />  
          </div>  

          <div>  
            <label className="block text-sm font-medium text-gray-700 mb-1">  
              No. Telepon  
            </label>  
            <input  
              type="tel"  
              name="phone"  
              value={formData.phone}  
              onChange={handleChange}  
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"  
              placeholder="Contoh: 08123456789"  
            />  
          </div>  

          <div>  
            <label className="block text-sm font-medium text-gray-700 mb-1">  
              Tanggal Berdiri  
            </label>  
            <input  
              type="date"  
              name="established_date"  
              value={formData.established_date}  
              onChange={handleChange}  
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"  
            />  
          </div>  

          <div>  
            <label className="block text-sm font-medium text-gray-700 mb-1">  
              No. Izin Usaha  
            </label>  
            <input  
              type="text"  
              name="business_license"  
              value={formData.business_license}  
              onChange={handleChange}  
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"  
              placeholder="Masukkan nomor izin usaha"  
            />  
          </div>  

          <div>  
            <label className="block text-sm font-medium text-gray-700 mb-1">  
              Deskripsi  
            </label>  
            <textarea  
              name="description"  
              value={formData.description}  
              onChange={handleChange}  
              rows={4}  
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"  
              placeholder="Masukkan deskripsi supplier"  
            />  
          </div>  

          <div className="flex justify-end space-x-3">  
            <button  
              type="button"  
              onClick={() => router.back()}  
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"  
              disabled={loading}  
            >  
              Batal  
            </button>  
            <button  
              type="submit"  
              disabled={loading}  
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"  
            >  
              {loading ? 'Menyimpan...' : 'Simpan'}  
            </button>  
          </div>  
        </form>  
      </div>  
    </div>  
  );  
}