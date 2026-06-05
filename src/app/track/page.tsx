"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Section from '@/components/Section';
import toast from 'react-hot-toast';

function TrackContent() {
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState(searchParams.get('id') || '');
  const [email, setEmail] = useState(searchParams.get('email') || '');
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!orderId || !email) {
      toast.error('Please provide both Order ID and Email');
      return;
    }
    
    setLoading(true);
    setOrder(null);
    try {
      const resp = await fetch(`/api/orders/track?id=${orderId}&email=${email}`);
      const data = await resp.json();
      if (data.success) {
        setOrder(data.order);
      } else {
        toast.error(data.error || 'Order not found');
      }
    } catch (err) {
      toast.error('Failed to fetch order details');
    } finally {
      setLoading(false);
    }
  };

  // Auto-track if params are present
  useEffect(() => {
    if (searchParams.get('id') && searchParams.get('email')) {
      handleTrack();
    }
  }, []);

  return (
    <Section>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center' }}>Track Your Order</h1>
        <p style={{ textAlign: 'center', marginBottom: 'var(--spacing-8)' }}>Enter your order details to view status and receipt.</p>
        
        <form onSubmit={handleTrack} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 'var(--spacing-4)', backgroundColor: 'var(--bg-light)', padding: 'var(--spacing-6)', borderRadius: 'var(--border-radius-lg)', marginBottom: 'var(--spacing-10)' }}>
          <input 
            type="text" 
            placeholder="Order ID (e.g. ACE-12345)" 
            value={orderId} 
            onChange={(e) => setOrderId(e.target.value)}
            style={{ padding: 'var(--spacing-3)', borderRadius: 'var(--border-radius)', border: '1px solid #ddd' }}
          />
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: 'var(--spacing-3)', borderRadius: 'var(--border-radius)', border: '1px solid #ddd' }}
          />
          <button type="submit" className="button primary" disabled={loading}>
            {loading ? 'Searching...' : 'Track'}
          </button>
        </form>

        {order && (
          <div style={{ backgroundColor: 'var(--white)', padding: 'var(--spacing-8)', borderRadius: 'var(--border-radius-lg)', boxShadow: '0 4px 30px rgba(0,0,0,0.1)', border: '1px solid #eee' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid var(--primary-green)', paddingBottom: 'var(--spacing-4)', marginBottom: 'var(--spacing-6)' }}>
              <div>
                <h2 style={{ margin: 0, color: 'var(--primary-green)' }}>Order {order.orderId}</h2>
                <p style={{ margin: 0, color: '#666' }}>Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ 
                  padding: 'var(--spacing-2) var(--spacing-4)', 
                  borderRadius: '20px', 
                  backgroundColor: order.status === 'Delivered' ? '#27ae60' : '#f39c12', 
                  color: 'white', 
                  fontWeight: 700,
                  fontSize: 'var(--font-sm)'
                }}>
                  {order.status}
                </span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-8)', marginBottom: 'var(--spacing-8)' }}>
              <div>
                <h3>Customer Details</h3>
                <p><strong>{order.customer.name}</strong></p>
                <p>{order.customer.email}</p>
                <p>{order.customer.phone}</p>
                <p>{order.customer.address}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <h3>Digital Receipt</h3>
                <p>Status: {order.status}</p>
                <p>Payment: Cash on Delivery</p>
              </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>
                  <th style={{ padding: 'var(--spacing-2) 0' }}>Item</th>
                  <th style={{ padding: 'var(--spacing-2) 0', textAlign: 'center' }}>Qty</th>
                  <th style={{ padding: 'var(--spacing-2) 0', textAlign: 'right' }}>Price</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item: any, idx: number) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #f9f9f9' }}>
                    <td style={{ padding: 'var(--spacing-3) 0' }}>{item.name}</td>
                    <td style={{ padding: 'var(--spacing-3) 0', textAlign: 'center' }}>{item.quantity}</td>
                    <td style={{ padding: 'var(--spacing-3) 0', textAlign: 'right' }}>{item.price}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={2} style={{ padding: 'var(--spacing-4) 0', fontWeight: 700, textAlign: 'right' }}>Total amount Paid:</td>
                  <td style={{ padding: 'var(--spacing-4) 0', fontWeight: 700, textAlign: 'right', fontSize: 'var(--font-lg)', color: 'var(--primary-green)' }}>
                    ${order.total.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>

            <div style={{ marginTop: 'var(--spacing-10)', padding: 'var(--spacing-4)', border: '1px dashed #ddd', borderRadius: 'var(--border-radius)', textAlign: 'center', fontSize: 'var(--font-sm)', color: '#666' }}>
              Thank you for supporting sustainable farming. Please keep this digital receipt for your records.
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={<Section><div style={{textAlign:'center'}}>Loading...</div></Section>}>
      <TrackContent />
    </Suspense>
  );
}
