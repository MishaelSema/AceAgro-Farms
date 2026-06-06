'use client';

import Image from 'next/image';
import { CheckCircle, Award, Truck, Shield, Leaf, Heart } from 'lucide-react';
import styles from './WhyChooseUs.module.css';

const reasons = [
  {
    icon: Leaf,
    title: '100% Organic',
    description: 'All products are grown without chemical pesticides or fertilizers.',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Rigorous standards ensure the highest quality in everything we produce.',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Quick and reliable delivery to get farm-fresh products to you.',
  },
  {
    icon: Shield,
    title: 'Safe & Secure',
    description: 'Your satisfaction is guaranteed with our quality assurance.',
  },
  {
    icon: Heart,
    title: 'Ethically Raised',
    description: 'Our animals are treated humanely with access to natural pasture.',
  },
  {
    icon: CheckCircle,
    title: 'Lab Tested',
    description: 'All products undergo quality testing for your peace of mind.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.imageSide}>
          <div className={styles.imageWrapper}>
            <Image
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80"
              alt="Fresh organic produce"
              fill
              className={styles.image}
            />
          </div>
          <div className={styles.statsCard}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>500+</span>
              <span className={styles.statLabel}>Happy Customers</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>50+</span>
              <span className={styles.statLabel}>Products</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>10+</span>
              <span className={styles.statLabel}>Years Experience</span>
            </div>
          </div>
        </div>

        <div className={styles.contentSide}>
          <span className={styles.label}>Why Choose Us</span>
          <h2 className={styles.title}>
            The ACE AGRO FARMS Difference
          </h2>
          <p className={styles.subtitle}>
            We go beyond organic farming to deliver products that truly make 
            a difference in your health and wellness journey.
          </p>

          <div className={styles.grid}>
            {reasons.map((reason, index) => (
              <div key={index} className={styles.card}>
                <div className={styles.iconWrapper}>
                  <reason.icon size={24} />
                </div>
                <div>
                  <h4>{reason.title}</h4>
                  <p>{reason.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
