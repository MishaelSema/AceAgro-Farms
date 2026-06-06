import { Metadata } from 'next';
import { generateSEO } from '@/lib/seo';
import styles from './page.module.css';

export const metadata: Metadata = generateSEO({
  title: 'Terms & Conditions',
  description: 'ACE AGRO FARMS terms and conditions. Please read these terms carefully before using our website or purchasing our products.',
  canonical: '/terms',
});

export default function TermsPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.label}>Legal</span>
          <h1>Terms & Conditions</h1>
          <p>Last updated: March 2026</p>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.section}>
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and using the ACE AGRO FARMS website, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, you should not use our website or services.</p>
          </div>

          <div className={styles.section}>
            <h2>2. Business Information</h2>
            <p>ACE AGRO FARMS is an organic farming enterprise registered and operating in Cameroon.</p>
            <ul>
              <li><strong>Address:</strong> Yaoundé, Centre Region, Cameroon</li>
              <li><strong>Phone:</strong> +237 675 033 792</li>
              <li><strong>Email:</strong> info@aceagrofarms.com</li>
              <li><strong>WhatsApp:</strong> +234 703 829 4572</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>3. Products & Pricing</h2>
            <h3>Product Descriptions</h3>
            <p>We strive to ensure all product descriptions, images, and pricing are accurate. However, we do not warrant that product descriptions or other content are error-free. If a product is significantly different from its description, you may return it under our return policy.</p>
            <h3>Pricing</h3>
            <p>All prices are listed in Central African CFA Franc (FCFA). We reserve the right to modify prices at any time without prior notice. Products are subject to availability.</p>
            <h3>Organic Certification</h3>
            <p>We certify that our products are grown and processed using organic farming practices. However, customers should be aware that organic certification standards may vary by jurisdiction.</p>
          </div>

          <div className={styles.section}>
            <h2>4. Orders & Payment</h2>
            <h3>Order Acceptance</h3>
            <p>We reserve the right to refuse or cancel any order for any reason, including product availability, pricing errors, or suspected fraud.</p>
            <h3>Payment</h3>
            <p>Payment is required at the time of placing an order. We accept payment via mobile money and other payment methods available on our checkout page.</p>
            <h3>Order Confirmation</h3>
            <p>After placing an order, you will receive an email confirmation with your order ID. This confirmation does not constitute acceptance of your order. We may still cancel the order after confirmation if issues arise.</p>
          </div>

          <div className={styles.section}>
            <h2>5. Delivery & Shipping</h2>
            <h3>Delivery Areas</h3>
            <p>We deliver within Yaoundé, Douala, and other areas across Cameroon as specified during checkout.</p>
            <h3>Delivery Fees</h3>
            <p>Delivery costs are calculated based on your location and the size of your order. Fees will be displayed at checkout before you complete your purchase.</p>
            <h3>Delivery Times</h3>
            <p>Delivery times vary depending on your location. We will provide an estimated delivery date after your order is confirmed. We are not liable for delays caused by factors beyond our control.</p>
            <h3>Risk of Loss</h3>
            <p>Risk of loss and title for products pass to you upon delivery.</p>
          </div>

          <div className={styles.section}>
            <h2>6. Returns & Refunds</h2>
            <h3>Perishable Goods</h3>
            <p>Due to the perishable nature of our products (fresh produce, meat, fish), we do not accept returns. However, if you receive damaged or unsatisfactory products, please contact us within 24 hours of delivery.</p>
            <h3>Non-Perishable Goods</h3>
            <p>For non-perishable products (herbal teas, wellness products), we accept returns within 7 days of delivery if the product is unopened and in its original packaging.</p>
            <h3>Refund Process</h3>
            <p>Refunds will be processed within 5-7 business days after we receive and inspect the returned product. Refunds will be issued to the original payment method.</p>
          </div>

          <div className={styles.section}>
            <h2>7. User Accounts</h2>
            <p>When you create an account with us, you are responsible for maintaining the confidentiality of your login credentials. You agree to notify us immediately of any unauthorized use of your account.</p>
            <p>We reserve the right to terminate accounts at our discretion, particularly in cases of fraudulent activity or violation of these terms.</p>
          </div>

          <div className={styles.section}>
            <h2>8. Intellectual Property</h2>
            <p>All content on this website, including text, images, logos, and designs, is the property of ACE AGRO FARMS and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written consent.</p>
          </div>

          <div className={styles.section}>
            <h2>9. Limitation of Liability</h2>
            <p>ACE AGRO FARMS shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or products. Our total liability shall not exceed the amount paid by you for the products in question.</p>
          </div>

          <div className={styles.section}>
            <h2>10. Disclaimer of Warranties</h2>
            <p>Our products are provided "as is" without any express or implied warranties. While we strive for the highest quality, we make no guarantees regarding the specific health benefits of our products.</p>
            <p>Our wellness and herbal products are not intended to diagnose, treat, cure, or prevent any disease. Always consult with a healthcare professional before using any herbal remedies.</p>
          </div>

          <div className={styles.section}>
            <h2>11. Prohibited Uses</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use our website for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with the proper functioning of our website</li>
              <li>Submit false or misleading information</li>
              <li>Use our content without permission</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>12. Governing Law</h2>
            <p>These Terms & Conditions shall be governed by and construed in accordance with the laws of the Republic of Cameroon. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Yaoundé, Cameroon.</p>
          </div>

          <div className={styles.section}>
            <h2>13. Changes to Terms</h2>
            <p>We reserve the right to update or modify these Terms & Conditions at any time. Changes will be effective immediately upon posting. Your continued use of our website after changes constitutes acceptance of the new terms.</p>
          </div>

          <div className={styles.section}>
            <h2>14. Contact Information</h2>
            <p>For questions about these Terms & Conditions, please contact us:</p>
            <ul>
              <li><strong>Email:</strong> info@aceagrofarms.com</li>
              <li><strong>Phone:</strong> +237 675 033 792</li>
              <li><strong>WhatsApp:</strong> +234 703 829 4572</li>
              <li><strong>Address:</strong> Yaoundé, Centre Region, Cameroon</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}