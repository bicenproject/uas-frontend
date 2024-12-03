import { useEffect, useState } from 'react';
import { Product, ProductService } from '@/services/productService';
import { toast } from 'sonner';
import Link from 'next/link';
import { Modal } from '@/components/Modal';
import { formatPrice } from '@/utils/formatPrice';
import { ProductForm } from './[action]';
import { DeleteConfirmationModal } from './components/DeleteConfirmationModal';
import {
  Package,
  PencilSimple,
  Plus,
  Trash,
  Tag,
  ShoppingCart,
  Money,
  MagnifyingGlass,
  Funnel
} from '@phosphor-icons/react';
import Head from 'next/head';

interface SortOption {
  field: keyof Product;
  direction: 'asc' | 'desc';
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [supervisor, setSupervisor] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>({
    field: 'nama_barang',
    direction: 'asc'
  });
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    product?: Product
  }>({
    isOpen: false,
  });
  const [editModal, setEditModal] = useState<{
    isOpen: boolean;
    product?: Product
  }>({
    isOpen: false,
  });

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

  const isSupervisor = supervisor;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await ProductService.getAll();
      setProducts(data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal.product) return;

    try {
      await ProductService.delete(deleteModal.product.id);
      toast.success('Produk berhasil dihapus');
      setDeleteModal({ isOpen: false });
      fetchProducts();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleEditSuccess = () => {
    setEditModal({ isOpen: false });
    fetchProducts();
  };

  const filteredProducts = products
    .filter((product) =>
      product.nama_barang.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortOption.field];
      const bValue = b[sortOption.field];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOption.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOption.direction === 'asc'
          ? aValue - bValue
          : bValue - aValue;
      }

      return 0;
    });

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-2 text-gray-600">Memuat data produk...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>  
        <title>Product | ATK Inventory</title>  
        <meta name="description" content="Sign in to your account" />  
      </Head>  
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <Package weight="bold" className="w-8 h-8" />
              Daftar Produk
            </h1>
            <p className="mt-2 text-gray-600">
              Total {filteredProducts.length} produk tersedia
            </p>
          </div>
          {!isSupervisor && (
            <Link
              href="/dashboard/product-management/create"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg w-full sm:w-auto justify-center"
            >
              <Plus className="mr-2 w-5 h-5" weight="bold" />
              Tambah Produk
            </Link>
          )}
        </div>

        {/* Search and Sort */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari produk atau kategori..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <Funnel className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              className="w-full sm:w-auto pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              value={`${sortOption.field}-${sortOption.direction}`}
              onChange={(e) => {
                const [field, direction] = e.target.value.split('-');
                setSortOption({
                  field: field as keyof Product,
                  direction: direction as 'asc' | 'desc'
                });
              }}
            >
              <option value="nama_barang-asc">Nama A-Z</option>
              <option value="nama_barang-desc">Nama Z-A</option>
              <option value="harga_jual-asc">Harga Terendah</option>
              <option value="harga_jual-desc">Harga Tertinggi</option>
              <option value="stock-asc">Stok Terendah</option>
              <option value="stock-desc">Stok Tertinggi</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden border border-gray-100 group"
          >
            {/* Product Image */}
            <div className="relative h-48 w-full bg-gray-100">
              <img
                src={product.image || 'https://images.ctfassets.net/ihx0a8chifpc/37SPg1N7dGiotuYoIYCWXk/611e638af077126bd6964ff53d12675b/dynamic-dummy-image-generator-1280x720.png?w=1920&q=60&fm=webp'}
                alt={product.nama_barang}
                className="h-full w-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                <Package className="w-4 h-4" />
                <span className="text-sm font-medium text-gray-700">
                  {product.stock}
                </span>
              </div>
              {product.category && (
                <div className="absolute bottom-4 left-4 bg-blue-100 px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                  <Tag className="w-4 h-4 text-blue-800" />
                  <span className="text-sm font-medium text-blue-800">
                    {product.category.name}
                  </span>
                </div>
              )}
              {/* Action Buttons Overlay */}
              {!isSupervisor && (
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button
                    onClick={() => setEditModal({ isOpen: true, product })}
                    className="p-2 bg-white rounded-full text-blue-600 hover:bg-blue-50 transition-colors"
                    title="Edit Produk"
                  >
                    <PencilSimple className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setDeleteModal({ isOpen: true, product })}
                    className="p-2 bg-white rounded-full text-red-600 hover:bg-red-50 transition-colors"
                    title="Hapus Produk"
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                  {product.nama_barang}
                </h3>
              </div>

              {/* Price Information */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <ShoppingCart className="w-4 h-4" />
                    Harga Beli:
                  </span>
                  <span className="font-medium">{formatPrice(product.harga_beli)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center gap-1">
                    <Money className="w-4 h-4" />
                    Harga Jual:
                  </span>
                  <span className="font-semibold text-blue-600">
                    {formatPrice(product.harga_jual)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <Package className="mx-auto h-12 w-12 text-gray-400" weight="thin" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            {searchTerm ? 'Tidak ada produk yang sesuai' : 'Belum ada produk'}
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            {searchTerm
              ? 'Coba ubah kata kunci pencarian Anda'
              : 'Mulai dengan menambahkan produk pertama Anda.'}
          </p>
          {!isSupervisor && !searchTerm && (
            <Link
              href="/dashboard/product-management/create"
              className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Plus className="mr-2 w-5 h-5" weight="bold" />
              Tambah Produk
            </Link>
          )}
        </div>
      )}

       {!isSupervisor && (
        <>
          <DeleteConfirmationModal
            isOpen={deleteModal.isOpen}
            onClose={() => setDeleteModal({ isOpen: false })}
            onConfirm={handleDelete}
            title="Hapus Produk"
            message={`Apakah Anda yakin ingin menghapus produk "${deleteModal.product?.nama_barang}"?`}
          />

          <Modal
            isOpen={editModal.isOpen}
            onClose={() => setEditModal({ isOpen: false })}
            title="Edit Produk"
          >
            <ProductForm
              initialData={editModal.product}
              onSuccess={handleEditSuccess}
              onCancel={() => setEditModal({ isOpen: false })}
              isModal
            />
          </Modal>
        </>
      )}
    </div>
    </>
  );
}