'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';
import SectionTitle from './SectionTitle';
import styles from './FeaturedProducts.module.css';

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

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch('/api/products?featured=true');
        const data = await res.json();
        setProducts(data.products?.slice(0, 4) || []);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  if (loading) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <SectionTitle
            title="Featured Products"
            subtitle="Discover our selection of premium organic products, carefully harvested and raised for your wellness."
          />
          <div className={styles.grid}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={styles.skeleton}>
                <div className={styles.skeletonImage} />
                <div className={styles.skeletonContent}>
                  <div className={styles.skeletonLine} style={{ width: '60%' }} />
                  <div className={styles.skeletonLine} style={{ width: '100%' }} />
                  <div className={styles.skeletonLine} style={{ width: '40%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <SectionTitle
            title="Featured Products"
            subtitle="Discover our selection of premium organic products, carefully harvested and raised for your wellness."
          />
          <p style={{ textAlign: 'center', color: 'var(--color-gray-500)', padding: '2rem 0' }}>
            No featured products yet. Add products from the admin dashboard.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionTitle
          title="Featured Products"
          subtitle="Discover our selection of premium organic products, carefully harvested and raised for your wellness."
        />
        
        <div className={styles.grid}>
          {products.map((product) => (
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

        <div className={styles.viewAll}>
          <Link href="/products" className={styles.viewAllBtn}>
            View All Products
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
