'use client';

import { useState } from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useCart, CartItem } from '@/context/CartContext';
import { useToast } from '@/components/ui/Toast';
import styles from './AddToCartButton.module.css';

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    unit: string;
    inStock: boolean;
  };
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = () => {
    if (!product.inStock) return;

    const item: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      unit: product.unit,
    };

    addToCart(item);
    showToast(`${product.name} added to cart!`, 'success');
  };

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => Math.max(1, q - 1));

  if (!product.inStock) {
    return (
      <button className={styles.disabledButton} disabled>
        Out of Stock
      </button>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.quantitySelector}>
        <button onClick={decrement} aria-label="Decrease quantity">
          <Minus size={18} />
        </button>
        <span>{quantity}</span>
        <button onClick={increment} aria-label="Increase quantity">
          <Plus size={18} />
        </button>
      </div>
      <button onClick={handleAddToCart} className={styles.addButton}>
        <ShoppingCart size={20} />
        Add to Cart
      </button>
    </div>
  );
}
