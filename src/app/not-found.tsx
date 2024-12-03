 'use client'; 

import Link from 'next/link';  

export default function NotFound() {  
  return (  
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">  
      <div className="text-center">  
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>  
        <h2 className="text-2xl font-semibold text-gray-600 mb-6">  
          Halaman Tidak Ditemukan  
        </h2>  
        <p className="text-gray-500 mb-8">  
          Maaf, halaman yang Anda cari tidak dapat ditemukan.  
        </p>  
        <Link   
          href="/"  
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"  
        >  
          Kembali ke Beranda  
        </Link>  
      </div>  
    </main>  
  );  
}