'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Leaf, Coffee, Drumstick, Fish } from 'lucide-react';
import styles from './CategoriesSection.module.css';

const categories = [
  {
    icon: Leaf,
    title: 'Organic Produce',
    description: 'Fresh vegetables and fruits grown without chemicals',
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&q=80',
    href: '/products?category=produce',
    count: '24+ Products',
  },
  {
    icon: Coffee,
    title: 'Wellness Products',
    description: 'Herbal teas, remedies, and natural beverages',
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=600&q=80',
    href: '/products?category=wellness',
    count: '15+ Products',
  },
  {
    icon: Drumstick,
    title: 'Animal Products',
    description: 'Pasture-raised poultry, goat, and rabbit',
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=600&q=80',
    href: '/products?category=animal',
    count: '12+ Products',
  },
  {
    icon: Fish,
    title: 'Fish & Aquaculture',
    description: 'Fresh fish from clean, natural ponds',
    image: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=600&q=80',
    href: '/products?category=fish',
    count: '8+ Products',
  },
];

export default function CategoriesSection() {
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
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className={styles.card}
            >
              <div className={styles.imageContainer}>
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className={styles.image}
                />
                <div className={styles.overlay} />
              </div>
              <div className={styles.content}>
                <div className={styles.iconWrapper}>
                  <category.icon size={28} />
                </div>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <span className={styles.count}>{category.count}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
