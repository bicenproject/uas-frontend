import { useEffect, useState } from 'react';  
import { Product, ProductService } from '@/services/productService';  
import { toast } from 'sonner';  
import Link from 'next/link';  
import { Modal } from '@/components/Modal';  
import { formatPrice } from '@/utils/formatPrice';  
import { ProductForm } from './[action]';  
import { DeleteConfirmationModal } from './components/DeleteConfirmationModal';  
 
export default function ProductList() {  
  const [products, setProducts] = useState<Product[]>([]);  
  const [supervisor, setSupervisor] = useState(false);
  const [loading, setLoading] = useState(true);  
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; product?: Product }>({  
    isOpen: false,  
  });  
  const [editModal, setEditModal] = useState<{ isOpen: boolean; product?: Product }>({  
    isOpen: false,  
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
    fetchProducts();  
  }, []);  

  const fetchProducts = async () => {  
    try {  
      setLoading(true);  
      const data = await ProductService.getAll();  
      setProducts(data);  
    } catch (error: any) {  
      toast.error(error.message);  
    } finally {  
      setLoading(false);  
    }  
  };  

  const handleDelete = async () => {  
    if (!deleteModal.product) return;  

    try {  
      await ProductService.delete(deleteModal.product.id);  
      toast.success('Produk berhasil dihapus');  
      setDeleteModal({ isOpen: false });  
      fetchProducts();  
    } catch (error: any) {  
      toast.error(error.message);  
    }  
  };  

  const handleEditSuccess = () => {  
    setEditModal({ isOpen: false });  
    fetchProducts();  
  };  

  if (loading) {  
    return (  
      <div className="flex h-screen items-center justify-center">  
        <div className="text-center">  
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>  
          <p className="mt-2">Loading...</p>  
        </div>  
      </div>  
    );  
  }  

  return (  
    <div className="container mx-auto p-6">  
      <div className="mb-6 flex items-center justify-between">  
        <h1 className="text-2xl font-bold">Daftar Produk</h1>  
        {!isSupervisor && ( 
          <Link  
            href="/dashboard/product-management/create"  
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"  
          >  
            Tambah Produk  
          </Link>  
        )}  
      </div>  

      <div className="overflow-x-auto rounded-lg shadow">  
        <table className="min-w-full divide-y divide-gray-200">  
          <thead className="bg-gray-50">  
            <tr>  
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">  
                Gambar  
              </th>  
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">  
                Nama Barang  
              </th>  
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">  
                Kategori  
              </th>  
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">  
                Harga Beli  
              </th>  
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">  
                Harga Jual  
              </th>  
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">  
                Stok  
              </th>  
              {!isSupervisor && ( 
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">  
                  Aksi  
                </th>  
              )}  
            </tr>  
          </thead>  
          <tbody className="divide-y divide-gray-200 bg-white">  
            {products.map((product) => (  
              <tr key={product.id}>  
                <td className="px-6 py-4 whitespace-nowrap">  
                  <div className="h-16 w-16 relative">  
                    <img  
                      src={product.image || '/images/placeholder.png'}  
                      alt={product.nama_barang}  
                      className="h-full w-full object-cover rounded"  
                    />  
                  </div>  
                </td>  
                <td className="px-6 py-4 whitespace-nowrap">{product.nama_barang}</td>  
                <td className="px-6 py-4 whitespace-nowrap">{product.category?.name}</td>  
                <td className="px-6 py-4 whitespace-nowrap">{formatPrice(product.harga_beli)}</td>  
                <td className="px-6 py-4 whitespace-nowrap">{formatPrice(product.harga_jual)}</td>  
                <td className="px-6 py-4 whitespace-nowrap">{product.stock}</td>  
                {!isSupervisor && ( 
                  <td className="px-6 py-4 whitespace-nowrap">  
                    <div className="flex space-x-2">  
                      <button  
                        onClick={() => setEditModal({ isOpen: true, product })}  
                        className="text-blue-600 hover:text-blue-900"  
                      >  
                        Edit  
                      </button>  
                      <button  
                        onClick={() => setDeleteModal({ isOpen: true, product })}  
                        className="text-red-600 hover:text-red-900"  
                      >  
                        Hapus  
                      </button>  
                    </div>  
                  </td>  
                )}  
              </tr>  
            ))}  
          </tbody>  
        </table>  
      </div>  

      {!isSupervisor && (  
        <>  
          <DeleteConfirmationModal  
            isOpen={deleteModal.isOpen}  
            onClose={() => setDeleteModal({ isOpen: false })}  
            onConfirm={handleDelete}  
            title="Hapus Produk"  
            message={`Apakah Anda yakin ingin menghapus produk "${deleteModal.product?.nama_barang}"?`}  
          />  

          <Modal  
            isOpen={editModal.isOpen}  
            onClose={() => setEditModal({ isOpen: false })}  
            title="Edit Produk"  
          >  
            <ProductForm  
              initialData={editModal.product}  
              onSuccess={handleEditSuccess}  
              onCancel={() => setEditModal({ isOpen: false })}  
              isModal  
            />  
          </Modal>  
        </>  
      )}  
    </div>  
  );  
}