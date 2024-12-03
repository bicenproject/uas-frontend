// src/components/FormPenjualan.tsx  
import React, { useState, useEffect } from 'react';  
import { Plus, Trash } from '@phosphor-icons/react';  
import { Product } from '@/models/productModel';  
import { CustomerService } from '@/services/customerService';  
import { formatPrice } from '@/utils/formatPrice';  
import { ProductService } from '@/services/productService';  
import { Customer } from '@/models/customerModel';  
import { PenjualanService } from '@/services/penjualanService';  
import { toast } from 'sonner';

 interface DetailItem {  
    id_barang: number;  
    barang?: Product;  
    qty: number;  
    harga_jual: string;   
    subtotal: number;  
  }  

interface FormPenjualanProps {  
  onClose: () => void;  
  onSuccess?: () => void;  
}  

const FormPenjualan: React.FC<FormPenjualanProps> = ({ onClose, onSuccess }) => {  
  const [customers, setCustomers] = useState<Customer[]>([]);  
  const [products, setProducts] = useState<Product[]>([]);  
  const [selectedCustomer, setSelectedCustomer] = useState<number>();  
  const [details, setDetails] = useState<DetailItem[]>([]);  
  const [loading, setLoading] = useState(false);  

  useEffect(() => {  
    loadInitialData();  
  }, []);  

  const loadInitialData = async () => {  
    const loadingToast = toast.loading('Memuat data...');  
    try {  
      const [customersRes, productsRes] = await Promise.all([  
        CustomerService.getAll(),  
        ProductService.getAll()  
      ]);  
      setCustomers(customersRes.result);  
      setProducts(productsRes);  
      toast.dismiss(loadingToast);  
    } catch (error: any) {  
      toast.error('Gagal memuat data: ' + error.message);  
      toast.dismiss(loadingToast);  
    }  
  };  

  const addDetail = () => {  
    setDetails([  
      ...details,  
      { id_barang: 0, qty: 1, harga_jual: '0', subtotal: 0 }  
    ]);  
  };  
  

  const removeDetail = (index: number) => {  
    setDetails(details.filter((_, i) => i !== index));  
  };  

  const updateDetail = (index: number, field: keyof DetailItem, value: any) => {  
    const newDetails = [...details];  
    const detail = newDetails[index];  
  
    if (field === 'id_barang') {  
      const product = products.find(p => p.id === Number(value));  
      if (product) {  
        detail.barang = product;  
        detail.harga_jual = product.harga_jual;  
        detail.subtotal = parseInt(product.harga_jual) * detail.qty;  
      }  
    } else if (field === 'qty') { 
      const qty = Number(value);  
      const product = products.find(p => p.id === detail.id_barang);  
      if (product && qty > product.stock) {  
        toast.error(`Stok tidak mencukupi. Sisa stok: ${product.stock}`);  
        return;  
      }  
      detail.qty = qty;  
      detail.subtotal = parseInt(detail.harga_jual) * qty;  
    } else if (field === 'harga_jual') {  
      const harga = value.replace(/\D/g, '');  
      detail.harga_jual = harga;  
      detail.subtotal = parseInt(harga) * detail.qty;  
    }  
  
    detail[field] = value;  
    setDetails(newDetails);  
  };  

  const handleSubmit = async () => {  
    if (!selectedCustomer || details.length === 0) return;  
  
    const invalidDetails = details.some(  
      detail =>   
        !detail.id_barang ||   
        detail.qty < 1 ||   
        parseInt(detail.harga_jual) < 1  
    );  
  
    if (invalidDetails) {  
      toast.error('Mohon lengkapi data penjualan dengan benar');  
      return;  
    }  
  
    const invalidStock = details.some(detail => {  
      const product = products.find(p => p.id === detail.id_barang);  
      return product && detail.qty > product.stock;  
    });  
  
    if (invalidStock) {  
      toast.error('Stok tidak mencukupi untuk beberapa barang');  
      return;  
    }  
  
    const loadingToast = toast.loading('Menyimpan transaksi...');  
    try {  
      setLoading(true);  
  
      const payload = {  
        id_customer: selectedCustomer,  
        tanggal: new Date(),  
        details: details.map(detail => ({  
          id_barang: detail.id_barang,  
          qty: detail.qty,  
          harga_jual: detail.harga_jual  
        }))  
      };  
  
      await PenjualanService.create(payload);  
      
      toast.success('Transaksi penjualan berhasil disimpan');  
      toast.dismiss(loadingToast);  
      onSuccess?.();  
      onClose();  
    } catch (error: any) {  
      toast.error(error.message || 'Gagal menyimpan transaksi penjualan');  
      toast.dismiss(loadingToast);  
    } finally {  
      setLoading(false);  
    }  
  };  

  const total = details.reduce((sum, item) => sum + item.subtotal, 0);  

  return (  
    <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-auto">  
      <div className="flex justify-between items-center mb-6">  
        <h2 className="text-2xl font-bold text-gray-800">Transaksi Penjualan Baru</h2>  
      </div>  

      <div className="mb-6">  
        <label className="block text-sm font-medium text-gray-700 mb-2">  
          Customer  
        </label>  
        <select  
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"  
          value={selectedCustomer || ''}  
          onChange={(e) => setSelectedCustomer(Number(e.target.value))}  
        >  
          <option value="">Pilih Customer</option>  
          {customers.map(customer => (  
            <option key={customer.id} value={customer.id}>  
              {customer.customer_name}  
            </option>  
          ))}  
        </select>  
      </div>  

      <div className="mb-6">  
        <div className="flex justify-between items-center mb-4">  
          <h3 className="text-lg font-semibold text-gray-800">Detail Barang</h3>  
          <button  
            onClick={addDetail}  
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 flex items-center gap-2"  
          >  
            <Plus weight="bold" className="w-5 h-5" />  
            Tambah Barang  
          </button>  
        </div>  

        <div className="overflow-x-auto">  
          <table className="w-full min-w-full divide-y divide-gray-200">  
            <thead className="bg-gray-50">  
              <tr>  
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">  
                  Barang  
                </th>  
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">  
                  Quantity  
                </th>  
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">  
                  Harga Jual
                </th>  
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">  
                  Subtotal  
                </th>  
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">  
                  Aksi  
                </th>  
              </tr>  
            </thead>  
            <tbody className="bg-white divide-y divide-gray-200">  
              {details.map((detail, index) => (  
                <tr key={index}>  
                  <td className="px-6 py-4">  
                    <select  
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"  
                      value={detail.id_barang || ''}  
                      onChange={(e) => updateDetail(index, 'id_barang', Number(e.target.value))}  
                    >  
                      <option value="">Pilih Barang</option>  
                      {products.map((product) => (  
                        <option key={product.id} value={product.id}>  
                          {product.nama_barang} (Stok: {product.stock})  
                        </option>  
                      ))}  
                    </select>  
                  </td>  
                  <td className="px-6 py-4">  
                    <input  
                        type="number"  
                        min="1"  
                        className="w-24 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"  
                        value={detail.qty}  
                        onChange={(e) => updateDetail(index, 'qty', Number(e.target.value))}  
                    />  
                  </td>  
                  <td className="px-6 py-4">  
                    <input  
                        type="text"  
                        className="w-32 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"  
                        value={formatPrice(detail.harga_jual)}  
                        onChange={(e) => {  
                        const value = e.target.value.replace(/\D/g, '');  
                        updateDetail(index, 'harga_jual', value);  
                        }}  
                    />  
                  </td>  
                  <td className="px-6 py-4 font-medium">  
                    {formatPrice(detail.subtotal.toString())}  
                  </td>  
                  <td className="px-6 py-4">  
                    <button  
                      onClick={() => removeDetail(index)}  
                      className="text-red-500 hover:text-red-700 transition-colors duration-200"  
                    >  
                      <Trash weight="bold" className="w-5 h-5" />  
                    </button>  
                  </td>  
                </tr>  
              ))}  
            </tbody>  
          </table>  
        </div>  

        <div className="flex justify-end mt-4">  
          <div className="text-xl font-bold text-gray-800">  
            Total: {formatPrice(total.toString())}  
          </div>  
        </div>  
      </div>  

      <div className="flex justify-end gap-3 mt-6">  
        <button  
          onClick={onClose}  
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"  
        >  
          Batal  
        </button>  
        <button  
          onClick={handleSubmit}  
          disabled={loading || !selectedCustomer || details.length === 0}  
          className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200  
            disabled:bg-gray-400 disabled:cursor-not-allowed ${loading ? 'opacity-70' : ''}`}  
        >  
          {loading ? 'Menyimpan...' : 'Simpan'}  
        </button>  
      </div>  
    </div>  
  );  
};  

export default FormPenjualan;