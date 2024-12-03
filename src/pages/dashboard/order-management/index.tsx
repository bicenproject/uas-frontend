import React, { useEffect, useState } from 'react';  
import {   
  ShoppingCart,   
  FileText,   
  Plus   
} from '@phosphor-icons/react';  
import FormPembelian from './components/FormPembelian';  
import ListPembelian from './components/ListPembelian';  
import Head from 'next/head';  
import RecentTransactions from '@/pages/kasir-dashboard/components/RecentTransaction';  

type ActiveTab = 'list' | 'create';  

const OrderManagementPage: React.FC = () => {  
  const [activeTab, setActiveTab] = useState<ActiveTab>('list');  
  const [isFormOpen, setIsFormOpen] = useState(false);  
  const [supervisor, setSupervisor] = useState(false);  

  useEffect(() => {  
    const token = localStorage.getItem('access_token');  
    if (token) {  
      try {  
        const payload = JSON.parse(atob(token.split('.')[1]));  
        setSupervisor(payload.role === 'supervisor');  
      } catch (error) {  
        console.error('Error decoding token:', error);  
      }  
    }  
  }, []);  

  const renderHeader = () => (  
    <>  
      <Head>  
        <title>Order | ATK Inventory</title>  
        <meta name="description" content="Manajemen Transaksi" />  
      </Head>  
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 px-4 py-4 flex justify-between items-center">  
        <div className="flex items-center space-x-3">  
          <ShoppingCart size={28} weight="duotone" className="text-white" />  
          <h1 className="text-xl font-bold text-white tracking-tight">  
            Manajemen Transaksi  
          </h1>  
        </div>  
        <div className="flex space-x-2">  
          <button   
            onClick={() => {  
              setActiveTab('list');  
              setIsFormOpen(false);  
            }}  
            className={`  
              px-3 py-1.5 rounded-md text-sm transition-all duration-300  
              ${activeTab === 'list'   
                ? 'bg-white text-blue-600'   
                : 'text-white hover:bg-white/20'  
              }  
            `}  
          >  
            <FileText className="mr-1.5 inline -mt-0.5" size={16} />  
            Daftar Pembelian  
          </button>  
          {!supervisor && (  
            <button   
              onClick={() => {  
                setActiveTab('create');  
                setIsFormOpen(true);  
              }}  
              className={`  
                px-3 py-1.5 rounded-md text-sm transition-all duration-300 flex items-center  
                ${activeTab === 'create'   
                  ? 'bg-white text-blue-600'   
                  : 'text-white hover:bg-white/20'  
                }  
              `}  
            >  
              <Plus className="mr-1.5 inline -mt-0.5" size={16} />  
              Buat Pembelian  
            </button>  
          )}  
        </div>  
      </div>  
    </>  
  );  

  const renderContent = () => {  
    if (activeTab === 'list') {  
      return (  
        <div className="space-y-4">  
          <ListPembelian />  
          <RecentTransactions />  
        </div>  
      );  
    }  

    if (isFormOpen) {  
      return (  
        <FormPembelian   
          onClose={() => {  
            setIsFormOpen(false);  
            setActiveTab('list');  
          }}  
          onSuccess={() => {  
            setIsFormOpen(false);  
            setActiveTab('list');  
          }}  
        />  
      );  
    }  

    return null;  
  };  

  return (  
    <div className="container mx-auto px-4 py-6">  
      <div className="bg-white rounded-xl shadow-md overflow-hidden">  
        {renderHeader()}  
        
        <div className="p-4">  
          {renderContent()}  
        </div>  
      </div>  
    </div>  
  );  
};  

export default OrderManagementPage;