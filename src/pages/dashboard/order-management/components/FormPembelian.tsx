import React, { useState, useEffect } from 'react';  
import { Plus, Trash, Info } from '@phosphor-icons/react';  
import { Product } from '@/models/productModel';  
import { SupplierService } from '@/services/supplierService';  
import { formatPrice } from '@/utils/formatPrice';  
import { ProductService } from '@/services/productService';  
import { Supplier } from '@/models/supplierModel';  
import { toast } from 'sonner';  
import { PembelianService } from '@/services/pembelianService';  

interface DetailItem {  
  id_barang: number;  
  barang?: Product;  
  qty: number;  
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
      
      // Filter produk yang memiliki harga beli valid  
      const validProducts = productsRes.filter(  
        product => product.harga_beli && parseFloat(product.harga_beli) > 0  
      );  
      setProducts(validProducts);  
      
      toast.dismiss(loadingToast);  
    } catch (error: any) {  
      toast.error('Gagal memuat data: ' + error.message);  
      toast.dismiss(loadingToast);  
    }  
  };  

  const addDetail = () => {  
    setDetails([  
      ...details,  
      { id_barang: 0, qty: 1, harga_beli: '0', subtotal: 0 },  
    ]);  
  };  

  const removeDetail = (index: number) => {  
    setDetails(details.filter((_, i) => i !== index));  
  };  

  const updateDetail = (  
    index: number,  
    field: keyof DetailItem,  
    value: string | number  
  ) => {  
    const newDetails = [...details];  
    const detail = newDetails[index];  

    switch (field) {  
      case 'id_barang': {  
        const productId = Number(value);  
        const product = products.find(p => p.id === productId);  
        if (product) {  
          // Validasi harga beli  
          if (!product.harga_beli || parseFloat(product.harga_beli) <= 0) {  
            toast.error('Produk ini belum memiliki harga beli yang valid. Silakan update di halaman produk.');  
            return;  
          }  

          detail.barang = product;  
          // Harga beli diambil langsung dari produk dan tidak bisa diubah  
          detail.harga_beli = product.harga_beli;  
          detail.subtotal = parseInt(product.harga_beli) * detail.qty;  
          detail.id_barang = productId;  
        }  
        break;  
      }  
      case 'qty': {  
        const qty = Number(value);  
        const product = products.find(p => p.id === detail.id_barang);  
        
        // Validasi stok  
        if (product && qty > product.stock) {  
          toast.error(`Stok tidak mencukupi. Sisa stok: ${product.stock}`);  
          return;  
        }  

        detail.qty = qty;  
        detail.subtotal = parseInt(detail.harga_beli) * qty;  
        break;  
      }  
      default:  
        (detail as any)[field] = value;  
    }  

    setDetails(newDetails);  
  };  

  const handleSubmit = async () => {  
    // Validasi input  
    if (!selectedSupplier || details.length === 0) {  
      toast.error('Mohon pilih supplier dan tambahkan minimal 1 barang');  
      return;  
    }  

    const invalidDetails = details.some(  
      (detail) =>  
        !detail.id_barang ||   
        detail.qty < 1 ||   
        parseFloat(detail.harga_beli) <= 0  
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
          quantity: Number(detail.qty),  
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
                      value={detail.qty}  
                      onChange={(e) =>  
                        updateDetail(index, 'qty', e.target.value)  
                      }  
                    />  
                  </td>  
                  <td className="px-6 py-4 relative">  
                    <div className="w-32 p-2 bg-gray-100 border border-gray-300 rounded-md flex items-center justify-between">  
                      {formatPrice(detail.harga_beli)}  
                      <div   
                        className="ml-2 text-gray-500 cursor-help"  
                        title="Harga beli diambil dari data produk dan tidak dapat diubah"  
                      >  
                        <Info weight="bold" className="w-4 h-4" />  
                      </div>  
                    </div>  
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
          {loading ? 'Buying...' : 'Buy'}  
        </button>  
      </div>  
    </div>  
  );  
};  

export default FormPembelian;