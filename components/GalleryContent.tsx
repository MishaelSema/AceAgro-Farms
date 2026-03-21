'use client';

import Image from 'next/image';
import { useState } from 'react';
import { X } from 'lucide-react';
import styles from '../app/gallery/page.module.css';

interface GalleryItem {
  _id: string;
  title: string;
  description?: string;
  image: string;
  category: string;
  featured: boolean;
}

interface Props {
  initialItems: GalleryItem[];
}

const categories = [
  { id: 'all', label: 'All' },
  { id: 'farm', label: 'Farm' },
  { id: 'products', label: 'Products' },
  { id: 'events', label: 'Events' },
  { id: 'team', label: 'Team' },
  { id: 'other', label: 'Other' },
];

export default function GalleryContent({ initialItems }: Props) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filteredItems = activeCategory === 'all'
    ? initialItems
    : initialItems.filter(item => item.category === activeCategory);

  return (
    <>
      <section className={styles.gallery}>
        <div className={styles.container}>
          <div className={styles.filters}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`${styles.filterBtn} ${activeCategory === cat.id ? styles.active : ''}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {filteredItems.length > 0 ? (
            <div className={styles.masonry}>
              {filteredItems.map((item) => (
                <div
                  key={item._id}
                  className={styles.imageCard}
                  onClick={() => setSelectedImage(item)}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className={styles.overlay}>
                    <span>{item.title}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-gray-500)' }}>
              No gallery items found.
            </p>
          )}
        </div>
      </section>

      {selectedImage && (
        <div className={styles.lightbox} onClick={() => setSelectedImage(null)}>
          <button className={styles.lightboxClose} onClick={() => setSelectedImage(null)}>
            <X size={24} />
          </button>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedImage.image}
              alt={selectedImage.title}
              fill
              className={styles.lightboxImage}
              sizes="90vw"
            />
            <div className={styles.lightboxCaption}>
              <h3>{selectedImage.title}</h3>
              {selectedImage.description && <p>{selectedImage.description}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
