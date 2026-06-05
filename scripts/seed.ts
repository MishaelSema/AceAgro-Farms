require('dotenv').config({ path: '.env.local' });
const dbConnect = require('../src/lib/mongodb').default;
const Product = require('../src/models/Product').default;

const initialProducts = [
  {
    name: 'Organic Roma Tomatoes',
    category: 'Produce',
    price: '$4.99/lb',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=800',
    description: 'Sun-ripened, chemical-free tomatoes grown in our rich organic soil. Perfect for salads and sauces.'
  },
  {
    name: 'Green Leaf Lettuce',
    category: 'Produce',
    price: '$3.50/head',
    image: 'https://images.unsplash.com/photo-1622352824700-0e1d2c6c06df?q=80&w=800',
    description: 'Crisp, hydro-organic lettuce harvested daily for maximum freshness.'
  },
  {
    name: 'Relaxation Herbal Tea',
    category: 'Wellness',
    price: '$12.00',
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=800',
    description: 'A soothing blend of chamomile, lavender, and lemon balm to help you unwind.'
  },
  {
    name: 'Immunity Boost Blend',
    category: 'Wellness',
    price: '$14.00',
    image: 'https://images.unsplash.com/photo-1563914782013-1c7be923ea0f?q=80&w=800',
    description: 'Hand-picked Echinacea, ginger, and turmeric to support your immune system naturally.'
  },
  {
    name: 'Pasture-Raised Whole Chicken',
    category: 'Animal Products',
    price: '$22.00',
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=800',
    description: 'Slow-grown, pasture-raised chicken with no antibiotics or hormones.'
  },
  {
    name: 'Fresh Farm Tilapia',
    category: 'Fish & Aquaculture',
    price: '$8.99/lb',
    image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?q=80&w=800',
    description: 'Freshly harvested from our clean, spring-fed ponds.'
  }
];

async function seed() {
  await dbConnect();
  await Product.deleteMany({});
  await Product.insertMany(initialProducts);
  console.log('Database seeded successfully');
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
