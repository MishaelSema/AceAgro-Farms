'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Upload, X, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/components/ui/Toast';
import { AuthGuard } from '@/components/AuthGuard';
import styles from '../../new/page.module.css';

const categories = ['Farming Tips', 'Wellness', 'Recipes', 'News', 'Updates'];

function EditBlogForm() {
  const router = useRouter();
  const params = useParams();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image: '',
    category: 'News',
    author: 'ACE AGRO FARMS',
    readTime: 5,
    published: true,
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/blog?id=${params.id}`);
        const data = await res.json();
        if (data.post) {
          const post = data.post;
          setFormData({
            title: post.title || '',
            slug: post.slug || '',
            excerpt: post.excerpt || '',
            content: post.content || '',
            image: post.image || '',
            category: post.category || 'News',
            author: post.author || 'ACE AGRO FARMS',
            readTime: post.readTime || 5,
            published: post.published ?? true,
          });
        }
      } catch (error) {
        showToast('Failed to load post', 'error');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [params.id]);

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'title') {
      setFormData(prev => ({ ...prev, [name]: value, slug: generateSlug(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
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
      const postData = {
        ...formData,
        published: formData.published,
      };

      const res = await fetch(`/api/blog?id=${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });

      if (res.ok) {
        showToast('Blog post updated successfully!', 'success');
        router.push('/admin/dashboard?tab=blog');
      } else {
        const data = await res.json();
        showToast(data.error || 'Failed to update post', 'error');
      }
    } catch (error) {
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
            <p>Loading post...</p>
          </div>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <div className={styles.page}>
        <div className={styles.header}>
          <Link href="/admin/dashboard?tab=blog" className={styles.backBtn}>
            <ArrowLeft size={20} />
            Back to Blog
          </Link>
          <h1>Edit Blog Post</h1>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.grid}>
            <div className={styles.mainColumn}>
              <div className={styles.card}>
                <h3>Content</h3>
                
                <div className={styles.formGroup}>
                  <label>Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="Enter blog post title"
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
                    placeholder="auto-generated-from-title"
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Excerpt *</label>
                  <textarea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleChange}
                    required
                    rows={3}
                    placeholder="Brief summary for blog listing"
                    className={styles.textarea}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Content *</label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    required
                    rows={12}
                    placeholder="Full blog post content"
                    className={styles.textarea}
                  />
                </div>
              </div>
            </div>

            <div className={styles.sideColumn}>
              <div className={styles.card}>
                <h3>Category</h3>
                <select name="category" value={formData.category} onChange={handleChange} className={styles.select}>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className={styles.card}>
                <h3>Featured Image</h3>
                {formData.image ? (
                  <div className={styles.imagePreview}>
                    <img src={formData.image} alt="Featured" />
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
                <h3>Settings</h3>
                
                <div className={styles.formGroup}>
                  <label>Author</label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Read Time (minutes)</label>
                  <input
                    type="number"
                    name="readTime"
                    value={formData.readTime}
                    onChange={handleChange}
                    min="1"
                    className={styles.input}
                  />
                </div>

                <div className={styles.checkboxGroup}>
                  <label className={styles.checkbox}>
                    <input
                      type="checkbox"
                      name="published"
                      checked={formData.published}
                      onChange={handleChange}
                    />
                    <span>Published</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <Link href="/admin/dashboard?tab=blog" className={styles.cancelBtn}>
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

export default function EditBlogPage() {
  return <EditBlogForm />;
}
