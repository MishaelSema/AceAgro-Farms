'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/ui/Toast';
import ProductCard from '@/components/ProductCard';
import styles from './page.module.css';

const shopProducts = [
  {
    id: '1',
    name: 'Organic Moringa Tea',
    slug: 'organic-moringa-tea',
    price: 2500,
    unit: '100g',
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=600&q=80',
    shortDescription: 'Premium dried moringa leaves for a refreshing and health-boosting tea experience.',
    organic: true,
    inStock: true,
  },
  {
    id: '2',
    name: 'Fresh Organic Tomatoes',
    slug: 'fresh-organic-tomatoes',
    price: 1500,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1546470427-227c7b3f6b5b?w=600&q=80',
    shortDescription: 'Juicy, vine-ripened tomatoes grown without any chemical pesticides.',
    organic: true,
    inStock: true,
  },
  {
    id: '3',
    name: 'Pasture-Raised Chicken',
    slug: 'pasture-raised-chicken',
    price: 4500,
    unit: 'bird',
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=600&q=80',
    shortDescription: 'Free-range chickens raised on natural pasture for premium quality meat.',
    organic: true,
    inStock: true,
  },
  {
    id: '4',
    name: 'Fresh Catfish',
    slug: 'fresh-catfish',
    price: 3500,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=600&q=80',
    shortDescription: 'Clean, fresh catfish raised in natural pond environments.',
    organic: true,
    inStock: true,
  },
  {
    id: '5',
    name: 'Organic Spinach',
    slug: 'organic-spinach',
    price: 800,
    unit: 'bunch',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&q=80',
    shortDescription: 'Fresh, nutrient-rich spinach leaves perfect for salads and cooking.',
    organic: true,
    inStock: true,
  },
  {
    id: '6',
    name: 'Organic Lemongrass Tea',
    slug: 'organic-lemongrass-tea',
    price: 2000,
    unit: '80g',
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=600&q=80',
    shortDescription: 'Aromatic lemongrass for a calming and digestive tea blend.',
    organic: true,
    inStock: true,
  },
];

export default function ShopPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart();
  const { showToast } = useToast();
  const [showCart, setShowCart] = useState(false);

  const handleCheckout = () => {
    showToast('Proceeding to checkout...', 'info');
  };

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.label}>Shop</span>
          <h1>Fresh Organic Products</h1>
          <p>
            Browse our selection of premium organic produce, wellness products, 
            and farm-fresh goods. Add to cart and checkout easily.
          </p>
        </div>
        <button className={styles.cartToggle} onClick={() => setShowCart(!showCart)}>
          <ShoppingBag size={22} />
          {cartItems.length > 0 && (
            <span className={styles.cartCount}>{cartItems.length}</span>
          )}
        </button>
      </section>

      <div className={styles.shopLayout}>
        <section className={styles.products}>
          <div className={styles.container}>
            <h2>Featured Products</h2>
            <div className={styles.productsGrid}>
              {shopProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  slug={product.slug}
                  price={product.price}
                  unit={product.unit}
                  image={product.image}
                  shortDescription={product.shortDescription}
                  organic={product.organic}
                  inStock={product.inStock}
                />
              ))}
            </div>
          </div>
        </section>

        <aside className={`${styles.cartSidebar} ${showCart ? styles.open : ''}`}>
          <div className={styles.cartHeader}>
            <h3>Your Cart</h3>
            <button onClick={() => setShowCart(false)} className={styles.closeBtn}>
              &times;
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className={styles.emptyCart}>
              <ShoppingBag size={48} />
              <p>Your cart is empty</p>
              <Link href="/products" onClick={() => setShowCart(false)}>
                Browse Products
              </Link>
            </div>
          ) : (
            <>
              <div className={styles.cartItems}>
                {cartItems.map((item) => (
                  <div key={item.id} className={styles.cartItem}>
                    <div className={styles.itemImage}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className={styles.image}
                      />
                    </div>
                    <div className={styles.itemInfo}>
                      <h4>{item.name}</h4>
                      <p>FCFA {item.price.toLocaleString()} / {item.unit}</p>
                      <div className={styles.itemActions}>
                        <div className={styles.quantity}>
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                            <Minus size={14} />
                          </button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => {
                            removeFromCart(item.id);
                            showToast(`${item.name} removed from cart`, 'info');
                          }}
                          className={styles.removeBtn}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <div className={styles.itemTotal}>
                      FCFA {(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.cartFooter}>
                <div className={styles.subtotal}>
                  <span>Subtotal</span>
                  <span>FCFA {cartTotal.toLocaleString()}</span>
                </div>
                <div className={styles.delivery}>
                  <Truck size={18} />
                  <span>Free delivery on orders above FCFA 50,000</span>
                </div>
                <button onClick={handleCheckout} className={styles.checkoutBtn}>
                  Proceed to Checkout
                  <ArrowRight size={18} />
                </button>
                <button onClick={clearCart} className={styles.clearBtn}>
                  Clear Cart
                </button>
              </div>
            </>
          )}
        </aside>
      </div>
    </>
  );
}
