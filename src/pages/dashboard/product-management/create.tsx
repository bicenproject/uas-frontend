 import Link from 'next/link';  
import { useRouter } from 'next/router';  
import { ProductForm } from './[action]';

export default function CreateProduct() {  
  const router = useRouter();  

  const handleSuccess = () => {  
    router.push('/dashboard/product-management');  
  };  

  return (  
    <div className="min-h-screen bg-gray-50 p-6">  
      <div className="mb-6">  
        <div className="flex items-center justify-between">  
          <h1 className="text-2xl font-bold text-gray-900">Tambah Produk</h1>  
          <Link  
            href="/dashboard/product-management"  
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"  
          >  
            Kembali  
          </Link>  
        </div>  
      </div>  

      <div className="rounded-lg bg-white p-6 shadow-md">  
        <ProductForm onSuccess={handleSuccess} />  
      </div>  
    </div>  
  );  
}