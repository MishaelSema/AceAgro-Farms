'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Trash2, Minus, Plus, CreditCard, Smartphone } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/ui/Toast';
import styles from './page.module.css';

export default function CheckoutPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderData, setOrderData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'orange_money',
  });
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  const total = cartTotal;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      showToast('Your cart is empty', 'error');
      return;
    }
    
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...orderData,
          items: cartItems,
          totalAmount: total,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setOrderId(data.orderId);
        setOrderComplete(true);
        clearCart();
        showToast('Order placed successfully!', 'success');
      } else {
        showToast(data.error || 'Failed to place order', 'error');
      }
    } catch (error) {
      showToast('An error occurred. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderComplete) {
    return (
      <section className={styles.successSection}>
        <div className={styles.successContainer}>
          <div className={styles.successIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <h1>Order Placed Successfully!</h1>
          <p className={styles.orderId}>Order ID: <strong>{orderId}</strong></p>
          <p>Thank you for your order! We have sent a confirmation email with your order details.</p>
          <p>Use your Order ID and email to track your order status.</p>
          <div className={styles.successActions}>
            <Link href="/track-order" className={styles.primaryBtn}>
              Track Your Order
            </Link>
            <Link href="/products" className={styles.secondaryBtn}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Link href="/products" className={styles.backLink}>
          <ArrowLeft size={20} />
          Continue Shopping
        </Link>

        <h1>Checkout</h1>

        <div className={styles.grid}>
          <div className={styles.formColumn}>
            <div className={styles.formCard}>
              <h2>Delivery Information</h2>
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label>Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your full name"
                    value={orderData.name}
                    onChange={(e) => setOrderData({ ...orderData, name: e.target.value })}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="your.email@example.com"
                      value={orderData.email}
                      onChange={(e) => setOrderData({ ...orderData, email: e.target.value })}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+237 679 080 426"
                      value={orderData.phone}
                      onChange={(e) => setOrderData({ ...orderData, phone: e.target.value })}
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Delivery Address *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Enter your full delivery address in Cameroon"
                    value={orderData.address}
                    onChange={(e) => setOrderData({ ...orderData, address: e.target.value })}
                    className={styles.textarea}
                  />
                </div>

                <div className={styles.paymentSection}>
                  <h3>Payment Method</h3>
                  <div className={styles.paymentOptions}>
                    <label className={`${styles.paymentOption} ${orderData.paymentMethod === 'orange_money' ? styles.selected : ''}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="orange_money"
                        checked={orderData.paymentMethod === 'orange_money'}
                        onChange={(e) => setOrderData({ ...orderData, paymentMethod: e.target.value })}
                      />
                      <Smartphone size={24} />
                      <span>Orange Money</span>
                    </label>
                    <label className={`${styles.paymentOption} ${orderData.paymentMethod === 'mtn_momo' ? styles.selected : ''}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="mtn_momo"
                        checked={orderData.paymentMethod === 'mtn_momo'}
                        onChange={(e) => setOrderData({ ...orderData, paymentMethod: e.target.value })}
                      />
                      <Smartphone size={24} />
                      <span>MTN MoMo</span>
                    </label>
                    <label className={`${styles.paymentOption} ${orderData.paymentMethod === 'cash' ? styles.selected : ''}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={orderData.paymentMethod === 'cash'}
                        onChange={(e) => setOrderData({ ...orderData, paymentMethod: e.target.value })}
                      />
                      <CreditCard size={24} />
                      <span>Cash on Delivery</span>
                    </label>
                  </div>
                </div>

                <button type="submit" disabled={isSubmitting || cartItems.length === 0} className={styles.submitBtn}>
                  {isSubmitting ? 'Processing...' : `Place Order - FCFA ${total.toLocaleString()}`}
                </button>
              </form>
            </div>
          </div>

          <div className={styles.summaryColumn}>
            <div className={styles.summaryCard}>
              <h2>Order Summary</h2>
              <div className={styles.cartItems}>
                {cartItems.map((item) => (
                  <div key={item.id} className={styles.cartItem}>
                    <div className={styles.itemImage}>
                      <Image src={item.image} alt={item.name} fill className={styles.image} />
                    </div>
                    <div className={styles.itemInfo}>
                      <h4>{item.name}</h4>
                      <p>Qty: {item.quantity} × FCFA {item.price.toLocaleString()}</p>
                    </div>
                    <div className={styles.itemTotal}>
                      FCFA {(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.summaryTotals}>
                <div className={styles.summaryRow}>
                  <span>Subtotal</span>
                  <span>FCFA {cartTotal.toLocaleString()}</span>
                </div>
                <div className={styles.summaryRow} style={{ fontSize: '0.8rem', color: '#666', fontStyle: 'italic' }}>
                  <span>Delivery</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className={`${styles.summaryRow} ${styles.total}`}>
                  <span>Total</span>
                  <span>FCFA {total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
