// src/components/FormPembelian.tsx  
import React, { useState, useEffect } from 'react';  
import { Plus, Trash } from '@phosphor-icons/react';  
import { Product } from '@/models/productModel';  
import { SupplierService } from '@/services/supplierService';  
import { formatPrice } from '@/utils/formatPrice';  
import { ProductService } from '@/services/productService';  
import { Supplier } from '@/models/supplierModel';  
import { PembelianService } from '@/services/pembelianService';  
import { toast } from 'sonner';  

interface DetailItem {  
  id_barang: number;  
  barang?: Product;  
  quantity: number;  
  harga_beli: string;  
  subtotal: number;  
}  

interface FormPembelianProps {  
  onClose: () => void;  
  onSuccess?: () => void;  
}  

const FormPembelian: React.FC<FormPembelianProps> = ({ onClose, onSuccess }) => {  
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);  
  const [products, setProducts] = useState<Product[]>([]);  
  const [selectedSupplier, setSelectedSupplier] = useState<number>();  
  const [details, setDetails] = useState<DetailItem[]>([]);  
  const [loading, setLoading] = useState(false);  

  useEffect(() => {  
    loadInitialData();  
  }, []);  

  const loadInitialData = async () => {  
    const loadingToast = toast.loading('Memuat data...');  
    try {  
      const [suppliersRes, productsRes] = await Promise.all([  
        SupplierService.getAll(),  
        ProductService.getAll(),  
      ]);  
      setSuppliers(suppliersRes.result);  
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
      { id_barang: 0, quantity: 1, harga_beli: '0', subtotal: 0 },  
    ]);  
  };  

  const removeDetail = (index: number) => {  
    setDetails(details.filter((_, i) => i !== index));  
  };  

  const updateDetail = (index: number, field: keyof DetailItem, value: any) => {  
    const newDetails = [...details];  
    const detail = newDetails[index];  

    if (field === 'id_barang') {  
      const product = products.find((p) => p.id === Number(value));  
      if (product) {  
        detail.barang = product;  
        detail.harga_beli = product.harga_beli;  
        detail.subtotal = parseInt(product.harga_beli) * detail.quantity;  
      }  
    } else if (field === 'quantity') {  
      const qty = Number(value);  
      if (qty < 1) {  
        toast.error('Quantity tidak boleh kurang dari 1');  
        return;  
      }  
      detail.quantity = qty;  
      detail.subtotal = parseInt(detail.harga_beli) * qty;  
    } else if (field === 'harga_beli') {  
      const harga = value.replace(/\D/g, '');  
      if (parseInt(harga) < 1) {  
        toast.error('Harga beli tidak boleh 0');  
        return;  
      }  
      detail.harga_beli = harga;  
      detail.subtotal = parseInt(harga) * detail.quantity;  
    }  

    detail[field] = value;  
    setDetails(newDetails);  
  };  

  const handleSubmit = async () => {  
    if (!selectedSupplier || details.length === 0) {  
      toast.error('Mohon pilih supplier dan tambahkan minimal 1 barang');  
      return;  
    }  

    const invalidDetails = details.some(  
      (detail) =>  
        !detail.id_barang || detail.quantity < 1 || parseInt(detail.harga_beli) < 1  
    );  

    if (invalidDetails) {  
      toast.error('Mohon lengkapi data pembelian dengan benar');  
      return;  
    }  

    const loadingToast = toast.loading('Menyimpan transaksi...');  
    try {  
      setLoading(true);  

      const payload = {  
        id_supplier: selectedSupplier,  
        tanggal_pembelian: new Date(),  
        details: details.map((detail) => ({  
          id_barang: detail.id_barang,  
          quantity: Number(detail.quantity),  
          harga_beli: detail.harga_beli,  
        })),  
      };  

      await PembelianService.create(payload);  

      toast.success('Transaksi pembelian berhasil disimpan');  
      toast.dismiss(loadingToast);  
      onSuccess?.();  
      onClose();  
    } catch (error: any) {  
      toast.error(error.message || 'Gagal menyimpan transaksi pembelian');  
      toast.dismiss(loadingToast);  
    } finally {  
      setLoading(false);  
    }  
  };  

  const total = details.reduce((sum, item) => sum + item.subtotal, 0);  

  return (  
    <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-auto">  
      <div className="flex justify-between items-center mb-6">  
        <h2 className="text-2xl font-bold text-gray-800">Transaksi Pembelian Baru</h2>  
      </div>  

      <div className="mb-6">  
        <label className="block text-sm font-medium text-gray-700 mb-2">  
          Supplier  
        </label>  
        <select  
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"  
          value={selectedSupplier || ''}  
          onChange={(e) => setSelectedSupplier(Number(e.target.value))}  
        >  
          <option value="">Pilih Supplier</option>  
          {suppliers.map((s) => (  
            <option key={s.id} value={s.id}>  
              {s.name}  
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
                  Harga Beli  
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
                      onChange={(e) =>  
                        updateDetail(index, 'id_barang', Number(e.target.value))  
                      }  
                    >  
                      <option value="">Pilih Barang</option>  
                      {products.map((p) => (  
                        <option key={p.id} value={p.id}>  
                          {p.nama_barang}  
                        </option>  
                      ))}  
                    </select>  
                  </td>  
                  <td className="px-6 py-4">  
                    <input  
                      type="number"  
                      min="1"  
                      className="w-24 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"  
                      value={detail.quantity}  
                      onChange={(e) =>  
                        updateDetail(index, 'quantity', e.target.value)  
                      }  
                    />  
                  </td>  
                  <td className="px-6 py-4">  
                    <input  
                      type="text"  
                      className="w-32 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"  
                      value={formatPrice(detail.harga_beli)}  
                      onChange={(e) => {  
                        const value = e.target.value.replace(/\D/g, '');  
                        updateDetail(index, 'harga_beli', value);  
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
          disabled={loading || !selectedSupplier || details.length === 0}  
          className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200  
            disabled:bg-gray-400 disabled:cursor-not-allowed ${loading ? 'opacity-70' : ''}`}  
        >  
          {loading ? 'Menyimpan...' : 'Simpan'}  
        </button>  
      </div>  
    </div>  
  );  
};  

export default FormPembelian;