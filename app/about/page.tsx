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
  { year: '1989', title: 'U.S. Embassy Career Begins', description: 'Started distinguished 22+ year career as Senior Commercial Specialist.' },
  { year: '2014', title: 'Farm Established', description: 'Started ACE AGRO FARMS with a small plot dedicated to organic vegetables.' },
  { year: '2016', title: 'Wellness Line Launch', description: 'Introduced our first herbal tea and wellness products.' },
  { year: '2018', title: 'Animal Farming', description: 'Expanded to include pasture-raised poultry and livestock.' },
  { year: '2020', title: 'Fish Aquaculture', description: 'Launched sustainable fish farming operations.' },
  { year: '2023', title: 'Full-Time Farming', description: 'Returned fully to his roots, leading ACE AGRO FARMS as Founder & CEO.' },
];

export default function AboutPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.label}>Our Founder</span>
          <h1>Christopher Ekom</h1>
          <p className={styles.subtitle}>Founder & CEO, ACE AGRO FARMS</p>
          <p className={styles.tagline}>
            "Transforming agriculture into opportunity, wellness, and sustainable growth."
          </p>
        </div>
      </section>

      <section className={styles.story}>
        <div className={styles.storyContainer}>
          <div className={styles.storyImage}>
            <Image
              src="/images/about-ace-agro.jpeg"
              alt="Christopher Ekom - Founder & CEO, ACE AGRO FARMS"
              fill
              className={styles.image}
            />
          </div>
          <div className={styles.storyContent}>
            <span className={styles.label}>Founder & CEO</span>
            <h2>Christopher Ekom</h2>
            <p>
              After more than 22 years of distinguished service as a Senior Commercial Specialist at the U.S. Embassy in Cameroon, Christopher Ekom returned to his roots with a mission: to transform agriculture into a catalyst for wellness, economic opportunity, and sustainable development across Africa.
            </p>
            <p>
              Raised by a peasant farmer and a primary school teacher, Christopher learned early the values of hard work, integrity, and perseverance. Despite living with paralysis in his lower limbs and relying on elbow crutches for mobility, he built a successful career advancing U.S.–Cameroon trade and investment while developing a deep understanding of business, markets, and economic growth.
            </p>
            <p>
              Today, as Founder and CEO of ACE AGRO FARMS, he leads a 10-hectare organic farming enterprise dedicated to producing healthy, natural products that support better living and stronger communities. His vision is to combine sustainable agriculture, innovation, and inclusive entrepreneurship to create lasting impact while contributing to food security and rural prosperity.
            </p>
            <p>
              Christopher's unique blend of international business expertise, agricultural passion, and personal resilience positions him at the intersection of agribusiness, investment, and sustainable development—proving that determination, purpose, and leadership can turn challenges into opportunities and vision into reality.
            </p>
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
