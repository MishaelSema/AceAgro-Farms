'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Leaf, Truck, Heart } from 'lucide-react';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.background}>
        <Image
          src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1920&q=80"
          alt="ACE AGRO FARMS - Organic Farm"
          fill
          priority
          className={styles.bgImage}
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.content}>
        <div className={styles.tagline}>
          <Leaf size={18} />
          <span>100% Organic & Sustainable</span>
        </div>

        <h1 className={styles.title}>
          From Farm to Wellness
          <span className={styles.highlight}>Pure, Natural Living</span>
        </h1>

        <p className={styles.subtitle}>
          Discover premium organic produce, herbal wellness products, 
          pasture-raised meats, and fresh fish — delivered straight from 
          our farm to your table.
        </p>

        <div className={styles.actions}>
          <Link href="/products" className={styles.primaryBtn}>
            Shop Now
            <ArrowRight size={20} />
          </Link>
          <Link href="/about" className={styles.secondaryBtn}>
            Learn More
          </Link>
        </div>

        <div className={styles.features}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <Leaf size={24} />
            </div>
            <div>
              <h4>100% Organic</h4>
              <p>Chemical-free farming</p>
            </div>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <Truck size={24} />
            </div>
            <div>
              <h4>Fresh Delivery</h4>
              <p>Farm to your door</p>
            </div>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <Heart size={24} />
            </div>
            <div>
              <h4>Ethically Raised</h4>
              <p>Humane practices</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
