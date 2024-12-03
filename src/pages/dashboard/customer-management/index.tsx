import LoadingSpinner from '@/components/LoadingSpinner';
import { Customer } from '@/models/customerModel';
import { CustomerService } from '@/services/customerService';
import { useAuth } from '@/utils/lib/AuthContext';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import CustomerGrid from './components/CustomerGrid';
import CustomerHeader from './components/CustomerHeader';
import CustomerSearch from './components/CustomerSearch';
import DeleteCustomerModal from './components/DeleteCustomerModal';
import EditCustomerModal from './components/EditCustomerModal';
import Head from 'next/head';

export default function CustomerPage() {  
  const router = useRouter();  
  const { isAuthenticated } = useAuth();  
  const [supervisor, setSupervisor] = useState(false);  
  const [customers, setCustomers] = useState<Customer[]>([]);  
  const [loading, setLoading] = useState(true);  
  const [showEditModal, setShowEditModal] = useState(false);  
  const [showDeleteModal, setShowDeleteModal] = useState(false);  
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);  
  const [searchTerm, setSearchTerm] = useState('');  
  const [sortField, setSortField] = useState<keyof Customer>('customer_name');  
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');  

  const [editForm, setEditForm] = useState({  
    customer_name: '',  
    alamat: '',  
    phone: '',  
  });  

  useEffect(() => {  
    checkUserRole();  
    if (!isAuthenticated) {  
      router.replace('/auth/sign-in');  
      return;  
    }  
    fetchCustomers();  
  }, [isAuthenticated, router]);  

  const checkUserRole = () => {  
    const token = localStorage.getItem('access_token');  
    if (token) {  
      try {  
        const payload = JSON.parse(atob(token.split('.')[1]));  
        setSupervisor(payload.role === 'supervisor');  
      } catch (error) {  
        console.error('Error decoding token:', error);  
      }  
    }  
  };  

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

  const handleDelete = (customer: Customer) => {  
    setSelectedCustomer(customer);  
    setShowDeleteModal(true);  
  };  

  const handleEditSubmit = async (editedData: typeof editForm) => {  
    if (!selectedCustomer) return;  

    try {  
      const response = await CustomerService.update(selectedCustomer.id, editedData);  
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

  const handleDeleteConfirm = async () => {  
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

  const handleSort = (field: keyof Customer) => {  
    if (sortField === field) {  
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');  
    } else {  
      setSortField(field);  
      setSortDirection('asc');  
    }  
  };  

  if (loading) {  
    return <LoadingSpinner />;  
  }  

  const sortedAndFilteredCustomers = customers  
    .filter(customer =>  
      customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||  
      customer.phone.includes(searchTerm)  
    )  
    .sort((a, b) => {  
      const aValue = a[sortField];  
      const bValue = b[sortField];  
      return sortDirection === 'asc'   
        ? String(aValue).localeCompare(String(bValue))  
        : String(bValue).localeCompare(String(aValue));  
    });  

  return (  
    <>
    <Head>  
        <title>Customer | ATK Inventory</title>  
        <meta name="description" content="Sign in to your account" />  
      </Head>  

     <div className="space-y-8">  
      <CustomerHeader   
        customerCount={sortedAndFilteredCustomers.length}  
        isSupervisor={supervisor}  
        onAddCustomer={() => router.push('/dashboard/customer-management/create')}  
      />  

      <CustomerSearch  
        searchTerm={searchTerm}  
        onSearchChange={setSearchTerm}  
        sortField={sortField}  
        onSortChange={handleSort}  
      />  

      <CustomerGrid  
        customers={sortedAndFilteredCustomers}  
        isSupervisor={supervisor}  
        onEdit={handleEdit}  
        onDelete={handleDelete}  
      />  

      {showEditModal && (  
        <EditCustomerModal  
          customer={selectedCustomer}  
          initialData={editForm}  
          onClose={() => setShowEditModal(false)}  
          onSubmit={handleEditSubmit}  
        />  
      )}  

      {showDeleteModal && (  
        <DeleteCustomerModal  
          customer={selectedCustomer}  
          onClose={() => setShowDeleteModal(false)}  
          onConfirm={handleDeleteConfirm}  
        />  
      )}  
    </div> 
    </>
    
  );  
}