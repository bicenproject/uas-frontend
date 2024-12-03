import { useState, useEffect } from 'react';  
import { toast } from 'sonner';  
import { CustomerService } from '@/services/customerService';  
import { Customer } from '@/models/customerModel';

interface CustomerFormModalProps {  
  customer?: Customer | null;  
  isOpen: boolean;  
  onClose: () => void;  
  onSuccess: () => void;  
}  

export function CustomerFormModal({  
  customer,  
  isOpen,  
  onClose,  
  onSuccess,  
}: CustomerFormModalProps) {  
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

  useEffect(() => {  
    if (customer) {  
      setFormData({  
        customer_name: customer.customer_name,  
        alamat: customer.alamat,  
        phone: customer.phone,  
      });  
    } else {  
      setFormData({  
        customer_name: '',  
        alamat: '',  
        phone: '',  
      });  
    }  
    setErrors({  
      customer_name: '',  
      alamat: '',  
      phone: '',  
    });  
  }, [customer]);  

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
      if (customer) {  
        const response = await CustomerService.update(customer.id, formData);  
        if (response.status.code === 200) {  
          toast.success('Customer berhasil diupdate');  
          onSuccess();  
        } else {  
          toast.error(response.status.description || 'Gagal mengupdate customer');  
        }  
      } else {  
        const response = await CustomerService.create(formData);  
        if (response.status.code === 200) {  
          toast.success('Customer berhasil ditambahkan');  
          onSuccess();  
        } else {  
          toast.error(response.status.description || 'Gagal menambahkan customer');  
        }  
      }  
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
    setErrors(prev => ({  
      ...prev,  
      [name]: ''  
    }));  
  };  

  if (!isOpen) return null;  

  return (  
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">  
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">  
        <div className="flex justify-between items-center mb-6">  
          <h2 className="text-xl font-semibold">  
            {customer ? 'Edit Customer' : 'Tambah Customer'}  
          </h2>  
          <button  
            onClick={onClose}  
            className="text-gray-500 hover:text-gray-700"  
          >  
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />  
            </svg>  
          </button>  
        </div>  

        <form onSubmit={handleSubmit} className="space-y-4">  
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
              onClick={onClose}  
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