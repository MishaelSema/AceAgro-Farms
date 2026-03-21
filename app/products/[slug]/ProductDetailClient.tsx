'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Minus, Plus, CheckCircle, Loader2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/ui/Toast';
import ProductCard from '@/components/ProductCard';
import styles from './page.module.css';

interface Product {
  _id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  unit: string;
  image: string;
  gallery: string[];
  shortDescription: string;
  description: string;
  healthBenefits: string[];
  productionMethod: string;
  inStock: boolean;
  organic: boolean;
  stock: number;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  unit: string;
}

export default function ProductDetailClient({ slug }: { slug: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        
        const res = await fetch(`/api/products?slug=${slug}`);
        const data = await res.json();
        
        if (data.success && data.products && data.products.length > 0) {
          const p = data.products[0];
          setProduct({
            _id: p._id,
            name: p.name,
            slug: p.slug,
            category: p.category,
            price: p.price || 0,
            unit: p.unit || 'kg',
            image: p.image || 'https://images.unsplash.com/photo-1518843875459-f738682238a6?w=800&q=80',
            gallery: p.gallery || [],
            shortDescription: p.shortDescription || '',
            description: p.description || '',
            healthBenefits: p.healthBenefits || [],
            productionMethod: p.productionMethod || '',
            inStock: p.inStock ?? true,
            organic: p.organic ?? true,
            stock: p.stock || 0,
          });
          
          const relatedRes = await fetch(`/api/products?category=${p.category}`);
          const relatedData = await relatedRes.json();
          if (relatedData.success && relatedData.products) {
            const related = relatedData.products
              .filter((rp: any) => rp.slug !== slug)
              .slice(0, 4)
              .map((rp: any) => ({
                _id: rp._id,
                name: rp.name,
                slug: rp.slug,
                category: rp.category,
                price: rp.price || 0,
                unit: rp.unit || 'kg',
                image: rp.image || 'https://images.unsplash.com/photo-1518843875459-f738682238a6?w=600&q=80',
                gallery: rp.gallery || [],
                shortDescription: rp.shortDescription || '',
                description: rp.description || '',
                healthBenefits: rp.healthBenefits || [],
                productionMethod: rp.productionMethod || '',
                inStock: rp.inStock ?? true,
                organic: rp.organic ?? true,
                stock: rp.stock || 0,
              }));
            setRelatedProducts(related);
          }
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const allImages = product ? [product.image, ...product.gallery].filter(Boolean) : [];

  const handleAddToCart = () => {
    if (!product) return;
    
    const cartItem: CartItem = {
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
      unit: product.unit,
    };
    
    addToCart(cartItem);
    showToast(`${product.name} added to cart!`, 'success');
  };

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Loader2 size={48} className={styles.spinner} />
        <p>Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={styles.error}>
        <p>{error || 'Product not found'}</p>
        <Link href="/products" className={styles.backBtn}>
          <ArrowLeft size={20} />
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <>
      <section className={styles.breadcrumb}>
        <div className={styles.container}>
          <Link href="/products" className={styles.backLink}>
            <ArrowLeft size={20} />
            Back to Products
          </Link>
        </div>
      </section>

      <section className={styles.product}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <div className={styles.imageColumn}>
              <div className={styles.mainImage}>
                {allImages[selectedImage] && (
                  <Image 
                    src={allImages[selectedImage]} 
                    alt={product.name} 
                    fill 
                    className={styles.image}
                    priority
                  />
                )}
                {product.organic && (
                  <div className={styles.organicBadge}>
                    <CheckCircle size={16} />
                    <span>Organic</span>
                  </div>
                )}
              </div>
              {allImages.length > 1 && (
                <div className={styles.thumbnailRow}>
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`${styles.thumbnail} ${selectedImage === idx ? styles.active : ''}`}
                    >
                      <Image src={img} alt={`${product.name} ${idx + 1}`} fill className={styles.thumbnailImage} />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className={styles.infoColumn}>
              <span className={styles.category}>
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </span>
              <h1>{product.name}</h1>
              <p className={styles.shortDescription}>{product.shortDescription}</p>
              <div className={styles.priceBlock}>
                <span className={styles.price}>FCFA {product.price.toLocaleString()}</span>
                <span className={styles.unit}>/ {product.unit}</span>
              </div>
              <div className={styles.stockStatus}>
                {product.inStock ? (
                  <span className={styles.inStock}>
                    <CheckCircle size={18} />
                    In Stock {product.stock > 0 && `(${product.stock} available)`}
                  </span>
                ) : (
                  <span className={styles.outOfStock}>Out of Stock</span>
                )}
              </div>
              
              {product.inStock && (
                <div className={styles.quantitySection}>
                  <label>Quantity:</label>
                  <div className={styles.quantity}>
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1}>
                      <Minus size={18} />
                    </button>
                    <span>{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} disabled={product.stock > 0 && quantity >= product.stock}>
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
              )}
              
              <button 
                onClick={handleAddToCart} 
                className={styles.addToCartBtn}
                disabled={!product.inStock}
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.details}>
        <div className={styles.container}>
          <div className={styles.detailsGrid}>
            {product.description && (
              <div className={styles.detailCard}>
                <h3>Description</h3>
                <p>{product.description}</p>
              </div>
            )}
            
            {product.healthBenefits && product.healthBenefits.length > 0 && (
              <div className={styles.detailCard}>
                <h3>Health Benefits</h3>
                <ul className={styles.benefitsList}>
                  {product.healthBenefits.map((benefit, idx) => (
                    <li key={idx}>
                      <CheckCircle size={18} />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {product.productionMethod && (
              <div className={styles.detailCard}>
                <h3>How It is Grown/Raised</h3>
                <p>{product.productionMethod}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className={styles.related}>
          <div className={styles.container}>
            <h2>You May Also Like</h2>
            <div className={styles.relatedGrid}>
              {relatedProducts.map((rp) => (
                <ProductCard
                  key={rp._id}
                  id={rp._id}
                  name={rp.name}
                  slug={rp.slug}
                  price={rp.price}
                  unit={rp.unit}
                  image={rp.image}
                  shortDescription={rp.shortDescription}
                  organic={rp.organic}
                  inStock={rp.inStock}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
