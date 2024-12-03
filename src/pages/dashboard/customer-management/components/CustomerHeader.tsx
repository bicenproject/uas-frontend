import { Users, Plus } from '@phosphor-icons/react';  

interface CustomerHeaderProps {  
  customerCount: number;  
  isSupervisor: boolean;  
  onAddCustomer: () => void;  
}  

export default function CustomerHeader({  
  customerCount,  
  isSupervisor,  
  onAddCustomer  
}: CustomerHeaderProps) {  
  return (  
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">  
      <div>  
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">  
          <Users weight="bold" className="w-8 h-8" />  
          Daftar Customer  
        </h1>  
        <p className="mt-2 text-gray-600">  
          Total {customerCount} customer terdaftar  
        </p>  
      </div>  
      {!isSupervisor && (  
        <button  
          onClick={onAddCustomer}  
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg w-full sm:w-auto justify-center"  
        >  
          <Plus className="mr-2 w-5 h-5" weight="bold" />  
          Tambah Customer  
        </button>  
      )}  
    </div>  
  );  
}