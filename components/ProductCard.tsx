'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Leaf, Check } from 'lucide-react';
import { useCart, CartItem } from '@/context/CartContext';
import styles from './ProductCard.module.css';

interface ProductCardProps {
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

export default function ProductCard({
  id,
  name,
  slug,
  price,
  unit,
  image,
  shortDescription,
  organic = true,
  inStock = true,
}: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    const item: CartItem = {
      id,
      name,
      price,
      image,
      quantity: 1,
      unit,
    };
    addToCart(item);
  };

  return (
    <Link href={`/products/${slug}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className={styles.image}
        />
        {organic && (
          <div className={styles.badge}>
            <Leaf size={14} />
            <span>Organic</span>
          </div>
        )}
        {!inStock && (
          <div className={styles.outOfStock}>Out of Stock</div>
        )}
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.description}>{shortDescription}</p>
        <div className={styles.footer}>
          <div className={styles.price}>
            <span className={styles.amount}>FCFA {price.toLocaleString()}</span>
            <span className={styles.unit}>/{unit}</span>
          </div>
          <button
            onClick={handleAddToCart}
            className={styles.addButton}
            disabled={!inStock}
            aria-label={`Add ${name} to cart`}
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className={styles.card}>
      <div className={`${styles.imageContainer} ${styles.skeleton}`} />
      <div className={styles.content}>
        <div className={`${styles.skeletonText} ${styles.skeletonTitle}`} />
        <div className={`${styles.skeletonText} ${styles.skeletonDesc}`} />
        <div className={styles.footer}>
          <div className={`${styles.skeletonText} ${styles.skeletonPrice}`} />
          <div className={`${styles.skeletonButton}`} />
        </div>
      </div>
    </div>
  );
}
