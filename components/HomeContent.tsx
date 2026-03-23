'use client';

import Hero from './Hero';
import FeaturedProducts from './FeaturedProducts';
import AboutPreview from './AboutPreview';
import CategoriesSection from './CategoriesSection';
import WhyChooseUs from './WhyChooseUs';
import CTASection from './CTASection';
import Link from 'next/link';
import styles from './HomeContent.module.css';

export default function HomeContent() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      
      <section className={styles.essentialsSection}>
        <div className={styles.container}>
          <div className={styles.essentialsHeader}>
            <h2>Shop Essentials</h2>
            <p>Explore our premium wellness and fragrance collection</p>
          </div>
          <Link href="/essentials" className={styles.essentialsBtn}>
            View Essentials Collection
          </Link>
        </div>
      </section>
      
      <AboutPreview />
      <CategoriesSection />
      <WhyChooseUs />
      <CTASection />
    </>
  );
}
