import React, { useState, useEffect } from 'react';  
import {   
  CaretDown,   
  CaretUp,   
  FileText,   
  ShoppingCart,  
  GlobeHemisphereWest,  
  Archive  
} from '@phosphor-icons/react';  
import { formatPrice } from '@/utils/formatPrice';  
import { formatDate } from '@/utils/dateUtils';  
import { TransactionService } from '@/services/kasirService';  
import { Penjualan } from '@/models/penjualanModel';

const RecentTransactions: React.FC = () => {  
  const [transactions, setTransactions] = useState<Penjualan[]>([]);  
  const [expandedTransaction, setExpandedTransaction] = useState<number | null>(null);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState<string | null>(null);  

  useEffect(() => {  
    fetchRecentTransactions();  
  }, []);  

  const fetchRecentTransactions = async () => {  
    try {  
      setLoading(true);  
      const recentTransactions = await TransactionService.getRecentTransactions();  
      
      setTransactions(Array.isArray(recentTransactions) ? recentTransactions : []);  
      setError(null);  
    } catch (error) {  
      console.error('Gagal mengambil transaksi terbaru:', error);  
      setError('Gagal memuat transaksi');  
      setTransactions([]);  
    } finally {  
      setLoading(false);  
    }  
  };  

  const toggleTransactionDetails = (transactionId: number) => {  
    setExpandedTransaction(  
      expandedTransaction === transactionId ? null : transactionId  
    );  
  };  

  const renderLoadingState = () => (  
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-6 text-center">  
      <div className="animate-pulse">  
        <ShoppingCart size={48} className="mx-auto text-blue-600 mb-4" />  
        <p className="text-blue-800">Memuat transaksi...</p>  
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
      <p className="text-gray-800">Tidak ada transaksi baru</p>  
    </div>  
  );  

  const renderTransactionTable = () => (  
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">  
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-4 flex items-center">  
        <GlobeHemisphereWest size={24} weight="duotone" className="text-white mr-3" />  
        <h3 className="text-lg font-semibold text-white">Penjualan Terakhir</h3>  
      </div>  
      
      <div className="overflow-x-auto">  
        <table className="w-full">  
          <thead className="bg-gray-100 border-b border-gray-200">  
            <tr>  
              {['Kode', 'Customer', 'Tanggal', 'Total', 'Aksi'].map((header) => (  
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
            {transactions.map((transaction) => (  
              <React.Fragment key={transaction.id}>  
                <tr   
                  className={`  
                    transition-all duration-200 ease-in-out  
                    hover:bg-blue-50   
                    ${expandedTransaction === transaction.id ? 'bg-blue-100' : ''}  
                  `}  
                >  
                  <td className="px-4 py-3 font-medium text-gray-700">  
                    {transaction.code}  
                  </td>  
                  <td className="px-4 py-3 text-gray-600">  
                    {transaction.customer.customer_name}  
                  </td>  
                  <td className="px-4 py-3 text-gray-500">  
                    {formatDate(transaction.tanggal)}  
                  </td>  
                  <td className="px-4 py-3 font-semibold text-green-600">  
                    {formatPrice(transaction.total)}  
                  </td>  
                  <td className="px-4 py-3">  
                    <button  
                      onClick={() => toggleTransactionDetails(transaction.id)}  
                      className="  
                        p-2 rounded-full   
                        hover:bg-blue-100   
                        transition-colors   
                        text-blue-600   
                        hover:text-blue-800  
                      "  
                    >  
                      {expandedTransaction === transaction.id ? (  
                        <CaretUp weight="bold" />  
                      ) : (  
                        <CaretDown weight="bold" />  
                      )}  
                    </button>  
                  </td>  
                </tr>  
                
                {expandedTransaction === transaction.id && (  
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
                            {transaction.DetailPenjualan.map((detail) => (  
                              <tr   
                                key={detail.id}   
                                className="border-b border-gray-200 last:border-b-0 hover:bg-gray-100"  
                              >  
                                <td className="px-4 py-2 text-gray-700">  
                                  {detail.barang.nama_barang}  
                                </td>  
                                <td className="px-4 py-2 text-gray-600">  
                                  {detail.qty}  
                                </td>  
                                <td className="px-4 py-2 text-blue-600">  
                                  {formatPrice(detail.harga_jual)}  
                                </td>  
                                <td className="px-4 py-2 font-semibold text-green-600">  
                                  {formatPrice(parseInt(detail.harga_jual) * detail.qty)}  
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
       transactions.length === 0 ? renderEmptyState() :   
       renderTransactionTable()}  
    </div>  
  );  
};  

export default RecentTransactions;