'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import { useAdminAuth } from '@/components/AdminAuthContext';
import styles from './page.module.css';

export default function AdminLoginPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const { checkAuth } = useAdminAuth();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        showToast('Login successful! Redirecting...', 'success');
        await checkAuth();
        setTimeout(() => {
          window.location.href = '/admin/dashboard';
        }, 500);
      } else {
        showToast(data.error || 'Invalid credentials', 'error');
      }
    } catch (error) {
      console.error('Login error:', error);
      showToast('Unable to connect. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.loginCard}>
        <div className={styles.logo}>
          <Lock size={32} />
        </div>
        <h1>Admin Login</h1>
        <p>Enter your credentials to access the dashboard</p>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Username</label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              required
              placeholder="Enter username"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Password</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
                placeholder="Enter password"
                className={styles.input}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.togglePassword}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={isLoading} className={styles.submitBtn}>
            {isLoading ? (
              <>
                <Loader2 size={20} className={styles.spinner} />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
