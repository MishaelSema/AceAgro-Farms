import Link from 'next/link';
import './Footer.css';
import Section from './Section';

export default function Footer() {
  return (
    <footer className="footer">
      <Section className="footer-top">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>ACE AGRO</h3>
            <p>From Farm to Wellness – Pure, Natural, and Sustainable Living.</p>
          </div>
          
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/products">Shop</Link></li>
              <li><Link href="/wellness">Wellness Blog</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer-contact">
            <h4>Get in Touch</h4>
            <ul>
              <li>Email: info@aceagro.com</li>
              <li>Phone: +1 234 567 890</li>
              <li>Location: Sunnyside Farm, Hillstop</li>
            </ul>
          </div>

          <div className="footer-newsletter">
            <h4>Stay Updated</h4>
            <p>Subscribe to our newsletter for tips & offers.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Your email address" required />
              <button type="submit" className="primary">Subscribe</button>
            </form>
          </div>
        </div>
      </Section>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} ACE AGRO FARMS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
