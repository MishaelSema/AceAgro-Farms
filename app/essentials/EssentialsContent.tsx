'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Loader2 } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { useToast } from '@/components/ui/Toast';
import styles from './page.module.css';

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  unit: string;
  image: string;
  shortDescription: string;
  organic?: boolean;
  inStock?: boolean;
}

const subcategories = [
  { id: 'all', label: 'All' },
  { id: 'wellness', label: 'Wellness' },
  { id: 'perfume', label: 'Fragrances' },
  { id: 'skincare', label: 'Skincare' },
];

export default function EssentialsContent() {
  const { showToast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSubcategory, setActiveSubcategory] = useState('all');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/products?category=wellness');
        const data = await res.json();
        if (data.products) {
          setProducts(data.products);
        }
      } catch (error) {
        showToast('Failed to load products', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = activeSubcategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeSubcategory);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.label}>Essentials</span>
          <h1>Wellness & Fragrance Collection</h1>
          <p>
            Discover our curated selection of organic wellness products and premium fragrances. 
            From herbal teas to exotic perfumes, find your essence of natural luxury.
          </p>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.filterBar}>
            <div className={styles.subcategories}>
              {subcategories.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setActiveSubcategory(sub.id)}
                  className={`${styles.subcategoryBtn} ${activeSubcategory === sub.id ? styles.active : ''}`}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className={styles.loadingContainer}>
              <Loader2 className={styles.spinner} size={40} />
              <p>Loading products...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className={styles.productsGrid}>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  id={product._id}
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
            <div className={styles.emptyState}>
              <p>No products found in this category.</p>
              <Link href="/products" className={styles.secondaryBtn}>
                Browse All Products
              </Link>
            </div>
          )}

          <div className={styles.promoSection}>
            <div className={styles.promoCard}>
              <h3>Custom Fragrance Blends</h3>
              <p>Looking for a signature scent? Contact us for custom fragrance consultations and blends tailored to your preferences.</p>
              <Link href="/contact" className={styles.primaryBtn}>
                <span>Get in Touch</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}