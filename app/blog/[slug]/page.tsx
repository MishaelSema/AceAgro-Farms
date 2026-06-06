import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Calendar, ArrowLeft, ArrowRight } from 'lucide-react';
import dbConnect from '@/lib/dbConnect';
import BlogPost from '@/models/BlogPost';
import { generateSEO } from '@/lib/seo';
import styles from './page.module.css';

interface Props {
  params: { slug: string };
}

async function getPost(slug: string) {
  await dbConnect();
  const post = await BlogPost.findOne({ slug, published: true });
  if (!post) return null;
  return JSON.parse(JSON.stringify(post));
}

async function getRelatedPosts(category: string, currentId: string) {
  await dbConnect();
  const posts = await BlogPost.find({ category, published: true, _id: { $ne: currentId } }).limit(3);
  return JSON.parse(JSON.stringify(posts));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return {};

  return generateSEO({
    title: `${post.title} | ACE AGRO FARMS Blog`,
    description: post.excerpt,
    keywords: [post.category, 'ACE AGRO FARMS', 'wellness', 'organic'],
    canonical: `/blog/${post.slug}`,
  });
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const relatedPosts = await getRelatedPosts(post.category, post._id);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <Link href="/blog" className={styles.backLink}>
            <ArrowLeft size={18} />
            Back to Blog
          </Link>
          <span className={styles.category}>{post.category}</span>
          <h1>{post.title}</h1>
          <div className={styles.meta}>
            <span><Calendar size={16} /> {formatDate(post.createdAt)}</span>
            <span><Clock size={16} /> {post.readTime} min read</span>
          </div>
        </div>
      </section>

      <section className={styles.article}>
        <div className={styles.container}>
          <div className={styles.featuredImage}>
            <Image
              src={post.image}
              alt={post.title}
              fill
              className={styles.image}
              priority
              sizes="(max-width: 1200px) 100vw, 900px"
            />
          </div>

          <article className={styles.content}>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>

          <div className={styles.author}>
            <div className={styles.authorAvatar}>
              <span>{post.author?.charAt(0) || 'A'}</span>
            </div>
            <div className={styles.authorInfo}>
              <span className={styles.authorName}>{post.author || 'ACE AGRO FARMS'}</span>
              <span className={styles.authorRole}>Wellness Team</span>
            </div>
          </div>
        </div>
      </section>

      {relatedPosts.length > 0 && (
        <section className={styles.related}>
          <div className={styles.container}>
            <h2>Related Articles</h2>
            <div className={styles.relatedGrid}>
              {relatedPosts.map((rp: any) => (
                <Link key={rp._id} href={`/blog/${rp.slug}`} className={styles.relatedCard}>
                  <div className={styles.relatedImage}>
                    <Image
                      src={rp.image}
                      alt={rp.title}
                      fill
                      className={styles.image}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className={styles.relatedContent}>
                    <span className={styles.relatedCategory}>{rp.category}</span>
                    <h3>{rp.title}</h3>
                    <span className={styles.relatedMeta}>
                      <Clock size={14} /> {rp.readTime} min read
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
