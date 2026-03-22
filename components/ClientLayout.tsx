'use client';

import Navbar from '@/components/Navbar';
import { CartProvider } from '@/context/CartContext';
import { PageLoader } from '@/components/PageLoader';
import { usePathname } from 'next/navigation';

export default function ClientLayout({
  children,
  footer,
}: {
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
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
      {footer}
    </CartProvider>
  );
}
