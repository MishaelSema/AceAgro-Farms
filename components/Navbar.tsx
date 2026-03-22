'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart, Trash2, Plus, Minus, LayoutDashboard, LogOut } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from './ui/Toast';
import { useAdminAuth } from './AdminAuthContext';
import styles from './Navbar.module.css';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/products', label: 'Products' },
  { href: '/blog', label: 'Blog' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
  { href: '/track-order', label: 'Track Order' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartTotal, mounted: cartMounted } = useCart();
  const { showToast } = useToast();
  const { isAuthenticated, logout, mounted: authMounted } = useAdminAuth();
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (showCart) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showCart]);

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            <img src="/images/logo-light.svg" alt="ACE AGRO FARMS" className={styles.logoImage} />
          </Link>

          <div className={styles.desktopNav}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={styles.navLink}
              >
                {link.label}
              </Link>
            ))}
            {authMounted && isAuthenticated && (
              <>
                <Link href="/admin/dashboard" className={styles.adminLink}>
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>
                <button onClick={handleLogout} className={styles.logoutLink}>
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            )}
          </div>

          <div className={styles.actions}>
            {authMounted && isAuthenticated && (
              <Link href="/admin/dashboard" className={styles.mobileAdminLink}>
                <LayoutDashboard size={20} />
              </Link>
            )}
            <button 
              className={styles.cartButton}
              onClick={() => setShowCart(true)}
            >
              <ShoppingCart size={22} />
              {cartMounted && cartCount > 0 && (
                <span className={styles.cartBadge}>{cartCount}</span>
              )}
            </button>

            <button
              className={styles.menuButton}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <div className={`${styles.mobileNav} ${isOpen ? styles.open : ''}`}>
          <div className={styles.mobileLinks}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={styles.mobileLink}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button
              className={styles.mobileLink}
              onClick={() => {
                setShowCart(true);
                setIsOpen(false);
              }}
            >
              <ShoppingCart size={20} />
              Cart {cartMounted && cartCount > 0 && `(${cartCount})`}
            </button>
            {authMounted && isAuthenticated && (
              <>
                <Link
                  href="/admin/dashboard"
                  className={styles.mobileLink}
                  onClick={() => setIsOpen(false)}
                >
                  <LayoutDashboard size={20} />
                  Dashboard
                </Link>
                <button
                  className={styles.mobileLink}
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {showCart && (
        <div className={styles.cartOverlay} onClick={() => setShowCart(false)}>
          <div className={styles.cartSidebar} onClick={(e) => e.stopPropagation()}>
            <div className={styles.cartHeader}>
              <h3>Your Cart ({cartCount})</h3>
              <button onClick={() => setShowCart(false)} className={styles.closeBtn}>
                <X size={24} />
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className={styles.emptyCart}>
                <ShoppingCart size={48} />
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
                        <img src={item.image} alt={item.name} className={styles.image} />
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
                    <span>Delivery costs are calculated at checkout based on your location</span>
                  </div>
                  <Link 
                    href="/checkout" 
                    className={styles.checkoutBtn}
                    onClick={() => setShowCart(false)}
                  >
                    Proceed to Checkout
                  </Link>
                  <button onClick={clearCart} className={styles.clearBtn}>
                    Clear Cart
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
