import { CategoryType } from '@/models/productModel';  
import { FC } from 'react';  

interface FilterBarProps {  
  categories: CategoryType[];  
  selectedCategory: number | null;  
  onCategoryChange: (categoryId: number | null) => void;  
  onSort: (sortBy: string) => void;  
}  

export const FilterBar: FC<FilterBarProps> = ({  
  categories,  
  selectedCategory,  
  onCategoryChange,  
  onSort  
}) => {  
  return (  
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">  
      <div className="flex flex-wrap items-center justify-between gap-4">  
        <div className="flex flex-wrap gap-2">  
          <button  
            onClick={() => onCategoryChange(null)}  
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200  
              ${!selectedCategory   
                ? 'bg-blue-500 text-white'   
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}  
          >  
            Semua  
          </button>  
          {categories.map((category) => (  
            <button  
              key={category.id}  
              onClick={() => onCategoryChange(category.id)}  
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200  
                ${selectedCategory === category.id   
                  ? 'bg-blue-500 text-white'   
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}  
            >  
              {category.name}  
            </button>  
          ))}  
        </div>  

        <select  
          onChange={(e) => onSort(e.target.value)}  
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"  
        >  
          <option value="newest">Terbaru</option>  
          <option value="price-asc">Harga: Rendah ke Tinggi</option>  
          <option value="price-desc">Harga: Tinggi ke Rendah</option>  
          <option value="name-asc">Nama: A-Z</option>  
          <option value="name-desc">Nama: Z-A</option>  
        </select>  
      </div>  
    </div>  
  );  
};