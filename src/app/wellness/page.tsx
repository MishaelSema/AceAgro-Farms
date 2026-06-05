import type { Metadata } from 'next';
import Section from '@/components/Section';

export const metadata: Metadata = {
  title: 'Wellness Hub',
  description: 'Educational articles on holistic health, herbal benefits, and organic living from ACE AGRO FARMS.',
  openGraph: {
    title: 'ACE AGRO Wellness Hub',
    description: 'Educational articles on holistic health and organic living.',
    images: [{ url: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=1200' }],
  },
};

export default function WellnessPage() {
  return (
    <>
      <div style={{ backgroundColor: 'var(--secondary-orange)', padding: 'var(--spacing-10) 0' }}>
        <div className="container" style={{ textAlign: 'center', color: 'var(--white)' }}>
          <h1 style={{ marginBottom: '0' }}>Wellness & Education Hub</h1>
          <p style={{ marginTop: 'var(--spacing-2)', fontSize: 'var(--font-lg)' }}>Insights for a healthier, natural lifestyle.</p>
        </div>
      </div>

      <Section>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <article style={{ borderBottom: '1px solid #eee', paddingBottom: 'var(--spacing-6)', marginBottom: 'var(--spacing-6)' }}>
            <span style={{ color: 'var(--primary-green)', fontWeight: 600 }}>Nutrition</span>
            <h2 style={{ marginTop: 'var(--spacing-2)' }}>The Benefits of Drinking Herbal Tea Daily</h2>
            <p>Herbal teas have been used for thousands of years as natural remedies for various ailments. Unlike standard teas, they are truly infusions made from diverse herbs, spices, and other plant materials.</p>
            <button className="button secondary" style={{ marginTop: 'var(--spacing-3)' }}>Read Article</button>
          </article>

          <article>
            <span style={{ color: 'var(--primary-green)', fontWeight: 600 }}>Farming Practices</span>
            <h2 style={{ marginTop: 'var(--spacing-2)' }}>Why Pasture-Raised Matters</h2>
            <p>When we say our animals are pasture-raised, we mean they spend their lives outdoors on fresh pasture. This not only treats the animal with respect but heavily impacts the nutritional value of the food.</p>
            <button className="button secondary" style={{ marginTop: 'var(--spacing-3)' }}>Read Article</button>
          </article>
        </div>
      </Section>
    </>
  );
}
