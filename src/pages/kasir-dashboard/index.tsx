import React, { useState } from 'react';  
import {  
  ShoppingCart,  
  Storefront,  
} from '@phosphor-icons/react';  
import FormPenjualan from './components/FormPenjualan';  
import RecentTransactions from './components/RecentTransaction';
import Head from 'next/head';

const KasirPage = () => {  
  const [activeMenu, setActiveMenu] = useState<'penjualan' | null>(null);  

   const handleMenuSelect = () => {  
    setActiveMenu('penjualan');  
  };  

  return (  
    <>
    <Head>  
        <title>Kasir | ATK Inventory</title>  
        <meta name="description" content="Sign in to your account" />  
      </Head>  
     <div className="p-4">  
      <div className="max-w-7xl mx-auto">  
        <div className="flex justify-between items-center mb-6">  
          <div className="flex items-center gap-3">  
            <div className="bg-blue-500 p-2 rounded-lg">  
              <Storefront size={32} weight="fill" className="text-white" />  
            </div>  
            <h1 className="text-2xl font-bold">Menu Kasir</h1>  
          </div>  
        </div>  

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">  
          <div className="relative">  
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white">  
              <div className="flex items-center gap-4 mb-4">  
                <ShoppingCart size={32} weight="duotone" />  
                <div>  
                  <h2 className="text-lg font-bold">Transaksi</h2>  
                  <p className="text-sm opacity-90">Pilih jenis transaksi</p>  
                </div>  
              </div>  
              <button  
                onClick={handleMenuSelect}  // Pastikan ini terpanggil  
                className="w-full p-2 rounded bg-white/10 text-white border border-white/20 focus:outline-none flex justify-between items-center"  
              >  
                Penjualan  
              </button>  
            </div>  
          </div>  

          {/* Quick Actions */}  
          <div className="bg-white rounded-lg p-4 shadow">  
            <h3 className="font-semibold mb-3">Aksi Cepat</h3>  
            <div className="grid grid-cols-2 gap-2">  
              <button className="p-2 text-sm bg-gray-50 rounded hover:bg-gray-100 transition-colors">  
                Cek Stok Barang  
              </button>  
              <button className="p-2 text-sm bg-gray-50 rounded hover:bg-gray-100 transition-colors">  
                Laporan Harian  
              </button>  
              <button className="p-2 text-sm bg-gray-50 rounded hover:bg-gray-100 transition-colors">  
                Daftar Customer  
              </button>  
              <button className="p-2 text-sm bg-gray-50 rounded hover:bg-gray-100 transition-colors">  
                Daftar Supplier  
              </button>  
            </div>  
          </div>  
        </div>  

        {activeMenu === 'penjualan' && (  
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mt-4">  
            <FormPenjualan onClose={() => setActiveMenu(null)} />  
          </div>  
        )}  

          <RecentTransactions />   
      </div>  
    </div>  
    </>
   
  );  
};  

export default KasirPage;