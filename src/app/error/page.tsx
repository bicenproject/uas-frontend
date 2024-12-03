'use client';  

import Link from 'next/link';  

export default function Error({   
  error,   
  reset   
}: {   
  error: Error & { digest?: string },   
  reset: () => void   
}) {  
  return (  
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">  
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">  
        <div className="relative h-48 bg-red-500 flex items-center justify-center">  
          <svg   
            xmlns="http://www.w3.org/2000/svg"   
            viewBox="0 0 24 24"   
            className="text-white w-32 h-32"  
            fill="currentColor"  
          >  
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>  
          </svg>  
          <div className="absolute inset-0 bg-red-500/20 blur-2xl"></div>  
        </div>  

        <div className="p-8 text-center">  
          <h1 className="text-4xl font-bold text-gray-800 mb-4">  
            Kesalahan Server  
          </h1>  
          <p className="text-gray-600 mb-6">  
            Maaf, terjadi kesalahan yang tidak terduga.  
          </p>  

          <div className="space-y-4">  
            <button   
              onClick={() => reset()}  
              className="w-full flex items-center justify-center gap-2 px-6 py-3   
              bg-red-500 text-white rounded-full hover:bg-red-600   
              transition-colors duration-300 group"  
            >  
              Coba Lagi  
            </button>  

            <Link   
              href="/"  
              className="w-full flex items-center justify-center gap-2 px-6 py-3   
              bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200   
              transition-colors duration-300 group"  
            >  
              <svg   
                xmlns="http://www.w3.org/2000/svg"   
                viewBox="0 0 24 24"   
                className="w-6 h-6 mr-2 group-hover:animate-bounce"  
                fill="currentColor"  
              >  
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>  
              </svg>  
              Kembali ke Beranda  
            </Link>  
          </div>  

          <div className="mt-8 border-t pt-4">  
            <p className="text-sm text-gray-500">  
              Detail Kesalahan:  
            </p>  
            <p className="text-xs text-red-500 mt-2 break-words">  
              {error.message}  
            </p>  
          </div>  
        </div>  

        {/* Background Decoration */}  
        <div className="fixed pointer-events-none">  
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-red-200 rounded-full opacity-20 blur-3xl"></div>  
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-red-300 rounded-full opacity-20 blur-3xl"></div>  
        </div>  
      </div>  
    </div>  
  );  
}