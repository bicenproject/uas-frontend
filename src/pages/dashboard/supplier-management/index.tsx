import React, { useEffect, useState } from 'react';  
import { useRouter } from 'next/router';  
import { toast } from 'sonner';  
import { Buildings } from '@phosphor-icons/react';  

import { SupplierService } from '@/services/supplierService';  
import { useAuth } from '@/utils/lib/AuthContext';  
import { dateUtils } from '@/utils/dateUtils';  
import { Supplier } from '@/models/supplierModel';  
import SupplierDeleteModal from './components/SupplierDeleteModal.tsx';
import SupplierEditModal from './components/SupplierEditModal';
import SupplierGrid from './components/SupplierGrid';
import SupplierHeader from './components/SupplierHeader';
import SupplierSearch from './components/SupplierSearch';
import Head from 'next/head.js';



export default function SupplierPage() {  
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);  
  const [filteredSuppliers, setFilteredSuppliers] = useState<Supplier[]>([]);  
  const [loading, setLoading] = useState(true);  
  const [supervisor, setSupervisor] = useState(false);  
  const [showDeleteModal, setShowDeleteModal] = useState(false);  
  const [showEditModal, setShowEditModal] = useState(false);  
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);  
  const [searchTerm, setSearchTerm] = useState('');  

  const router = useRouter();  
  const { isAuthenticated } = useAuth();  

  useEffect(() => {  
    if (!isAuthenticated) {  
      router.replace('auth/sign-in');  
      return;  
    }  
    fetchSuppliers();  
  }, [isAuthenticated, router]);  

  useEffect(() => {  
    const token = localStorage.getItem('access_token');  
    if (token) {  
      try {  
        const payload = JSON.parse(atob(token.split('.')[1]));  
        setSupervisor(payload.role === 'supervisor');  
      } catch (error) {  
        console.error('Error decoding token:', error);  
      }  
    }  
  }, []);  

  const fetchSuppliers = async () => {  
    try {  
      setLoading(true);  
      const response = await SupplierService.getAll();  
      setSuppliers(response.result);  
      setFilteredSuppliers(response.result);  
    } catch (error: any) {  
      toast.error(error.message || 'Gagal mengambil data supplier');  
    } finally {  
      setLoading(false);  
    }  
  };  

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {  
    const term = e.target.value.toLowerCase();  
    setSearchTerm(term);  
    
    const filtered = suppliers.filter((supplier) =>  
      supplier.name.toLowerCase().includes(term) ||  
      (supplier.address && supplier.address.toLowerCase().includes(term)) ||  
      (supplier.phone && supplier.phone.toLowerCase().includes(term)) ||  
      (supplier.business_license && supplier.business_license.toLowerCase().includes(term))  
    );  
    
    setFilteredSuppliers(filtered);  
  };  

  const handleEdit = (supplier: Supplier) => {  
    setSelectedSupplier(supplier);  
    setShowEditModal(true);  
  };  

  const handleDelete = (supplier: Supplier) => {  
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
      toast.error(error.message || 'Gagal menghapus supplier');  
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
    <>
      <Head>  
        <title>Supploer | ATK Inventory</title>  
        <meta name="description" content="Sign in to your account" />  
      </Head>  
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">  
      <SupplierHeader   
        supervisor={supervisor}   
        router={router}   
        totalSuppliers={filteredSuppliers.length}   
      />  

      <SupplierSearch   
        searchTerm={searchTerm}   
        onSearch={handleSearch}   
      />  

      <SupplierGrid  
        suppliers={filteredSuppliers}  
        supervisor={supervisor}  
        onEdit={handleEdit}  
        onDelete={handleDelete}  
        searchTerm={searchTerm}  
        router={router}  
      />  

      {selectedSupplier && (  
        <SupplierEditModal  
          supplier={selectedSupplier}  
          isOpen={showEditModal}  
          onClose={() => {  
            setShowEditModal(false);  
            setSelectedSupplier(null);  
          }}  
          onSuccess={() => {  
            fetchSuppliers();  
            setShowEditModal(false);  
            setSelectedSupplier(null);  
          }}  
        />  
      )}  

      <SupplierDeleteModal  
        isOpen={showDeleteModal}  
        supplier={selectedSupplier}  
        onClose={() => {  
          setShowDeleteModal(false);  
          setSelectedSupplier(null);  
        }}  
        onConfirm={confirmDelete}  
      />  
    </div>  
    </>
    
  );  
}  
