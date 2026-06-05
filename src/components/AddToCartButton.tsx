"use client";
import React from 'react';
import { useCart } from '@/context/CartContext';
import toast from 'react-hot-toast';

interface AddToCartButtonProps {
  product: any;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export default function AddToCartButton({ product, className = 'button secondary', style, children }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault(); // prevent navigation if wrapped in a link
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <button className={className} style={style} onClick={handleAdd}>
      {children || 'Add to Cart'}
    </button>
  );
}
