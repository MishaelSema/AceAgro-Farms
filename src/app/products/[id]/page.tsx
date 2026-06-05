import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Section from '@/components/Section';
import AddToCartButton from '@/components/AddToCartButton';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  await dbConnect();
  const product = await Product.findById(id).lean();

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  await dbConnect();
  const product = await Product.findById(id).lean();

  if (!product) {
    notFound();
  }

  return (
    <>
      <div style={{ backgroundColor: 'var(--bg-white)', borderBottom: '1px solid #eee' }}>
        <Section>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-10)', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', borderRadius: 'var(--border-radius-lg)', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
              <Image src={product.image} alt={product.name} fill style={{ objectFit: 'cover' }} />
            </div>
            
            <div>
              <span style={{ color: 'var(--secondary-orange)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>{product.category}</span>
              <h1 style={{ color: 'var(--primary-green)', margin: 'var(--spacing-2) 0' }}>{product.name}</h1>
              <p style={{ fontSize: 'var(--font-2xl)', fontWeight: 700, color: 'var(--text-dark)', marginBottom: 'var(--spacing-4)' }}>{product.price}</p>
              
              <div style={{ borderTop: '1px solid #eee', paddingTop: 'var(--spacing-4)' }}>
                <h3>Product Description</h3>
                <p>{product.description}</p>
              </div>

              <div style={{ marginTop: 'var(--spacing-6)' }}>
                <AddToCartButton 
                  product={JSON.parse(JSON.stringify(product))} 
                  className="button primary" 
                  style={{ width: '100%', padding: 'var(--spacing-4)', fontSize: 'var(--font-lg)' }} 
                />
              </div>

              <div style={{ marginTop: 'var(--spacing-4)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-4)' }}>
                <div style={{ padding: 'var(--spacing-3)', backgroundColor: 'var(--bg-light)', borderRadius: 'var(--border-radius)', textAlign: 'center' }}>
                  <span style={{ display: 'block', fontWeight: 700, color: 'var(--primary-green)' }}>100% Organic</span>
                  <span style={{ fontSize: 'var(--font-xs)' }}>Chemical Free</span>
                </div>
                <div style={{ padding: 'var(--spacing-3)', backgroundColor: 'var(--bg-light)', borderRadius: 'var(--border-radius)', textAlign: 'center' }}>
                  <span style={{ display: 'block', fontWeight: 700, color: 'var(--primary-green)' }}>Farm Fresh</span>
                  <span style={{ fontSize: 'var(--font-xs)' }}>Direct to You</span>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>

      <Section>
        <div style={{ maxWidth: '800px' }}>
          <h2>Health Benefits & Production</h2>
          <p>
            Every product at ACE AGRO FARMS is cultivated with a deep respect for natural cycles. Our {product.category.toLowerCase()} is no exception. Produced using traditional, sustainable methods that preserve nutrient density and flavor.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: 'var(--spacing-4)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
            <li>🌱 <strong>Grown with Care:</strong> No synthetic pesticides or GMOs.</li>
            <li>🌍 <strong>Sustainable:</strong> Eco-friendly farming that restores the soil.</li>
            <li>✨ <strong>Pure:</strong> Pure from the farm to your wellness.</li>
          </ul>
        </div>
      </Section>
    </>
  );
}
