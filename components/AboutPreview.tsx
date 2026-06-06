'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sprout, Sun, Droplets } from 'lucide-react';
import styles from './AboutPreview.module.css';

const values = [
  {
    icon: Sprout,
    title: 'Organic Excellence',
    description: '100% chemical-free farming practices for the purest products.',
  },
  {
    icon: Sun,
    title: 'Sustainable Future',
    description: 'Eco-friendly methods that protect our land for generations.',
  },
  {
    icon: Droplets,
    title: 'Farm Fresh',
    description: 'Harvested at peak ripeness for maximum nutrition and flavor.',
  },
];

export default function AboutPreview() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.imageColumn}>
          <div className={styles.mainImage}>
            <Image
              src="https://images.unsplash.com/photo-1595855759920-86582396756a?w=800&q=80"
              alt="ACE AGRO FARMS - Our Farm"
              fill
              className={styles.image}
            />
          </div>
          <div className={styles.floatingCard}>
            <span className={styles.number}>10+</span>
            <span className={styles.label}>Years of Excellence</span>
          </div>
        </div>

        <div className={styles.contentColumn}>
          <span className={styles.label}>About ACE AGRO FARMS</span>
          <h2 className={styles.title}>
            Cultivating Wellness Through Nature
          </h2>
          <p className={styles.description}>
            At ACE AGRO FARMS, we believe in the power of nature to nurture 
            and heal. Our farm combines traditional organic farming practices 
            with modern sustainable techniques to produce the finest quality 
            food and wellness products.
          </p>
          <p className={styles.description}>
            Every product that leaves our farm is a testament to our commitment 
            to purity, sustainability, and your well-being. From our 
            pesticide-free vegetables to our humanely raised livestock, we 
            ensure excellence at every step.
          </p>

          <div className={styles.values}>
            {values.map((value, index) => (
              <div key={index} className={styles.value}>
                <div className={styles.valueIcon}>
                  <value.icon size={24} />
                </div>
                <div>
                  <h4>{value.title}</h4>
                  <p>{value.description}</p>
                </div>
              </div>
            ))}
          </div>

          <Link href="/about" className={styles.link}>
            Discover Our Story
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
