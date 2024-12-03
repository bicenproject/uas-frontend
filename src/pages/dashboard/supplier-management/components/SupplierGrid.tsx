import React from 'react';  
import { NextRouter } from 'next/router';  
import { Supplier } from '@/models/supplierModel';  
import { dateUtils } from '@/utils/dateUtils';  
import { PencilSimple, Trash, Buildings, Plus } from '@phosphor-icons/react';  

interface SupplierGridProps {  
  suppliers: Supplier[];  
  supervisor: boolean;  
  onEdit: (supplier: Supplier) => void;  
  onDelete: (supplier: Supplier) => void;  
  searchTerm: string;  
  router: NextRouter;  
}  

const SupplierGrid: React.FC<SupplierGridProps> = ({  
  suppliers,  
  supervisor,  
  onEdit,  
  onDelete,  
  searchTerm,  
  router  
}) => {  
  if (suppliers.length === 0) {  
    return (  
      <div className="text-center py-12 bg-white rounded-lg shadow-sm">  
        <Buildings className="mx-auto h-12 w-12 text-gray-400" weight="thin" />  
        <h3 className="mt-4 text-lg font-medium text-gray-900">  
          {searchTerm ? 'Tidak ada supplier yang cocok' : 'Belum ada supplier'}  
        </h3>  
        <p className="mt-2 text-sm text-gray-500">  
          {searchTerm  
            ? `Tidak ada supplier yang sesuai dengan "${searchTerm}"`  
            : 'Mulai dengan menambahkan supplier pertama Anda.'}  
        </p>  
        {!supervisor && !searchTerm && (  
          <button  
            onClick={() => router.push('/dashboard/supplier-management/create')}  
            className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"  
          >  
            <Plus className="mr-2 w-5 h-5" />  
            Tambah Supplier  
          </button>  
        )}  
      </div>  
    );  
  }  

  return (  
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">  
      {suppliers.map((supplier) => (  
        <div  
          key={supplier.id}  
          className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1"  
        >  
          <div className="p-6">  
            <div className="flex justify-between items-start mb-4">  
              <div>  
                <h3 className="text-lg font-semibold text-gray-900">  
                  {supplier.name}  
                </h3>  
              </div>  
              {!supervisor && (  
                <div className="flex gap-2">  
                  <button  
                    onClick={() => onEdit(supplier)}  
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"  
                    title="Edit Supplier"  
                  >  
                    <PencilSimple className="w-5 h-5" />  
                  </button>  
                  <button  
                    onClick={() => onDelete(supplier)}  
                    className="p-1 text-red-600 hover:bg-red-50 rounded-full transition-colors"  
                    title="Hapus Supplier"  
                  >  
                    <Trash className="w-5 h-5" />  
                  </button>  
                </div>  
              )}  
            </div>  

            <div className="space-y-3">  
              <div>  
                <label className="text-xs text-gray-500 block mb-1">Alamat</label>  
                <p className="text-sm text-gray-900 truncate">  
                  {supplier.address || '-'}  
                </p>  
              </div>  
              <div>  
                <label className="text-xs text-gray-500 block mb-1">Telepon</label>  
                <p className="text-sm text-gray-900">  
                  {supplier.phone || '-'}  
                </p>  
              </div>  
              <div>  
                <label className="text-xs text-gray-500 block mb-1">Tanggal Berdiri</label>  
                <p className="text-sm text-gray-900">  
                  {supplier.established_date  
                    ? dateUtils.formatToID(supplier.established_date)  
                    : '-'}  
                </p>  
              </div>  
              <div>  
                <label className="text-xs text-gray-500 block mb-1">No. Izin Usaha</label>  
                <p className="text-sm text-gray-900 truncate">  
                  {supplier.business_license || '-'}  
                </p>  
              </div>  
            </div>  
          </div>  
        </div>  
      ))}  
    </div>  
  );  
};  

export default SupplierGrid;