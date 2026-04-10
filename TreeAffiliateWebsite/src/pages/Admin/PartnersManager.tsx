import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Globe, ShieldCheck, Briefcase, Calendar, ExternalLink, Image as ImageIcon } from 'lucide-react';
import styles from './PartnersManager.module.css';
import modalStyles from './AdminModal.module.css';
import { managedPartners as initialPartners } from '../../data/adminData';
import type { ManagedPartner } from '../../types';
import AdminModal from './AdminModal';

const PartnersManager: React.FC = () => {
  const [partners, setPartners] = useState<ManagedPartner[]>(initialPartners);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<ManagedPartner | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<ManagedPartner>>({});

  // Analytics
  const totalPartners = partners.length;
  const activePartners = partners.filter(p => p.status === 'Active').length;
  const marketplacePartners = partners.filter(p => p.partnerType === 'Shopee' || p.partnerType === 'TikTok').length;
  const avgCommission = partners.length > 0 
    ? (partners.reduce((acc, curr) => acc + curr.commissionRate, 0) / partners.length).toFixed(1) 
    : 0;

  // Handlers
  const openAddModal = () => {
    setFormData({
      id: Date.now().toString(),
      name: '',
      logoUrl: '',
      website: '',
      partnerType: 'Shopee',
      status: 'Active',
      joinedDate: new Date().toISOString().split('T')[0],
      commissionRate: 10,
    });
    setIsAddModalOpen(true);
  };

  const openEditModal = (partner: ManagedPartner) => {
    setSelectedPartner(partner);
    setFormData(partner);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (partner: ManagedPartner) => {
    setSelectedPartner(partner);
    setIsDeleteModalOpen(true);
  };

  const handleSaveAdd = () => {
    if (!formData.name || !formData.website) return;
    setPartners([formData as ManagedPartner, ...partners]);
    setIsAddModalOpen(false);
  };

  const handleSaveEdit = () => {
    if (!selectedPartner) return;
    setPartners(partners.map(p => p.id === selectedPartner.id ? (formData as ManagedPartner) : p));
    setIsEditModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (!selectedPartner) return;
    setPartners(partners.filter(p => p.id !== selectedPartner.id));
    setIsDeleteModalOpen(false);
  };

  // Render Form (Shared between Add & Edit)
  const renderForm = () => (
    <>
      <div className={modalStyles.formGroup}>
        <label>Tên đối tác / Thương hiệu</label>
        <input 
          type="text" 
          className={modalStyles.input} 
          placeholder="Ví dụ: Shopee Vietnam, Eco Garden..."
          value={formData.name || ''}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
      </div>
      <div className={modalStyles.formGroup}>
        <label>Đường dẫn Logo (URL)</label>
        <input 
          type="text" 
          className={modalStyles.input} 
          placeholder="https://..."
          value={formData.logoUrl || ''}
          onChange={(e) => setFormData({...formData, logoUrl: e.target.value})}
        />
      </div>
      <div className={modalStyles.formGroup}>
        <label>Website / Link Shop chính</label>
        <input 
          type="text" 
          className={modalStyles.input} 
          placeholder="https://..."
          value={formData.website || ''}
          onChange={(e) => setFormData({...formData, website: e.target.value})}
        />
      </div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div className={modalStyles.formGroup} style={{ flex: 1 }}>
          <label>Loại hình đối tác</label>
          <select 
            className={modalStyles.select}
            value={formData.partnerType || ''}
            onChange={(e) => setFormData({...formData, partnerType: e.target.value as any})}
          >
            <option value="Shopee">Shopee Mall</option>
            <option value="TikTok">TikTok Shop</option>
            <option value="Garden Center">Hệ thống vườn (Offline/Online)</option>
            <option value="Other">Khác (Network, Affiliate...)</option>
          </select>
        </div>
        <div className={modalStyles.formGroup} style={{ flex: 1 }}>
          <label>Tỷ lệ hoa hồng (%)</label>
          <input 
            type="number" 
            className={modalStyles.input} 
            value={formData.commissionRate || ''}
            onChange={(e) => setFormData({...formData, commissionRate: Number(e.target.value)})}
          />
        </div>
      </div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div className={modalStyles.formGroup} style={{ flex: 1 }}>
          <label>Ngày bắt đầu hợp tác</label>
          <input 
            type="date" 
            className={modalStyles.input} 
            value={formData.joinedDate || ''}
            onChange={(e) => setFormData({...formData, joinedDate: e.target.value})}
          />
        </div>
        <div className={modalStyles.formGroup} style={{ flex: 1 }}>
          <label>Trạng thái</label>
          <select 
            className={modalStyles.select}
            value={formData.status || ''}
            onChange={(e) => setFormData({...formData, status: e.target.value as 'Active' | 'Inactive'})}
          >
            <option value="Active">🟢 Đang hợp tác (Active)</option>
            <option value="Inactive">⚫ Tạm dừng (Inactive)</option>
          </select>
        </div>
      </div>
    </>
  );

  const filteredPartners = partners.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = typeFilter === 'all' || p.partnerType.toLowerCase().replace(' ', '') === typeFilter.toLowerCase();
    return matchSearch && matchType;
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Quản lý Đối tác & Thương hiệu</h1>
        <p className={styles.subtitle}>Quản lý thông tin các đơn vị cung cấp, sàn thương mại điện tử và vườn ươm liên kết</p>
      </div>

      {/* Stats Board */}
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.iconGreen}`}>
            <Briefcase size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Tổng đối tác</span>
            <span className={styles.statValue}>{totalPartners}</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.iconBlue}`}>
            <ShieldCheck size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Đang Active</span>
            <span className={styles.statValue}>{activePartners}</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.iconOrange}`}>
            <Globe size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Sàn TMĐT</span>
            <span className={styles.statValue}>{marketplacePartners}</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.iconDark}`}>
            <Calendar size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Lợi nhuận TB</span>
            <span className={styles.statValue}>{avgCommission}%</span>
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
              placeholder="Tìm tên đối tác, website..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className={styles.filterSelect}
             value={typeFilter} 
             onChange={(e) => setTypeFilter(e.target.value)}
          >
             <option value="all">Loại hình: Tất cả</option>
             <option value="shopee">Shopee</option>
             <option value="tiktok">TikTok Shop</option>
             <option value="gardencenter">Vườn ươm</option>
             <option value="other">Khác</option>
          </select>
        </div>
        <button className={styles.addBtn} onClick={openAddModal}>
          <Plus size={18} />
          Thêm đối tác mới
        </button>
      </div>

      {/* Partners Table */}
      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <h3>Danh sách Đối tác liên kết</h3>
        </div>
        {filteredPartners.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Đối tác & Logo</th>
                <th>Phân loại</th>
                <th>Ngày tham gia</th>
                <th>Hoa hồng</th>
                <th>Trạng thái</th>
                <th style={{ textAlign: 'right' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredPartners.map(partner => (
                <tr key={partner.id}>
                  <td>
                    <div className={styles.partnerInfo}>
                      <div className={styles.logoWrapper}>
                        {partner.logoUrl ? (
                          <img src={partner.logoUrl} alt={partner.name} className={styles.logo} />
                        ) : (
                          <ImageIcon size={20} color="#ccc" />
                        )}
                      </div>
                      <div className={styles.partnerDetails}>
                        <span className={styles.partnerName}>{partner.name}</span>
                        <a href={partner.website} target="_blank" rel="noopener noreferrer" className={styles.partnerWebsite}>
                          {partner.website.replace('https://', '')} <ExternalLink size={10} style={{display: 'inline'}} />
                        </a>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={styles.partnerType}>{partner.partnerType}</span>
                  </td>
                  <td>
                    <span style={{ color: '#666', fontSize: '13px' }}>{partner.joinedDate}</span>
                  </td>
                  <td>
                    <span className={styles.commissionBadge}>{partner.commissionRate}%</span>
                  </td>
                  <td>
                    <span className={partner.status === 'Active' ? styles.badgeActive : styles.badgeInactive}>
                      {partner.status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actions} style={{ justifyContent: 'flex-end' }}>
                      <button className={styles.actionBtn} title="Chỉnh sửa" onClick={() => openEditModal(partner)}>
                        <Edit2 size={16} />
                      </button>
                      <button className={`${styles.actionBtn} ${styles.danger}`} title="Xóa" onClick={() => openDeleteModal(partner)}>
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
            <Briefcase size={64} opacity={0.3} />
            <h3>Không tìm thấy đối tác</h3>
            <p>Hãy thử điều chỉnh lại từ khóa hoặc bộ lọc tìm kiếm.</p>
          </div>
        )}
      </div>

      {/* Add Modal */}
      <AdminModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        title="Thêm đối tác kinh doanh mới"
        footer={
          <>
            <button className={modalStyles.cancelBtn} onClick={() => setIsAddModalOpen(false)}>Hủy</button>
            <button className={modalStyles.confirmBtn} onClick={handleSaveAdd}>Lưu đối tác</button>
          </>
        }
      >
        {renderForm()}
      </AdminModal>

      {/* Edit Modal */}
      <AdminModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        title="Cập nhật thông tin đối tác"
        footer={
          <>
            <button className={modalStyles.cancelBtn} onClick={() => setIsEditModalOpen(false)}>Hủy</button>
            <button className={modalStyles.confirmBtn} onClick={handleSaveEdit}>Cập nhật</button>
          </>
        }
      >
        {renderForm()}
      </AdminModal>

      {/* Delete Confirmation Modal */}
      <AdminModal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
        title="Xác nhận xóa đối tác"
        footer={
          <>
            <button className={modalStyles.cancelBtn} onClick={() => setIsDeleteModalOpen(false)}>Quay lại</button>
            <button className={`${modalStyles.confirmBtn} ${modalStyles.danger}`} onClick={handleConfirmDelete}>Xác nhận Xóa</button>
          </>
        }
      >
        <p>Bạn có chắc chắn muốn xóa đối tác <strong>{selectedPartner?.name}</strong>? 
        Hành động này sẽ gỡ bỏ thông tin đối tác khỏi danh sách quản lý.</p>
      </AdminModal>
    </div>
  );
};

export default PartnersManager;
