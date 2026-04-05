import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, FileText, Eye, TrendingUp, Filter, BarChart, PenTool } from 'lucide-react';
import styles from './ArticlesManager.module.css';
import modalStyles from './AdminModal.module.css';
import { managedArticles as initialArticles } from '../../data/adminData';
import type { ManagedArticle } from '../../types';
import AdminModal from './AdminModal';

const ArticlesManager: React.FC = () => {
  const [articles, setArticles] = useState<ManagedArticle[]>(initialArticles);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<ManagedArticle | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<ManagedArticle>>({});

  // Render Analytics Data
  const totalArticles = articles.length;
  const publishedCount = articles.filter(a => a.status === 'Published').length;
  const totalViews = articles.reduce((sum, a) => sum + a.views, 0);
  const totalClicks = articles.reduce((sum, a) => sum + a.affiliateClicks, 0);

  // Max values for visual bars
  const maxViews = Math.max(...articles.map(a => a.views), 1);
  const maxClicks = Math.max(...articles.map(a => a.affiliateClicks), 1);

  // Helper to generate initials from author string
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  // Handlers
  const openAddModal = () => {
    setFormData({ 
      id: Date.now().toString(), 
      title: '', 
      author: '', 
      date: new Date().toISOString().split('T')[0], 
      views: 0, 
      affiliateClicks: 0, 
      status: 'Draft' 
    });
    setIsAddModalOpen(true);
  };

  const openEditModal = (article: ManagedArticle) => {
    setSelectedArticle(article);
    setFormData(article);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (article: ManagedArticle) => {
    setSelectedArticle(article);
    setIsDeleteModalOpen(true);
  };

  const handleSaveAdd = () => {
    if (!formData.title) return;
    setArticles([formData as ManagedArticle, ...articles]);
    setIsAddModalOpen(false);
  };

  const handleSaveEdit = () => {
    if (!selectedArticle) return;
    setArticles(articles.map(a => a.id === selectedArticle.id ? (formData as ManagedArticle) : a));
    setIsEditModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (!selectedArticle) return;
    setArticles(articles.filter(a => a.id !== selectedArticle.id));
    setIsDeleteModalOpen(false);
  };

  // Render Form
  const renderForm = () => (
    <>
      <div className={modalStyles.formGroup}>
        <label>Tiêu đề bài viết</label>
        <input 
          type="text" 
          className={modalStyles.input} 
          placeholder="Nhập tiêu đề..."
          value={formData.title || ''}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
        />
      </div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div className={modalStyles.formGroup} style={{ flex: 1 }}>
          <label>Tác giả / Bút danh</label>
          <input 
            type="text" 
            className={modalStyles.input} 
            value={formData.author || ''}
            onChange={(e) => setFormData({...formData, author: e.target.value})}
          />
        </div>
        <div className={modalStyles.formGroup} style={{ flex: 1 }}>
          <label>Ngày đăng dự kiến</label>
          <input 
            type="date" 
            className={modalStyles.input} 
            value={formData.date || ''}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
          />
        </div>
      </div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div className={modalStyles.formGroup} style={{ flex: 1 }}>
          <label>Tổng Lượt xem thực tế</label>
          <input 
            type="number" 
            className={modalStyles.input} 
            value={formData.views || ''}
            onChange={(e) => setFormData({...formData, views: Number(e.target.value)})}
          />
        </div>
        <div className={modalStyles.formGroup} style={{ flex: 1 }}>
          <label>Click link liên kết</label>
           <input 
            type="number" 
            className={modalStyles.input} 
            value={formData.affiliateClicks || ''}
            onChange={(e) => setFormData({...formData, affiliateClicks: Number(e.target.value)})}
          />
        </div>
      </div>
      <div className={modalStyles.formGroup}>
        <label>Trạng thái hiển thị</label>
        <select 
          className={modalStyles.select}
          value={formData.status || ''}
          onChange={(e) => setFormData({...formData, status: e.target.value as 'Published' | 'Draft'})}
        >
          <option value="Published">✅ Đã xuất bản công khai</option>
          <option value="Draft">📝 Lưu dưới dạng Bản nháp</option>
        </select>
      </div>
    </>
  );

  const filteredArticles = articles.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = statusFilter === 'all' || a.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Quản trị nội dung & Bài viết</h1>
        <p className={styles.subtitle}>Kiểm soát lưu lượng, viết bài SEO chia sẻ kiến thức cây cảnh nhằm thu hút traffic</p>
      </div>

      {/* Top 4 Stats Row */}
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.iconPurple}`}>
            <FileText size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Tổng bài viết</span>
            <span className={styles.statValue}>{totalArticles}</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.iconGreen}`}>
            <PenTool size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Đã xuất bản</span>
            <span className={styles.statValue}>{publishedCount}</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.iconBlue}`}>
            <Eye size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Tổng lượt xem</span>
            <span className={styles.statValue}>{totalViews.toLocaleString()}</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.iconOrange}`}>
            <TrendingUp size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Referral Clicks</span>
            <span className={styles.statValue}>{totalClicks.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Main Toolbar */}
      <div className={styles.toolbarCard}>
        <div className={styles.filterGroup}>
          <div className={styles.searchBox}>
            <Search size={18} color="#666" />
            <input 
              type="text" 
              placeholder="Tìm theo tiêu đề bài viết..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #eaebec', padding: '0 8px', borderRadius: '8px', backgroundColor: '#f8f7f2' }}>
            <Filter size={16} color="#666" />
            <select style={{ border: 'none', backgroundColor: 'transparent' }} className={styles.filterSelect} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">Tất cả bài viết</option>
              <option value="published">Đã xuất bản (Published)</option>
              <option value="draft">Bản nháp (Draft)</option>
            </select>
          </div>
        </div>
        <button className={styles.addBtn} onClick={openAddModal}>
          <Plus size={18} />
          Viết bài mới
        </button>
      </div>

      {/* Articles Table Card */}
      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <h3>Danh sách bài viết chi tiết</h3>
        </div>
        {filteredArticles.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Tiêu đề bài viết</th>
                <th>Author</th>
                <th>Lượt xem trang</th>
                <th>Affiliate Clicks</th>
                <th>Trạng thái</th>
                <th style={{ textAlign: 'right' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredArticles.map(article => (
                <tr key={article.id}>
                  <td>
                    <div className={styles.articleTitleBox}>
                      <span className={styles.articleTitle}>{article.title}</span>
                      <span className={styles.articleDate}>Upload date: {article.date}</span>
                    </div>
                  </td>
                  <td>
                    <div className={styles.authorBox}>
                      <div className={styles.authorAvatar}>
                         {getInitials(article.author)}
                      </div>
                      <span style={{fontWeight: 500}}>{article.author}</span>
                    </div>
                  </td>
                  <td>
                     <div style={{ width: '80%' }}>
                        <div className={styles.analyticsBadge}>
                          <Eye size={14} color="#666"/>
                          {article.views.toLocaleString()}
                        </div>
                        <div className={styles.analyticsBar}>
                          <div className={styles.analyticsBarFill} style={{ width: `${(article.views / maxViews) * 100}%` }}></div>
                        </div>
                     </div>
                  </td>
                  <td>
                     <div style={{ width: '80%' }}>
                        <div className={`${styles.analyticsBadge} ${styles.orange}`}>
                          <BarChart size={14} color="#c86c42"/>
                          {article.affiliateClicks.toLocaleString()}
                        </div>
                        <div className={styles.analyticsBar}>
                          <div className={`${styles.analyticsBarFill} ${styles.orange}`} style={{ width: `${(article.affiliateClicks / maxClicks) * 100}%` }}></div>
                        </div>
                     </div>
                  </td>
                  <td>
                    <span className={article.status === 'Published' ? styles.badgePub : styles.badgeDraft}>
                      {article.status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actions} style={{ justifyContent: 'flex-end' }}>
                      <button className={styles.actionBtn} title="Sửa chi tiết" onClick={() => openEditModal(article)}>
                        <Edit2 size={16} />
                      </button>
                      <button className={styles.actionBtn} title="Xóa bỏ" style={{ color: '#d32f2f' }} onClick={() => openDeleteModal(article)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className={styles.emptyState}>
            <FileText size={64} opacity={0.5} />
            <h3>Không tìm thấy dữ liệu!</h3>
            <p>Vui lòng thử bộ lọc khác hoặc nhấn "Viết bài mới" để chèn nội dung.</p>
          </div>
        )}
      </div>

      {/* Add Modal */}
      <AdminModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        title="Thêm bài viết mới"
        footer={
          <>
            <button className={modalStyles.cancelBtn} onClick={() => setIsAddModalOpen(false)}>Hủy bỏ</button>
            <button className={modalStyles.confirmBtn} onClick={handleSaveAdd}>Lưu và Xuất bản</button>
          </>
        }
      >
        {renderForm()}
      </AdminModal>

      {/* Edit Modal */}
      <AdminModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        title="Chỉnh sửa bài viết"
        footer={
          <>
            <button className={modalStyles.cancelBtn} onClick={() => setIsEditModalOpen(false)}>Hủy</button>
            <button className={modalStyles.confirmBtn} onClick={handleSaveEdit}>Cập nhật lại</button>
          </>
        }
      >
        {renderForm()}
      </AdminModal>

      {/* Delete Modal */}
      <AdminModal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
        title="Xóa bài viết hiển thị"
        footer={
          <>
            <button className={modalStyles.cancelBtn} onClick={() => setIsDeleteModalOpen(false)}>Không</button>
            <button className={`${modalStyles.confirmBtn} ${modalStyles.danger}`} onClick={handleConfirmDelete}>Có, xóa nó!</button>
          </>
        }
      >
        <p>Thao tác sẽ gỡ toàn bộ nội dung của bài <strong>{selectedArticle?.title}</strong> khỏi giao diện Front. Traffic SEO từ Google có thể sẽ mất hoàn toàn.</p>
      </AdminModal>

    </div>
  );
};

export default ArticlesManager;
