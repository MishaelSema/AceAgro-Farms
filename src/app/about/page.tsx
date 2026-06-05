import type { Metadata } from 'next';
import Image from 'next/image';
import Section from '@/components/Section';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Meet Christopher Ekom — Founder & CEO of ACE AGRO FARMS. Transforming agriculture into opportunity, wellness, and sustainable growth.',
  openGraph: {
    title: 'About ACE AGRO FARMS',
    description: 'The story of our commitment to organic, sustainable wellness.',
    images: [{ url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1200' }],
  },
};

export default function AboutPage() {
  return (
    <>
      <div style={{ backgroundColor: 'var(--primary-green)', padding: 'var(--spacing-10) 0' }}>
        <div className="container" style={{ textAlign: 'center', color: 'var(--white)' }}>
          <h1 style={{ marginBottom: '0' }}>About ACE AGRO FARMS</h1>
        </div>
      </div>

      <Section>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 350px) 1fr', gap: 'var(--spacing-10)', alignItems: 'start' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', borderRadius: 'var(--border-radius-lg)', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
              <Image src="/about_ace_agro.jpeg" alt="Christopher Ekom - Founder & CEO, ACE AGRO FARMS" fill style={{ objectFit: 'cover' }} />
            </div>
            <p style={{ marginTop: 'var(--spacing-4)', fontStyle: 'italic', color: 'var(--primary-green)', fontWeight: 500, fontSize: 'var(--font-sm)' }}>
              &quot;Transforming agriculture into opportunity, wellness, and sustainable growth.&quot;
            </p>
          </div>

          <div>
            <h2 style={{ marginTop: 0 }}>Christopher Ekom <span style={{ fontWeight: 400, fontSize: 'var(--font-lg)', color: 'var(--secondary-orange)' }}>| Founder & CEO, ACE-AGRO Farms</span></h2>

            <p>
              After more than 22 years of distinguished service as a Senior Commercial Specialist at the U.S. Embassy in Cameroon, Christopher Ekom returned to his roots with a mission: to transform agriculture into a catalyst for wellness, economic opportunity, and sustainable development across Africa.
            </p>

            <p>
              Raised by a peasant farmer and a primary school teacher, Christopher learned early the values of hard work, integrity, and perseverance. Despite living with paralysis in his lower limbs and relying on elbow crutches for mobility, he built a successful career advancing U.S.–Cameroon trade and investment while developing a deep understanding of business, markets, and economic growth.
            </p>

            <p>
              Today, as Founder and CEO of ACE-AGRO Farms, he leads a 10-hectare organic farming enterprise dedicated to producing healthy, natural products that support better living and stronger communities. His vision is to combine sustainable agriculture, innovation, and inclusive entrepreneurship to create lasting impact while contributing to food security and rural prosperity.
            </p>

            <p>
              Christopher&apos;s unique blend of international business expertise, agricultural passion, and personal resilience positions him at the intersection of agribusiness, investment, and sustainable development—proving that determination, purpose, and leadership can turn challenges into opportunities and vision into reality.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
