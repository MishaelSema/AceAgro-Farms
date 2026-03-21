import { Metadata } from 'next';
import { generateSEO } from '@/lib/seo';
import HomeContent from '@/components/HomeContent';

export const metadata: Metadata = generateSEO({
  title: 'ACE AGRO FARMS | Organic Wellness Farm & Sustainable Living',
  description: 'Premium organic produce, herbal wellness products, pasture-raised meats, and fresh fish. From farm to wellness - pure, natural, and sustainable living.',
  keywords: [
    'organic farm',
    'wellness farm',
    'organic produce Cameroon',
    'herbal tea',
    'pasture raised meat',
    'fresh fish',
    'sustainable farming',
    'farm to table',
    'natural food',
    'healthy living',
  ],
  canonical: '/',
});

export default function HomePage() {
  return <HomeContent />;
}
