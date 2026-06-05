import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Section from '@/components/Section';
import AddToCartButton from '@/components/AddToCartButton';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

export const metadata: Metadata = {
  title: 'Our Products',
  description: 'Shop our organic produce, herbal teas, and pasture-raised meats. Direct from ACE AGRO FARMS.',
};

interface Props {
  searchParams: Promise<{ category?: string; query?: string }>;
}

export default async function ProductsPage({ searchParams }: Props) {
  const { category, query: searchTerm } = await searchParams;
  await dbConnect();
  
  // Build query based on params
  const query: any = {};
  if (category) query.category = new RegExp(category, 'i');
  if (searchTerm) query.name = new RegExp(searchTerm, 'i');
  
  const products = await Product.find(query).lean();
  const categories = ['Produce', 'Wellness', 'Animal Products', 'Fish & Aquaculture'];

  return (
    <>
      <div style={{ backgroundColor: 'var(--primary-green)', padding: 'var(--spacing-10) 0' }}>
        <div className="container" style={{ textAlign: 'center', color: 'var(--white)' }}>
          <h1 style={{ marginBottom: '0' }}>Our Farm Products</h1>
        </div>
      </div>

      <Section>
        {/* Search and Filters */}
        <div style={{ marginBottom: 'var(--spacing-8)', display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-4)', alignItems: 'center', justifyContent: 'space-between' }}>
          <form action="/products" method="GET" style={{ display: 'flex', gap: 'var(--spacing-2)', flex: '1', minWidth: '300px' }}>
            <input 
              type="text" 
              name="query" 
              placeholder="Search products..." 
              defaultValue={searchTerm || ''}
              style={{ flex: 1, padding: 'var(--spacing-3)', borderRadius: 'var(--border-radius)', border: '1px solid #ddd' }}
            />
            {category && <input type="hidden" name="category" value={category} />}
            <button type="submit" className="button primary">Search</button>
          </form>

          <div style={{ display: 'flex', gap: 'var(--spacing-2)', flexWrap: 'wrap' }}>
            <Link href="/products" className={`button ${!category ? 'primary' : 'secondary'}`} style={{ padding: 'var(--spacing-2) var(--spacing-4)' }}>All</Link>
            {categories.map(cat => (
              <Link 
                key={cat} 
                href={`/products?category=${cat.toLowerCase().split(' ')[0]}`} 
                className={`button ${category?.toLowerCase() === cat.toLowerCase().split(' ')[0] ? 'primary' : 'secondary'}`}
                style={{ padding: 'var(--spacing-2) var(--spacing-4)' }}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--spacing-6)' }}>
          {products.map((product: any) => (
            <div key={product._id.toString()} style={{ backgroundColor: 'var(--white)', borderRadius: 'var(--border-radius-lg)', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
              <Link href={`/products/${product._id.toString()}`}>
                <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3' }}>
                  <Image src={product.image} alt={product.name} fill style={{ objectFit: 'cover' }} />
                </div>
              </Link>
              <div style={{ padding: 'var(--spacing-4)' }}>
                <span style={{ fontSize: 'var(--font-xs)', color: 'var(--secondary-orange)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '1px' }}>{product.category}</span>
                <Link href={`/products/${product._id.toString()}`}>
                  <h3 style={{ margin: 'var(--spacing-1) 0', color: 'var(--primary-green)' }}>{product.name}</h3>
                </Link>
                <p style={{ margin: '0 0 var(--spacing-3) 0', fontSize: 'var(--font-sm)' }}>{product.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, fontSize: 'var(--font-lg)' }}>{product.price}</span>
                  <AddToCartButton product={JSON.parse(JSON.stringify(product))} style={{ padding: 'var(--spacing-2) var(--spacing-3)', fontSize: 'var(--font-sm)' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
