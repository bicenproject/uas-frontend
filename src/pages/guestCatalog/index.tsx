 import { useEffect, useState } from 'react';  
import { CatalogService } from '@/services/catalogService';  
 import { SearchBar } from '../../components/SearchBar';
import { FilterBar } from '../../components/FilterBar';
import { ProductCard } from '../../components/ProductCard';
import { QuickViewModal } from '../../components/QuickviewModal';
import { Product } from '@/models/productModel';
import { toast } from 'sonner';
  

export default function CatalogPage() {  
  const [products, setProducts] = useState<Product[]>([]);  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState('');  
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);  
  const [searchQuery, setSearchQuery] = useState('');  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);  
  const [sortBy, setSortBy] = useState('newest');  

  useEffect(() => {  
    fetchProducts();  
  }, []);  

  useEffect(() => {  
    filterAndSortProducts();  
  }, [selectedCategory, searchQuery, sortBy, products]);  

  const fetchProducts = async () => {  
    try {  
      setLoading(true);  
      const response = await CatalogService.getAllProducts();  
      setProducts(response.result);  
    } catch (err: any) {  
      setError(err.message || 'Failed to fetch products');  
    } finally {  
      setLoading(false);  
    }  
  };  

  const filterAndSortProducts = () => {  
    let filtered = [...products];  

    // Apply category filter  
    if (selectedCategory) {  
      filtered = filtered.filter(p => p.category_id === selectedCategory);  
    }  

    // Apply search filter  
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
      // pages/catalog.tsx (lanjutan)  
      case 'name-asc':  
        filtered.sort((a, b) => a.nama_barang.localeCompare(b.nama_barang));  
        break;  
      case 'name-desc':  
        filtered.sort((a, b) => b.nama_barang.localeCompare(a.nama_barang));  
        break;  
      default: // newest  
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());  
    }  

    setFilteredProducts(filtered);  
  };  

  const handleAddToCart = (product: Product) => {  
    toast.success(`${product.nama_barang} ditambahkan ke keranjang`, {  
      duration: 2000,  
      position: 'top-right',  
    });  
  };  
 

  const handleQuickView = (product: Product) => {  
    setSelectedProduct(product);  
  };  

  const categories = [  
    ...new Set(products.map(p => p.category).filter(c => c).map(c => ({  
      id: c!.id,  
      name: c!.name  
    })))  
  ];  

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
       <div className="bg-white shadow-sm">  
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">  
          <h1 className="text-2xl font-bold text-gray-900">Katalog Produk</h1>  
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

        {/* Products Grid */}  
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
          <div className="text-center py-12">  
            <div className="text-gray-500 mb-4">  
              <svg  
                className="mx-auto h-12 w-12"  
                fill="none"  
                viewBox="0 0 24 24"  
                stroke="currentColor"  
                aria-hidden="true"  
              >  
                <path  
                  strokeLinecap="round"  
                  strokeLinejoin="round"  
                  strokeWidth={2}  
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"  
                />  
              </svg>  
            </div>  
            <h3 className="text-lg font-medium text-gray-900 mb-2">  
              Tidak ada produk ditemukan  
            </h3>  
            <p className="text-gray-500">  
              Coba ubah filter atau kata kunci pencarian Anda  
            </p>  
          </div>  
        )}  
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