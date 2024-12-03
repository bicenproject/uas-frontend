import { useEffect, useState } from 'react';  
import { toast } from 'sonner';  
import { SupplierService } from '@/services/supplierService';  
import { dateUtils } from '@/utils/dateUtils';  
import { Supplier } from '@/models/supplierModel';

interface SupplierEditModalProps {  
  supplier: Supplier;  
  isOpen: boolean;  
  onClose: () => void;  
  onSuccess: () => void;  
}  

export function SupplierEditModal({   
  supplier,   
  isOpen,   
  onClose,   
  onSuccess   
}: SupplierEditModalProps) {  
  const [loading, setLoading] = useState(false);  
  const [formData, setFormData] = useState({  
    name: '',  
    address: '',  
    phone: '',  
    description: '',  
    established_date: '',  
    business_license: ''  
  });  

  useEffect(() => {  
    if (supplier) {  
      setFormData({  
        name: supplier.name || '',  
        address: supplier.address || '',  
        phone: supplier.phone || '',  
        description: supplier.description || '',  
        established_date: supplier.established_date ?   
          dateUtils.formatToHTMLDate(supplier.established_date) : '',  
        business_license: supplier.business_license || ''  
      });  
    }  
  }, [supplier]);  

  const handleSubmit = async (e: React.FormEvent) => {  
    e.preventDefault();  
    setLoading(true);  

    try {  
      await SupplierService.update(supplier.id, formData);  
      toast.success('Supplier berhasil diupdate');  
      onSuccess();  
      onClose();  
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

  if (!isOpen) return null;  

  return (  
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">  
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">  
        <div className="flex justify-between items-center mb-6">  
          <h2 className="text-xl font-semibold">Edit Supplier</h2>  
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