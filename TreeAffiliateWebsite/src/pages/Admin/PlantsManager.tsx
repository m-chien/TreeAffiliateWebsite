import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Leaf, ShoppingBag, Hash, Power, Hexagon } from 'lucide-react';
import styles from './PlantsManager.module.css';
import modalStyles from './AdminModal.module.css';
import { managedPlants as initialPlants } from '../../data/adminData';
import type { ManagedPlant } from '../../types';
import AdminModal from './AdminModal';

const PlantsManager: React.FC = () => {
  const [plants, setPlants] = useState<ManagedPlant[]>(initialPlants);
  const [searchTerm, setSearchTerm] = useState('');
  const [platformFilter, setPlatformFilter] = useState('all');

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState<ManagedPlant | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<ManagedPlant>>({});

  // Analytics
  const totalPlants = plants.length;
  const activePlants = plants.filter(p => p.status === 'Active').length;
  const shopeePlants = plants.filter(p => p.platform === 'Shopee').length;
  const tiktokPlants = plants.filter(p => p.platform === 'TikTok').length;
  const maxCommission = Math.max(...plants.map(p => p.commission), 5); // 5 is minimum ceiling

  // Handlers
  const openAddModal = () => {
    setFormData({ 
      id: Date.now().toString(), 
      imageUrl: '', 
      name: '', 
      category: 'Cây trong nhà', 
      platform: 'Shopee', 
      commission: 10, 
      status: 'Active' 
    });
    setIsAddModalOpen(true);
  };

  const openEditModal = (plant: ManagedPlant) => {
    setSelectedPlant(plant);
    setFormData(plant);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (plant: ManagedPlant) => {
    setSelectedPlant(plant);
    setIsDeleteModalOpen(true);
  };

  const handleSaveAdd = () => {
    if (!formData.name) return;
    setPlants([formData as ManagedPlant, ...plants]);
    setIsAddModalOpen(false);
  };

  const handleSaveEdit = () => {
    if (!selectedPlant) return;
    setPlants(plants.map(p => p.id === selectedPlant.id ? (formData as ManagedPlant) : p));
    setIsEditModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (!selectedPlant) return;
    setPlants(plants.filter(p => p.id !== selectedPlant.id));
    setIsDeleteModalOpen(false);
  };

  // Render Form (Shared between Add & Edit)
  const renderForm = () => (
    <>
      <div className={modalStyles.formGroup}>
        <label>Tên sản phẩm cây</label>
        <input 
          type="text" 
          className={modalStyles.input} 
          placeholder="Ví dụ: Monstera Deliciosa..."
          value={formData.name || ''}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
      </div>
      <div className={modalStyles.formGroup}>
        <label>Đường dẫn hình ảnh Thumbnail</label>
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
          <label>Nhóm phân loại</label>
          <select 
            className={modalStyles.select}
            value={formData.category || ''}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
          >
            <option value="Cây trong nhà">Cây trong nhà</option>
            <option value="Cây ngoài trời">Cây ngoài trời</option>
            <option value="Cây văn phòng">Cây văn phòng</option>
            <option value="Cây phong thủy">Cây phong thủy</option>
            <option value="Cây leo">Cây leo</option>
          </select>
        </div>
        <div className={modalStyles.formGroup} style={{ flex: 1 }}>
          <label>Nền tảng Affiliate</label>
          <select 
            className={modalStyles.select}
            value={formData.platform || ''}
            onChange={(e) => setFormData({...formData, platform: e.target.value as 'Shopee' | 'TikTok'})}
          >
            <option value="Shopee">🛍️ Shopee Shop</option>
            <option value="TikTok">📹 TikTok Shop</option>
          </select>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div className={modalStyles.formGroup} style={{ flex: 1 }}>
          <label>Khai báo Hoa hồng (%)</label>
          <input 
            type="number" 
            className={modalStyles.input} 
            value={formData.commission || ''}
            onChange={(e) => setFormData({...formData, commission: Number(e.target.value)})}
          />
        </div>
        <div className={modalStyles.formGroup} style={{ flex: 1 }}>
          <label>Trạng thái kinh doanh</label>
          <select 
            className={modalStyles.select}
            value={formData.status || ''}
            onChange={(e) => setFormData({...formData, status: e.target.value as 'Active' | 'Inactive'})}
          >
            <option value="Active">🟢 Đang Marketing (Active)</option>
            <option value="Inactive">⚫ Tạm dừng (Inactive)</option>
          </select>
        </div>
      </div>
    </>
  );

  const filteredPlants = plants.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchPlatform = platformFilter === 'all' || p.platform.toLowerCase() === platformFilter.toLowerCase();
    return matchSearch && matchPlatform;
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Quản lý Kho cây (Affiliate)</h1>
        <p className={styles.subtitle}>Kiểm soát và tích hợp các link sản phẩm Shopee, TikTok để thu hoa hồng</p>
      </div>

      {/* Stats Board */}
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.iconGreen}`}>
            <Leaf size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Tổng số Cây</span>
            <span className={styles.statValue}>{totalPlants}</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.iconOrange}`}>
            <ShoppingBag size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Liên kết Shopee</span>
            <span className={styles.statValue}>{shopeePlants}</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.iconDark}`}>
            <Hexagon size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Liên kết TikTok</span>
            <span className={styles.statValue}>{tiktokPlants}</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.iconBlue}`}>
            <Power size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Đang Active</span>
            <span className={styles.statValue}>{activePlants}</span>
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
              placeholder="Tra cứu tên cây, loài cây..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className={styles.filterSelect}
             value={platformFilter} 
             onChange={(e) => setPlatformFilter(e.target.value)}
          >
             <option value="all">Sàn Thương mại: Tất cả</option>
             <option value="shopee">Shopee</option>
             <option value="tiktok">TikTok Shop</option>
          </select>
        </div>
        <button className={styles.addBtn} onClick={openAddModal}>
          <Plus size={18} />
          Liên kết Cây mới
        </button>
      </div>

      {/* Products Table Board */}
      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <h3>Kho sản phẩm Quảng bá</h3>
        </div>
        {filteredPlants.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Hình ảnh & Phân loại</th>
                <th>Group danh mục</th>
                <th>Sàn hiển thị</th>
                <th>Mức trả hoa hồng</th>
                <th>Tình trạng</th>
                <th style={{ textAlign: 'right' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlants.map(plant => (
                <tr key={plant.id}>
                  <td>
                    <div className={styles.plantInfo}>
                      <div className={styles.thumbnailWrapper}>
                        {plant.imageUrl ? (
                          <img src={plant.imageUrl} alt={plant.name} className={styles.thumbnail} />
                        ) : (
                          <div className={styles.thumbnail} style={{backgroundColor: '#eaebec', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                             <Leaf size={24} color="#aaa" />
                          </div>
                        )}
                      </div>
                      <div className={styles.plantDetails}>
                        <span className={styles.plantName}>{plant.name}</span>
                        <span className={styles.categoryId}><Hash size={12}/> ID-{plant.id.substring(0, 4)}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={styles.tagCategory}># {plant.category}</span>
                  </td>
                  <td>
                    <div className={`${styles.platformBadge} ${plant.platform === 'Shopee' ? styles.shopee : styles.tiktok}`}>
                      {plant.platform === 'Shopee' ? <ShoppingBag size={14}/> : <Hexagon size={14} fill="currentColor"/>}
                      {plant.platform}
                    </div>
                  </td>
                  <td>
                     <div className={styles.commissionBox}>
                        <span className={styles.commissionText}>{plant.commission}%</span>
                        <div className={styles.komBar}>
                           <div className={styles.komBarFill} style={{ width: `${(plant.commission / maxCommission) * 100}%` }}></div>
                        </div>
                     </div>
                  </td>
                  <td>
                    <span className={plant.status === 'Active' ? styles.badgeActive : styles.badgeInactive}>
                      {plant.status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actions} style={{ justifyContent: 'flex-end' }}>
                      <button className={styles.actionBtn} title="Chỉnh sửa link" onClick={() => openEditModal(plant)}>
                        <Edit2 size={16} />
                      </button>
                      <button className={`${styles.actionBtn} ${styles.danger}`} title="Ngắt liên kết" onClick={() => openDeleteModal(plant)}>
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
            <ShoppingBag size={64} opacity={0.5} />
            <h3>Không có dữ liệu</h3>
            <p>Thử tìm kiếm với điều kiện khác hoặc liên kết sản phẩm mới nhé.</p>
          </div>
        )}
      </div>

      {/* Add Modal */}
      <AdminModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        title="Liên kết cây Affiliate mới"
        footer={
          <>
            <button className={modalStyles.cancelBtn} onClick={() => setIsAddModalOpen(false)}>Từ chối</button>
            <button className={modalStyles.confirmBtn} onClick={handleSaveAdd}>Lưu dữ liệu SEO</button>
          </>
        }
      >
        {renderForm()}
      </AdminModal>

      {/* Edit Modal */}
      <AdminModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        title="Chỉnh sửa thông số cây Affiliate"
        footer={
          <>
            <button className={modalStyles.cancelBtn} onClick={() => setIsEditModalOpen(false)}>Hủy</button>
            <button className={modalStyles.confirmBtn} onClick={handleSaveEdit}>Lưu cập nhật</button>
          </>
        }
      >
        {renderForm()}
      </AdminModal>

      {/* Delete Confirmation Modal */}
      <AdminModal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
        title="Ngắt liên kết SEO"
        footer={
          <>
            <button className={modalStyles.cancelBtn} onClick={() => setIsDeleteModalOpen(false)}>Quay lại</button>
            <button className={`${modalStyles.confirmBtn} ${modalStyles.danger}`} onClick={handleConfirmDelete}>Xác nhận Ngắt</button>
          </>
        }
      >
        <p>Bạn có chắc chắn muốn ngắt hoàn toàn liên kết của <strong>{selectedPlant?.name}</strong> khỏi hệ thống? 
        Các short-link được gen trên Frontend sẽ ngừng trỏ về nền tảng.</p>
      </AdminModal>
    </div>
  );
};

export default PlantsManager;
