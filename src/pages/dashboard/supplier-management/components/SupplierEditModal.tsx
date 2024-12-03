import React, { useState, useEffect } from 'react';  
import { Supplier } from '@/models/supplierModel';  
import { SupplierService } from '@/services/supplierService';  
import { toast } from 'sonner';  
import { PencilSimple, X } from '@phosphor-icons/react';  

interface SupplierEditModalProps {  
  supplier: Supplier;  
  isOpen: boolean;  
  onClose: () => void;  
  onSuccess: () => void;  
}  

const SupplierEditModal: React.FC<SupplierEditModalProps> = ({  
  supplier,  
  isOpen,  
  onClose,  
  onSuccess  
}) => {  
  const [formData, setFormData] = useState<Partial<Supplier>>({  
    name: supplier.name,  
    address: supplier.address || '',  
    phone: supplier.phone || '',  
    established_date: supplier.established_date || '',  
    business_license: supplier.business_license || ''  
  });  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {  
    const { name, value } = e.target;  
    setFormData(prev => ({  
      ...prev,  
      [name]: value  
    }));  
  };  

  const handleSubmit = async (e: React.FormEvent) => {  
    e.preventDefault();  
    try {  
      await SupplierService.update(supplier.id, formData);  
      toast.success('Supplier berhasil diperbarui');  
      onSuccess();  
    } catch (error: any) {  
      toast.error(error.message || 'Gagal memperbarui supplier');  
    }  
  };  

  if (!isOpen) return null;  

  return (  
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">  
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full">  
        <div className="p-6">  
          <div className="flex justify-between items-center mb-6">  
            <div className="flex items-center gap-3">  
              <PencilSimple className="w-6 h-6 text-blue-600" />  
              <h3 className="text-lg font-semibold text-gray-800">  
                Edit Supplier  
              </h3>  
            </div>  
            <button   
              onClick={onClose}  
              className="text-gray-500 hover:text-gray-700 transition-colors"  
            >  
              <X className="w-6 h-6" />  
            </button>  
          </div>  

          <form onSubmit={handleSubmit} className="space-y-4">  
            <div>  
              <label className="block text-sm font-medium text-gray-700 mb-2">  
                Nama Supplier  
              </label>  
              <input  
                type="text"  
                name="name"  
                value={formData.name}  
                onChange={handleChange}  
                required  
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"  
              />  
            </div>  

            <div>  
              <label className="block text-sm font-medium text-gray-700 mb-2">  
                Alamat  
              </label>  
              <input  
                type="text"  
                name="address"  
                value={formData.address}  
                onChange={handleChange}  
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"  
              />  
            </div>  

            <div>  
              <label className="block text-sm font-medium text-gray-700 mb-2">  
                Telepon  
              </label>  
              <input  
                type="text"  
                name="phone"  
                value={formData.phone}  
                onChange={handleChange}  
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"  
              />  
            </div>  

            <div>  
              <label className="block text-sm font-medium text-gray-700 mb-2">  
                Tanggal Berdiri  
              </label>  
              <input  
                type="date"  
                name="established_date"  
                value={formData.established_date}  
                onChange={handleChange}  
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"  
              />  
            </div>  

            <div>  
              <label className="block text-sm font-medium text-gray-700 mb-2">  
                Nomor Izin Usaha  
              </label>  
              <input  
                type="text"  
                name="business_license"  
                value={formData.business_license}  
                onChange={handleChange}  
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"  
              />  
            </div>  

            <div className="flex justify-end gap-3 pt-4">  
              <button  
                type="button"  
                onClick={onClose}  
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"  
              >  
                Batal  
              </button>  
              <button  
                type="submit"  
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"  
              >  
                Simpan Perubahan  
              </button>  
            </div>  
          </form>  
        </div>  
      </div>  
    </div>  
  );  
};  

export default SupplierEditModal;