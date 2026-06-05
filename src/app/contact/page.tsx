import type { Metadata } from 'next';
import Section from '@/components/Section';
import ContactForm from '@/components/ContactForm';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with ACE AGRO FARMS. Reach out for wellness products, fresh produce, and general inquiries.',
  openGraph: {
    title: 'Contact ACE AGRO FARMS',
    description: 'Reach out for wellness products, fresh produce, and general inquiries.',
    images: [{ url: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?q=80&w=1200' }],
  },
};

export default function ContactPage() {
  return (
    <>
      <div className={styles.hero}>
        <div className="container">
          <h1>Contact Us</h1>
          <p>We&#39;d love to hear from you. Drop us a line!</p>
        </div>
      </div>

      <Section>
        <div className={styles.contactGrid}>
          <div className={styles.contactInfo}>
            <h2>Get In Touch</h2>
            <p>Whether you have a question about our organic practices, our products, or you just want to say hello, our team is ready to answer all your questions.</p>
            
            <div className={styles.infoBlock}>
              <h3>Phone</h3>
              <p>+1 234 567 890</p>
              <p>Mon - Fri, 8:00am - 5:00pm</p>
            </div>

            <div className={styles.infoBlock}>
              <h3>Email</h3>
              <p>info@aceagro.com</p>
            </div>

            <div className={styles.infoBlock}>
              <h3>Location</h3>
              <p>Sunnyside Farm, Hillstop</p>
              <p>Come visit during our open farm days!</p>
            </div>
          </div>

          <div className={styles.contactFormContainer}>
            <ContactForm styles={styles} />
          </div>
        </div>
      </Section>
    </>
  );
}
