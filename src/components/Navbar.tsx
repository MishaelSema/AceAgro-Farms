"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount } = useCart();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        <Link href="/" className="navbar-logo">
          ACE AGRO
        </Link>
        
        <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle Navigation">
          <span className={`hamburger ${isOpen ? 'open' : ''}`}></span>
        </button>

        <nav className={`navbar-nav ${isOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            <li><Link href="/" onClick={() => setIsOpen(false)}>Home</Link></li>
            <li><Link href="/about" onClick={() => setIsOpen(false)}>About</Link></li>
            <li><Link href="/products" onClick={() => setIsOpen(false)}>Products</Link></li>
            <li><Link href="/wellness" onClick={() => setIsOpen(false)}>Wellness</Link></li>
            <li><Link href="/gallery" onClick={() => setIsOpen(false)}>Gallery</Link></li>
            <li><Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
            <li>
              <Link href="/cart" className="cart-link" onClick={() => setIsOpen(false)}>
                Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </Link>
            </li>
          </ul>
          <Link href="/products" className="nav-cta" onClick={() => setIsOpen(false)}>
            Shop Now
          </Link>
        </nav>
      </div>
    </header>
  );
}
