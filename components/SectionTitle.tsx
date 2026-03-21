'use client';

import styles from './SectionTitle.module.css';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  light?: boolean;
}

export default function SectionTitle({
  title,
  subtitle,
  align = 'center',
  light = false,
}: SectionTitleProps) {
  return (
    <div className={`${styles.wrapper} ${styles[align]} ${light ? styles.light : ''}`}>
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      <div className={styles.divider}>
        <span className={styles.line}></span>
        <span className={styles.dot}></span>
        <span className={styles.line}></span>
      </div>
    </div>
  );
}
