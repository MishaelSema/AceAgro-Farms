import { Metadata } from 'next';
import { generateSEO } from '@/lib/seo';
import styles from './page.module.css';

export const metadata: Metadata = generateSEO({
  title: 'Privacy Policy',
  description: 'ACE AGRO FARMS privacy policy. Learn how we collect, use, and protect your personal information when you visit our website and purchase our products.',
  canonical: '/privacy',
});

export default function PrivacyPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.label}>Legal</span>
          <h1>Privacy Policy</h1>
          <p>Last updated: March 2026</p>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.section}>
            <h2>1. Introduction</h2>
            <p>ACE AGRO FARMS ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and purchase our products.</p>
            <p>By using our website, you consent to the practices described in this policy.</p>
          </div>

          <div className={styles.section}>
            <h2>2. Information We Collect</h2>
            <h3>Personal Information</h3>
            <ul>
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Delivery address</li>
              <li>Payment information (processed securely via third-party processors)</li>
            </ul>
            <h3>Non-Personal Information</h3>
            <ul>
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>IP address</li>
              <li>Pages visited and time spent on our site</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>3. How We Use Your Information</h2>
            <p>We use the collected information for the following purposes:</p>
            <ul>
              <li>To process and fulfill your orders</li>
              <li>To communicate with you about your orders and inquiries</li>
              <li>To send you newsletters and marketing communications (with your consent)</li>
              <li>To improve our website and customer experience</li>
              <li>To comply with legal obligations</li>
              <li>To prevent fraud and ensure security</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>4. Information Sharing</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share your information with:</p>
            <ul>
              <li><strong>Delivery partners:</strong> To deliver your orders to your address</li>
              <li><strong>Payment processors:</strong> To securely process transactions</li>
              <li><strong>Legal authorities:</strong> When required by law or to protect our rights</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>5. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption of data in transit and at rest.</p>
            <p>However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.</p>
          </div>

          <div className={styles.section}>
            <h2>6. Cookies</h2>
            <p>Our website uses cookies to enhance your browsing experience. Cookies are small text files stored on your device. We use:</p>
            <ul>
              <li><strong>Essential cookies:</strong> Required for the website to function</li>
              <li><strong>Analytics cookies:</strong> To understand how visitors use our site</li>
              <li><strong>Functional cookies:</strong> To remember your preferences</li>
            </ul>
            <p>You can control cookies through your browser settings. Disabling cookies may affect your experience on our site.</p>
          </div>

          <div className={styles.section}>
            <h2>7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent for marketing communications</li>
              <li>Object to processing of your data</li>
              <li>Request data portability</li>
            </ul>
            <p>To exercise any of these rights, contact us at <strong>info@aceagrofarms.com</strong></p>
          </div>

          <div className={styles.section}>
            <h2>8. Third-Party Services</h2>
            <p>We may use third-party services for payment processing, analytics, and email communications. These services have their own privacy policies governing the use of your information.</p>
            <p>Third-party services we use include:</p>
            <ul>
              <li>Payment processors for secure transactions</li>
              <li>Google Analytics for website analytics</li>
              <li>Email service providers for communications</li>
              <li>Cloudinary for image hosting</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>9. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated date.</p>
          </div>

          <div className={styles.section}>
            <h2>10. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us:</p>
            <ul>
              <li><strong>Email:</strong> info@aceagrofarms.com</li>
              <li><strong>Phone:</strong> +237 675 033 792</li>
              <li><strong>Address:</strong> Yaoundé, Centre Region, Cameroon</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}