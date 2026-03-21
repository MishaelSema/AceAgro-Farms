'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';
import { PageLoader } from '@/components/PageLoader';
import { usePathname } from 'next/navigation';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  if (isAdminPage) {
    return (
      <CartProvider>
        {children}
      </CartProvider>
    );
  }

  return (
    <CartProvider>
      <Navbar />
      <PageLoader />
      <main>{children}</main>
      <Footer />
    </CartProvider>
  );
}
