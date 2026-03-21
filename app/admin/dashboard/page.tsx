'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Package, ShoppingCart, FileText, MessageSquare, Grid3X3, Settings, LogOut, Plus, Eye, Edit2, Trash2, X, Users, Mail, Image, Share2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/Toast';
import { useAdminAuth } from '@/components/AdminAuthContext';
import styles from './page.module.css';

type TabType = 'dashboard' | 'orders' | 'products' | 'blog' | 'inquiries' | 'categories' | 'gallery' | 'socials' | 'settings';

interface Order {
  _id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: any[];
  totalAmount: number;
  status: string;
  deliveryAddress?: string;
  createdAt: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  image: string;
  featured: boolean;
}

interface BlogPost {
  _id: string;
  title: string;
  category: string;
  status: string;
  createdAt: string;
}

interface Inquiry {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: string;
  createdAt: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image: string;
  productCount?: number;
}

interface GalleryItem {
  _id: string;
  title: string;
  description?: string;
  image: string;
  category: string;
  featured: boolean;
  createdAt: string;
}

interface Social {
  _id: string;
  platform: string;
  value: string;
  enabled: boolean;
  createdAt: string;
}

function AdminDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const { logout } = useAdminAuth();
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [galleryForm, setGalleryForm] = useState({ title: '', description: '', image: '', category: 'farm', featured: false });
  const [editingGalleryId, setEditingGalleryId] = useState<string | null>(null);
  const [socials, setSocials] = useState<Social[]>([]);
  const [socialForm, setSocialForm] = useState({ platform: 'facebook', value: '', enabled: true });
  const [editingSocialId, setEditingSocialId] = useState<string | null>(null);
  const [categoryForm, setCategoryForm] = useState({ name: '', slug: '', description: '', image: '' });
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'view' | 'edit'>('view');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/admin/session');
        if (!res.ok) {
          window.location.href = '/admin';
          return;
        }
        setIsAuthenticated(true);
      } catch (error) {
        window.location.href = '/admin';
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const tab = searchParams.get('tab') as TabType;
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [activeTab, isAuthenticated]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      switch (activeTab) {
        case 'orders':
          const ordersRes = await fetch('/api/orders');
          const ordersData = await ordersRes.json();
          setOrders(ordersData.orders || []);
          break;
        case 'products':
          const productsRes = await fetch('/api/products');
          const productsData = await productsRes.json();
          setProducts(productsData.products || []);
          break;
        case 'blog':
          const blogRes = await fetch('/api/blog');
          const blogData = await blogRes.json();
          setBlogPosts(blogData.posts || []);
          break;
        case 'inquiries':
          const inquiriesRes = await fetch('/api/inquiries');
          const inquiriesData = await inquiriesRes.json();
          setInquiries(inquiriesData.inquiries || []);
          break;
        case 'categories':
          const categoriesRes = await fetch('/api/categories');
          const categoriesData = await categoriesRes.json();
          setCategories(categoriesData.categories || []);
          break;
        case 'gallery':
          const galleryRes = await fetch('/api/gallery');
          const galleryData = await galleryRes.json();
          setGalleryItems(galleryData.items || []);
          break;
        case 'socials':
          const socialsRes = await fetch('/api/socials');
          const socialsData = await socialsRes.json();
          setSocials(socialsData.socials || []);
          break;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    window.location.href = '/admin';
  };

  const handleDelete = async (type: string, id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
      const endpoints: { [key: string]: string } = {
        orders: '/api/orders',
        products: '/api/products',
        blog: '/api/blog',
        inquiries: '/api/inquiries',
        categories: '/api/categories',
        gallery: '/api/gallery',
        socials: '/api/socials',
      };

      const res = await fetch(`${endpoints[type]}?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Deleted successfully', 'success');
        fetchData();
      }
    } catch (error) {
      showToast('Failed to delete', 'error');
    }
  };

  const handleStatusUpdate = async (type: string, id: string, status: string) => {
    try {
      const endpoints: { [key: string]: string } = {
        orders: '/api/orders',
        inquiries: '/api/inquiries',
        blog: '/api/blog',
      };

      const res = await fetch(`${endpoints[type]}?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        showToast('Status updated', 'success');
        fetchData();
      }
    } catch (error) {
      showToast('Failed to update status', 'error');
    }
  };

  const openModal = (type: 'view' | 'edit', item: any) => {
    setSelectedItem(item);
    setModalType(type);
    setShowModal(true);
  };

  const getStatusBadgeClass = (status: string) => {
    const statusMap: { [key: string]: string } = {
      pending: styles.statusPending,
      confirmed: styles.statusConfirmed,
      processing: styles.statusProcessing,
      shipped: styles.statusShipped,
      delivered: styles.statusDelivered,
      cancelled: styles.statusCancelled,
      new: styles.statusNew,
      read: styles.statusRead,
      published: styles.statusPublished,
      draft: styles.statusDraft,
    };
    return statusMap[status] || styles.statusDefault;
  };

  const formatPrice = (price: number) => {
    if (price === undefined || price === null) return 'FCFA 0';
    return `FCFA ${price.toLocaleString()}`;
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'blog', label: 'Blog', icon: FileText },
    { id: 'inquiries', label: 'Inquiries', icon: MessageSquare },
    { id: 'categories', label: 'Categories', icon: Grid3X3 },
    { id: 'gallery', label: 'Gallery', icon: Image },
    { id: 'socials', label: 'Socials', icon: Share2 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const stats = {
    orders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    products: products.length,
    blogPosts: blogPosts.length,
    inquiries: inquiries.length,
    unreadInquiries: inquiries.filter(i => i.status === 'new').length,
  };

  return (
    <div className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>ACE AGRO</h2>
          <span>Admin Panel</span>
        </div>

        <nav className={styles.nav}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`${styles.navItem} ${activeTab === tab.id ? styles.active : ''}`}
            >
              <tab.icon size={20} />
              <span className={styles.navLabel}>{tab.label}</span>
              {tab.id === 'orders' && stats.pendingOrders > 0 && (
                <span className={styles.badge}>{stats.pendingOrders}</span>
              )}
              {tab.id === 'inquiries' && stats.unreadInquiries > 0 && (
                <span className={styles.badge}>{stats.unreadInquiries}</span>
              )}
            </button>
          ))}
        </nav>

        <button onClick={handleLogout} className={styles.logoutBtn}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          <div>
            <h1>{tabs.find(t => t.id === activeTab)?.label}</h1>
            <p>Manage your {activeTab} from here</p>
          </div>
          {activeTab === 'products' && (
            <Link href="/admin/products/new" className={styles.addBtn}>
              <Plus size={20} />
              Add Product
            </Link>
          )}
          {activeTab === 'blog' && (
            <Link href="/admin/blog/new" className={styles.addBtn}>
              <Plus size={20} />
              Add Post
            </Link>
          )}
          {activeTab === 'categories' && (
            <button onClick={() => openModal('edit', null)} className={styles.addBtn}>
              <Plus size={20} />
              Add Category
            </button>
          )}
          {activeTab === 'gallery' && (
            <button onClick={() => { setEditingGalleryId(null); setGalleryForm({ title: '', description: '', image: '', category: 'farm', featured: false }); setShowModal(true); setModalType('edit'); }} className={styles.addBtn}>
              <Plus size={20} />
              Add Image
            </button>
          )}
          {activeTab === 'socials' && (
            <button onClick={() => { setEditingSocialId(null); setSocialForm({ platform: 'facebook', value: '', enabled: true }); setShowModal(true); setModalType('edit'); }} className={styles.addBtn}>
              <Plus size={20} />
              Add Social
            </button>
          )}
        </header>

        {activeTab === 'dashboard' && (
          <>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={`${styles.statIcon} ${styles.primary}`}>
                  <ShoppingCart size={24} />
                </div>
                <div className={styles.statInfo}>
                  <span className={styles.statValue}>{stats.orders}</span>
                  <span className={styles.statLabel}>Total Orders</span>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={`${styles.statIcon} ${styles.secondary}`}>
                  <Package size={24} />
                </div>
                <div className={styles.statInfo}>
                  <span className={styles.statValue}>{stats.pendingOrders}</span>
                  <span className={styles.statLabel}>Pending Orders</span>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={`${styles.statIcon} ${styles.green}`}>
                  <Package size={24} />
                </div>
                <div className={styles.statInfo}>
                  <span className={styles.statValue}>{stats.products}</span>
                  <span className={styles.statLabel}>Products</span>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={`${styles.statIcon} ${styles.blue}`}>
                  <MessageSquare size={24} />
                </div>
                <div className={styles.statInfo}>
                  <span className={styles.statValue}>{stats.unreadInquiries}</span>
                  <span className={styles.statLabel}>New Inquiries</span>
                </div>
              </div>
            </div>

            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h3>Recent Orders</h3>
                <button onClick={() => setActiveTab('orders')} className={styles.viewAllBtn}>View All</button>
              </div>
              {orders.length > 0 ? (
                <div className={styles.tableWrapper}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 5).map((order) => (
                        <tr key={order._id}>
                          <td className={styles.orderId}>{order._id.slice(-6).toUpperCase()}</td>
                          <td>{order.customerName}</td>
                          <td>{formatPrice(order.totalAmount)}</td>
                          <td>
                            <span className={`${styles.badge} ${getStatusBadgeClass(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                          <td>
                            <div className={styles.actions}>
                              <button onClick={() => openModal('view', order)} className={styles.actionBtn} title="View">
                                <Eye size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className={styles.noData}>No orders yet</p>
              )}
            </section>
          </>
        )}

        {activeTab === 'orders' && (
          <section className={styles.section}>
            {isLoading ? (
              <div className={styles.loading}>Loading orders...</div>
            ) : orders.length > 0 ? (
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td className={styles.orderId}>{order._id.slice(-6).toUpperCase()}</td>
                        <td>{order.customerName}</td>
                        <td>{order.customerEmail}</td>
                        <td>{order.customerPhone}</td>
                        <td>{order.items.length}</td>
                        <td>{formatPrice(order.totalAmount)}</td>
                        <td>
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusUpdate('orders', order._id, e.target.value)}
                            className={styles.statusSelect}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td>
                          <div className={styles.actions}>
                            <button onClick={() => openModal('view', order)} className={styles.actionBtn} title="View">
                              <Eye size={16} />
                            </button>
                            <button onClick={() => handleDelete('orders', order._id)} className={`${styles.actionBtn} ${styles.danger}`} title="Delete">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className={styles.noData}>No orders found</p>
            )}
          </section>
        )}

        {activeTab === 'products' && (
          <section className={styles.section}>
            {isLoading ? (
              <div className={styles.loading}>Loading products...</div>
            ) : products.length > 0 ? (
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Featured</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <td>
                          <img src={product.image} alt={product.name} className={styles.productImage} />
                        </td>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>{formatPrice(product.price)}</td>
                        <td>{product.stock}</td>
                        <td>
                          <span className={`${styles.badge} ${product.featured ? styles.statusConfirmed : styles.statusDefault}`}>
                            {product.featured ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td>
                          <div className={styles.actions}>
                            <Link href={`/admin/products/edit/${product._id}`} className={styles.actionBtn} title="Edit">
                              <Edit2 size={16} />
                            </Link>
                            <button onClick={() => handleDelete('products', product._id)} className={`${styles.actionBtn} ${styles.danger}`} title="Delete">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className={styles.noData}>No products found</p>
            )}
          </section>
        )}

        {activeTab === 'blog' && (
          <section className={styles.section}>
            {isLoading ? (
              <div className={styles.loading}>Loading blog posts...</div>
            ) : blogPosts.length > 0 ? (
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogPosts.map((post) => (
                      <tr key={post._id}>
                        <td>{post.title}</td>
                        <td>{post.category}</td>
                        <td>
                          <select
                            value={post.status}
                            onChange={(e) => handleStatusUpdate('blog', post._id, e.target.value)}
                            className={styles.statusSelect}
                          >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                          </select>
                        </td>
                        <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                        <td>
                          <div className={styles.actions}>
                            <Link href={`/admin/blog/edit/${post._id}`} className={styles.actionBtn} title="Edit">
                              <Edit2 size={16} />
                            </Link>
                            <button onClick={() => handleDelete('blog', post._id)} className={`${styles.actionBtn} ${styles.danger}`} title="Delete">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className={styles.noData}>No blog posts found</p>
            )}
          </section>
        )}

        {activeTab === 'inquiries' && (
          <section className={styles.section}>
            {isLoading ? (
              <div className={styles.loading}>Loading inquiries...</div>
            ) : inquiries.length > 0 ? (
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Message</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiries.map((inquiry) => (
                      <tr key={inquiry._id}>
                        <td>{inquiry.name}</td>
                        <td>{inquiry.email}</td>
                        <td>{inquiry.phone || '-'}</td>
                        <td className={styles.messageCell}>{inquiry.message.slice(0, 50)}...</td>
                        <td>
                          <select
                            value={inquiry.status}
                            onChange={(e) => handleStatusUpdate('inquiries', inquiry._id, e.target.value)}
                            className={styles.statusSelect}
                          >
                            <option value="new">New</option>
                            <option value="read">Read</option>
                            <option value="replied">Replied</option>
                          </select>
                        </td>
                        <td>{new Date(inquiry.createdAt).toLocaleDateString()}</td>
                        <td>
                          <div className={styles.actions}>
                            <button onClick={() => openModal('view', inquiry)} className={styles.actionBtn} title="View">
                              <Eye size={16} />
                            </button>
                            <button onClick={() => handleDelete('inquiries', inquiry._id)} className={`${styles.actionBtn} ${styles.danger}`} title="Delete">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className={styles.noData}>No inquiries found</p>
            )}
          </section>
        )}

        {activeTab === 'categories' && (
          <section className={styles.section}>
            {isLoading ? (
              <div className={styles.loading}>Loading categories...</div>
            ) : categories.length > 0 ? (
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category) => (
                      <tr key={category._id}>
                        <td>
                          <img src={category.image} alt={category.name} className={styles.productImage} />
                        </td>
                        <td>{category.name}</td>
                        <td>{category.description?.slice(0, 50) || '-'}...</td>
                        <td>
                          <div className={styles.actions}>
                            <button onClick={() => { setEditingCategoryId(category._id); setCategoryForm({ name: category.name, slug: category.slug, description: category.description || '', image: category.image }); setShowModal(true); setModalType('edit'); }} className={styles.actionBtn} title="Edit">
                              <Edit2 size={16} />
                            </button>
                            <button onClick={() => handleDelete('categories', category._id)} className={`${styles.actionBtn} ${styles.danger}`} title="Delete">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className={styles.noData}>No categories found</p>
            )}
          </section>
        )}

        {activeTab === 'gallery' && (
          <section className={styles.section}>
            {isLoading ? (
              <div className={styles.loading}>Loading gallery...</div>
            ) : galleryItems.length > 0 ? (
              <div className={styles.galleryGrid}>
                {galleryItems.map((item) => (
                  <div key={item._id} className={styles.galleryCard}>
                    <img src={item.image} alt={item.title} className={styles.galleryImage} />
                    <div className={styles.galleryInfo}>
                      <h4>{item.title}</h4>
                      <span className={styles.galleryCategory}>{item.category}</span>
                      {item.featured && <span className={styles.galleryFeatured}>Featured</span>}
                    </div>
                    <div className={styles.galleryActions}>
                      <button onClick={() => { setEditingGalleryId(item._id); setGalleryForm({ title: item.title, description: item.description || '', image: item.image, category: item.category, featured: item.featured }); setShowModal(true); setModalType('edit'); }} className={styles.actionBtn} title="Edit">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete('gallery', item._id)} className={`${styles.actionBtn} ${styles.danger}`} title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className={styles.noData}>No gallery items found</p>
            )}
          </section>
        )}

        {activeTab === 'socials' && (
          <section className={styles.section}>
            {isLoading ? (
              <div className={styles.loading}>Loading socials...</div>
            ) : socials.length > 0 ? (
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Platform</th>
                      <th>Value</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {socials.map((social) => (
                      <tr key={social._id}>
                        <td>
                          <span className={styles.platformBadge}>{social.platform}</span>
                        </td>
                        <td className={styles.socialValue}>{social.value}</td>
                        <td>
                          <span className={`${styles.badge} ${social.enabled ? styles.statusConfirmed : styles.statusCancelled}`}>
                            {social.enabled ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>{new Date(social.createdAt).toLocaleDateString()}</td>
                        <td>
                          <div className={styles.actions}>
                            <button onClick={() => { setEditingSocialId(social._id); setSocialForm({ platform: social.platform, value: social.value, enabled: social.enabled }); setShowModal(true); setModalType('edit'); }} className={styles.actionBtn} title="Edit">
                              <Edit2 size={16} />
                            </button>
                            <button onClick={() => handleDelete('socials', social._id)} className={`${styles.actionBtn} ${styles.danger}`} title="Delete">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className={styles.noData}>No socials found. Click "Add Social" to create one.</p>
            )}
          </section>
        )}

        {activeTab === 'settings' && (
          <section className={styles.section}>
            <div className={styles.settingsCard}>
              <h3>Admin Settings</h3>
              <p>Contact developer for settings configuration.</p>
              <div className={styles.settingsInfo}>
                <p><strong>Site:</strong> ACE AGRO FARMS</p>
                <p><strong>Location:</strong> Cameroon</p>
                <p><strong>Currency:</strong> FCFA</p>
              </div>
            </div>
          </section>
        )}
      </main>

      {showModal && selectedItem && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>{modalType === 'view' ? 'Details' : 'Edit'}</h3>
              <button onClick={() => setShowModal(false)} className={styles.closeBtn}>
                <X size={20} />
              </button>
            </div>
            <div className={styles.modalContent}>
              {modalType === 'view' && activeTab === 'orders' && (
                <div className={styles.detailGrid}>
                  <div><strong>Order ID:</strong> {selectedItem._id}</div>
                  <div><strong>Customer:</strong> {selectedItem.customerName}</div>
                  <div><strong>Email:</strong> {selectedItem.customerEmail}</div>
                  <div><strong>Phone:</strong> {selectedItem.customerPhone}</div>
                  <div><strong>Total:</strong> {formatPrice(selectedItem.totalAmount)}</div>
                  <div><strong>Status:</strong> {selectedItem.status}</div>
                  <div><strong>Address:</strong> {selectedItem.deliveryAddress || '-'}</div>
                  <div><strong>Date:</strong> {new Date(selectedItem.createdAt).toLocaleString()}</div>
                  <div><strong>Items:</strong></div>
                  <ul className={styles.itemsList}>
                    {selectedItem.items?.map((item: any, idx: number) => (
                      <li key={idx}>
                        {item.name} x {item.quantity} - {formatPrice(item.price)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {modalType === 'view' && activeTab === 'inquiries' && (
                <div className={styles.detailGrid}>
                  <div><strong>Name:</strong> {selectedItem.name}</div>
                  <div><strong>Email:</strong> {selectedItem.email}</div>
                  <div><strong>Phone:</strong> {selectedItem.phone || '-'}</div>
                  <div><strong>Date:</strong> {new Date(selectedItem.createdAt).toLocaleString()}</div>
                  <div><strong>Message:</strong></div>
                  <p className={styles.messageBox}>{selectedItem.message}</p>
                </div>
              )}
              {modalType === 'edit' && (activeTab === 'categories' || editingCategoryId !== null) && (
                <div className={styles.formGroup}>
                  <label>Category Name</label>
                  <input
                    type="text"
                    value={categoryForm.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                      setCategoryForm({ ...categoryForm, name, slug });
                    }}
                    className={styles.input}
                    placeholder="e.g. Organic Produce"
                    required
                  />
                  <label>Slug</label>
                  <input
                    type="text"
                    value={categoryForm.slug}
                    onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
                    className={styles.input}
                    placeholder="e.g. organic-produce"
                    required
                  />
                  <label>Description</label>
                  <textarea
                    value={categoryForm.description}
                    onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                    className={styles.textarea}
                    rows={3}
                    placeholder="Brief description of this category"
                  />
                  <label>Image URL</label>
                  <input
                    type="text"
                    value={categoryForm.image}
                    onChange={(e) => setCategoryForm({ ...categoryForm, image: e.target.value })}
                    className={styles.input}
                    placeholder="https://images.unsplash.com/..."
                    required
                  />
                  <button
                    onClick={async () => {
                      try {
                        const method = editingCategoryId ? 'PUT' : 'POST';
                        const url = editingCategoryId ? `/api/categories?id=${editingCategoryId}` : '/api/categories';
                        const res = await fetch(url, {
                          method,
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(categoryForm),
                        });
                        const data = await res.json();
                        if (res.ok) {
                          showToast(editingCategoryId ? 'Category updated' : 'Category created', 'success');
                          setShowModal(false);
                          setEditingCategoryId(null);
                          setCategoryForm({ name: '', slug: '', description: '', image: '' });
                          fetchData();
                        } else {
                          showToast(data.error || 'Failed', 'error');
                        }
                      } catch {
                        showToast('Failed', 'error');
                      }
                    }}
                    className={styles.addBtn}
                    style={{ marginTop: '1rem' }}
                  >
                    {editingCategoryId ? 'Update' : 'Add'} Category
                  </button>
                </div>
              )}
                  {modalType === 'edit' && (activeTab === 'socials' || editingSocialId !== null) && (
                    <div className={styles.formGroup}>
                      <label>Platform</label>
                      <select
                        value={socialForm.platform}
                        onChange={(e) => setSocialForm({ ...socialForm, platform: e.target.value })}
                        className={styles.select}
                      >
                        <option value="facebook">Facebook</option>
                        <option value="instagram">Instagram</option>
                        <option value="twitter">Twitter</option>
                        <option value="youtube">YouTube</option>
                        <option value="whatsapp">WhatsApp</option>
                        <option value="tiktok">TikTok</option>
                      </select>
                      <label>
                        {socialForm.platform === 'whatsapp' ? 'Phone Number (with country code, e.g. 2376XXXXXXX)' : 'Link / Username / Tag'}
                      </label>
                      <input
                        type="text"
                        value={socialForm.value}
                        onChange={(e) => setSocialForm({ ...socialForm, value: e.target.value })}
                        className={styles.input}
                        placeholder={
                          socialForm.platform === 'facebook' ? 'https://facebook.com/yourpage or username' :
                          socialForm.platform === 'instagram' ? 'https://instagram.com/username or @username' :
                          socialForm.platform === 'twitter' ? 'https://twitter.com/username or @username' :
                          socialForm.platform === 'youtube' ? 'Channel name or @handle' :
                          socialForm.platform === 'whatsapp' ? '2376XXXXXXXX' :
                          socialForm.platform === 'tiktok' ? 'https://tiktok.com/@username or @username' : ''
                        }
                        required
                      />
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                        <input
                          type="checkbox"
                          checked={socialForm.enabled}
                          onChange={(e) => setSocialForm({ ...socialForm, enabled: e.target.checked })}
                        />
                        Show on website
                      </label>
                      <button
                        onClick={async () => {
                          try {
                            const method = editingSocialId ? 'PUT' : 'POST';
                            const url = editingSocialId ? `/api/socials?id=${editingSocialId}` : '/api/socials';
                            const res = await fetch(url, {
                              method,
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify(socialForm),
                            });
                            const data = await res.json();
                            if (res.ok) {
                              showToast(editingSocialId ? 'Social updated' : 'Social created', 'success');
                              setShowModal(false);
                              setEditingSocialId(null);
                              fetchData();
                            } else {
                              showToast(data.error || 'Failed', 'error');
                            }
                          } catch {
                            showToast('Failed', 'error');
                          }
                        }}
                        className={styles.addBtn}
                        style={{ marginTop: '1rem' }}
                      >
                        {editingSocialId ? 'Update' : 'Add'} Social
                      </button>
                    </div>
                  )}
                  {modalType === 'edit' && (activeTab === 'gallery' || editingGalleryId !== null) && (
                <div className={styles.formGroup}>
                  <label>Title</label>
                  <input
                    type="text"
                    value={galleryForm.title}
                    onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                    className={styles.input}
                    required
                  />
                  <label>Description</label>
                  <textarea
                    value={galleryForm.description}
                    onChange={(e) => setGalleryForm({ ...galleryForm, description: e.target.value })}
                    className={styles.textarea}
                    rows={3}
                  />
                  <label>Image URL</label>
                  <input
                    type="text"
                    value={galleryForm.image}
                    onChange={(e) => setGalleryForm({ ...galleryForm, image: e.target.value })}
                    className={styles.input}
                    required
                  />
                  <label>Category</label>
                  <select
                    value={galleryForm.category}
                    onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                    className={styles.select}
                  >
                    <option value="farm">Farm</option>
                    <option value="products">Products</option>
                    <option value="events">Events</option>
                    <option value="team">Team</option>
                    <option value="other">Other</option>
                  </select>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <input
                      type="checkbox"
                      checked={galleryForm.featured}
                      onChange={(e) => setGalleryForm({ ...galleryForm, featured: e.target.checked })}
                    />
                    Featured
                  </label>
                  <button
                    onClick={async () => {
                      try {
                        const method = editingGalleryId ? 'PUT' : 'POST';
                        const url = editingGalleryId ? `/api/gallery?id=${editingGalleryId}` : '/api/gallery';
                        const res = await fetch(url, {
                          method,
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(galleryForm),
                        });
                        if (res.ok) {
                          showToast(editingGalleryId ? 'Updated' : 'Created', 'success');
                          setShowModal(false);
                          setEditingGalleryId(null);
                          fetchData();
                        }
                      } catch {
                        showToast('Failed', 'error');
                      }
                    }}
                    className={styles.addBtn}
                    style={{ marginTop: '1rem' }}
                  >
                    {editingGalleryId ? 'Update' : 'Add'} Gallery Item
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #2D5016',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <p>Loading...</p>
        </div>
      </div>
    }>
      <AdminDashboard />
    </Suspense>
  );
}
