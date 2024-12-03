import { Customer } from "@/models/customerModel";
import { Funnel, MagnifyingGlass } from "@phosphor-icons/react";

interface CustomerSearchProps {  
  searchTerm: string;  
  onSearchChange: (value: string) => void;  
  sortField: keyof Customer;  
  onSortChange: (field: keyof Customer) => void;  
}  

export default function CustomerSearch({  
  searchTerm,  
  onSearchChange,  
  sortField,  
  onSortChange  
}: CustomerSearchProps) {  
  return (  
    <div className="flex flex-col sm:flex-row gap-4">  
      <div className="flex-1 relative">  
        <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />  
        <input  
          type="text"  
          placeholder="Cari customer berdasarkan nama atau nomor telepon..."  
          value={searchTerm}  
          onChange={(e) => onSearchChange(e.target.value)}  
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"  
        />  
      </div>  
      <div className="relative">  
        <Funnel className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />  
        <select  
          value={sortField}  
          onChange={(e) => onSortChange(e.target.value as keyof Customer)}  
          className="w-full sm:w-48 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"  
        >  
          <option value="customer_name">Nama A-Z</option>  
          <option value="phone">No. Telepon</option>  
          <option value="created_at">Tanggal Dibuat</option>  
        </select>  
      </div>  
    </div>  
  );  
}