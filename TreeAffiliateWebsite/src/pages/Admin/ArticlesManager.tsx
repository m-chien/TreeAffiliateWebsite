import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Plus, Edit2, Trash2, FileText, Eye, TrendingUp, Filter, BarChart, PenTool, Edit3 } from 'lucide-react';
import styles from './ArticlesManager.module.css';
import modalStyles from './AdminModal.module.css';
import type { ManagedArticle } from '../../types';
import AdminModal from './AdminModal';
import ArticleContentEditor from './ArticleContentEditor';

const ArticlesManager: React.FC = () => {
  const [articles, setArticles] = useState<ManagedArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<ManagedArticle | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<ManagedArticle & { categoryId?: number }>>({});

  // --------------------------------------------------------
  // HÀM TẢI DỮ LIỆU TỪ BACKEND
  // --------------------------------------------------------
  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get('http://localhost:8080/api/v1/bai-viet/admin?page=0&size=50');
      const data = res.data.result.content || [];

      const formattedData: ManagedArticle[] = data.map((item: any) => ({
        id: item.id.toString(),
        title: item.tieuDe || 'Chưa có tiêu đề',
        author: item.tenTacGia || 'Admin',
        date: item.ngayTao ? new Date(item.ngayTao).toISOString().split('T')[0] : 'N/A',
        views: item.luotXem || 0,
        affiliateClicks: item.affiliateClicks || 0,
        status: item.trangThai === 'DRAFT' ? 'Draft' : 'Published'
      }));

      setArticles(formattedData);
    } catch (error) {
      console.error("Lỗi khi tải danh sách bài viết từ Backend:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  // Render Analytics Data
  const totalArticles = articles.length;
  const publishedCount = articles.filter(a => a.status === 'Published').length;
  const totalViews = articles.reduce((sum, a) => sum + a.views, 0);
  const totalClicks = articles.reduce((sum, a) => sum + a.affiliateClicks, 0);

  const maxViews = Math.max(...articles.map(a => a.views), 1);
  const maxClicks = Math.max(...articles.map(a => a.affiliateClicks), 1);

  const getInitials = (name: string) => {
    if (!name) return 'AD';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  // --------------------------------------------------------
  // XỬ LÝ SỰ KIỆN MỞ MODAL
  // --------------------------------------------------------
  const openAddModal = () => {
    setFormData({ 
      title: '', 
      author: '', 
      date: new Date().toISOString().split('T')[0], 
      views: 0, 
      affiliateClicks: 0, 
      status: 'Published',
      categoryId: 1 // Mặc định chọn danh mục đầu tiên
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

  const openContentEditor = async (article: ManagedArticle) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/v1/bai-viet/chi-tiet/${article.id}`);
      const fullData = res.data.result;

      setSelectedArticle({
        ...article,
        content: fullData.noiDung || '' 
      } as any);
      
      setIsEditingContent(true);
    } catch (error) {
      console.error("Lỗi khi tải nội dung bài viết:", error);
      alert("Không thể tải nội dung chi tiết của bài viết này.");
    }
  };

  const handleSaveContent = async (updatedArticle: any) => {
    try {
      const payload = {
        noiDung: updatedArticle.content
      };

      await axios.put(`http://localhost:8080/api/v1/bai-viet/${updatedArticle.id}`, payload);
      
      alert("Đã lưu nội dung bài viết thành công!");
      setIsEditingContent(false);
      fetchArticles();
    } catch (error) {
      console.error("Lỗi khi lưu nội dung:", error);
      alert("Có lỗi xảy ra khi lưu nội dung.");
    }
  };

  // --------------------------------------------------------
  // KẾT NỐI API: THÊM, SỬA TRẠNG THÁI, XÓA
  // --------------------------------------------------------
  const handleSaveAdd = async () => {
    if (!formData.title) {
      alert("Vui lòng nhập tiêu đề bài viết!");
      return;
    }
    try {
      // Dữ liệu map đúng tên biến với CreateBaiVietDTO bên Spring Boot
      const payload = {
        tieuDe: formData.title,
        trangThai: formData.status === 'Draft' ? 'DRAFT' : 'PUBLISHED',
        userId: 1, // Khóa cứng admin
        danhMucNoiDungId: formData.categoryId || 1 // Khớp tên biến danhMucNoiDungId
      };

      await axios.post('http://localhost:8080/api/v1/bai-viet', payload);
      alert("Thêm bài viết mới thành công!");
      setIsAddModalOpen(false);
      fetchArticles();
    } catch (error) {
      console.error("Lỗi khi thêm bài viết:", error);
      alert("Đã xảy ra lỗi khi thêm bài viết.");
    }
  };

  const handleSaveEdit = async () => {
    if (!selectedArticle) return;
    try {
      const payload = {
        tieuDe: formData.title,
        trangThai: formData.status === 'Draft' ? 'DRAFT' : 'PUBLISHED',
        danhMucNoiDungId: formData.categoryId
      };

      await axios.put(`http://localhost:8080/api/v1/bai-viet/${selectedArticle.id}`, payload);
      alert("Cập nhật trạng thái/tiêu đề thành công!");
      setIsEditModalOpen(false);
      fetchArticles();
    } catch (error) {
      console.error("Lỗi khi cập nhật bài viết:", error);
      alert("Đã xảy ra lỗi khi cập nhật bài viết.");
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedArticle) return;
    try {
      const res = await axios.delete(`http://localhost:8080/api/v1/bai-viet/${selectedArticle.id}`);
      
      // Bắt buộc phải kiểm tra code bên trong JSON trả về
      if (res.data && res.data.code === 200) {
        alert("Đã xóa bài viết thành công!");
        setIsDeleteModalOpen(false);
        fetchArticles();
      } else {
        // Nếu Backend báo lỗi (bị dính khóa ngoại)
        alert("Không thể xóa: " + (res.data.message || "Bị vướng dữ liệu liên kết ở bảng khác!"));
      }
    } catch (error: any) {
      console.error("Lỗi khi xóa bài viết:", error);
      alert("Đã xảy ra lỗi server: " + (error.response?.data?.message || "Vui lòng xem console."));
    }
  };

  // --------------------------------------------------------
  // RENDER GIAO DIỆN FORM
  // --------------------------------------------------------
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

      {/* DROPDOWN CHỌN DANH MỤC */}
      <div className={modalStyles.formGroup}>
        <label>Thuộc danh mục</label>
        <select 
          className={modalStyles.select}
          value={formData.categoryId || 1}
          onChange={(e) => setFormData({...formData, categoryId: Number(e.target.value)})}
          //disabled={!!selectedArticle} // Khóa danh mục khi đang trong chế độ Edit
        >
          <option value={1}>Hướng dẫn chăm sóc</option>
          <option value={2}>Mẹo phong thủy</option>
          <option value={3}>Top List</option>
          <option value={4}>Xu hướng 2026</option>
          <option value={5}>Cẩm nang đất trồng</option>
          <option value={6}>Phân bón & Dinh dưỡng</option>
          <option value={7}>Trang trí nội thất</option>
          <option value={8}>Cây mọng nước</option>
          <option value={9}>Câu chuyện vườn</option>
          <option value={10}>Sự kiện</option>
        </select>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        <div className={modalStyles.formGroup} style={{ flex: 1 }}>
          <label>Tác giả / Bút danh</label>
          <input 
            type="text" 
            className={modalStyles.input} 
            value={formData.author || 'Admin'}
            disabled
          />
        </div>
        <div className={modalStyles.formGroup} style={{ flex: 1 }}>
          <label>Ngày đăng dự kiến</label>
          <input 
            type="date" 
            className={modalStyles.input} 
            value={formData.date || ''}
            disabled
          />
        </div>
      </div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div className={modalStyles.formGroup} style={{ flex: 1 }}>
          <label>Tổng Lượt xem thực tế</label>
          <input 
            type="number" 
            className={modalStyles.input} 
            value={formData.views || 0}
            disabled 
          />
        </div>
        <div className={modalStyles.formGroup} style={{ flex: 1 }}>
          <label>Click link liên kết</label>
           <input 
            type="number" 
            className={modalStyles.input} 
            value={formData.affiliateClicks || 0}
            disabled 
          />
        </div>
      </div>
      <div className={modalStyles.formGroup}>
        <label>Trạng thái hiển thị</label>
        <select 
          className={modalStyles.select}
          value={formData.status || 'Published'}
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
            <span className={styles.statValue}>{isLoading ? '...' : totalArticles}</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.iconGreen}`}>
            <PenTool size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Đã xuất bản</span>
            <span className={styles.statValue}>{isLoading ? '...' : publishedCount}</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.iconBlue}`}>
            <Eye size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Tổng lượt xem</span>
            <span className={styles.statValue}>{isLoading ? '...' : totalViews.toLocaleString()}</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.iconOrange}`}>
            <TrendingUp size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Referral Clicks</span>
            <span className={styles.statValue}>{isLoading ? '...' : totalClicks.toLocaleString()}</span>
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
            <select style={{ border: 'none', backgroundColor: 'transparent', outline: 'none' }} className={styles.filterSelect} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
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
        {isLoading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>Đang tải dữ liệu từ server...</div>
        ) : filteredArticles.length > 0 ? (
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
                      <button className={styles.actionBtn} title="Viết nội dung" style={{ color: '#2e8b57' }} onClick={() => openContentEditor(article)}>
                        <Edit3 size={16} />
                      </button>
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

      {isEditingContent && selectedArticle && (
        <ArticleContentEditor 
          article={selectedArticle}
          onClose={() => setIsEditingContent(false)}
          onSave={handleSaveContent} 
        />
      )}

    </div>
  );
};

export default ArticlesManager;