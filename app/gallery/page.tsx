import { Metadata } from 'next';
import { generateSEO } from '@/lib/seo';
import dbConnect from '@/lib/dbConnect';
import GalleryItem from '@/models/GalleryItem';
import GalleryContent from '@/components/GalleryContent';
import styles from './page.module.css';

export const metadata: Metadata = generateSEO({
  title: 'Farm Gallery | See Our Organic Farm in Action',
  description: 'Explore our farm gallery and see ACE AGRO FARMS in action. Photos of our organic produce, happy animals, lush pastures, and more.',
  keywords: [
    'farm gallery',
    'organic farm photos',
    'ACE AGRO FARMS images',
    'farm photography',
    'agriculture photos',
  ],
  canonical: '/gallery',
});

async function getGalleryItems() {
  await dbConnect();
  const items = await GalleryItem.find().sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(items));
}

export default async function GalleryPage() {
  const items = await getGalleryItems();

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.label}>Gallery</span>
          <h1>See Our Farm Come to Life</h1>
          <p>
            Take a visual journey through ACE AGRO FARMS. From our lush 
            organic fields to our happy pasture-raised animals, see 
            the natural beauty of sustainable farming.
          </p>
        </div>
      </section>
      <GalleryContent initialItems={items} />
      <section className={styles.cta}>
        <div className={styles.ctaContainer}>
          <h2>Want to Visit the Farm?</h2>
          <p>
            Experience ACE AGRO FARMS in person. Schedule a farm tour 
            and see firsthand how we grow our organic products.
          </p>
          <a href="/contact" className={styles.ctaBtn}>
            Contact Us to Schedule a Visit
          </a>
        </div>
      </section>
    </>
  );
}
