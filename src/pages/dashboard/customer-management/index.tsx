import { useEffect, useState } from 'react';  
import { useRouter } from 'next/router';  
import { toast } from 'sonner';  
import { useAuth } from '@/utils/lib/AuthContext';  
import { CustomerService } from '@/services/customerService';  
import { Customer } from '@/models/customerModel';

export default function CustomerPage() {  
  const router = useRouter();  
  const { isAuthenticated } = useAuth();  
  const [supervisor, setSupervisor] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);  
  const [loading, setLoading] = useState(true);  
  const [showEditModal, setShowEditModal] = useState(false);  
  const [showDeleteModal, setShowDeleteModal] = useState(false);  
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);  
  const [editForm, setEditForm] = useState({  
    customer_name: '',  
    alamat: '',  
    phone: '',  
  });  
  const [editErrors, setEditErrors] = useState({  
    customer_name: '',  
    alamat: '',  
    phone: '',  
  });  

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


  useEffect(() => {  
    if (!isAuthenticated) {  
      router.replace('auth/sign-in');  
      return;  
    }  
    fetchCustomers();  
  }, [isAuthenticated, router]);  

  const fetchCustomers = async () => {  
    try {  
      setLoading(true);  
      const response = await CustomerService.getAll();  
      if (response.status.code === 200) {  
        setCustomers(response.result);  
      } else {  
        toast.error(response.status.description || 'Gagal mengambil data customer');  
      }  
    } catch (error: any) {  
      toast.error(error.message || 'Gagal mengambil data customer');  
    } finally {  
      setLoading(false);  
    }  
  };  

  const handleEdit = (customer: Customer) => {  
    setSelectedCustomer(customer);  
    setEditForm({  
      customer_name: customer.customer_name,  
      alamat: customer.alamat,  
      phone: customer.phone,  
    });  
    setShowEditModal(true);  
  };  

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {  
    const { name, value } = e.target;  
    setEditForm(prev => ({  
      ...prev,  
      [name]: value  
    }));  
    setEditErrors(prev => ({  
      ...prev,  
      [name]: ''  
    }));  
  };  

  const validateEditForm = () => {  
    const newErrors = {  
      customer_name: '',  
      alamat: '',  
      phone: '',  
    };  
    let isValid = true;  

    if (!editForm.customer_name.trim()) {  
      newErrors.customer_name = 'Nama customer harus diisi';  
      isValid = false;  
    }  

    if (!editForm.alamat.trim()) {  
      newErrors.alamat = 'Alamat harus diisi';  
      isValid = false;  
    }  

    if (!editForm.phone.trim()) {  
      newErrors.phone = 'Nomor telepon harus diisi';  
      isValid = false;  
    } else if (!/^[0-9]{10,13}$/.test(editForm.phone)) {  
      newErrors.phone = 'Nomor telepon harus 10-13 digit';  
      isValid = false;  
    }  

    setEditErrors(newErrors);  
    return isValid;  
  };  

  const handleEditSubmit = async (e: React.FormEvent) => {  
    e.preventDefault();  
    if (!validateEditForm() || !selectedCustomer) return;  

    try {  
      const response = await CustomerService.update(selectedCustomer.id, editForm);  
      if (response.status.code === 200) {  
        toast.success('Customer berhasil diupdate');  
        setShowEditModal(false);  
        fetchCustomers();  
      } else {  
        toast.error(response.status.description || 'Gagal mengupdate customer');  
      }  
    } catch (error: any) {  
      toast.error(error.message || 'Gagal mengupdate customer');  
    }  
  };  

  const handleDelete = (customer: Customer) => {  
    setSelectedCustomer(customer);  
    setShowDeleteModal(true);  
  };  

  const confirmDelete = async () => {  
    if (!selectedCustomer) return;  

    try {  
      const response = await CustomerService.delete(selectedCustomer.id);  
      if (response.status.code === 200) {  
        toast.success('Customer berhasil dihapus');  
        fetchCustomers();  
      } else {  
        toast.error(response.status.description || 'Gagal menghapus customer');  
      }  
    } catch (error: any) {  
      toast.error(error.message || 'Gagal menghapus customer');  
    } finally {  
      setShowDeleteModal(false);  
      setSelectedCustomer(null);  
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
        <h1 className="text-2xl font-bold">Daftar Customer</h1>  
        {!isSupervisor && ( 
        <button  
          onClick={() => router.push('/dashboard/customer-management/create')}  
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"  
        >  
          Tambah Customer  
        </button>  
        )}
      </div>  

      <div className="overflow-x-auto bg-white rounded-lg shadow">  
        <table className="min-w-full">  
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
              {!isSupervisor && ( 
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">  
                Aksi  
              </th> 
              )} 
            </tr>  
          </thead>  
          <tbody className="bg-white divide-y divide-gray-200">  
            {customers.map((customer) => (  
              <tr key={customer.id} className="hover:bg-gray-50">  
                <td className="px-6 py-4 whitespace-nowrap">  
                  <div className="text-sm font-medium text-gray-900">  
                    {customer.customer_name}  
                  </div>  
                </td>  
                <td className="px-6 py-4">  
                  <div className="text-sm text-gray-900">{customer.alamat}</div>  
                </td>  
                <td className="px-6 py-4 whitespace-nowrap">  
                  <div className="text-sm text-gray-900">{customer.phone}</div>  
                </td>  
                <td className="px-6 py-4 whitespace-nowrap text-center">  
                  {!isSupervisor && ( 
                  <div className="flex justify-center space-x-2">  
                    <button  
                      onClick={() => handleEdit(customer)}  
                      className="text-blue-600 hover:text-blue-800"  
                    >  
                      Edit  
                    </button>  
                    <button  
                      onClick={() => handleDelete(customer)}  
                      className="text-red-600 hover:text-red-800"  
                    >  
                      Hapus  
                    </button>  
                  </div>  
                )}
                </td>  
              </tr>  
            ))}  
          </tbody>  
        </table>  
      </div>  

      {/* Modal Edit */}  
      {showEditModal && (  
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">  
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">  
            <div className="flex justify-between items-center mb-4">  
              <h3 className="text-lg font-semibold">Edit Customer</h3>  
              <button  
                onClick={() => setShowEditModal(false)}  
                className="text-gray-500 hover:text-gray-700"  
              >  
                ×  
              </button>  
            </div>  

            <form onSubmit={handleEditSubmit} className="space-y-4">  
              <div>  
                <label className="block text-sm font-medium text-gray-700 mb-1">  
                  Nama Customer <span className="text-red-500">*</span>  
                </label>  
                <input  
                  type="text"  
                  name="customer_name"  
                  value={editForm.customer_name}  
                  onChange={handleEditChange}  
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${  
                    editErrors.customer_name ? 'border-red-500' : 'border-gray-300'  
                  }`}  
                />  
                {editErrors.customer_name && (  
                  <p className="mt-1 text-sm text-red-500">{editErrors.customer_name}</p>  
                )}  
              </div>  

              <div>  
                <label className="block text-sm font-medium text-gray-700 mb-1">  
                  Alamat <span className="text-red-500">*</span>  
                </label>  
                <textarea  
                  name="alamat"  
                  value={editForm.alamat}  
                  onChange={handleEditChange}  
                  rows={3}  
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${  
                    editErrors.alamat ? 'border-red-500' : 'border-gray-300'  
                  }`}  
                />  
                {editErrors.alamat && (  
                  <p className="mt-1 text-sm text-red-500">{editErrors.alamat}</p>  
                )}  
              </div>  

              <div>  
                <label className="block text-sm font-medium text-gray-700 mb-1">  
                  No. Telepon <span className="text-red-500">*</span>  
                </label>  
                <input  
                  type="tel"  
                  name="phone"  
                  value={editForm.phone}  
                  onChange={handleEditChange}  
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${  
                    editErrors.phone ? 'border-red-500' : 'border-gray-300'  
                  }`}  
                />  
                {editErrors.phone && (  
                  <p className="mt-1 text-sm text-red-500">{editErrors.phone}</p>  
                )}  
              </div>  

              <div className="flex justify-end space-x-3 pt-4">  
                <button  
                  type="button"  
                  onClick={() => setShowEditModal(false)}  
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"  
                >  
                  Batal  
                </button>  
                <button  
                  type="submit"  
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"  
                >  
                  Update  
                </button>  
              </div>  
            </form>  
          </div>  
        </div>  
      )}  

      {/* Modal Delete */}  
      {showDeleteModal && (  
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">  
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">  
            <h3 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h3>  
            <p className="text-gray-600 mb-6">  
              Apakah Anda yakin ingin menghapus customer{' '}  
              <span className="font-semibold">  
                {selectedCustomer?.customer_name}  
              </span>  
              ?  
            </p>  
            <div className="flex justify-end space-x-3">  
              <button  
                onClick={() => {  
                  setShowDeleteModal(false);  
                  setSelectedCustomer(null);  
                }}  
                className="px-4 py-2 text-gray-600 hover:text-gray-800"  
              >  
                Batal  
              </button>  
              <button  
                onClick={confirmDelete}  
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"  
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