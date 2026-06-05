"use client";
import React, { useState, useEffect } from 'react';
import Section from '@/components/Section';
import toast from 'react-hot-toast';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Produce',
    price: '',
    image: '',
    description: ''
  });

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/admin/products');
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (err) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingProduct ? 'PATCH' : 'POST';
    const url = editingProduct ? `/api/admin/products/${editingProduct._id}` : '/api/admin/products';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(editingProduct ? 'Product updated' : 'Product added');
        setEditingProduct(null);
        setFormData({ name: '', category: 'Produce', price: '', image: '', description: '' });
        fetchProducts();
      }
    } catch (err) {
      toast.error('Operation failed');
    }
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      description: product.description
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        toast.success('Product deleted');
        fetchProducts();
      }
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  if (loading) return <Section><div>Loading products...</div></Section>;

  return (
    <Section>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 400px) 1fr', gap: 'var(--spacing-10)' }}>
        {/* Form Side */}
        <div style={{ backgroundColor: 'var(--white)', padding: 'var(--spacing-6)', borderRadius: 'var(--border-radius-lg)', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', height: 'fit-content' }}>
          <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', marginTop: 'var(--spacing-4)' }}>
            <div>
              <label>Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="form-input" />
            </div>
            <div>
              <label>Category</label>
              <select name="category" value={formData.category} onChange={handleChange} required className="form-input">
                <option value="Produce">Produce</option>
                <option value="Wellness">Wellness</option>
                <option value="Animal Products">Animal Products</option>
                <option value="Fish & Aquaculture">Fish & Aquaculture</option>
              </select>
            </div>
            <div>
              <label>Price (e.g. $4.99/lb)</label>
              <input type="text" name="price" value={formData.price} onChange={handleChange} required className="form-input" />
            </div>
            <div>
              <label>Image URL</label>
              <input type="text" name="image" value={formData.image} onChange={handleChange} required className="form-input" />
            </div>
            <div>
              <label>Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} required className="form-input" rows={3}></textarea>
            </div>
            <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
              <button type="submit" className="button primary" style={{ flex: 1 }}>{editingProduct ? 'Update' : 'Add'}</button>
              {editingProduct && (
                <button type="button" onClick={() => {setEditingProduct(null); setFormData({name:'',category:'Produce',price:'',image:'',description:''});}} className="button secondary">Cancel</button>
              )}
            </div>
          </form>
        </div>

        {/* List Side */}
        <div>
          <h2>Product Inventory</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', marginTop: 'var(--spacing-4)' }}>
            {products.map((product) => (
              <div key={product._id} style={{ display: 'flex', gap: 'var(--spacing-4)', padding: 'var(--spacing-4)', backgroundColor: 'var(--white)', borderRadius: 'var(--border-radius-lg)', border: '1px solid #eee' }}>
                <div style={{ width: '60px', height: '60px', position: 'relative', borderRadius: 'var(--border-radius)', overflow: 'hidden' }}>
                  <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 'var(--font-md)', margin: 0 }}>{product.name}</h3>
                  <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>{product.category} | {product.price}</p>
                </div>
                <div style={{ display: 'flex', gap: 'var(--spacing-2)', alignItems: 'center' }}>
                  <button onClick={() => handleEdit(product)} className="button secondary" style={{ padding: '5px 10px', fontSize: '12px' }}>Edit</button>
                  <button onClick={() => handleDelete(product._id)} className="button secondary" style={{ padding: '5px 10px', fontSize: '12px', color: '#e74c3c' }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
