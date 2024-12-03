import React, { useState } from 'react';  
import {  
  ShoppingCart,  
  ArrowsLeftRight,  
  X,  
  Storefront,  
} from '@phosphor-icons/react';  
import FormPenjualan from './components/FormPenjualan';  
import FormPembelian from './components/FormPembelian';  
import { ArrowBendRightDown } from '@phosphor-icons/react/dist/ssr';  

const KasirPage = () => {  
  const [activeMenu, setActiveMenu] = useState<'penjualan' | 'pembelian' | null>(null);  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);  

  const handleMenuSelect = (menu: 'penjualan' | 'pembelian') => {  
    setActiveMenu(menu);  
    setIsDropdownOpen(false); // Menutup dropdown setelah memilih  
  };  

  return (  
    <div className="p-4">  
      <div className="max-w-7xl mx-auto">  
        <div className="flex justify-between items-center mb-6">  
          <div className="flex items-center gap-3">  
            <div className="bg-blue-500 p-2 rounded-lg">  
              <Storefront size={32} weight="fill" className="text-white" />  
            </div>  
            <h1 className="text-2xl font-bold flex items-center gap-2">  
              Menu Kasir  
            </h1>  
          </div>  
          <div className="flex items-center gap-4">  
            <div className="bg-blue-50 p-3 rounded-lg">  
              <span className="block text-sm text-blue-600">Transaksi Hari Ini</span>  
              <span className="text-xl font-bold text-blue-700">24</span>  
            </div>  
            <div className="bg-green-50 p-3 rounded-lg">  
              <span className="block text-sm text-green-600">Pendapatan Hari Ini</span>  
              <span className="text-xl font-bold text-green-700">Rp 4.500.000</span>  
            </div>  
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
              <div className="relative">  
                <button  
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}  
                  className="w-full p-2 rounded bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 text-left flex justify-between items-center"  
                >  
                  <span>{activeMenu ? (activeMenu === 'penjualan' ? 'Penjualan' : 'Pembelian') : 'Pilih Transaksi'}</span>  
                  <ArrowBendRightDown   
                    size={20}   
                    className={`transform transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}   
                  />  
                </button>  

                {isDropdownOpen && (  
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg overflow-hidden z-50">  
                    <button  
                      className={`w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700 flex items-center gap-2 ${  
                        activeMenu === 'penjualan' ? 'bg-blue-50' : ''  
                      }`}  
                      onClick={() => handleMenuSelect('penjualan')}  
                    >  
                      <ShoppingCart size={20} />  
                      Penjualan  
                    </button>  
                    <button  
                      className={`w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700 flex items-center gap-2 ${  
                        activeMenu === 'pembelian' ? 'bg-blue-50' : ''  
                      }`}  
                      onClick={() => handleMenuSelect('pembelian')}  
                    >  
                      <ArrowsLeftRight size={20} />  
                      Pembelian  
                    </button>  
                  </div>  
                )}  
              </div>  
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

        {/* Transaction Form */}  
        {activeMenu && (  
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mt-4">  
            <div className="p-4 border-b flex justify-between items-center">  
              <h2 className="text-xl font-bold">  
                Form {activeMenu === 'penjualan' ? 'Penjualan' : 'Pembelian'}  
              </h2>  
              <button  
                onClick={() => setActiveMenu(null)}  
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"  
              >  
                <X size={24} weight="bold" className="text-gray-500" />  
              </button>  
            </div>  
            <div className="p-4">  
              {activeMenu === 'penjualan' ? (  
                <FormPenjualan onClose={() => setActiveMenu(null)} />  
              ) : (  
                <FormPembelian onClose={() => setActiveMenu(null)} />  
              )}  
            </div>  
          </div>  
        )}  

        {/* Recent Transactions */}  
        <div className="mt-6 bg-white rounded-lg shadow p-4">  
          <h3 className="font-semibold mb-4">Transaksi Terakhir</h3>  
          <div className="overflow-x-auto">  
            <table className="min-w-full divide-y divide-gray-200">  
              <thead className="bg-gray-50">  
                <tr>  
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">No</th>  
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Waktu</th>  
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Jenis</th>  
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Customer/Supplier</th>  
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>  
                </tr>  
              </thead>  
              <tbody className="divide-y divide-gray-200">  
                {[1,2,3].map((i) => (  
                  <tr key={i} className="hover:bg-gray-50">  
                    <td className="px-4 py-2">{i}</td>  
                    <td className="px-4 py-2">2024-12-02 09:30</td>  
                    <td className="px-4 py-2">  
                      <span className={`px-2 py-1 rounded-full text-xs ${  
                        i % 2 === 0 ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'  
                      }`}>  
                        {i % 2 === 0 ? 'Penjualan' : 'Pembelian'}  
                      </span>  
                    </td>  
                    <td className="px-4 py-2">John Doe</td>  
                    <td className="px-4 py-2 font-medium">Rp 500.000</td>  
                  </tr>  
                ))}  
              </tbody>  
            </table>  
          </div>  
        </div>  
      </div>  
    </div>  
  );  
};  

export default KasirPage;