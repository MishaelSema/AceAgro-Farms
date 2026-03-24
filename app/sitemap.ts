import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://aceagrofarms.com';
  
  const staticPages = [
    '',
    '/about',
    '/products',
    '/essentials',
    '/blog',
    '/gallery',
    '/contact',
    '/track-order',
  ];

  const sitemapEntries = staticPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: page === '' ? 'weekly' as const : 'monthly' as const,
    priority: page === '' ? 1.0 : 0.8,
  }));

  return sitemapEntries;
}