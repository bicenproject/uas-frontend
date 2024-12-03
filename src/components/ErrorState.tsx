import { ShoppingCart } from "@phosphor-icons/react";

const ErrorState = ({ error, onRetry }: { error: string, onRetry: () => void }) => (  
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">  
      <div className="text-center bg-white p-8 rounded-xl shadow-xl">  
        <div className="mb-4">  
          <ShoppingCart className="mx-auto h-16 w-16 text-red-500" />  
        </div>  
        <h2 className="text-2xl font-bold text-red-600 mb-2">Gagal Memuat Produk</h2>  
        <p className="text-gray-600 mb-4">{error}</p>  
        <button   
          onClick={onRetry}  
          className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"  
        >  
          Coba Lagi  
        </button>  
      </div>  
    </div>  
  );  