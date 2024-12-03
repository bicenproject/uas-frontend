import { useState } from 'react';  
import { useRouter } from 'next/router';  
import { toast } from 'sonner';  
import { CustomerService } from '@/services/customerService';  

export default function CreateCustomerPage() {  
  const router = useRouter();  
  const [loading, setLoading] = useState(false);  
  const [formData, setFormData] = useState({  
    customer_name: '',  
    alamat: '',  
    phone: '',  
  });  
  const [errors, setErrors] = useState({  
    customer_name: '',  
    alamat: '',  
    phone: '',  
  });  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {  
    const { name, value } = e.target;  
    setFormData(prev => ({  
      ...prev,  
      [name]: value  
    }));  
    // Reset error when user types  
    setErrors(prev => ({  
      ...prev,  
      [name]: ''  
    }));  
  };  

  const validateForm = () => {  
    const newErrors = {  
      customer_name: '',  
      alamat: '',  
      phone: '',  
    };  
    let isValid = true;  

    if (!formData.customer_name.trim()) {  
      newErrors.customer_name = 'Nama customer harus diisi';  
      isValid = false;  
    }  

    if (!formData.alamat.trim()) {  
      newErrors.alamat = 'Alamat harus diisi';  
      isValid = false;  
    }  

    if (!formData.phone.trim()) {  
      newErrors.phone = 'Nomor telepon harus diisi';  
      isValid = false;  
    } else if (!/^[0-9]{10,13}$/.test(formData.phone)) {  
      newErrors.phone = 'Nomor telepon harus 10-13 digit';  
      isValid = false;  
    }  

    setErrors(newErrors);  
    return isValid;  
  };  

  const handleSubmit = async (e: React.FormEvent) => {  
    e.preventDefault();  
    
    if (!validateForm()) {  
      toast.error('Mohon periksa kembali form anda');  
      return;  
    }  

    setLoading(true);  

    try {  
      await CustomerService.create(formData);  
      toast.success('Customer berhasil ditambahkan');  
      router.push('/dashboard/customer-management');  
    } catch (error: any) {  
      toast.error(error.message || 'Gagal menambahkan customer');  
    } finally {  
      setLoading(false);  
    }  
  };  

  return (  
    <div className="container mx-auto px-4 py-8">  
      <div className="max-w-2xl mx-auto">  
        <div className="bg-white rounded-lg shadow p-6">  
          <div className="flex justify-between items-center mb-6">  
            <h1 className="text-2xl font-bold">Tambah Customer Baru</h1>  
            <button  
              onClick={() => router.push('/dashboard/customer-management')}  
              className="text-gray-600 hover:text-gray-800"  
            >  
              Kembali  
            </button>  
          </div>  

          <form onSubmit={handleSubmit} className="space-y-6">  
            <div>  
              <label className="block text-sm font-medium text-gray-700 mb-1">  
                Nama Customer <span className="text-red-500">*</span>  
              </label>  
              <input  
                type="text"  
                name="customer_name"  
                value={formData.customer_name}  
                onChange={handleChange}  
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${  
                  errors.customer_name ? 'border-red-500' : 'border-gray-300'  
                }`}  
                placeholder="Masukkan nama customer"  
              />  
              {errors.customer_name && (  
                <p className="mt-1 text-sm text-red-500">{errors.customer_name}</p>  
              )}  
            </div>  

            <div>  
              <label className="block text-sm font-medium text-gray-700 mb-1">  
                Alamat <span className="text-red-500">*</span>  
              </label>  
              <textarea  
                name="alamat"  
                value={formData.alamat}  
                onChange={handleChange}  
                rows={3}  
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${  
                  errors.alamat ? 'border-red-500' : 'border-gray-300'  
                }`}  
                placeholder="Masukkan alamat lengkap"  
              />  
              {errors.alamat && (  
                <p className="mt-1 text-sm text-red-500">{errors.alamat}</p>  
              )}  
            </div>  

            <div>  
              <label className="block text-sm font-medium text-gray-700 mb-1">  
                No. Telepon <span className="text-red-500">*</span>  
              </label>  
              <input  
                type="tel"  
                name="phone"  
                value={formData.phone}  
                onChange={handleChange}  
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${  
                  errors.phone ? 'border-red-500' : 'border-gray-300'  
                }`}  
                placeholder="Contoh: 08123456789"  
              />  
              {errors.phone && (  
                <p className="mt-1 text-sm text-red-500">{errors.phone}</p>  
              )}  
            </div>  

            <div className="flex justify-end space-x-3 pt-4">  
              <button  
                type="button"  
                onClick={() => router.push('/customer')}  
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"  
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
    </div>  
  );  
}