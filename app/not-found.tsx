'use client';

import Link from 'next/link';
import { Leaf, Home, ArrowLeft } from 'lucide-react';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.illustration}>
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="58" stroke="var(--color-primary)" strokeWidth="3" strokeDasharray="8 8" opacity="0.3"/>
            <text x="60" y="75" textAnchor="middle" fontSize="48" fontWeight="800" fill="var(--color-primary)">404</text>
          </svg>
        </div>
        
        <div className={styles.icon}>
          <Leaf size={48} strokeWidth={1.5} />
        </div>
        
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.desc}>
          Oops! The page you are looking for has wandered off our organic farm. 
          It may have been moved, deleted, or never existed.
        </p>
        
        <div className={styles.actions}>
          <Link href="/" className={styles.primaryBtn}>
            <Home size={18} />
            Back to Home
          </Link>
          <button onClick={() => history.back()} className={styles.secondaryBtn}>
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
        
        <div className={styles.suggestions}>
          <h3 className={styles.suggestionsTitle}>You might be looking for:</h3>
          <div className={styles.links}>
            <Link href="/products" className={styles.linkItem}>Our Products</Link>
            <Link href="/blog" className={styles.linkItem}>Wellness Blog</Link>
            <Link href="/gallery" className={styles.linkItem}>Farm Gallery</Link>
            <Link href="/contact" className={styles.linkItem}>Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
