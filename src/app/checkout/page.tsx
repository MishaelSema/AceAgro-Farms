"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import Section from '@/components/Section';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setLoading(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: formData,
          items: cart,
          total: cartTotal,
        }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success(`Order placed! Order ID: ${data.orderId}`);
        clearCart();
        router.push(`/order-success/${data.orderId}`);
      } else {
        toast.error('Failed to place order. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <Section>
        <div style={{ textAlign: 'center', padding: 'var(--spacing-16) 0' }}>
          <h2>Your cart is empty</h2>
          <button onClick={() => router.push('/products')} className="button primary">Back to Shopping</button>
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-16)' }}>
        <div>
          <h2>Delivery Information</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', marginTop: 'var(--spacing-6)' }}>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label>Delivery Address</label>
              <textarea name="address" required value={formData.address} onChange={handleChange} className="form-input" rows={4}></textarea>
            </div>
            <p style={{ fontSize: 'var(--font-sm)', color: '#666' }}>* Note: Initially, we only accept Cash on Delivery or Bank Transfer.</p>
            <button type="submit" disabled={loading} className="button primary" style={{ padding: 'var(--spacing-4)' }}>
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </form>
        </div>

        <div style={{ backgroundColor: 'var(--bg-light)', padding: 'var(--spacing-8)', borderRadius: 'var(--border-radius-lg)' }}>
          <h2>Order Summary</h2>
          <div style={{ marginTop: 'var(--spacing-6)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{item.name} x {item.quantity}</span>
                <span>${(parseFloat(item.price.replace(/[^0-9.]/g, '')) * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div style={{ height: '1px', backgroundColor: '#ddd', margin: 'var(--spacing-2) 0' }}></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 'var(--font-lg)' }}>
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
