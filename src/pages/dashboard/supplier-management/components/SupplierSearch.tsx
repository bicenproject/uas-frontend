import React from 'react';  
import { MagnifyingGlass } from '@phosphor-icons/react';  

interface SupplierSearchProps {  
  searchTerm: string;  
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;  
}  

const SupplierSearch: React.FC<SupplierSearchProps> = ({   
  searchTerm,   
  onSearch   
}) => {  
  return (  
    <div className="mb-6 relative">  
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">  
        <MagnifyingGlass className="h-5 w-5 text-gray-400" />  
      </div>  
      <input  
        type="text"  
        placeholder="Cari supplier..."  
        value={searchTerm}  
        onChange={onSearch}  
        className="w-full max-w-md pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"  
      />  
    </div>  
  );  
};  

export default SupplierSearch;