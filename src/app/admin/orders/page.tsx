"use client";
import React, { useState, useEffect } from 'react';
import Section from '@/components/Section';
import toast from 'react-hot-toast';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/admin/orders');
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (err) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Order ${orderId} updated to ${status}`);
        fetchOrders();
      }
    } catch (err) {
      toast.error('Update failed');
    }
  };

  if (loading) return <Section><div>Loading orders...</div></Section>;

  return (
    <Section>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-8)' }}>
        <h1>Manage Orders</h1>
        <button onClick={fetchOrders} className="button secondary" style={{ padding: 'var(--spacing-2) var(--spacing-4)' }}>Refresh</button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'var(--white)', borderRadius: 'var(--border-radius-lg)', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <thead style={{ backgroundColor: 'var(--bg-light)', textAlign: 'left' }}>
            <tr>
              <th style={{ padding: 'var(--spacing-4)' }}>Order ID</th>
              <th style={{ padding: 'var(--spacing-4)' }}>Customer</th>
              <th style={{ padding: 'var(--spacing-4)' }}>Items</th>
              <th style={{ padding: 'var(--spacing-4)' }}>Total</th>
              <th style={{ padding: 'var(--spacing-4)' }}>Status</th>
              <th style={{ padding: 'var(--spacing-4)' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: 'var(--spacing-4)', fontWeight: 700 }}>{order.orderId}</td>
                <td style={{ padding: 'var(--spacing-4)' }}>
                  <div>{order.customer.name}</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>{order.customer.email}</div>
                </td>
                <td style={{ padding: 'var(--spacing-4)' }}>{order.items.length} items</td>
                <td style={{ padding: 'var(--spacing-4)', fontWeight: 600 }}>${order.total.toFixed(2)}</td>
                <td style={{ padding: 'var(--spacing-4)' }}>
                  <span style={{ 
                    padding: '4px 10px', 
                    borderRadius: '15px', 
                    fontSize: '12px',
                    backgroundColor: order.status === 'Delivered' ? '#27ae60' : order.status === 'Cancelled' ? '#e74c3c' : '#f39c12',
                    color: 'white'
                  }}>
                    {order.status}
                  </span>
                </td>
                <td style={{ padding: 'var(--spacing-4)' }}>
                  <select 
                    value={order.status} 
                    onChange={(e) => updateStatus(order.orderId, e.target.value)}
                    style={{ padding: '5px', borderRadius: 'var(--border-radius)', border: '1px solid #ddd' }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
