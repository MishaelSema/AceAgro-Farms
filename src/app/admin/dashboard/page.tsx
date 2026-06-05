import React from 'react';
import Link from 'next/link';
import Section from '@/components/Section';
import AdminLogoutButton from '@/components/AdminLogoutButton';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import Product from '@/models/Product';

async function getStats() {
  await dbConnect();
  const totalOrders = await Order.countDocuments();
  const totalProducts = await Product.countDocuments();
  const orders = await Order.find({}).lean();
  const totalRevenue = orders.reduce((acc: number, curr: any) => acc + curr.total, 0);
  const pendingOrders = await Order.countDocuments({ status: 'Pending' });

  return { totalOrders, totalProducts, totalRevenue, pendingOrders };
}

export default async function AdminDashboardPage() {
  const stats = await getStats();

  return (
    <Section>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-8)' }}>
        <h1>Admin Dashboard</h1>
        <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
          <Link href="/admin/orders" className="button secondary">Manage Orders</Link>
          <Link href="/admin/products" className="button secondary">Manage Products</Link>
          <AdminLogoutButton />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-6)', marginBottom: 'var(--spacing-10)' }}>
        <div style={{ padding: 'var(--spacing-6)', backgroundColor: 'var(--bg-light)', borderRadius: 'var(--border-radius-lg)', textAlign: 'center' }}>
          <span style={{ display: 'block', fontSize: 'var(--font-sm)', color: '#666' }}>Total Revenue</span>
          <span style={{ fontSize: 'var(--font-3xl)', fontWeight: 700, color: 'var(--primary-green)' }}>${stats.totalRevenue.toFixed(2)}</span>
        </div>
        <div style={{ padding: 'var(--spacing-6)', backgroundColor: 'var(--bg-light)', borderRadius: 'var(--border-radius-lg)', textAlign: 'center' }}>
          <span style={{ display: 'block', fontSize: 'var(--font-sm)', color: '#666' }}>Total Orders</span>
          <span style={{ fontSize: 'var(--font-3xl)', fontWeight: 700, color: 'var(--primary-green)' }}>{stats.totalOrders}</span>
        </div>
        <div style={{ padding: 'var(--spacing-6)', backgroundColor: 'var(--bg-light)', borderRadius: 'var(--border-radius-lg)', textAlign: 'center' }}>
          <span style={{ display: 'block', fontSize: 'var(--font-sm)', color: '#666' }}>Pending Orders</span>
          <span style={{ fontSize: 'var(--font-3xl)', fontWeight: 700, color: 'var(--secondary-orange)' }}>{stats.pendingOrders}</span>
        </div>
        <div style={{ padding: 'var(--spacing-6)', backgroundColor: 'var(--bg-light)', borderRadius: 'var(--border-radius-lg)', textAlign: 'center' }}>
          <span style={{ display: 'block', fontSize: 'var(--font-sm)', color: '#666' }}>Active Products</span>
          <span style={{ fontSize: 'var(--font-3xl)', fontWeight: 700, color: 'var(--primary-green)' }}>{stats.totalProducts}</span>
        </div>
      </div>

      <h2>Quick Actions</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-6)' }}>
        <div style={{ padding: 'var(--spacing-6)', border: '1px solid #eee', borderRadius: 'var(--border-radius-lg)' }}>
          <h3>Latest Orders</h3>
          <p>Go to the order management page to view and process recent purchases.</p>
          <Link href="/admin/orders" style={{ color: 'var(--primary-green)', fontWeight: 600 }}>View all orders →</Link>
        </div>
        <div style={{ padding: 'var(--spacing-6)', border: '1px solid #eee', borderRadius: 'var(--border-radius-lg)' }}>
          <h3>Inventory Management</h3>
          <p>Add new organic products or update existing stock and pricing.</p>
          <Link href="/admin/products" style={{ color: 'var(--primary-green)', fontWeight: 600 }}>Manage inventory →</Link>
        </div>
      </div>
    </Section>
  );
}
