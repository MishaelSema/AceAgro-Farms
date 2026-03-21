'use client';

import Hero from './Hero';
import FeaturedProducts from './FeaturedProducts';
import AboutPreview from './AboutPreview';
import CategoriesSection from './CategoriesSection';
import WhyChooseUs from './WhyChooseUs';
import CTASection from './CTASection';

export default function HomeContent() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <AboutPreview />
      <CategoriesSection />
      <WhyChooseUs />
      <CTASection />
    </>
  );
}
