'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';
import SectionTitle from './SectionTitle';
import styles from './FeaturedProducts.module.css';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  unit: string;
  image: string;
  shortDescription: string;
  organic?: boolean;
  inStock?: boolean;
}

const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Organic Moringa Tea',
    slug: 'organic-moringa-tea',
    price: 2500,
    unit: '100g',
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=600&q=80',
    shortDescription: 'Premium dried moringa leaves for a refreshing and health-boosting tea experience.',
    organic: true,
    inStock: true,
  },
  {
    id: '2',
    name: 'Fresh Organic Tomatoes',
    slug: 'fresh-organic-tomatoes',
    price: 1500,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1546470427-227c7b3f6b5b?w=600&q=80',
    shortDescription: 'Juicy, vine-ripened tomatoes grown without any chemical pesticides.',
    organic: true,
    inStock: true,
  },
  {
    id: '3',
    name: 'Pasture-Raised Chicken',
    slug: 'pasture-raised-chicken',
    price: 4500,
    unit: 'bird',
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=600&q=80',
    shortDescription: 'Free-range chickens raised on natural pasture for premium quality meat.',
    organic: true,
    inStock: true,
  },
  {
    id: '4',
    name: 'Fresh Catfish',
    slug: 'fresh-catfish',
    price: 3500,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=600&q=80',
    shortDescription: 'Clean, fresh catfish raised in natural pond environments.',
    organic: true,
    inStock: true,
  },
];

export default function FeaturedProducts() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionTitle
          title="Featured Products"
          subtitle="Discover our selection of premium organic products, carefully harvested and raised for your wellness."
        />
        
        <div className={styles.grid}>
          {featuredProducts.map((product) => (
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
