import type { Metadata } from 'next';
import Image from 'next/image';
import Section from '@/components/Section';

export const metadata: Metadata = {
  title: 'Farm Gallery',
  description: 'Take a visual tour of ACE AGRO FARMS. See our organic crops, animals, and beautiful landscapes.',
  openGraph: {
    title: 'ACE AGRO Farm Gallery',
    description: 'Visual tour of our organic crops and animals.',
    images: [{ url: 'https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?q=80&w=1200' }],
  },
};

const images = [
  'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=800',
  'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800',
  'https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?q=80&w=800',
  'https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=800',
  'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=800',
  'https://images.unsplash.com/photo-1614735241165-6756e1df61ab?q=80&w=800'
];

export default function GalleryPage() {
  return (
    <>
      <div style={{ backgroundColor: 'var(--primary-green)', padding: 'var(--spacing-10) 0' }}>
        <div className="container" style={{ textAlign: 'center', color: 'var(--white)' }}>
          <h1 style={{ marginBottom: '0' }}>Farm Experience Gallery</h1>
        </div>
      </div>

      <Section>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--spacing-4)' }}>
          {images.map((src, i) => (
            <div key={i} style={{ position: 'relative', width: '100%', aspectRatio: '1/1', borderRadius: 'var(--border-radius)', overflow: 'hidden' }}>
              <Image src={src} alt={`Farm Gallery Image ${i+1}`} fill style={{ objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
