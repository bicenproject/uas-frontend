import { useEffect, useState } from 'react';  
import { CatalogService } from '@/services/catalogService';  
import { CategoryType, Product } from '@/models/productModel';  
import { Package, UserCircle } from '@phosphor-icons/react';  
import { CategoryService } from '@/services/categoryService';  
import { SearchBar } from '@/components/guest-catalog/SearchBar';  
import { ProductCard } from '@/components/guest-catalog/ProductCard';  
import { FilterBar } from '@/components/guest-catalog/FilterBar';  
import { QuickViewModal } from '@/components/guest-catalog/QuickviewModal';  
import Link from 'next/link';

export default function CatalogPage() {  
  const [products, setProducts] = useState<Product[]>([]);  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);  
  const [categories, setCategories] = useState<CategoryType[]>([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState('');  
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);  
  const [searchQuery, setSearchQuery] = useState('');  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);  
  const [sortBy, setSortBy] = useState('newest');  

  useEffect(() => {  
    Promise.all([fetchProducts(), fetchCategories()]);  
  }, []);  

  const fetchCategories = async () => {  
    try {  
      const fetchedCategories = await CategoryService.getAll();  
      setCategories(fetchedCategories);  
    } catch (err: any) {  
      console.error('Gagal memuat kategori:', err.message);  
    }  
  };  

  useEffect(() => {  
    filterAndSortProducts();  
  }, [selectedCategory, searchQuery, sortBy, products]);  

  const fetchProducts = async () => {  
    try {  
      setLoading(true);  
      const response = await CatalogService.getAllProducts();  
      setProducts(response.result);  
    } catch (err: any) {  
      setError(err.message || 'Gagal mengambil produk');  
    } finally {  
      setLoading(false);  
    }  
  };  

  const filterAndSortProducts = () => {  
    let filtered = [...products];  

    if (selectedCategory) {  
      filtered = filtered.filter(p => p.category_id === selectedCategory);  
    }  

    if (searchQuery) {  
      filtered = filtered.filter(p =>  
        p.nama_barang.toLowerCase().includes(searchQuery.toLowerCase()) ||  
        p.category?.name.toLowerCase().includes(searchQuery.toLowerCase())  
      );  
    }  

    // Apply sorting  
    switch (sortBy) {  
      case 'price-asc':  
        filtered.sort((a, b) => Number(a.harga_jual) - Number(b.harga_jual));  
        break;  
      case 'price-desc':  
        filtered.sort((a, b) => Number(b.harga_jual) - Number(a.harga_jual));  
        break;  
      case 'name-asc':  
        filtered.sort((a, b) => a.nama_barang.localeCompare(b.nama_barang));  
        break;  
      case 'name-desc':  
        filtered.sort((a, b) => b.nama_barang.localeCompare(a.nama_barang));  
        break;  
      default:  
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());  
    }  

    setFilteredProducts(filtered);  
  };  

  const handleQuickView = (product: Product) => {  
    setSelectedProduct(product);  
  };  

  if (loading) {  
    return (  
      <div className="min-h-screen flex items-center justify-center">  
        <div className="flex flex-col items-center space-y-4">  
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />  
          <p className="text-gray-500">Memuat produk...</p>  
        </div>  
      </div>  
    );  
  }  

  if (error) {  
    return (  
      <div className="min-h-screen flex items-center justify-center">  
        <div className="text-center">  
          <div className="text-red-500 text-xl font-semibold mb-4">{error}</div>  
          <button  
            onClick={fetchProducts}  
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"  
          >  
            Coba Lagi  
          </button>  
        </div>  
      </div>  
    );  
  }  

  return (  
    <div className="min-h-screen bg-gray-50">  
      {/* Banner */}  
      <div className="bg-blue-600 text-white py-4">  
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">  
          <h2 className="text-xl font-bold">Promo Terbaru! Dapatkan Diskon 20% untuk Semua Produk!</h2>  
          <p className="mt-1">Jangan lewatkan kesempatan ini. Belanja sekarang juga!</p>  
        </div>  
      </div>  

      <div className="bg-white shadow-sm border-b border-gray-100">  
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex justify-between items-center">  
          <div>  
            <h1 className="text-3xl font-bold text-gray-900">Katalog Produk</h1>  
            <p className="text-gray-500 mt-1">Temukan produk pilihan terbaik kami</p>  
          </div>  
          
          <div className="flex items-center space-x-4">  
            <Link   
              href="/auth/sign-in"  
              className="  
                px-4 py-2   
                bg-blue-500   
                text-white   
                rounded-md   
                hover:bg-blue-600   
                transition-colors   
                flex   
                items-center   
                space-x-2   
                shadow-sm  
                group  
              "  
            >  
              <UserCircle className="  
                  group-hover:rotate-12   
                  transition-transform   
                  duration-300  
                "   
                size={20}   
              />  
              <span>Masuk</span>  
            </Link>  
          </div>  
        </div>  
      </div>  

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">  
        <div className="mb-8">  
          <SearchBar onSearch={setSearchQuery} />  
          <FilterBar  
            categories={categories}  
            selectedCategory={selectedCategory}  
            onCategoryChange={setSelectedCategory}  
            onSort={setSortBy}  
          />  
        </div>  

        {filteredProducts.length > 0 ? (  
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">  
            {filteredProducts.map((product) => (  
              <ProductCard  
                key={product.id}  
                product={product}  
                onQuickView={handleQuickView}  
              />  
            ))}  
          </div>  
        ) : (  
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">  
            <Package className="mx-auto h-12 w-12 text-gray-400" weight="thin" />  
            <h3 className="mt-4 text-lg font-medium text-gray-900">  
              Tidak ada produk yang ditemukan  
            </h3>  
            <p className="mt-2 text-sm text-gray-500">  
              Coba ubah kata kunci pencarian atau filter Anda  
            </p>  
          </div>  
        )}  

        {/* Produk Rekomendasi */}  
        <div className="mt-12">  
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Produk Rekomendasi</h2>  
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">  
            {products.slice(0, 4).map((product) => (  
              <ProductCard  
                key={product.id}  
                product={product}  
                onQuickView={handleQuickView}  
              />  
            ))}  
          </div>  
        </div>  
      </div>  

      {selectedProduct && (  
        <QuickViewModal  
          product={selectedProduct}  
          onClose={() => setSelectedProduct(null)}  
        />  
      )}  
    </div>  
  );  
}