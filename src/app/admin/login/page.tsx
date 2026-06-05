"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Section from '@/components/Section';
import toast from 'react-hot-toast';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success('Login successful!');
        router.push('/admin/dashboard');
      } else {
        toast.error(data.error || 'Invalid credentials');
      }
    } catch (err) {
      toast.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section>
      <div style={{ maxWidth: '400px', margin: 'var(--spacing-16) auto', padding: 'var(--spacing-8)', backgroundColor: 'var(--white)', borderRadius: 'var(--border-radius-lg)', boxShadow: '0 4px 30px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 'var(--spacing-6)', color: 'var(--primary-green)' }}>Admin Login</h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
          <div>
            <label style={{ display: 'block', marginBottom: 'var(--spacing-1)', fontWeight: 600 }}>Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
              style={{ width: '100%', padding: 'var(--spacing-3)', borderRadius: 'var(--border-radius)', border: '1px solid #ddd' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 'var(--spacing-1)', fontWeight: 600 }}>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              style={{ width: '100%', padding: 'var(--spacing-3)', borderRadius: 'var(--border-radius)', border: '1px solid #ddd' }}
            />
          </div>
          <button type="submit" disabled={loading} className="button primary" style={{ width: '100%', padding: 'var(--spacing-3)' }}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </Section>
  );
}
