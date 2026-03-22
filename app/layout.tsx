import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { ToastProvider } from '@/components/ui/Toast';
import { AdminAuthProvider } from '@/components/AdminAuthContext';
import ClientLayout from '@/components/ClientLayout';
import { getFooterData } from '@/lib/footerData';
import Footer from '@/components/Footer';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://aceagrofarms.com'),
  title: {
    default: 'ACE AGRO FARMS | Organic Wellness Farm & Sustainable Living',
    template: '%s | ACE AGRO FARMS',
  },
  description: 'Premium organic produce, herbal wellness products, pasture-raised meats, and fresh fish. From farm to wellness - pure, natural, and sustainable living.',
  keywords: [
    'organic farming',
    'organic produce',
    'herbal tea',
    'wellness products',
    'pasture raised meat',
    'fresh fish',
    'sustainable agriculture',
    'farm to table',
    'natural products',
    'health food',
    'organic vegetables',
    'organic fruits',
    'wellness farm',
  ],
  authors: [{ name: 'ACE AGRO FARMS' }],
  creator: 'ACE AGRO FARMS',
  publisher: 'ACE AGRO FARMS',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aceagrofarms.com',
    siteName: 'ACE AGRO FARMS',
    title: 'ACE AGRO FARMS | Organic Wellness Farm & Sustainable Living',
    description: 'Premium organic produce, herbal wellness products, pasture-raised meats, and fresh fish. From farm to wellness - pure, natural, and sustainable living.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ACE AGRO FARMS - Organic Wellness Farm',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ACE AGRO FARMS | Organic Wellness Farm & Sustainable Living',
    description: 'Premium organic produce, herbal wellness products, pasture-raised meats, and fresh fish.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { categories, socials } = await getFooterData();

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body>
        <ToastProvider>
          <AdminAuthProvider>
            <ClientLayout footer={<Footer categories={categories} socials={socials} />}>
              {children}
            </ClientLayout>
          </AdminAuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
