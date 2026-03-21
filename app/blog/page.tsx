import { Metadata } from 'next';
import { generateSEO } from '@/lib/seo';
import dbConnect from '@/lib/dbConnect';
import BlogPost from '@/models/BlogPost';
import BlogContent from '@/components/BlogContent';
import styles from './page.module.css';

export const metadata: Metadata = generateSEO({
  title: 'Wellness Blog | Tips, Recipes & Organic Living',
  description: 'Discover wellness tips, organic living advice, health recipes, and farm updates from ACE AGRO FARMS. Your guide to natural, healthy living.',
  keywords: [
    'wellness blog',
    'organic living tips',
    'health recipes',
    'herbal tea benefits',
    'farm to table',
    'natural health',
  ],
  canonical: '/blog',
});

async function getBlogPosts() {
  await dbConnect();
  const posts = await BlogPost.find({ published: true }).sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(posts));
}

async function getCategories() {
  await dbConnect();
  const posts = await BlogPost.find({ published: true }).distinct('category');
  return ['All', ...posts] as string[];
}

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([getBlogPosts(), getCategories()]);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.label}>Wellness Hub</span>
          <h1>Tips, Recipes & Organic Living</h1>
          <p>
            Discover the latest wellness tips, healthy recipes, and insights 
            into organic living from the ACE AGRO FARMS team.
          </p>
        </div>
      </section>
      <BlogContent posts={posts} categories={categories} />
    </>
  );
}
