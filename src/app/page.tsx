import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import Section from "@/components/Section";

export default function Home() {
  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}>
          <div className="container">
            <h1 className={styles.heroTitle}>Naturally Grown.<br/>Purely Nourishing.<br/>Sustainably Raised.</h1>
            <p className={styles.heroSubtitle}>
              Experience the best of organic farming and natural wellness. From our farm straight to your table.
            </p>
            <div className={styles.heroActions}>
              <Link href="/products" className="button primary">Shop Now</Link>
              <Link href="/about" className="button secondary">Explore the Farm</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <Section className={styles.categoriesSection}>
        <div className={styles.sectionHeader}>
          <h2>Explore Our Products</h2>
          <p>Carefully cultivated and raised to provide you with the purest nutrition.</p>
        </div>
        
        <div className={styles.categoryGrid}>
          <Link href="/products?category=produce" className={styles.categoryCard}>
            <div className={styles.categoryImage}>
              {/* placeholder stock image for produce */}
              <Image src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop" alt="Organic Produce" fill style={{objectFit:"cover"}} />
            </div>
            <div className={styles.categoryContent}>
              <h3>Organic Produce</h3>
              <p>Fresh, chemical-free fruits and vegetables.</p>
            </div>
          </Link>

          <Link href="/products?category=wellness" className={styles.categoryCard}>
            <div className={styles.categoryImage}>
              {/* placeholder stock image for wellness */}
              <Image src="https://images.unsplash.com/photo-1556910103-1c02745a8e63?q=80&w=800&auto=format&fit=crop" alt="Wellness Products" fill style={{objectFit:"cover"}} />
            </div>
            <div className={styles.categoryContent}>
              <h3>Herbal & Wellness</h3>
              <p>Natural teas, beverages, and remedies.</p>
            </div>
          </Link>

          <Link href="/products?category=animal" className={styles.categoryCard}>
            <div className={styles.categoryImage}>
              {/* placeholder stock image for farm animals/meat */}
              <Image src="https://images.unsplash.com/photo-1516467508483-a7212febe31a?q=80&w=800&auto=format&fit=crop" alt="Pasture-Raised Meat" fill style={{objectFit:"cover"}} />
            </div>
            <div className={styles.categoryContent}>
              <h3>Pasture-Raised Meat</h3>
              <p>Ethically farmed poultry, goat, and rabbit.</p>
            </div>
          </Link>
        </div>
      </Section>

      {/* About Section */}
      <Section className={styles.aboutSection}>
        <div className={styles.aboutGrid}>
          <div className={styles.aboutContent}>
            <h2>Rooted in Nature</h2>
            <p>
              At ACE AGRO FARMS, we believe that true wellness starts from the ground up. Our holistic agricultural enterprise is focused on producing high-quality organic foods and natural wellness products.
            </p>
            <p>
              By combining sustainable crop production, herbal wellness solutions, and ethical animal farming, we deliver nutritious and chemical-free products.
            </p>
            <ul className={styles.aboutList}>
              <li>✓ 100% Organic Production</li>
              <li>✓ Integrated Wellness Approach</li>
              <li>✓ Ethical Animal Farming</li>
              <li>✓ Farm-to-Table Freshness</li>
            </ul>
            <Link href="/about" className="button primary" style={{marginTop: 'var(--spacing-4)', display: 'inline-block'}}>
              Read Our Story
            </Link>
          </div>
          <div className={styles.aboutImageContainer}>
             <Image src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1000&auto=format&fit=crop" alt="ACE AGRO Farm Landscape" fill style={{objectFit:"cover", borderRadius: "var(--border-radius-lg)"}} />
          </div>
        </div>
      </Section>

      {/* Trust & Testimonial Section */}
      <Section className={styles.trustSection} style={{ backgroundColor: 'var(--primary-green)', color: 'var(--white)' }}>
        <div className={styles.trustContent}>
          <h2>Join the Organic Movement</h2>
          <p>Discover how pure, sustainable food can transform your health and community.</p>
          <div className={styles.statsGrid}>
            <div className={styles.statBox}>
              <span className={styles.statNumber}>100%</span>
              <span className={styles.statLabel}>Organic Certified</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statNumber}>50+</span>
              <span className={styles.statLabel}>Fresh Products</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statNumber}>10k+</span>
              <span className={styles.statLabel}>Happy Customers</span>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
