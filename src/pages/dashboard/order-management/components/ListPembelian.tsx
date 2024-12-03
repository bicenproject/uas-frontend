import React, { useState, useEffect } from 'react';  
import {   
  Archive,   
  FileText,   
  CaretDown,  
  CaretUp,  
  GlobeHemisphereWest  
} from '@phosphor-icons/react';  
import { formatPrice } from '@/utils/formatPrice';  
import { formatDate } from '@/utils/dateUtils';  
import { PembelianService } from '@/services/pembelianService';  

const ListPembelian: React.FC = () => {  
  const [pembelian, setPembelian] = useState<any>([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState<string | null>(null);  
  const [expandedTransaction, setExpandedTransaction] = useState<number | null>(null);  

  useEffect(() => {  
    fetchPembelian();  
  }, []);  

  const fetchPembelian = async () => {  
    try {  
      setLoading(true);  
      const recentPembelian = await PembelianService.getRecentPembelian();  
      setPembelian(Array.isArray(recentPembelian) ? recentPembelian : []);  
      setError(null);  
    } catch (error) {  
      console.error('Gagal memuat pembelian:', error);  
      setError('Gagal memuat data pembelian');  
      setPembelian([]);  
    } finally {  
      setLoading(false);  
    }  
  };  

  const toggleTransactionDetails = (transactionId: number) => {  
    setExpandedTransaction(  
      expandedTransaction === transactionId ? null : transactionId  
    );  
  };  

  const calculateTotal = (pembelian: any) => {  
    return pembelian.DetailPembelian?.reduce(  
      (total: number, detail: any) => total + (parseFloat(detail.harga_beli) * detail.quantity),   
      0  
    ) || 0;  
  };  

  const renderLoadingState = () => (  
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-6 text-center">  
      <div className="animate-pulse">  
        <FileText size={48} className="mx-auto text-blue-600 mb-4" />  
        <p className="text-blue-800">Memuat data pembelian...</p>  
      </div>  
    </div>  
  );  

  const renderErrorState = () => (  
    <div className="bg-red-50 rounded-xl shadow-lg p-6 text-center">  
      <FileText size={48} className="mx-auto text-red-600 mb-4" />  
      <p className="text-red-800">{error}</p>  
    </div>  
  );  

  const renderEmptyState = () => (  
    <div className="bg-gray-50 rounded-xl shadow-lg p-6 text-center">  
      <Archive size={48} className="mx-auto text-gray-600 mb-4" />  
      <p className="text-gray-800">Tidak ada data pembelian</p>  
    </div>  
  );  

  const renderPembelianTable = () => (  
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">  
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-4 flex items-center">  
        <GlobeHemisphereWest size={24} weight="duotone" className="text-white mr-3" />  
        <h3 className="text-lg font-semibold text-white">Daftar Pembelian</h3>  
      </div>  
      
      <div className="overflow-x-auto">  
        <table className="w-full">  
          <thead className="bg-gray-100 border-b border-gray-200">  
            <tr>  
              {['Kode', 'Supplier', 'Tanggal', 'Total', 'Aksi'].map((header) => (  
                <th   
                  key={header}   
                  className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"  
                >  
                  {header}  
                </th>  
              ))}  
            </tr>  
          </thead>  
          <tbody>  
            {pembelian.map((item: any) => (  
              <React.Fragment key={item.id}>  
                <tr   
                  className={`  
                    transition-all duration-200 ease-in-out  
                    hover:bg-blue-50   
                    ${expandedTransaction === item.id ? 'bg-blue-100' : ''}  
                  `}  
                >  
                  <td className="px-4 py-3 font-medium text-gray-700">  
                    {item.code}  
                  </td>  
                  <td className="px-4 py-3 text-gray-600">  
                    {item.supplier?.name || 'N/A'}  
                  </td>  
                  <td className="px-4 py-3 text-gray-500">  
                    {formatDate(item.tanggal_pembelian)}  
                  </td>  
                  <td className="px-4 py-3 font-semibold text-green-600">  
                    {formatPrice(calculateTotal(item).toString())}  
                  </td>  
                  <td className="px-4 py-3">  
                    <button  
                      onClick={() => toggleTransactionDetails(item.id)}  
                      className="  
                        p-2 rounded-full   
                        hover:bg-blue-100   
                        transition-colors   
                        text-blue-600   
                        hover:text-blue-800  
                      "  
                    >  
                      {expandedTransaction === item.id ? (  
                        <CaretUp weight="bold" />  
                      ) : (  
                        <CaretDown weight="bold" />  
                      )}  
                    </button>  
                  </td>  
                </tr>  
                
                {expandedTransaction === item.id && (  
                  <tr>  
                    <td colSpan={5} className="p-0">  
                      <div className="bg-gray-50 p-4 rounded-b-xl">  
                        <table className="w-full">  
                          <thead>  
                            <tr className="bg-gray-200">  
                              {['Barang', 'Qty', 'Harga', 'Subtotal'].map((header) => (  
                                <th   
                                  key={header}   
                                  className="px-4 py-2 text-left text-xs font-medium text-gray-600"  
                                >  
                                  {header}  
                                </th>  
                              ))}  
                            </tr>  
                          </thead>  
                          <tbody>  
                            {item.DetailPembelian?.map((detail: any) => (  
                              <tr   
                                key={detail.id}   
                                className="border-b border-gray-200 last:border-b-0 hover:bg-gray-100"  
                              >  
                                <td className="px-4 py-2 text-gray-700">  
                                  {detail.barang?.nama_barang || 'Barang Tidak Dikenal'}  
                                </td>  
                                <td className="px-4 py-2 text-gray-600">  
                                  {detail.quantity}  
                                </td>  
                                <td className="px-4 py-2 text-blue-600">  
                                  {formatPrice(detail.harga_beli)}  
                                </td>  
                                <td className="px-4 py-2 font-semibold text-green-600">  
                                  {formatPrice((detail.quantity * parseFloat(detail.harga_beli)).toString())}  
                                </td>  
                              </tr>  
                            ))}  
                          </tbody>  
                        </table>  
                      </div>  
                    </td>  
                  </tr>  
                )}  
              </React.Fragment>  
            ))}  
          </tbody>  
        </table>  
      </div>  
    </div>  
  );  

  return (  
    <div className="container mx-auto px-4 py-6">  
      {loading ? renderLoadingState() :   
       error ? renderErrorState() :   
       pembelian.length === 0 ? renderEmptyState() :   
       renderPembelianTable()}  
    </div>  
  );  
};  

export default ListPembelian;