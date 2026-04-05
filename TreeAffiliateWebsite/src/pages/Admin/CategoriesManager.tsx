import React, { useState } from 'react';
import { Edit2, Trash2, FolderTree, FolderPlus, Layers, Package, FileText, Plus } from 'lucide-react';
import styles from './CategoriesManager.module.css';
import modalStyles from './AdminModal.module.css';
import { managedCategories as initialCategories } from '../../data/adminData';
import type { ManagedCategory } from '../../types';
import AdminModal from './AdminModal';

const CategoriesManager: React.FC = () => {
  const [categories, setCategories] = useState<ManagedCategory[]>(initialCategories);
  
  // Left form state
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState<'Sản phẩm' | 'Bài viết'>('Sản phẩm');

  // Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCat, setSelectedCat] = useState<ManagedCategory | null>(null);

  // Edit form state
  const [editName, setEditName] = useState('');
  const [editType, setEditType] = useState<'Sản phẩm' | 'Bài viết'>('Sản phẩm');

  // Data Metrics
  const totalCategories = categories.length;
  const productCategoriesCount = categories.filter(c => c.type === 'Sản phẩm').length;
  const articleCategoriesCount = categories.filter(c => c.type === 'Bài viết').length;
  const maxItems = Math.max(...categories.map(c => c.itemCount), 1); // Avoid division by zero

  const handleAddCategory = () => {
    if (!newName.trim()) return;
    const newCat: ManagedCategory = {
      id: Date.now().toString(),
      name: newName,
      type: newType,
      itemCount: 0
    };
    setCategories([...categories, newCat]);
    setNewName('');
  };

  const openEditModal = (cat: ManagedCategory) => {
    setSelectedCat(cat);
    setEditName(cat.name);
    setEditType(cat.type);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (cat: ManagedCategory) => {
    setSelectedCat(cat);
    setIsDeleteModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (!selectedCat || !editName.trim()) return;
    setCategories(categories.map(c => 
      c.id === selectedCat.id 
        ? { ...c, name: editName, type: editType }
        : c
    ));
    setIsEditModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (!selectedCat) return;
    setCategories(categories.filter(c => c.id !== selectedCat.id));
    setIsDeleteModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Quản lý danh mục</h1>
        <p className={styles.subtitle}>Phân loại và sắp xếp dữ liệu cho toàn hệ thống</p>
      </div>

      {/* Stats Cards Row */}
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Layers size={28} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Tổng danh mục</span>
            <h3 className={styles.statValue}>{totalCategories}</h3>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.blue}`}>
            <Package size={28} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>DM Tiết thị (Sản phẩm)</span>
            <h3 className={styles.statValue}>{productCategoriesCount}</h3>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.orange}`}>
            <FileText size={28} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>DM Bài viết (Mẹo vặt)</span>
            <h3 className={styles.statValue}>{articleCategoriesCount}</h3>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className={styles.mainLayout}>
        {/* Left Sidebar Form: Add New Category */}
        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <div className={styles.formHeaderIcon}>
              <FolderPlus size={20} />
            </div>
            <div>
              <h2 className={styles.formTitle}>Thêm danh mục mới</h2>
              <p className={styles.formSub}>Tạo nhóm phân loại mới cho hệ thống website</p>
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label>Tên danh mục</label>
            <input 
              type="text" 
              className={styles.input} 
              placeholder="Ví dụ: Cây để bàn..." 
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Loại danh mục</label>
            <select 
              className={styles.select}
              value={newType}
              onChange={(e) => setNewType(e.target.value as 'Sản phẩm' | 'Bài viết')}
            >
              <option value="Sản phẩm">📦 Phân loại Cây (Sản phẩm)</option>
              <option value="Bài viết">📝 Phân loại Blog (Bài viết)</option>
            </select>
          </div>

          <button className={styles.saveBtn} onClick={handleAddCategory}>
            <Plus size={18} />
            Tạo danh mục ngay
          </button>
        </div>

        {/* Right Area: Table Details */}
        <div className={styles.tableWrapper}>
          <div className={styles.tableHeader}>
            <h3>Danh sách chi tiết</h3>
          </div>

          {categories.length > 0 ? (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Tên danh mục</th>
                  <th>Phân loại</th>
                  <th>Số lượng (Items)</th>
                  <th style={{ textAlign: 'right' }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(cat => (
                  <tr key={cat.id}>
                    <td>
                      <div className={styles.catName}>
                        <div className={styles.catIcon}>
                          {cat.type === 'Sản phẩm' ? <Package size={16} /> : <FileText size={16} />}
                        </div>
                        {cat.name}
                      </div>
                    </td>
                    <td>
                      <span className={`${styles.badgeType} ${cat.type === 'Sản phẩm' ? styles.product : styles.article}`}>
                        {cat.type}
                      </span>
                    </td>
                    <td>
                      <div className={styles.itemCountCell}>
                        <div className={styles.progressContainer}>
                           <div 
                              className={styles.progressFill} 
                              style={{ width: `${(cat.itemCount / maxItems) * 100}%` }}
                            ></div>
                        </div>
                        <span className={styles.itemCountText}>{cat.itemCount} items</span>
                      </div>
                    </td>
                    <td>
                      <div className={styles.actions} style={{ justifyContent: 'flex-end' }}>
                        <button className={styles.actionBtn} onClick={() => openEditModal(cat)} title="Sửa danh mục">
                          <Edit2 size={16} />
                        </button>
                        <button className={`${styles.actionBtn} ${styles.danger}`} onClick={() => openDeleteModal(cat)} title="Xóa danh mục">
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
              <FolderTree size={64} opacity={0.5} />
              <h3>Chưa có danh mục nào!</h3>
              <p>Hãy sử dụng khung bên trái để tạo danh mục phân loại đầu tiên.</p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <AdminModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        title="Chỉnh sửa danh mục"
        footer={
          <>
            <button className={modalStyles.cancelBtn} onClick={() => setIsEditModalOpen(false)}>Hủy bỏ</button>
            <button className={modalStyles.confirmBtn} onClick={handleSaveEdit}>Lưu thay đổi</button>
          </>
        }
      >
        <div className={modalStyles.formGroup}>
          <label>Tên danh mục mới</label>
          <input 
            type="text" 
            className={modalStyles.input} 
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
        </div>
        <div className={modalStyles.formGroup}>
          <label>Phân loại</label>
          <select 
            className={modalStyles.select}
            value={editType}
            onChange={(e) => setEditType(e.target.value as 'Sản phẩm' | 'Bài viết')}
          >
             <option value="Sản phẩm">📦 Sản phẩm</option>
             <option value="Bài viết">📝 Bài viết</option>
          </select>
        </div>
      </AdminModal>

      {/* Delete Confirmation Modal */}
      <AdminModal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
        title="Xác nhận xóa danh mục"
        footer={
          <>
            <button className={modalStyles.cancelBtn} onClick={() => setIsDeleteModalOpen(false)}>Hủy</button>
            <button className={`${modalStyles.confirmBtn} ${modalStyles.danger}`} onClick={handleConfirmDelete}>Có, xóa nó!</button>
          </>
        }
      >
        <p>Thao tác sẽ xóa danh mục <strong>{selectedCat?.name}</strong>. Lưu ý rằng các bài viết hoặc sản phẩm thuộc danh mục này có thể bị mất liên kết phân loại.</p>
      </AdminModal>

    </div>
  );
};

export default CategoriesManager;
