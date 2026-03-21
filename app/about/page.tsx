import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Sprout, Heart, Globe, Users, ArrowRight, CheckCircle } from 'lucide-react';
import { generateSEO } from '@/lib/seo';
import styles from './page.module.css';

export const metadata: Metadata = generateSEO({
  title: 'About ACE AGRO FARMS | Our Story & Mission',
  description: 'Learn about ACE AGRO FARMS - our story, mission, and commitment to organic farming and sustainable wellness products. From farm to wellness.',
  keywords: [
    'ACE AGRO FARMS story',
    'organic farming Cameroon',
    'sustainable agriculture',
    'wellness farm',
    'farm history',
  ],
  canonical: '/about',
});

const values = [
  {
    icon: Sprout,
    title: 'Organic Integrity',
    description: 'Every product meets strict organic standards. No chemicals, no compromises.',
  },
  {
    icon: Heart,
    title: 'Health First',
    description: 'Your wellness is our priority. We grow food that nourishes body and soul.',
  },
  {
    icon: Globe,
    title: 'Sustainability',
    description: 'Farming practices that protect and preserve our environment for future generations.',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Building a community of health-conscious individuals who value natural living.',
  },
];

const milestones = [
  { year: '2014', title: 'Farm Established', description: 'Started with a small plot dedicated to organic vegetables.' },
  { year: '2016', title: 'Wellness Line Launch', description: 'Introduced our first herbal tea and wellness products.' },
  { year: '2018', title: 'Animal Farming', description: 'Expanded to include pasture-raised poultry and livestock.' },
  { year: '2020', title: 'Fish Aquaculture', description: 'Launched sustainable fish farming operations.' },
  { year: '2023', title: 'Online Store', description: 'Made our products available nationwide through online ordering.' },
];

export default function AboutPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.label}>Our Story</span>
          <h1>Cultivating Wellness Since 2014</h1>
          <p>
            From a small organic farm to a leading provider of natural wellness products, 
            ACE AGRO FARMS has remained true to its mission: providing pure, nutritious 
            food that promotes healthy living.
          </p>
        </div>
      </section>

      <section className={styles.story}>
        <div className={styles.storyContainer}>
          <div className={styles.storyImage}>
            <Image
              src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80"
              alt="ACE AGRO FARMS - Our Farm"
              fill
              className={styles.image}
            />
          </div>
          <div className={styles.storyContent}>
            <span className={styles.label}>The Beginning</span>
            <h2>Our Journey</h2>
            <p>
              ACE AGRO FARMS was founded with a simple belief: that food grown in harmony 
              with nature is the foundation of true health. What started as a passion 
              project has grown into a thriving organic farm that serves hundreds of 
              families across Cameroon.
            </p>
            <p>
              Our founder, motivated by personal health challenges and a deep respect for 
              the environment, began exploring organic farming methods. Today, we combine 
              traditional wisdom with modern sustainable practices to produce exceptional 
              quality products.
            </p>
            <div className={styles.highlights}>
              <div className={styles.highlight}>
                <CheckCircle size={20} />
                <span>100% Chemical-Free</span>
              </div>
              <div className={styles.highlight}>
                <CheckCircle size={20} />
                <span>Sustainable Practices</span>
              </div>
              <div className={styles.highlight}>
                <CheckCircle size={20} />
                <span>Farm-to-Table Freshness</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.values}>
        <div className={styles.valuesContainer}>
          <div className={styles.sectionHeader}>
            <span className={styles.label}>What We Stand For</span>
            <h2>Our Core Values</h2>
            <p>
              Every decision we make is guided by these fundamental principles that 
              define who we are and how we farm.
            </p>
          </div>
          <div className={styles.valuesGrid}>
            {values.map((value, index) => (
              <div key={index} className={styles.valueCard}>
                <div className={styles.valueIcon}>
                  <value.icon size={32} />
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.timeline}>
        <div className={styles.timelineContainer}>
          <div className={styles.sectionHeader}>
            <span className={styles.label}>Our Growth</span>
            <h2>Milestones</h2>
          </div>
          <div className={styles.timelineGrid}>
            {milestones.map((milestone, index) => (
              <div key={index} className={styles.milestone}>
                <span className={styles.year}>{milestone.year}</span>
                <h4>{milestone.title}</h4>
                <p>{milestone.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaContainer}>
          <h2>Ready to Experience the ACE AGRO Difference?</h2>
          <p>
            Join our community of wellness enthusiasts and discover the true taste 
            of organic, farm-fresh products.
          </p>
          <div className={styles.ctaActions}>
            <Link href="/products" className={styles.primaryBtn}>
              Explore Products
              <ArrowRight size={20} />
            </Link>
            <Link href="/contact" className={styles.secondaryBtn}>
              Visit the Farm
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
