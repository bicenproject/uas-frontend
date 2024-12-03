import React from 'react';  
import { Buildings, Plus } from '@phosphor-icons/react';  
import { NextRouter } from 'next/router';  

interface SupplierHeaderProps {  
  supervisor: boolean;  
  router: NextRouter;  
  totalSuppliers: number;  
}  

const SupplierHeader: React.FC<SupplierHeaderProps> = ({   
  supervisor,   
  router,   
  totalSuppliers   
}) => {  
  return (  
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">  
      <div>  
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">  
          <Buildings className="w-8 h-8" />  
          Daftar Supplier  
        </h1>  
        <p className="mt-2 text-gray-600">  
          Total {totalSuppliers} supplier terdaftar  
        </p>  
      </div>  
      {!supervisor && (  
        <button  
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"  
          onClick={() => router.push('/dashboard/supplier-management/create')}  
        >  
          <Plus className="mr-2 w-5 h-5" />  
          Tambah Supplier  
        </button>  
      )}  
    </div>  
  );  
};  

export default SupplierHeader;