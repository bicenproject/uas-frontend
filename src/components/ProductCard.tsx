import { Product } from '@/models/productModel';  
import { formatPrice } from '@/utils/formatPrice';  
import Image from 'next/image';  
import { FC } from 'react';  

interface ProductCardProps {  
  product: Product;  
  onQuickView?: (product: Product) => void;  
}  

export const ProductCard: FC<ProductCardProps> = ({  
  product,  
  onQuickView  
}) => {  
  const stockValue = product.stock ?? 0;  
  
   const handleImageError = (e: any) => {  
    if (e.target.src !== 'vercel.svg') {  
      e.target.src = 'vercel.svg';  
    }  
  };  

  return (  
    <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300">  
      <div className="relative h-64 overflow-hidden bg-gray-100">  
        <Image  
          src={product.image || 'vercel.svg'}  
          alt={product.nama_barang}  
          fill  
          className="object-contain group-hover:scale-110 transition-transform duration-300"  
          onError={handleImageError}  
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"  
          priority={false}  
          loading="lazy"  
        />  
        
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">  
          <button  
            onClick={() => onQuickView?.(product)}  
            className="p-2 bg-white rounded-full hover:bg-blue-500 hover:text-white transition-colors duration-200"  
            title="Lihat Detail"  
          >  
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">  
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />  
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />  
            </svg>  
          </button>  
        </div>  
      </div>  

      <div className="p-4">  
        <div className="flex items-center justify-between mb-2">  
          <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full">  
            {product.category?.name}  
          </span>  
          <span className={`text-sm font-medium ${stockValue > 0 ? 'text-green-600' : 'text-red-600'}`}>  
            {stockValue > 0 ? `Stok: ${stockValue}` : 'Stok Habis'}  
          </span>  
        </div>  

        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">  
          {product.nama_barang}  
        </h3>  

        <p className="text-lg font-bold text-blue-600">  
          {formatPrice(product.harga_jual)}  
        </p>  
      </div>  
    </div>  
  );  
};