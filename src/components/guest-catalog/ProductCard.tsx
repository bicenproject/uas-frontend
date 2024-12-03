import Image from 'next/image';  
import { FC } from 'react';  
import {   
  Package,   
  Tag,   
  Money,   
  MagnifyingGlass,   
  LineSegment
} from '@phosphor-icons/react';  
import { Product } from '@/models/productModel';  
import { formatPrice } from '@/utils/formatPrice';  

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
    if (e.target.src !== 'https://images.ctfassets.net/ihx0a8chifpc/37SPg1N7dGiotuYoIYCWXk/611e638af077126bd6964ff53d12675b/dynamic-dummy-image-generator-1280x720.png?w=1920&q=60&fm=webp') {  
      e.target.src = 'https://images.ctfassets.net/ihx0a8chifpc/37SPg1N7dGiotuYoIYCWXk/611e638af077126bd6964ff53d12675b/dynamic-dummy-image-generator-1280x720.png?w=1920&q=60&fm=webp';  
    }  
  };  

  return (  
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden border border-gray-100 group">  
       <div className="relative h-48 w-full bg-gray-100">  
        <Image  
          src={product.image || 'https://images.ctfassets.net/ihx0a8chifpc/37SPg1N7dGiotuYoIYCWXk/611e638af077126bd6964ff53d12675b/dynamic-dummy-image-generator-1280x720.png?w=1920&q=60&fm=webp'}  
          alt={product.nama_barang}  
          fill  
          className="h-full w-full object-cover"  
          onError={handleImageError}  
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"  
        />  
        
        {/* Stock Indicator */}  
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md flex items-center gap-1">  
          <Package className="w-4 h-4" />  
          <span className="text-sm font-medium text-gray-700">  
            {stockValue}  
          </span>  
        </div>  

        {/* Category Tag */}  
        {product.category && (  
          <div className="absolute bottom-4 left-4 bg-blue-100 px-3 py-1 rounded-full shadow-sm flex items-center gap-1">  
            <Tag className="w-4 h-4 text-blue-800" />  
            <span className="text-sm font-medium text-blue-800">  
              {product.category.name}  
            </span>  
          </div>  
        )}  

        {/* Quick View Overlay */}  
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">  
          <button  
            onClick={() => onQuickView?.(product)}  
            className="p-3 bg-white rounded-full text-blue-600 hover:bg-blue-50 transition-colors"  
            title="Lihat Detail"  
          >  
            <MagnifyingGlass className="w-6 h-6" />  
          </button>  
        </div>  
      </div>  

      {/* Product Details */}  
      <div className="p-6">  
        <div className="mb-4">  
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">  
            {product.nama_barang}  
          </h3>  
        </div>  

        {/* Price Information */}  
        <div className="space-y-2">  
          <div className="flex justify-between items-center text-sm text-gray-600">  
            <span className="flex items-center gap-1">  
              <LineSegment className="w-4 h-4" />  
              Category   
            </span>  
            <span className="font-medium">  
              {product.category?.name} 
            </span>  
          </div>  
          <div className="flex justify-between items-center text-sm">  
            <span className="flex items-center gap-1">  
              <Money className="w-4 h-4" />  
              Harga Jual
            </span>  
            <span className="font-semibold text-blue-600">  
              {formatPrice(product.harga_jual)}  
            </span>  
          </div>  
        </div>  
      </div>  
    </div>  
  );  
};