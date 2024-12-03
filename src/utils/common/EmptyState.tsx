import { Plus, Users } from '@phosphor-icons/react';  
import { useRouter } from 'next/router';  

interface EmptyStateProps {  
  searchTerm?: string;  
  isSupervisor?: boolean;  
}  

export default function EmptyState({ searchTerm, isSupervisor }: EmptyStateProps) {  
  const router = useRouter();  

  return (  
    <div className="text-center py-12 bg-white rounded-lg shadow-sm">  
      <Users className="mx-auto h-12 w-12 text-gray-400" weight="thin" />  
      <h3 className="mt-4 text-lg font-medium text-gray-900">  
        {searchTerm ? 'Tidak ada customer yang sesuai' : 'Belum ada customer'}  
      </h3>  
      <p className="mt-2 text-sm text-gray-500">  
        {searchTerm  
          ? 'Coba ubah kata kunci pencarian Anda'  
          : 'Mulai dengan menambahkan customer pertama Anda.'}  
      </p>  
      {!isSupervisor && !searchTerm && (  
        <button  
          onClick={() => router.push('/dashboard/customer-management/create')}  
          className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"  
        >  
          <Plus className="mr-2 w-5 h-5" weight="bold" />  
          Tambah Customer  
        </button>  
      )}  
    </div>  
  );  
}