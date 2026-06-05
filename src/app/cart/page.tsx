"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import Section from '@/components/Section';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  if (cartCount === 0) {
    return (
      <Section>
        <div style={{ textAlign: 'center', padding: 'var(--spacing-16) 0' }}>
          <h2>Your cart is empty</h2>
          <p>Go to our products page to add some organic goodness to your cart.</p>
          <Link href="/products" className="button primary" style={{ marginTop: 'var(--spacing-6)', display: 'inline-block' }}>
            Browse Products
          </Link>
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <h1 style={{ marginBottom: 'var(--spacing-8)' }}>Your Shopping Cart</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: 'var(--spacing-10)' }}>
        {/* Cart Items List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
          {cart.map((item) => (
            <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '100px 1fr 120px 100px', gap: 'var(--spacing-6)', alignItems: 'center', padding: 'var(--spacing-4)', backgroundColor: 'var(--bg-light)', borderRadius: 'var(--border-radius-lg)' }}>
              <div style={{ position: 'relative', width: '100px', height: '100px', borderRadius: 'var(--border-radius)', overflow: 'hidden' }}>
                <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} />
              </div>
              <div>
                <h3 style={{ margin: 0 }}>{item.name}</h3>
                <p style={{ color: 'var(--primary-green)', fontWeight: 600, margin: 'var(--spacing-1) 0' }}>{item.price}</p>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer', padding: 0, fontSize: 'var(--font-sm)', textDecoration: 'underline' }}
                >
                  Remove
                </button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid #ccc', background: 'white', cursor: 'pointer' }}
                >-</button>
                <span style={{ minWidth: '30px', textAlign: 'center', fontWeight: 600 }}>{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid #ccc', background: 'white', cursor: 'pointer' }}
                >+</button>
              </div>
              <div style={{ textAlign: 'right', fontWeight: 700 }}>
                ${(parseFloat(item.price.replace(/[^0-9.]/g, '')) * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Summary Side */}
        <div style={{ padding: 'var(--spacing-6)', backgroundColor: 'var(--white)', borderRadius: 'var(--border-radius-lg)', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', height: 'fit-content' }}>
          <h2 style={{ fontSize: 'var(--font-xl)', marginBottom: 'var(--spacing-4)' }}>Order Summary</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-2)' }}>
            <span>Subtotal ({cartCount} items)</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-2)' }}>
            <span>Delivery</span>
            <span style={{ color: 'var(--primary-green)', fontWeight: 600 }}>Calculated at checkout</span>
          </div>
          <div style={{ height: '1px', backgroundColor: '#eee', margin: 'var(--spacing-4) 0' }}></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-6)', fontWeight: 700, fontSize: 'var(--font-lg)' }}>
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <Link href="/checkout" className="button primary" style={{ width: '100%', textAlign: 'center', display: 'block' }}>
            Proceed to Checkout
          </Link>
          <p style={{ fontSize: '10px', color: '#999', marginTop: 'var(--spacing-4)', textAlign: 'center' }}>
            By proceeding, you agree to ACE AGRO FARMS Terms of Service.
          </p>
        </div>
      </div>
    </Section>
  );
}
