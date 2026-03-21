'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Package, CheckCircle, Clock, XCircle, Truck, ArrowRight, Leaf, MapPin, Mail, Phone } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import styles from './page.module.css';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

interface OrderStatus {
  _id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  deliveryAddress?: string;
  paymentMethod?: string;
  createdAt: string;
}

const statusSteps = [
  { key: 'pending', label: 'Order Placed', icon: Clock },
  { key: 'confirmed', label: 'Confirmed', icon: CheckCircle },
  { key: 'processing', label: 'Processing', icon: Package },
  { key: 'shipped', label: 'Shipped', icon: Truck },
  { key: 'delivered', label: 'Delivered', icon: CheckCircle },
];

const statusOrder = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];

const statusColors: Record<string, string> = {
  pending: '#f59e0b',
  confirmed: '#3b82f6',
  processing: '#8b5cf6',
  shipped: '#ec4899',
  delivered: '#22c55e',
  cancelled: '#ef4444',
};

export default function TrackOrderPage() {
  const { showToast } = useToast();
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [order, setOrder] = useState<OrderStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId || !email) {
      showToast('Please enter both order ID and email', 'error');
      return;
    }

    setLoading(true);
    setError('');
    setOrder(null);

    try {
      const response = await fetch(`/api/track-order?orderId=${orderId}&email=${email}`);
      const data = await response.json();

      if (response.ok) {
        setOrder(data.order);
        showToast('Order found!', 'success');
      } else {
        setError(data.error || 'Order not found. Please check your order ID and email.');
        showToast(data.error || 'Order not found', 'error');
      }
    } catch {
      setError('Failed to track order. Please try again.');
      showToast('Failed to track order', 'error');
    } finally {
      setLoading(false);
    }
  };

  const currentStepIndex = order ? statusOrder.indexOf(order.status) : -1;

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.label}>Order Tracking</span>
          <h1>Track Your Order</h1>
          <p>Enter your order ID and email to see your order status and details</p>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.searchCard}>
            <form onSubmit={handleTrack}>
              <div className={styles.searchGrid}>
                <div className={styles.searchGroup}>
                  <label htmlFor="orderId">Order ID</label>
                  <input
                    id="orderId"
                    type="text"
                    placeholder="Paste your order ID here"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className={styles.input}
                    required
                  />
                </div>
                <div className={styles.searchGroup}>
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Email used when ordering"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                    required
                  />
                </div>
                <button type="submit" disabled={loading} className={styles.searchBtn}>
                  {loading ? (
                    <span className={styles.spinner} />
                  ) : (
                    <>
                      <Search size={18} />
                      Track Order
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {error && (
            <div className={styles.errorCard}>
              <div className={styles.errorIcon}>
                <XCircle size={28} />
              </div>
              <div className={styles.errorText}>
                <h3>Order Not Found</h3>
                <p>{error}</p>
              </div>
            </div>
          )}

          {order && (
            <div className={styles.orderCard}>
              <div className={styles.orderHeader}>
                <div className={styles.orderHeaderLeft}>
                  <span className={styles.orderIdLabel}>Order ID</span>
                  <span className={styles.orderIdValue}>{order._id.slice(-8).toUpperCase()}</span>
                  <span className={styles.orderDate}>
                    Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <span
                  className={styles.statusBadge}
                  style={{ backgroundColor: statusColors[order.status] }}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>

              {order.status !== 'cancelled' ? (
                <div className={styles.progressSection}>
                  <div className={styles.progressTrack}>
                    <div
                      className={styles.progressFill}
                      style={{
                        width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%`,
                        backgroundColor: statusColors[order.status],
                      }}
                    />
                  </div>
                  <div className={styles.stepsRow}>
                    {statusSteps.map((step, index) => {
                      const completed = index <= currentStepIndex;
                      const current = index === currentStepIndex;
                      const Icon = step.icon;
                      return (
                        <div
                          key={step.key}
                          className={`${styles.stepItem} ${completed ? styles.completed : ''} ${current ? styles.current : ''}`}
                        >
                          <div
                            className={styles.stepCircle}
                            style={{
                              backgroundColor: completed ? statusColors[order.status] : 'white',
                              borderColor: completed ? statusColors[order.status] : 'var(--color-gray-300)',
                              color: completed ? 'white' : 'var(--color-gray-400)',
                              boxShadow: current ? `0 0 0 4px ${statusColors[order.status]}20` : 'none',
                            }}
                          >
                            <Icon size={16} />
                          </div>
                          <span className={styles.stepLabel}>{step.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className={styles.cancelledBanner}>
                  <XCircle size={24} />
                  <span>This order has been cancelled</span>
                </div>
              )}

              <div className={styles.orderBody}>
                <div className={styles.infoGrid}>
                  <div className={styles.infoCard}>
                    <h3>Customer Details</h3>
                    <div className={styles.infoList}>
                      <div className={styles.infoRow}>
                        <User size={16} />
                        <span>{order.customerName}</span>
                      </div>
                      <div className={styles.infoRow}>
                        <Mail size={16} />
                        <span>{order.customerEmail}</span>
                      </div>
                      <div className={styles.infoRow}>
                        <Phone size={16} />
                        <span>{order.customerPhone}</span>
                      </div>
                      {order.deliveryAddress && (
                        <div className={styles.infoRow}>
                          <MapPin size={16} />
                          <span>{order.deliveryAddress}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={styles.summaryCard}>
                    <h3>Order Summary</h3>
                    <div className={styles.itemsList}>
                      {order.items.map((item, index) => (
                        <div key={index} className={styles.itemRow}>
                          <div className={styles.itemInfo}>
                            <span className={styles.itemName}>{item.name}</span>
                            <span className={styles.itemQty}>Qty: {item.quantity}</span>
                          </div>
                          <span className={styles.itemPrice}>
                            FCFA {(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className={styles.totalRow}>
                      <span>Total</span>
                      <span className={styles.totalPrice}>
                        FCFA {order.totalAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.orderFooter}>
                <Link href="/products" className={styles.continueBtn}>
                  Continue Shopping
                  <ArrowRight size={18} />
                </Link>
                <Link href="/contact" className={styles.helpBtn}>
                  Need Help?
                </Link>
              </div>
            </div>
          )}

          {!order && !error && !loading && (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <Package size={48} />
              </div>
              <h3>Enter Your Order Details</h3>
              <p>You received your order ID via email after placing your order. Use it together with your email to track your order status.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function User(props: any) {
  return (
    <svg width={props.size || 16} height={props.size || 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );
}
