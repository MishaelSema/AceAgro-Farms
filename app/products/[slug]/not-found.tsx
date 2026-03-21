import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import styles from './not-found.module.css';

export const metadata: Metadata = {
  title: 'Product Not Found | ACE AGRO FARMS',
};

export default function ProductNotFound() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1>Product Not Found</h1>
        <p>The product you are looking for does not exist or has been removed.</p>
        <Link href="/products" className={styles.backLink}>
          <ArrowLeft size={20} />
          Back to Products
        </Link>
      </div>
    </section>
  );
}
