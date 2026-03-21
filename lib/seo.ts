const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aceagrofarms.com';
const SITE_NAME = 'ACE AGRO FARMS';
const DEFAULT_DESCRIPTION = 'Premium organic produce, herbal wellness products, pasture-raised meats, and fresh fish. From farm to wellness - pure, natural, and sustainable living.';
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-image.jpg`;

interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: 'website' | 'article';
  canonical?: string;
}

export function generateSEO({
  title,
  description,
  keywords = [],
  ogImage,
  ogType = 'website',
  canonical,
}: SEOData) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const metaDescription = description || DEFAULT_DESCRIPTION;
  const metaKeywords = keywords.length > 0 ? keywords.join(', ') : getDefaultKeywords(title);
  const imageUrl = ogImage || DEFAULT_OG_IMAGE;
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : undefined;

  return {
    title: fullTitle,
    description: metaDescription,
    keywords: metaKeywords,
    canonical: canonicalUrl,
    openGraph: {
      title: fullTitle,
      description: metaDescription,
      url: canonicalUrl,
      siteName: SITE_NAME,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      type: ogType,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: metaDescription,
      images: [imageUrl],
    },
  };
}

function getDefaultKeywords(pageTitle: string): string[] {
  const baseKeywords = [
    'organic farming',
    'organic produce',
    'herbal tea',
    'wellness products',
    'pasture raised meat',
    'fresh fish',
    'sustainable agriculture',
    'farm to table',
    'natural products',
    'health food',
  ];

  const pageKeywords: { [key: string]: string[] } = {
    home: ['organic farm', 'wellness farm', 'natural food delivery', 'farm fresh produce'],
    about: ['farm story', 'organic farming practices', 'sustainable agriculture', 'ACE AGRO FARMS story'],
    products: ['buy organic produce', 'herbal wellness products', 'pasture raised meat', 'fresh fish'],
    produce: ['organic vegetables', 'organic fruits', 'fresh farm produce', 'chemical free vegetables'],
    wellness: ['herbal tea', 'natural remedies', 'medicinal herbs', 'wellness beverages'],
    animal: ['pasture raised chicken', 'goat meat', 'rabbit meat', 'ethical farming'],
    fish: ['fresh fish', 'aquaculture', 'pond raised fish', 'sustainable fish farming'],
    blog: ['organic living tips', 'health benefits', 'farm to table recipes', 'wellness blog'],
    gallery: ['farm photos', 'organic farm images', 'agriculture photography'],
    contact: ['contact organic farm', 'order organic products', 'farm visit'],
    shop: ['buy organic online', 'farm products shop', 'order fresh produce'],
  };

  const lowerTitle = pageTitle.toLowerCase();
  for (const [key, keywords] of Object.entries(pageKeywords)) {
    if (lowerTitle.includes(key)) {
      return Array.from(new Set([...baseKeywords.slice(0, 5), ...keywords]));
    }
  }

  return baseKeywords;
}

export function getProductSEO(product: {
  name: string;
  slug: string;
  description: string;
  category: string;
  image: string;
  price: number;
}) {
  const categoryNames: { [key: string]: string } = {
    produce: 'Organic Produce',
    wellness: 'Wellness Products',
    animal: 'Animal Products',
    fish: 'Fresh Fish',
  };

  return generateSEO({
    title: `${product.name} - ${categoryNames[product.category] || 'Products'} | ACE AGRO FARMS`,
    description: product.description.substring(0, 160),
    keywords: [
      product.name.toLowerCase(),
      categoryNames[product.category]?.toLowerCase() || '',
      'buy ' + product.name.toLowerCase(),
      'organic ' + product.name.toLowerCase(),
    ],
    ogImage: product.image,
    ogType: 'website',
    canonical: `/products/${product.slug}`,
  });
}

export function getBlogSEO(post: {
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  category: string;
}) {
  return generateSEO({
    title: `${post.title} | ACE AGRO FARMS Blog`,
    description: post.excerpt,
    keywords: [
      post.title.toLowerCase(),
      post.category.toLowerCase(),
      'wellness blog',
      'organic living',
      'health tips',
    ],
    ogImage: post.image,
    ogType: 'article',
    canonical: `/blog/${post.slug}`,
  });
}

export const SEO_CONFIG = {
  siteUrl: SITE_URL,
  siteName: SITE_NAME,
  defaultDescription: DEFAULT_DESCRIPTION,
  defaultOgImage: DEFAULT_OG_IMAGE,
  social: {
    facebook: 'https://facebook.com/aceagrofarms',
    instagram: 'https://instagram.com/aceagrofarms',
    twitter: 'https://twitter.com/aceagrofarms',
  },
};
