"use client";
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function AdminLogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      toast.success('Logged out');
      router.push('/admin/login');
    } catch (err) {
      toast.error('Logout failed');
    }
  };

  return (
    <button onClick={handleLogout} className="button secondary" style={{ padding: 'var(--spacing-2) var(--spacing-4)' }}>
      Logout
    </button>
  );
}
