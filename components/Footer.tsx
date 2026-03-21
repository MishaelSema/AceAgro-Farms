import Link from 'next/link';
import { Leaf, Mail, Phone, MapPin } from 'lucide-react';
import { getFooterData } from '@/lib/footerData';
import styles from './Footer.module.css';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/products', label: 'Products' },
  { href: '/blog', label: 'Blog' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

const platformIcons: Record<string, JSX.Element> = {
  facebook: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
  instagram: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="currentColor" strokeWidth="2"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2"/></svg>,
  twitter: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>,
  youtube: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1C5.12 19.56 12 19.56 12 19.56s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white"/></svg>,
  whatsapp: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z"/></svg>,
  tiktok: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.95a8.18 8.18 0 0 0 4.77 1.52V6.84a4.85 4.85 0 0 1-1-.15z"/></svg>,
};

const platformLabels: Record<string, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  twitter: 'Twitter',
  youtube: 'YouTube',
  whatsapp: 'WhatsApp',
  tiktok: 'TikTok',
};

function getSocialUrl(platform: string, value: string): string {
  switch (platform) {
    case 'facebook': return value.startsWith('http') ? value : `https://facebook.com/${value}`;
    case 'instagram': return value.startsWith('http') ? value : `https://instagram.com/${value}`;
    case 'twitter': return value.startsWith('http') ? value : `https://twitter.com/${value}`;
    case 'youtube': return value.startsWith('http') ? value : `https://youtube.com/@${value}`;
    case 'whatsapp': return value.startsWith('http') ? value : `https://wa.me/${value.replace(/\D/g, '')}`;
    case 'tiktok': return value.startsWith('http') ? value : `https://tiktok.com/@${value}`;
    default: return value;
  }
}

export default async function Footer() {
  const { categories, socials } = await getFooterData();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brandSection}>
            <Link href="/" className={styles.logo}>
              <div className={styles.logoIcon}>
                <Leaf size={24} />
              </div>
              <div className={styles.logoText}>
                <span className={styles.logoTitle}>ACE AGRO</span>
                <span className={styles.logoSubtitle}>FARMS</span>
              </div>
            </Link>
            <p className={styles.tagline}>
              From Farm to Wellness – Pure, Natural, and Sustainable Living. We deliver the finest organic produce and wellness products straight from our farm to your table.
            </p>
            {socials.length > 0 && (
              <div className={styles.social}>
                {socials.map((social: any) => (
                  <a
                    key={social._id}
                    href={getSocialUrl(social.platform, social.value)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={platformLabels[social.platform]}
                  >
                    {platformIcons[social.platform]}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className={styles.linksSection}>
            <h4>Quick Links</h4>
            <ul>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.linksSection}>
            <h4>Products</h4>
            <ul>
              {categories.map((cat: any) => (
                <li key={cat._id}>
                  <Link href={`/products?category=${cat.slug}`}>{cat.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.contactSection}>
            <h4>Contact Us</h4>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <MapPin size={18} />
                <span>Yaounde, Centre Region, Cameroon</span>
              </div>
              <div className={styles.contactItem}>
                <Phone size={18} />
                <span>+237 6XX XXX XXX</span>
              </div>
              <div className={styles.contactItem}>
                <Mail size={18} />
                <span>hello@aceagrofarms.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} ACE AGRO FARMS. All rights reserved.</p>
          <p className={styles.motto}>Naturally Grown. Purely Nourishing. Sustainably Raised.</p>
        </div>
      </div>
    </footer>
  );
}

export { platformLabels, getSocialUrl };
