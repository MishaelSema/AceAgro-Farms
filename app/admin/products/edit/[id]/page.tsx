'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Upload, X, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/components/ui/Toast';
import { AuthGuard } from '@/components/AuthGuard';
import styles from '../../new/page.module.css';

const unitOptions = [
  { value: 'kg', label: 'per kg' },
  { value: 'g', label: 'per g' },
  { value: '100g', label: 'per 100g' },
  { value: '500g', label: 'per 500g' },
  { value: 'lb', label: 'per lb' },
  { value: 'bird', label: 'per bird' },
  { value: 'bunch', label: 'per bunch' },
  { value: 'pack', label: 'per pack' },
  { value: 'piece', label: 'per piece' },
  { value: 'litre', label: 'per litre' },
  { value: 'ml', label: 'per ml' },
  { value: 'other', label: 'Other (specify)' },
];

function EditProductForm() {
  const router = useRouter();
  const params = useParams();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<{ _id: string; name: string; slug: string }[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    shortDescription: '',
    description: '',
    price: '',
    comparePrice: '',
    unit: 'kg',
    category: '',
    image: '',
    gallery: [] as string[],
    inStock: true,
    featured: false,
    organic: true,
    stock: '',
    weight: '',
    tags: '',
    productionMethod: 'Organic Farming',
  });
  const [customUnit, setCustomUnit] = useState('');
  const [isCustomUnit, setIsCustomUnit] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        if (data.categories) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products?id=${params.id}`);
        const data = await res.json();
        if (data.product) {
          const product = data.product;
          
          const predefinedUnits = unitOptions.map(u => u.value);
          const productUnit = product.unit || 'kg';
          const isPredefined = predefinedUnits.includes(productUnit);
          
          setFormData({
            name: product.name || '',
            slug: product.slug || '',
            shortDescription: product.shortDescription || '',
            description: product.description || '',
            price: product.price?.toString() || '',
            comparePrice: product.comparePrice?.toString() || '',
            unit: isPredefined ? productUnit : 'other',
            category: product.category || '',
            image: product.image || '',
            gallery: product.gallery || [],
            inStock: product.inStock ?? true,
            featured: product.featured ?? false,
            organic: product.organic ?? true,
            stock: product.stock?.toString() || '',
            weight: product.weight?.toString() || '',
            tags: product.tags?.join(', ') || '',
            productionMethod: product.productionMethod || 'Organic Farming',
          });
          
          setIsCustomUnit(!isPredefined);
          setCustomUnit(isPredefined ? '' : productUnit);
        }
      } catch (error) {
        showToast('Failed to load product', 'error');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [params.id]);

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'name') {
      setFormData(prev => ({ ...prev, [name]: value, slug: generateSlug(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, unit: value }));
    setIsCustomUnit(value === 'other');
    if (value !== 'other') {
      setCustomUnit('');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const finalUnit = formData.unit === 'other' ? customUnit : formData.unit;
      
      if (!finalUnit) {
        showToast('Please specify a unit', 'error');
        setIsSubmitting(false);
        return;
      }

      const productData = {
        ...formData,
        unit: finalUnit,
        price: Number(formData.price),
        comparePrice: formData.comparePrice ? Number(formData.comparePrice) : undefined,
        stock: Number(formData.stock) || 0,
        weight: formData.weight ? Number(formData.weight) : undefined,
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : [],
      };

      const res = await fetch(`/api/products?id=${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (res.ok) {
        showToast('Product updated successfully!', 'success');
        router.push('/admin/dashboard?tab=products');
      } else {
        const data = await res.json();
        showToast(data.error || 'Failed to update product', 'error');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      showToast('An error occurred', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <AuthGuard>
        <div className={styles.page}>
          <div className={styles.loading}>
            <Loader2 className="animate-spin" size={32} />
            <p>Loading product...</p>
          </div>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <div className={styles.page}>
        <div className={styles.header}>
          <Link href="/admin/dashboard?tab=products" className={styles.backBtn}>
            <ArrowLeft size={20} />
            Back to Products
          </Link>
          <h1>Edit Product</h1>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.grid}>
            <div className={styles.mainColumn}>
              <div className={styles.card}>
                <h3>Basic Information</h3>
                
                <div className={styles.formGroup}>
                  <label>Product Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Organic Moringa Tea"
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Slug</label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="auto-generated-from-name"
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Short Description *</label>
                  <input
                    type="text"
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    required
                    placeholder="Brief description for product cards"
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Full Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Detailed product description"
                    className={styles.textarea}
                  />
                </div>
              </div>

              <div className={styles.card}>
                <h3>Pricing</h3>
                
                <div className={styles.row}>
                  <div className={styles.formGroup}>
                    <label>Price (FCFA) *</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      min="0"
                      placeholder="0"
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Compare Price (FCFA)</label>
                    <input
                      type="number"
                      name="comparePrice"
                      value={formData.comparePrice}
                      onChange={handleChange}
                      min="0"
                      placeholder="Optional"
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Unit *</label>
                  <select 
                    name="unit" 
                    value={formData.unit} 
                    onChange={handleUnitChange} 
                    className={styles.select}
                    required
                  >
                    {unitOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {isCustomUnit && (
                  <div className={styles.formGroup}>
                    <label>Custom Unit *</label>
                    <input
                      type="text"
                      value={customUnit}
                      onChange={(e) => setCustomUnit(e.target.value)}
                      required
                      placeholder="e.g., tray, dozen, bundle"
                      className={styles.input}
                    />
                  </div>
                )}
              </div>

              <div className={styles.card}>
                <h3>Inventory</h3>
                
                <div className={styles.row}>
                  <div className={styles.formGroup}>
                    <label>Stock Quantity</label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      min="0"
                      placeholder="0"
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Weight (kg)</label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      min="0"
                      step="0.1"
                      placeholder="Optional"
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Production Method</label>
                  <input
                    type="text"
                    name="productionMethod"
                    value={formData.productionMethod}
                    onChange={handleChange}
                    placeholder="e.g., Organic Farming, Wild Caught"
                    className={styles.input}
                  />
                </div>

                <div className={styles.checkboxGroup}>
                  <label className={styles.checkbox}>
                    <input
                      type="checkbox"
                      name="inStock"
                      checked={formData.inStock}
                      onChange={handleChange}
                    />
                    <span>In Stock</span>
                  </label>

                  <label className={styles.checkbox}>
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleChange}
                    />
                    <span>Featured Product</span>
                  </label>

                  <label className={styles.checkbox}>
                    <input
                      type="checkbox"
                      name="organic"
                      checked={formData.organic}
                      onChange={handleChange}
                    />
                    <span>Certified Organic</span>
                  </label>
                </div>
              </div>
            </div>

            <div className={styles.sideColumn}>
              <div className={styles.card}>
                <h3>Category</h3>
                <select name="category" value={formData.category} onChange={handleChange} className={styles.select}>
                  {categories.map(cat => (
                    <option key={cat._id} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.card}>
                <h3>Product Image</h3>
                {formData.image ? (
                  <div className={styles.imagePreview}>
                    <img src={formData.image} alt="Product" />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                      className={styles.removeImage}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <label className={styles.uploadArea}>
                    <Upload size={24} />
                    <span>Click to upload image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className={styles.fileInput}
                    />
                  </label>
                )}
              </div>

              <div className={styles.card}>
                <h3>Tags</h3>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="Comma-separated tags"
                  className={styles.input}
                />
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <Link href="/admin/dashboard?tab=products" className={styles.cancelBtn}>
              Cancel
            </Link>
            <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </AuthGuard>
  );
}

export default function EditProductPage() {
  return <EditProductForm />;
}
