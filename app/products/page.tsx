import { Metadata } from 'next';
import { generateSEO } from '@/lib/seo';
import dbConnect from '@/lib/dbConnect';
import Category from '@/models/Category';
import ProductsContent from '@/components/ProductsContent';
import styles from './page.module.css';

export const metadata: Metadata = generateSEO({
  title: 'Products | Organic Produce, Wellness & Farm Fresh',
  description: 'Shop premium organic produce, herbal wellness products, pasture-raised meats, and fresh fish. All naturally grown at ACE AGRO FARMS.',
  keywords: ['organic products', 'buy organic food', 'herbal tea', 'pasture raised meat', 'fresh fish', 'organic vegetables', 'wellness products'],
  canonical: '/products',
});

async function getCategories() {
  await dbConnect();
  const cats = await Category.find().sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(cats));
}

export default async function ProductsPage() {
  const categories = await getCategories();

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.label}>Our Products</span>
          <h1>Premium Organic Products</h1>
          <p>Discover our range of organic produce, wellness products, and farm-fresh goods. All naturally grown and sustainably harvested for your wellbeing.</p>
        </div>
      </section>

      <section className={styles.categories}>
        <div className={styles.container}>
          <div className={styles.categoriesGrid}>
            {categories.map((category: any) => (
              <div key={category._id} className={styles.categoryCard}>
                <div className={styles.categoryIcon}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Z"/>
                    <path d="M12 8v8m-4-4h8"/>
                  </svg>
                </div>
                <div>
                  <h3>{category.name}</h3>
                  <p>{category.description || 'Browse our organic products'}</p>
                  <span className={styles.count}>{category.productCount || 0} Products</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ProductsContent />
    </>
  );
}
