"use client";
import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function ContactForm({ styles }: { styles: any }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success('Message sent successfully!');
        (e.target as HTMLFormElement).reset();
      } else {
        toast.error('Failed to send message.');
      }
    } catch (error) {
      toast.error('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="name">Full Name</label>
        <input type="text" id="name" name="name" required placeholder="John Doe" disabled={loading} />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" required placeholder="john@example.com" disabled={loading} />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="subject">Subject</label>
        <input type="text" id="subject" name="subject" required placeholder="How can we help?" disabled={loading} />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={5} required placeholder="Your message here..." disabled={loading}></textarea>
      </div>
      <button type="submit" className="button primary" disabled={loading}>
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
