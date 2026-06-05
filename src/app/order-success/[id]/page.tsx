import Section from '@/components/Section';
import Link from 'next/link';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function OrderSuccessPage({ params }: Props) {
  const { id } = await params;

  return (
    <Section>
      <div style={{ textAlign: 'center', padding: 'var(--spacing-16) 0' }}>
        <div style={{ fontSize: '64px', marginBottom: 'var(--spacing-4)' }}>🎉</div>
        <h1>Order Successfully Placed!</h1>
        <p style={{ fontSize: 'var(--font-lg)', margin: 'var(--spacing-4) 0' }}>
          Thank you for choosing ACE AGRO FARMS. Your order ID is <strong>{id}</strong>.
        </p>
        <p>A confirmation email has been sent to your inbox.</p>
        
        <div style={{ marginTop: 'var(--spacing-8)', display: 'flex', gap: 'var(--spacing-4)', justifyContent: 'center' }}>
          <Link href="/products" className="button secondary">Continue Shopping</Link>
          <Link href={`/track?id=${id}`} className="button primary">Track Order</Link>
        </div>
      </div>
    </Section>
  );
}
