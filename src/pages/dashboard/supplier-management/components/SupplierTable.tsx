import { dateUtils } from '@/utils/dateUtils';  
import { Supplier } from '@/models/supplierModel';  
import { PencilSimple, Trash } from '@phosphor-icons/react';  

interface SupplierTableProps {  
  suppliers: Supplier[];  
  isSupervisor: boolean;  
  onEdit: (supplier: Supplier) => void;  
  onDelete: (supplier: Supplier) => void;  
}  

export default function SupplierTable({  
  suppliers,  
  isSupervisor,  
  onEdit,  
  onDelete  
}: SupplierTableProps) {  
  return (  
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">  
      <div className="overflow-x-auto">  
        <table className="min-w-full divide-y divide-gray-200">  
          <thead className="bg-gray-50">  
            <tr>  
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">  
                Nama  
              </th>  
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">  
                Alamat  
              </th>  
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">  
                Telepon  
              </th>  
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">  
                Tanggal Berdiri  
              </th>  
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">  
                No. Izin Usaha  
              </th>  
              {!isSupervisor && (  
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">  
                  Aksi  
                </th>  
              )}  
            </tr>  
          </thead>  
          <tbody className="bg-white divide-y divide-gray-200">  
            {suppliers.length === 0 ? (  
              <tr>  
                <td  
                  colSpan={6}  
                  className="px-6 py-12 text-center text-gray-500 bg-gray-50"  
                >  
                  <div className="flex flex-col items-center justify-center">  
                    <svg  
                      className="w-12 h-12 text-gray-400 mb-4"  
                      fill="none"  
                      stroke="currentColor"  
                      viewBox="0 0 24 24"  
                    >  
                      <path  
                        strokeLinecap="round"  
                        strokeLinejoin="round"  
                        strokeWidth={2}  
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"  
                      />  
                    </svg>  
                    <p className="text-lg font-medium text-gray-900 mb-1">  
                      Tidak ada data supplier  
                    </p>  
                    <p className="text-sm text-gray-500">  
                      Mulai dengan menambahkan supplier baru  
                    </p>  
                  </div>  
                </td>  
              </tr>  
            ) : (  
              suppliers.map((supplier) => (  
                <tr  
                  key={supplier.id}  
                  className="hover:bg-gray-50 transition-colors"  
                >  
                  <td className="px-6 py-4 whitespace-nowrap">  
                    <div className="text-sm font-medium text-gray-900">  
                      {supplier.name}  
                    </div>  
                  </td>  
                  <td className="px-6 py-4">  
                    <div className="text-sm text-gray-900">  
                      {supplier.address || '-'}  
                    </div>  
                  </td>  
                  <td className="px-6 py-4 whitespace-nowrap">  
                    <div className="text-sm text-gray-900">  
                      {supplier.phone || '-'}  
                    </div>  
                  </td>  
                  <td className="px-6 py-4 whitespace-nowrap">  
                    <div className="text-sm text-gray-900">  
                      {supplier.established_date  
                        ? dateUtils.formatToID(supplier.established_date)  
                        : '-'}  
                    </div>  
                  </td>  
                  <td className="px-6 py-4 whitespace-nowrap">  
                    <div className="text-sm text-gray-900">  
                      {supplier.business_license || '-'}  
                    </div>  
                  </td>  
                  {!isSupervisor && (  
                    <td className="px-6 py-4 whitespace-nowrap text-center">  
                      <div className="flex justify-center space-x-2">  
                        <button  
                          onClick={() => onEdit(supplier)}  
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"  
                          title="Edit Supplier"  
                        >  
                          <PencilSimple className="w-5 h-5" />  
                        </button>  
                        <button  
                          onClick={() => onDelete(supplier)}  
                          className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"  
                          title="Hapus Supplier"  
                        >  
                          <Trash className="w-5 h-5" />  
                        </button>  
                      </div>  
                    </td>  
                  )}  
                </tr>  
              ))  
            )}  
          </tbody>  
        </table>  
      </div>  
    </div>  
  );  
}