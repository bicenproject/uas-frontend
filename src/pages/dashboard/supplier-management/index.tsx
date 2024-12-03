import { useEffect, useState } from 'react';  
import { useRouter } from 'next/router';  
import { toast } from 'sonner';  
import { SupplierService } from '@/services/supplierService';  
import { useAuth } from '@/utils/lib/AuthContext';  
import { dateUtils } from '@/utils/dateUtils';  
import { SupplierEditModal } from './components/SupplierEditModal';
import { Supplier } from '@/models/supplierModel';

export default function SupplierPage() {  
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);  
  const [loading, setLoading] = useState(true);  
  const [supervisor, setSupervisor] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);  
  const [showEditModal, setShowEditModal] = useState(false);  
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);  
  const router = useRouter();  
  const { isAuthenticated } = useAuth();  

  useEffect(() => {  
    if (!isAuthenticated) {  
      router.replace('/signin');  
      return;  
    }  
    fetchSuppliers();  
  }, [isAuthenticated, router]);  

  useEffect(() => {  
    const token = localStorage.getItem('access_token');  
    console.log('Access Token:', token);  

   if (token) {  
    try {  
      const payload = JSON.parse(atob(token.split('.')[1]));
      setSupervisor(payload.role === 'supervisor');
      console.log('Token Payload:', payload);  
      console.log('User Role:', payload.role);  
    } catch (error) {  
      console.error('Error decoding token:', error);  
    }  
  }  
}, []);  

const isSupervisor = supervisor; 

  const fetchSuppliers = async () => {  
    try {  
      setLoading(true);  
      const response = await SupplierService.getAll();  
      setSuppliers(response.result);  
    } catch (error: any) {  
      toast.error(error.message);  
    } finally {  
      setLoading(false);  
    }  
  };  

  const handleEdit = (supplier: Supplier) => {  
    setSelectedSupplier(supplier);  
    setShowEditModal(true);  
  };  

  const handleDelete = async (supplier: Supplier) => {  
    setSelectedSupplier(supplier);  
    setShowDeleteModal(true);  
  };  

  const confirmDelete = async () => {  
    if (!selectedSupplier) return;  

    try {  
      await SupplierService.delete(selectedSupplier.id);  
      toast.success('Supplier berhasil dihapus');  
      fetchSuppliers();  
    } catch (error: any) {  
      toast.error(error.message);  
    } finally {  
      setShowDeleteModal(false);  
      setSelectedSupplier(null);  
    }  
  };  

  if (loading) {  
    return (  
      <div className="flex items-center justify-center min-h-screen">  
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>  
      </div>  
    );  
  }  

  return (  
    <div className="container mx-auto px-4 py-8">  
      <div className="flex justify-between items-center mb-6">  
        <h1 className="text-2xl font-bold">Daftar Supplier</h1>  
        {!isSupervisor && ( 
        <button  
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"  
          onClick={() => router.push('/dashboard/supplier-management/create')}  
        >  
          Tambah Supplier  
        </button>  
        )}
      </div>  

      <div className="bg-white rounded-lg shadow overflow-hidden">  
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
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">  
                    Tidak ada data supplier  
                  </td>  
                </tr>  
              ) : (  
                suppliers.map((supplier) => (  
                  <tr key={supplier.id} className="hover:bg-gray-50">  
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
                    <td className="px-6 py-4 whitespace-nowrap text-center">  
                    {!isSupervisor && ( 
                      <div className="flex justify-center space-x-2">  
                        <button  
                          onClick={() => handleEdit(supplier)}  
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"  
                        >  
                          Edit  
                        </button>  
                        <button  
                          onClick={() => handleDelete(supplier)}  
                          className="text-red-600 hover:text-red-800 text-sm font-medium"  
                        >  
                          Hapus  
                        </button>  
                      </div>  
                    )}
                    </td>  
                  </tr>  
                ))  
              )}  
            </tbody>  
          </table>  
        </div>  
      </div>  

      {/* Modal Edit */}  
      {selectedSupplier && (  
        <SupplierEditModal  
          supplier={selectedSupplier}  
          isOpen={showEditModal}  
          onClose={() => {  
            setShowEditModal(false);  
            setSelectedSupplier(null);  
          }}  
          onSuccess={fetchSuppliers}  
        />  
      )}  

      {showDeleteModal && (  
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">  
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">  
            <h3 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h3>  
            <p className="text-gray-600 mb-6">  
              Apakah Anda yakin ingin menghapus supplier{' '}  
              <span className="font-semibold">{selectedSupplier?.name}</span>?  
            </p>  
            <div className="flex justify-end space-x-3">  
              <button  
                onClick={() => {  
                  setShowDeleteModal(false);  
                  setSelectedSupplier(null);  
                }}  
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"  
              >  
                Batal  
              </button>  
              <button  
                onClick={confirmDelete}  
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 font-medium transition-colors"  
              >  
                Hapus  
              </button>  
            </div>  
          </div>  
        </div>  
      )}  
    </div>  
  );  
}