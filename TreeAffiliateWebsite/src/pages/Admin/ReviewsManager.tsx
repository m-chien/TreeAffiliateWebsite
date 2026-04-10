import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Star, MessageSquare, Clock, CheckCircle, Hash, Image as ImageIcon } from 'lucide-react';
import styles from './ReviewsManager.module.css';
import modalStyles from './AdminModal.module.css';
import { managedReviews as initialReviews, managedPlants } from '../../data/adminData';
import type { ManagedReview } from '../../types';
import AdminModal from './AdminModal';

const ReviewsManager: React.FC = () => {
  const [reviews, setReviews] = useState<ManagedReview[]>(initialReviews);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<ManagedReview | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<ManagedReview>>({});

  // Analytics
  const totalReviews = reviews.length;
  const pendingReviews = reviews.filter(r => r.status === 'Pending').length;
  const approvedReviews = reviews.filter(r => r.status === 'Approved').length;
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
    : 0;

  // Handlers
  const openAddModal = () => {
    setFormData({ 
      id: `R${Date.now().toString().slice(-4)}`, 
      plantId: managedPlants[0]?.id || '',
      plantName: managedPlants[0]?.name || '',
      userId: 'ADMIN',
      userName: 'Admin Moderator',
      rating: 5,
      content: '',
      date: new Date().toISOString().split('T')[0],
      status: 'Approved' 
    });
    setIsAddModalOpen(true);
  };

  const openEditModal = (review: ManagedReview) => {
    setSelectedReview(review);
    setFormData(review);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (review: ManagedReview) => {
    setSelectedReview(review);
    setIsDeleteModalOpen(true);
  };

  const handleSaveAdd = () => {
    if (!formData.content || !formData.userName) return;
    
    // Find plant name if not set
    const plant = managedPlants.find(p => p.id === formData.plantId);
    const newReview = {
      ...formData,
      plantName: plant ? plant.name : 'Unknown Plant',
    } as ManagedReview;

    setReviews([newReview, ...reviews]);
    setIsAddModalOpen(false);
  };

  const handleSaveEdit = () => {
    if (!selectedReview || !formData.content) return;
    
    const plant = managedPlants.find(p => p.id === formData.plantId);
    const updatedReview = {
      ...formData,
      plantName: plant ? plant.name : 'Unknown Plant',
    } as ManagedReview;

    setReviews(reviews.map(r => r.id === selectedReview.id ? updatedReview : r));
    setIsEditModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (!selectedReview) return;
    setReviews(reviews.filter(r => r.id !== selectedReview.id));
    setIsDeleteModalOpen(false);
  };

  const handleApprove = (id: string) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, status: 'Approved' } : r));
  };

  // Render Form
  const renderForm = () => (
    <>
      <div className={modalStyles.formGroup}>
        <label>Chọn cây cảnh</label>
        <select 
          className={modalStyles.select}
          value={formData.plantId || ''}
          onChange={(e) => setFormData({...formData, plantId: e.target.value})}
        >
          {managedPlants.map(plant => (
            <option key={plant.id} value={plant.id}>{plant.name}</option>
          ))}
        </select>
      </div>
      
      <div style={{ display: 'flex', gap: '20px' }}>
        <div className={modalStyles.formGroup} style={{ flex: 1 }}>
          <label>Tên người đánh giá</label>
          <input 
            type="text" 
            className={modalStyles.input} 
            placeholder="Ví dụ: Nguyễn Văn A..."
            value={formData.userName || ''}
            onChange={(e) => setFormData({...formData, userName: e.target.value})}
          />
        </div>
        <div className={modalStyles.formGroup} style={{ flex: 1 }}>
          <label>Điểm đánh giá (1-5)</label>
          <select 
            className={modalStyles.select}
            value={formData.rating || 5}
            onChange={(e) => setFormData({...formData, rating: Number(e.target.value)})}
          >
            {[5, 4, 3, 2, 1].map(num => (
              <option key={num} value={num}>{num} Sao</option>
            ))}
          </select>
        </div>
      </div>

      <div className={modalStyles.formGroup}>
        <label>Nội dung đánh giá</label>
        <textarea 
          className={modalStyles.input} 
          style={{ minHeight: '100px', paddingTop: '10px' }}
          placeholder="Viết cảm nhận của khách hàng..."
          value={formData.content || ''}
          onChange={(e) => setFormData({...formData, content: e.target.value})}
        />
      </div>

      <div className={modalStyles.formGroup}>
        <label>Link ảnh đính kèm (không bắt buộc)</label>
        <input 
          type="text" 
          className={modalStyles.input} 
          placeholder="https://..."
          value={formData.imageUrl || ''}
          onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
        />
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        <div className={modalStyles.formGroup} style={{ flex: 1 }}>
          <label>Ngày đăng</label>
          <input 
            type="date" 
            className={modalStyles.input} 
            value={formData.date || ''}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
          />
        </div>
        <div className={modalStyles.formGroup} style={{ flex: 1 }}>
          <label>Trạng thái</label>
          <select 
            className={modalStyles.select}
            value={formData.status || ''}
            onChange={(e) => setFormData({...formData, status: e.target.value as 'Approved' | 'Pending'})}
          >
            <option value="Approved">Hiển thị (Approved)</option>
            <option value="Pending">Chờ duyệt (Pending)</option>
          </select>
        </div>
      </div>
    </>
  );

  const filteredReviews = reviews.filter(r => {
    const matchSearch = r.userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        r.plantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        r.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'all' || r.status.toLowerCase() === statusFilter.toLowerCase();
    return matchSearch && matchStatus;
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Quản lý Đánh giá khách hàng</h1>
        <p className={styles.subtitle}>Ghi nhận và phản hồi các đánh giá từ cộng đồng yêu cây</p>
      </div>

      {/* Stats Board */}
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.iconMessage}`}>
            <MessageSquare size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Tổng đánh giá</span>
            <span className={styles.statValue}>{totalReviews}</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.iconStar}`}>
            <Star size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Điểm trung bình</span>
            <span className={styles.statValue}>{averageRating} / 5</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.iconPending}`}>
            <Clock size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Chờ phê duyệt</span>
            <span className={styles.statValue}>{pendingReviews}</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.iconApproved}`}>
            <CheckCircle size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Đã hiển thị</span>
            <span className={styles.statValue}>{approvedReviews}</span>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className={styles.toolbarCard}>
        <div className={styles.filterGroup}>
          <div className={styles.searchBox}>
            <Search size={18} color="#666" />
            <input 
              type="text" 
              placeholder="Tìm theo tên khách, tên cây hoặc nội dung..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className={styles.filterSelect}
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="approved">Đã phê duyệt</option>
            <option value="pending">Chờ xử lý</option>
          </select>
        </div>
        <button className={styles.addBtn} onClick={openAddModal}>
          <Plus size={18} />
          Đăng đánh giá mới
        </button>
      </div>

      {/* Table */}
      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <h3>Danh sách Đánh giá</h3>
        </div>
        {filteredReviews.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Cây cảnh & Người viết</th>
                <th>Đánh giá & Nội dung</th>
                <th>Ngày đăng</th>
                <th>Trạng thái</th>
                <th style={{ textAlign: 'right' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredReviews.map(review => (
                <tr key={review.id}>
                  <td>
                    <div className={styles.reviewInfo}>
                      <div className={styles.thumbnailWrapper}>
                        {review.imageUrl ? (
                          <img src={review.imageUrl} alt="Review attachment" className={styles.thumbnail} />
                        ) : (
                          <div className={styles.thumbnail} style={{backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <ImageIcon size={20} color="#ccc" />
                          </div>
                        )}
                      </div>
                      <div className={styles.reviewDetails}>
                        <span className={styles.plantName}>{review.plantName}</span>
                        <span className={styles.userName}>{review.userName}</span>
                        <span className={styles.dateTag}><Hash size={10} style={{display: 'inline', marginRight: 2}}/> {review.id}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={styles.ratingBox}>
                      <Star size={14} fill="currentColor" />
                      <span className={styles.ratingText}>{review.rating}</span>
                    </div>
                    <p className={styles.contentPreview} title={review.content}>
                      {review.content}
                    </p>
                  </td>
                  <td>
                    <span className={styles.dateTag}>{review.date}</span>
                  </td>
                  <td>
                    <span className={review.status === 'Approved' ? styles.badgeApproved : styles.badgePending}>
                      {review.status === 'Approved' ? 'Đã duyệt' : 'Chờ duyệt'}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actions} style={{ justifyContent: 'flex-end' }}>
                      {review.status === 'Pending' && (
                        <button 
                          className={styles.actionBtn} 
                          style={{ color: '#4caf50', borderColor: '#c8e6c9' }}
                          title="Phê duyệt"
                          onClick={() => handleApprove(review.id)}
                        >
                          <CheckCircle size={16} />
                        </button>
                      )}
                      <button className={styles.actionBtn} title="Sửa" onClick={() => openEditModal(review)}>
                        <Edit2 size={16} />
                      </button>
                      <button className={`${styles.actionBtn} ${styles.danger}`} title="Xóa" onClick={() => openDeleteModal(review)}>
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
            <MessageSquare size={64} opacity={0.3} />
            <h3>Không tìm thấy đánh giá nào</h3>
            <p>Vui lòng điều chỉnh bộ lọc hoặc thêm đánh giá mới bằng tay.</p>
          </div>
        )}
      </div>

      {/* Add Modal */}
      <AdminModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        title="Đăng đánh giá mới"
        footer={
          <>
            <button className={modalStyles.cancelBtn} onClick={() => setIsAddModalOpen(false)}>Hủy</button>
            <button className={modalStyles.confirmBtn} onClick={handleSaveAdd}>Đăng Review</button>
          </>
        }
      >
        {renderForm()}
      </AdminModal>

      {/* Edit Modal */}
      <AdminModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        title="Chỉnh sửa đánh giá"
        footer={
          <>
            <button className={modalStyles.cancelBtn} onClick={() => setIsEditModalOpen(false)}>Hủy</button>
            <button className={modalStyles.confirmBtn} onClick={handleSaveEdit}>Lưu thay đổi</button>
          </>
        }
      >
        {renderForm()}
      </AdminModal>

      {/* Delete Modal */}
      <AdminModal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
        title="Xóa đánh giá"
        footer={
          <>
            <button className={modalStyles.cancelBtn} onClick={() => setIsDeleteModalOpen(false)}>Quay lại</button>
            <button className={`${modalStyles.confirmBtn} ${modalStyles.danger}`} onClick={handleConfirmDelete}>Xác nhận Xóa</button>
          </>
        }
      >
        <p>Bạn có chắc chắn muốn xóa vĩnh viễn đánh giá của <strong>{selectedReview?.userName}</strong>? 
        Hành động này không thể hoàn tác.</p>
      </AdminModal>
    </div>
  );
};

export default ReviewsManager;
