'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Leaf, Coffee, Drumstick, Fish } from 'lucide-react';
import styles from './CategoriesSection.module.css';

const iconMap: Record<string, any> = {
  produce: Leaf,
  wellness: Coffee,
  animal: Drumstick,
  fish: Fish,
};

interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image: string;
  productCount?: number;
}

export default function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        setCategories(data.categories || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.header}>
            <span className={styles.label}>Our Categories</span>
            <h2 className={styles.title}>Explore Our Farm Fresh Selection</h2>
            <p className={styles.subtitle}>
              From organic vegetables to wellness herbs, we offer a complete range 
              of naturally grown products for your healthy lifestyle.
            </p>
          </div>
          <div className={styles.grid}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={styles.skeletonCard}>
                <div className={styles.skeletonImage} />
                <div className={styles.skeletonContent} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.header}>
            <span className={styles.label}>Our Categories</span>
            <h2 className={styles.title}>Explore Our Farm Fresh Selection</h2>
            <p className={styles.subtitle}>
              From organic vegetables to wellness herbs, we offer a complete range 
              of naturally grown products for your healthy lifestyle.
            </p>
          </div>
          <p style={{ textAlign: 'center', color: 'var(--color-gray-500)', padding: '2rem 0' }}>
            No categories yet. Add categories from the admin dashboard.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>Our Categories</span>
          <h2 className={styles.title}>Explore Our Farm Fresh Selection</h2>
          <p className={styles.subtitle}>
            From organic vegetables to wellness herbs, we offer a complete range 
            of naturally grown products for your healthy lifestyle.
          </p>
        </div>

        <div className={styles.grid}>
          {categories.map((category) => {
            const Icon = iconMap[category.slug] || Leaf;
            return (
              <Link
                key={category._id}
                href={`/products?category=${category.slug}`}
                className={styles.card}
              >
                <div className={styles.imageContainer}>
                  <Image
                    src={category.image || 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&q=80'}
                    alt={category.name}
                    fill
                    className={styles.image}
                  />
                  <div className={styles.overlay} />
                </div>
                <div className={styles.content}>
                  <div className={styles.iconWrapper}>
                    <Icon size={28} />
                  </div>
                  <h3>{category.name}</h3>
                  <p>{category.description || 'Browse our organic products'}</p>
                  <span className={styles.count}>
                    {category.productCount || 0}+ Products
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
