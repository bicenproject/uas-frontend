// app/not-found/page.tsx  
import React from 'react';  
import Link from 'next/link';  

const NotFoundPage: React.FC = () => {  
  return (  
    <div className="min-h-screen bg-blue-100 flex items-center justify-center p-4">  
      <div className="bg-white p-8 rounded-lg shadow-xl text-center">  
        <h1 className="text-4xl font-bold text-blue-600 mb-4">404</h1>  
        <h2 className="text-2xl mb-4">Halaman Tidak Ditemukan</h2>  
        <p className="mb-6 text-gray-600">  
          Maaf, halaman yang Anda cari tidak dapat ditemukan.  
        </p>  
        
        <Link   
          href="/"   
          className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition"  
        >  
          Kembali ke Beranda  
        </Link>  
      </div>  
    </div>  
  );  
};  

export default NotFoundPage;