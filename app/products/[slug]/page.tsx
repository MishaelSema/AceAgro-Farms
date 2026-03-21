import { Metadata } from 'next';
import ProductDetailClient from './ProductDetailClient';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: 'Product Details | ACE AGRO FARMS',
    description: 'View product details',
  };
}

export default function ProductDetailPage({ params }: Props) {
  return <ProductDetailClient slug={params.slug} />;
}
