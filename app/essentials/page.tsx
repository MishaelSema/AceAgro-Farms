import { Metadata } from 'next';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Essentials Collection',
  description: 'Explore our premium wellness and fragrance collection. Organic wellness products, herbal teas, natural perfumes, and essential oils from ACE AGRO FARMS Cameroon.',
  keywords: [
    'organic wellness products Cameroon',
    'herbal tea Yaoundé',
    'natural perfume Cameroon',
    'essential oils Cameroon',
    'organic skincare Yaoundé',
    'wellness collection Cameroon',
    'fragrance oils Douala',
    'moringa tea Cameroon',
  ],
  ogType: 'website',
  canonical: '/essentials',
});

import EssentialsContent from './EssentialsContent';

export default function EssentialsPage() {
  return <EssentialsContent />;
}