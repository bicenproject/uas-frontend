import { WarningCircle, Trash } from '@phosphor-icons/react';  
import { Customer } from '@/models/customerModel';  

interface DeleteCustomerModalProps {  
  customer: Customer | null;  
  onClose: () => void;  
  onConfirm: () => Promise<void>;  
}  

export default function DeleteCustomerModal({  
  customer,  
  onClose,  
  onConfirm  
}: DeleteCustomerModalProps) {  
  if (!customer) return null;  

  return (  
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">  
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full">  
        <div className="flex items-center gap-3 mb-6">  
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">  
            <WarningCircle weight="bold" className="w-6 h-6" />  
          </div>  
          <div>  
            <h3 className="text-lg font-semibold text-gray-800">  
              Konfirmasi Hapus  
            </h3>  
            <p className="text-sm text-gray-600">  
              Apakah Anda yakin ingin menghapus customer ini?  
            </p>  
          </div>  
        </div>  
        
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">  
          <div className="space-y-2">  
            <p className="text-sm">  
              <span className="font-medium text-gray-700">Nama:</span>{' '}  
              <span className="text-gray-900">{customer.customer_name}</span>  
            </p>  
            <p className="text-sm">  
              <span className="font-medium text-gray-700">Telepon:</span>{' '}  
              <span className="text-gray-900">{customer.phone}</span>  
            </p>  
            <p className="text-sm">  
              <span className="font-medium text-gray-700">Alamat:</span>{' '}  
              <span className="text-gray-900">{customer.alamat}</span>  
            </p>  
          </div>  
        </div>  

        <div className="flex justify-end gap-3">  
          <button  
            onClick={onClose}  
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"  
          >  
            Batal  
          </button>  
          <button  
            onClick={onConfirm}  
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"  
          >  
            <Trash className="w-4 h-4" />  
            Hapus  
          </button>  
        </div>  
      </div>  
    </div>  
  );  
}