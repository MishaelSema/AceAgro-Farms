'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import styles from './CTASection.module.css';

export default function CTASection() {
  return (
    <section className={styles.section}>
      <div className={styles.background}>
        <Image
          src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&q=80"
          alt="ACE AGRO FARMS"
          fill
          className={styles.bgImage}
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>
            Start Your Wellness Journey Today
          </h2>
          <p className={styles.subtitle}>
            Join hundreds of families who have made the switch to organic, 
            farm-fresh products. Experience the difference that nature intended.
          </p>
          <div className={styles.actions}>
            <Link href="/products" className={styles.primaryBtn}>
              Shop Now
              <ArrowRight size={20} />
            </Link>
            <Link href="/contact" className={styles.secondaryBtn}>
              Contact Us
            </Link>
          </div>
        </div>

        <div className={styles.contactCard}>
          <h3>Get In Touch</h3>
          <p>Have questions? We are here to help!</p>
          <div className={styles.contactItems}>
            <a href="tel:+237679080426" className={styles.contactItem}>
              <Phone size={20} />
              <span>+237 679 080 426</span>
            </a>
            <a href="mailto:hello@aceagrofarms.com" className={styles.contactItem}>
              <Mail size={20} />
              <span>hello@aceagrofarms.com</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
