'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import styles from './page.module.css';

export default function ContactForm() {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        showToast('Message sent successfully! We will get back to you soon.', 'success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        showToast('Failed to send message. Please try again.', 'error');
      }
    } catch (error) {
      showToast('An error occurred. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your full name"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="your.email@example.com"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+237 679 080 426"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="subject">Subject *</label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className={styles.input}
          >
            <option value="">Select a subject</option>
            <option value="order">Order Inquiry</option>
            <option value="product">Product Question</option>
            <option value="farm-visit">Farm Visit Request</option>
            <option value="wholesale">Wholesale Inquiry</option>
            <option value="feedback">Feedback</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="message">Message *</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          placeholder="How can we help you?"
          className={styles.textarea}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={styles.submitBtn}
      >
        {isSubmitting ? (
          'Sending...'
        ) : (
          <>
            Send Message
            <Send size={18} />
          </>
        )}
      </button>
    </form>
  );
}
