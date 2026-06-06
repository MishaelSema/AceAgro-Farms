'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import styles from '../app/blog/page.module.css';

interface BlogPost {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  readTime: number;
  createdAt: string;
}

interface Props {
  posts: BlogPost[];
  categories: string[];
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function BlogContent({ posts, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = activeCategory === 'All'
    ? posts
    : posts.filter(post => post.category === activeCategory);

  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  return (
    <section className={styles.blogSection}>
      <div className={styles.container}>
        <div className={styles.categories}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`${styles.categoryBtn} ${activeCategory === cat ? styles.active : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {featuredPost && (
          <div className={styles.featuredPost}>
            <div className={styles.featuredImage}>
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                className={styles.image}
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <span className={styles.featuredBadge}>Featured</span>
            </div>
            <div className={styles.featuredContent}>
              <span className={styles.postCategory}>{featuredPost.category}</span>
              <h2>{featuredPost.title}</h2>
              <p>{featuredPost.excerpt}</p>
              <div className={styles.postMeta}>
                <span><Calendar size={16} /> {formatDate(featuredPost.createdAt)}</span>
                <span><Clock size={16} /> {featuredPost.readTime} min read</span>
              </div>
              <Link href={`/blog/${featuredPost.slug}`} className={styles.readMore}>
                Read Article <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        )}

        {remainingPosts.length > 0 ? (
          <div className={styles.postsGrid}>
            {remainingPosts.map((post) => (
              <Link key={post._id} href={`/blog/${post.slug}`} className={styles.postCard}>
                <div className={styles.postImage}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className={styles.postContent}>
                  <span className={styles.postCategory}>{post.category}</span>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className={styles.postMeta}>
                    <span><Calendar size={14} /> {formatDate(post.createdAt)}</span>
                    <span><Clock size={14} /> {post.readTime} min</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : filteredPosts.length === 0 && (
          <p style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-gray-500)' }}>
            No blog posts found.
          </p>
        )}
      </div>
    </section>
  );
}
