'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './PageLoader.module.css';

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(false);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleStart = () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
      loadingTimeoutRef.current = setTimeout(() => {
        setIsLoading(true);
      }, 100);
    };

    const handleComplete = () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
      setIsLoading(false);
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link) {
        const href = link.getAttribute('href');
        const isExternal = href?.startsWith('http') || 
                          href?.startsWith('mailto') || 
                          href?.startsWith('tel') ||
                          href?.startsWith('#');
        
        if (!isExternal && href) {
          const isSamePage = window.location.pathname === href;
          if (!isSamePage) {
            handleStart();
          }
        }
      }
    };

    window.addEventListener('beforeunload', handleStart);
    window.addEventListener('load', handleComplete);
    document.addEventListener('click', handleClick);

    const observer = new MutationObserver(() => {
      handleComplete();
    });

    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });

    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
      window.removeEventListener('beforeunload', handleStart);
      window.removeEventListener('load', handleComplete);
      document.removeEventListener('click', handleClick);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isLoading) {
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.loader}>
        <div className={styles.skeletonCard}>
          <div className={styles.skeletonImage} />
          <div className={styles.skeletonContent}>
            <div className={styles.skeletonTitle} />
            <div className={styles.skeletonText} />
            <div className={styles.skeletonPrice} />
          </div>
        </div>
        <div className={styles.skeletonCard}>
          <div className={styles.skeletonImage} />
          <div className={styles.skeletonContent}>
            <div className={styles.skeletonTitle} />
            <div className={styles.skeletonText} />
            <div className={styles.skeletonPrice} />
          </div>
        </div>
        <div className={styles.skeletonCard}>
          <div className={styles.skeletonImage} />
          <div className={styles.skeletonContent}>
            <div className={styles.skeletonTitle} />
            <div className={styles.skeletonText} />
            <div className={styles.skeletonPrice} />
          </div>
        </div>
        <div className={styles.skeletonCard}>
          <div className={styles.skeletonImage} />
          <div className={styles.skeletonContent}>
            <div className={styles.skeletonTitle} />
            <div className={styles.skeletonText} />
            <div className={styles.skeletonPrice} />
          </div>
        </div>
      </div>
    </div>
  );
}
