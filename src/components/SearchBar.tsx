 import { FC } from 'react';  

interface SearchBarProps {  
  onSearch: (query: string) => void;  
}  

export const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {  
  return (  
    <div className="relative mb-6">  
      <input  
        type="text"  
        placeholder="Cari produk..."  
        onChange={(e) => onSearch(e.target.value)}  
        className="w-full px-4 py-3 pl-12 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"  
      />  
      <svg  
        className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"  
        xmlns="http://www.w3.org/2000/svg"  
        fill="none"  
        viewBox="0 0 24 24"  
        stroke="currentColor"  
      >  
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />  
      </svg>  
    </div>  
  );  
};