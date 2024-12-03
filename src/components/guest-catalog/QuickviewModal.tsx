import { Product } from '@/models/productModel';  
import { formatPrice } from '@/utils/formatPrice';  
import Image from 'next/image';  

interface QuickViewModalProps {  
  product: Product | null;  
  onClose: () => void;  
}  

 export const QuickViewModal = ({ product, onClose }: QuickViewModalProps) => {  
    if (!product) return null;  
  
    const stockValue = product.stock ?? 0;  
    
     const handleImageError = (e: any) => {  
      if (e.target.src !== 'https://images.ctfassets.net/ihx0a8chifpc/37SPg1N7dGiotuYoIYCWXk/611e638af077126bd6964ff53d12675b/dynamic-dummy-image-generator-1280x720.png?w=1920&q=60&fm=webp') {  
        e.target.src = 'https://images.ctfassets.net/ihx0a8chifpc/37SPg1N7dGiotuYoIYCWXk/611e638af077126bd6964ff53d12675b/dynamic-dummy-image-generator-1280x720.png?w=1920&q=60&fm=webp';  
      }  
    };  
  
    return (  
      <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">  
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">  
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>  
  
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">  
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">  
              <div className="sm:flex sm:items-start">  
                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">  
                  <div className="grid grid-cols-2 gap-4">  
                    <div className="relative h-64 bg-gray-100 rounded-lg">  
                      <Image  
                        src={product.image || 'https://images.ctfassets.net/ihx0a8chifpc/37SPg1N7dGiotuYoIYCWXk/611e638af077126bd6964ff53d12675b/dynamic-dummy-image-generator-1280x720.png?w=1920&q=60&fm=webp'}  
                        alt={product.nama_barang}  
                        fill  
                        className="rounded-lg object-contain"  
                        onError={handleImageError}  
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"  
                      />  
                    </div>  
  
                    <div>  
                      <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">  
                        {product.nama_barang}  
                      </h3>  
                      <div className="mt-2">  
                        <p className="text-sm text-gray-500">{product.category?.name}</p>  
                        <p className="text-2xl font-bold text-blue-600 mt-2">  
                          {formatPrice(product.harga_jual)}  
                        </p>  
                        <p className="mt-2 text-sm text-gray-500">  
                          Stok: {stockValue}  
                        </p>  
                      </div>  
                    </div>  
                  </div>  
                </div>  
              </div>  
            </div>  
  
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">  
              <button  
                type="button"  
                className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"  
                onClick={onClose}  
              >  
                Tutup  
              </button>  
            </div>  
          </div>  
        </div>  
      </div>  
    );  
  };