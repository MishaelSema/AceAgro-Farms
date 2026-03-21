'use client';

import { useState, useMemo, useEffect } from 'react';
import { Check, Search, Filter, X, Loader2 } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import styles from './ProductsContent.module.css';

interface Product {
  id: string;
  _id: string;
  name: string;
  slug: string;
  price: number;
  unit: string;
  image: string;
  shortDescription: string;
  category: string;
  organic: boolean;
  inStock: boolean;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

const benefits = ['100% Chemical-Free', 'Farm-Fresh Daily', 'Sustainably Grown', 'Nutrient-Rich', 'Ethically Raised', 'Quality Assured'];

export default function ProductsContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        const [productsRes, categoriesRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/categories')
        ]);
        
        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();
        
        if (productsData.success && productsData.products) {
          const formattedProducts = productsData.products.map((p: any) => ({
            id: p._id,
            _id: p._id,
            name: p.name,
            slug: p.slug,
            price: p.price || 0,
            unit: p.unit || 'kg',
            image: p.image || 'https://images.unsplash.com/photo-1518843875459-f738682238a6?w=600&q=80',
            shortDescription: p.shortDescription || '',
            category: p.category || 'produce',
            organic: p.organic ?? true,
            inStock: p.inStock ?? true,
          }));
          setProducts(formattedProducts);
        }
        
        if (categoriesData.success && categoriesData.categories) {
          setCategories(categoriesData.categories);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      
      const matchesStock = !showInStockOnly || product.inStock;
      
      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [products, searchQuery, selectedCategory, showInStockOnly]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setShowInStockOnly(false);
  };

  const hasActiveFilters = searchQuery || selectedCategory !== 'all' || showInStockOnly;

  if (isLoading) {
    return (
      <section className={styles.products}>
        <div className={styles.container}>
          <div className={styles.loadingState}>
            <Loader2 size={48} className={styles.spinner} />
            <p>Loading products...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.products}>
        <div className={styles.container}>
          <div className={styles.errorState}>
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className={styles.retryBtn}>
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.products}>
      <div className={styles.container}>
        <div className={styles.productsHeader}>
          <div className={styles.headerTop}>
            <h2>All Products</h2>
            <div className={styles.benefits}>
              {benefits.map((benefit, index) => (
                <span key={index} className={styles.benefit}>
                  <Check size={16} />
                  {benefit}
                </span>
              ))}
            </div>
          </div>
          
          <div className={styles.searchFilterRow}>
            <div className={styles.searchBox}>
              <Search size={20} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className={styles.clearSearch}
                >
                  <X size={16} />
                </button>
              )}
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`${styles.filterToggle} ${showFilters ? styles.active : ''}`}
            >
              <Filter size={20} />
              Filters
              {hasActiveFilters && <span className={styles.filterBadge} />}
            </button>
          </div>

          {showFilters && (
            <div className={styles.filtersPanel}>
              <div className={styles.categoryFilters}>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`${styles.categoryBtn} ${selectedCategory === 'all' ? styles.active : ''}`}
                >
                  All Products ({products.length})
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat._id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`${styles.categoryBtn} ${selectedCategory === cat.slug ? styles.active : ''}`}
                  >
                    {cat.name} ({cat.productCount || 0})
                  </button>
                ))}
              </div>
              
              <label className={styles.stockFilter}>
                <input
                  type="checkbox"
                  checked={showInStockOnly}
                  onChange={(e) => setShowInStockOnly(e.target.checked)}
                />
                <span>Show in-stock only</span>
              </label>
              
              {hasActiveFilters && (
                <button onClick={clearFilters} className={styles.clearFilters}>
                  Clear all filters
                </button>
              )}
            </div>
          )}

          <p className={styles.resultsCount}>
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className={styles.productsGrid}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                slug={product.slug}
                price={product.price}
                unit={product.unit}
                image={product.image}
                shortDescription={product.shortDescription}
                organic={product.organic}
                inStock={product.inStock}
              />
            ))}
          </div>
        ) : (
          <div className={styles.noResults}>
            <p>No products found matching your criteria.</p>
            <button onClick={clearFilters} className={styles.clearFiltersLarge}>
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
