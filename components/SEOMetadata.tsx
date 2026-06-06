'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface SEOMetadata {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: 'website' | 'product' | 'article';
}

export default function SEOMetadata({
  title,
  description,
  keywords,
  ogImage,
  ogType = 'website',
}: SEOMetadata) {
  const pathname = usePathname();

  useEffect(() => {
    if (title) {
      document.title = title.includes('ACE AGRO FARMS') 
        ? title 
        : `${title} | ACE AGRO FARMS`;
    }

    const metaDescription = document.querySelector('meta[name="description"]');
    if (description) {
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = description;
        document.head.appendChild(meta);
      }
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (keywords && keywords.length > 0) {
      const keywordsString = keywords.join(', ');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', keywordsString);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'keywords';
        meta.content = keywordsString;
        document.head.appendChild(meta);
      }
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const ogImage = document.querySelector('meta[property="og:image"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');
    const ogTypeEl = document.querySelector('meta[property="og:type"]');

    const pageTitle = title?.includes('ACE AGRO FARMS') ? title : `${title} | ACE AGRO FARMS`;

    if (ogTitle) {
      ogTitle.setAttribute('content', pageTitle);
    }
    if (ogDescription) {
      ogDescription.setAttribute('content', description || '');
    }
    if (ogImage) {
      ogImage.setAttribute('content', ogImage?.getAttribute('content') || '');
    }
    if (ogUrl) {
      ogUrl.setAttribute('content', `${window.location.origin}${pathname}`);
    }
    if (ogTypeEl) {
      ogTypeEl.setAttribute('content', ogType);
    }

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    const twitterImage = document.querySelector('meta[name="twitter:image"]');

    if (twitterTitle) {
      twitterTitle.setAttribute('content', pageTitle);
    }
    if (twitterDescription) {
      twitterDescription.setAttribute('content', description || '');
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', `${window.location.origin}${pathname}`);
    } else {
      const link = document.createElement('link');
      link.rel = 'canonical';
      link.href = `${window.location.origin}${pathname}`;
      document.head.appendChild(link);
    }

  }, [title, description, keywords, pathname, ogType]);

  return null;
}
