const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aceagrofarms.com';
const SITE_NAME = 'ACE AGRO FARMS';
const DEFAULT_DESCRIPTION = 'ACE AGRO FARMS - Premium organic produce, herbal wellness products, pasture-raised meats, and fresh fish from our farm in Yaoundé, Cameroon. Chemical-free, sustainable, farm-to-table delivery across Cameroon.';
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
      locale: 'en_CM',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: metaDescription,
      images: [imageUrl],
    },
    other: {
      'geo.region': 'CM',
      'geo.placename': 'Yaoundé',
    },
  };
}

function getDefaultKeywords(pageTitle: string): string[] {
  const baseKeywords = [
    'ACE AGRO FARMS',
    'ACE AGRO FARMS Cameroon',
    'ACE AGRO FARMS Yaoundé',
    'organic farming Cameroon',
    'organic produce Yaoundé',
    'organic vegetables Douala',
    'herbal wellness products Cameroon',
    'pasture raised meat Cameroon',
    'fresh fish Cameroon',
    'sustainable agriculture Cameroon',
    'farm to table Cameroon',
    'natural products Cameroon',
    'chemical free vegetables Cameroon',
    'organic farm Centre Cameroon',
    'buy organic food Yaoundé',
    'fresh farm products Cameroon',
    'natural wellness Cameroon',
  ];

  const pageKeywords: { [key: string]: string[] } = {
    home: ['ACE AGRO FARMS', 'organic farm Cameroon', 'wellness farm Yaoundé', 'natural food delivery Cameroon', 'farm fresh produce Douala', 'organic groceries Cameroon'],
    about: ['ACE AGRO FARMS story', 'farm story Cameroon', 'organic farming practices Yaoundé', 'sustainable agriculture Cameroon', 'about ACE AGRO FARMS'],
    products: ['buy organic produce Cameroon', 'herbal wellness products Yaoundé', 'pasture raised meat Douala', 'fresh fish Cameroon', 'organic vegetables online Cameroon', 'ACE AGRO FARMS products'],
    produce: ['organic vegetables Yaoundé', 'organic fruits Cameroon', 'fresh farm produce Douala', 'chemical free vegetables Cameroon', 'local organic produce Yaoundé'],
    wellness: ['herbal tea Cameroon', 'natural remedies Yaoundé', 'medicinal herbs Cameroon', 'wellness beverages Cameroon', 'organic moringa Cameroon', 'ACE AGRO FARMS wellness'],
    animal: ['pasture raised chicken Cameroon', 'goat meat Yaoundé', 'ethical farming Cameroon', 'free range eggs Cameroon', 'poultry farm Cameroon'],
    fish: ['fresh fish Yaoundé', 'aquaculture Cameroon', 'pond raised fish Douala', 'sustainable fish farming Cameroon', 'fresh fish delivery Cameroon'],
    essentials: ['ACE AGRO FARMS essentials', 'organic wellness Cameroon', 'natural fragrance Cameroon', 'essential oils Cameroon', 'organic skincare Cameroon', 'herbal products Yaoundé'],
    blog: ['ACE AGRO FARMS blog', 'organic living tips Cameroon', 'health benefits Yaoundé', 'farm to table recipes Cameroon', 'wellness blog Cameroon', 'natural health Cameroon'],
    gallery: ['ACE AGRO FARMS gallery', 'farm photos Cameroon', 'organic farm images Yaoundé', 'agriculture photography Cameroon'],
    contact: ['ACE AGRO FARMS contact', 'contact organic farm Cameroon', 'order organic products Yaoundé', 'farm visit Douala', 'buy organic food near me Cameroon'],
    shop: ['buy organic online Cameroon', 'farm products shop Yaoundé', 'order fresh produce Douala', 'organic store Cameroon', 'ACE AGRO FARMS shop'],
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
