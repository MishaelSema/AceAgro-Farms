import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Essentials | ACE AGRO FARMS',
  description: 'Explore our wellness and fragrance collection. Premium organic wellness products, herbal teas, and luxury perfumes from ACE AGRO FARMS Cameroon.',
  keywords: ['wellness products', 'organic tea', 'herbal remedies', 'perfume', 'fragrance', 'essential oils', 'Cameroon'],
};

import EssentialsContent from './EssentialsContent';

export default function EssentialsPage() {
  return <EssentialsContent />;
}