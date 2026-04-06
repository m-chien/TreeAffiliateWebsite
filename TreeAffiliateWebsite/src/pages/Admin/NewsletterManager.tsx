import React, { useState, useEffect } from 'react';
import { Search, Mail, X, Send, Target, Users } from 'lucide-react';
import styles from './NewsletterManager.module.css';
import { plantOptions, blogOptions, mockInterestedUsers } from '../../data/newsletterData';

const NewsletterManager: React.FC = () => {
  // Wizard State
  const [category, setCategory] = useState('');
  const [targetItemId, setTargetItemId] = useState('');

  // Table State
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailContent, setEmailContent] = useState('');

  // Logic: Load users automatically when Target Item changes
  useEffect(() => {
    if (targetItemId && mockInterestedUsers[targetItemId]) {
      const users = mockInterestedUsers[targetItemId];
      setSubscribers(users);
      // Auto-select all by default to make it half-automated
      setSelectedIds(users.map(u => u.id));
    } else {
      setSubscribers([]);
      setSelectedIds([]);
    }
  }, [targetItemId]);

  // Handle Select All
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredSubscribers.map(sub => sub.id));
    } else {
      setSelectedIds([]);
    }
  };

  // Handle individual select
  const handleSelectOne = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const filteredSubscribers = subscribers.filter(sub => 
    sub.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
    sub.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn bỏ qua user này trong chiến dịch?')) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id)); // Uncheck them
    }
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIds.length === 0) {
      alert('Vui lòng chọn ít nhất 1 khách hàng trước khi gửi.');
      return;
    }
    
    alert(`Thành công! Đã lên lịch gửi email tới ${selectedIds.length} khách hàng mục tiêu.\nTiêu đề: ${emailSubject}`);
    setIsModalOpen(false);
    setEmailSubject('');
    setEmailContent('');
    
    // Reset wizard
    setCategory('');
    setTargetItemId('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Chiến dịch Tiếp thị Mục tiêu</h1>
        <p className={styles.subtitle}>Thiết lập nhóm khách hàng tự động dựa trên hành vi và sở thích</p>
      </div>

      {/* Target Audience Wizard */}
      <div className={styles.toolbarCard} style={{ backgroundColor: '#fcfbf8', border: '1px solid #1e3b32' }}>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', width: '100%', alignItems: 'flex-end' }}>
          
          <div className={styles.formGroup} style={{ flex: 1, minWidth: '250px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#1e3b32' }}>
              <Target size={16} /> 1. Chọn loại chiến dịch
            </label>
            <select 
              value={category} 
              onChange={(e) => {
                setCategory(e.target.value);
                setTargetItemId(''); // Reset second step
              }}
              style={{ fontWeight: 600, border: '1px solid #1e3b32' }}
            >
              <option value="">-- Chọn danh mục tiếp thị --</option>
              <option value="blog">Tiếp thị nội dung Blog mới</option>
              <option value="care">Hướng dẫn chăm sóc cây</option>
              <option value="new_plant">Giới thiệu Sản phẩm Cây mới</option>
            </select>
          </div>

          {(category === 'care' || category === 'new_plant') && (
            <div className={styles.formGroup} style={{ flex: 1, minWidth: '250px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#1e3b32' }}>
                <Target size={16} /> 2. Chọn Cây mục tiêu
              </label>
              <select 
                value={targetItemId} 
                 onChange={(e) => setTargetItemId(e.target.value)}
                 style={{ border: '1px solid #1e3b32' }}
              >
                <option value="">-- Chọn loại cây --</option>
                {plantOptions.map(plant => (
                  <option key={plant.id} value={plant.id}>{plant.name}</option>
                ))}
              </select>
            </div>
          )}

          {category === 'blog' && (
            <div className={styles.formGroup} style={{ flex: 1, minWidth: '250px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#1e3b32' }}>
                <Target size={16} /> 2. Chọn Nhóm Độc Giả
              </label>
              <select 
                value={targetItemId} 
                 onChange={(e) => setTargetItemId(e.target.value)}
                 style={{ border: '1px solid #1e3b32' }}
              >
                <option value="">-- Chọn bài viết quan tâm --</option>
                {blogOptions.map(blog => (
                  <option key={blog.id} value={blog.id}>{blog.name}</option>
                ))}
              </select>
            </div>
          )}

        </div>
      </div>

      {targetItemId && subscribers.length > 0 && (
        <div className={styles.toolbarCard} style={{ marginTop: '-8px' }}>
          <div className={styles.filterGroup}>
            <div className={styles.searchBox}>
              <Search size={18} color="#999" />
              <input 
                type="text" 
                placeholder="Tìm kiếm user trong danh sách truy xuất..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <button 
            className={styles.addBtn} 
            onClick={() => setIsModalOpen(true)}
            disabled={selectedIds.length === 0}
            style={{ backgroundColor: selectedIds.length > 0 ? '#1e3b32' : '' }}
          >
            <Mail size={18} />
            Soạn Email Tới {selectedIds.length} Khách Hàng
          </button>
        </div>
      )}

      {/* Table Content */}
      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Users size={18} />
            Danh sách mục tiêu tự động ({filteredSubscribers.length} kết quả)
          </h3>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.checkboxCell}>
                <input 
                  type="checkbox" 
                  className={styles.checkbox}
                  checked={selectedIds.length === filteredSubscribers.length && filteredSubscribers.length > 0}
                  onChange={handleSelectAll}
                  disabled={filteredSubscribers.length === 0}
                />
              </th>
              <th>Email</th>
              <th>Họ và Tên</th>
              <th>Điểm chung (Sở thích)</th>
              <th>Trạng thái</th>
              <th>Bỏ qua</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubscribers.map(sub => (
              <tr key={sub.id} style={{ opacity: selectedIds.includes(sub.id) ? 1 : 0.5 }}>
                <td className={styles.checkboxCell}>
                  <input 
                    type="checkbox" 
                    className={styles.checkbox}
                    checked={selectedIds.includes(sub.id)}
                    onChange={() => handleSelectOne(sub.id)}
                  />
                </td>
                <td style={{ fontWeight: 600 }}>{sub.email}</td>
                <td>{sub.name}</td>
                <td style={{ color: '#c86c42', fontWeight: 600 }}>{sub.interest}</td>
                <td>
                  <span className={sub.status === 'active' ? styles.badgeActive : styles.badgeInactive}>
                    {sub.status === 'active' ? 'Sẵn sàng' : 'Không nhận Mail'}
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button 
                      className={styles.actionBtn} 
                      onClick={() => handleDelete(sub.id)}
                      title="Bỏ tick user này"
                    >
                      <X size={18} color="#ef4444" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredSubscribers.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '64px', color: '#888' }}>
                  {targetItemId 
                    ? "Không tìm thấy khách hàng nào có hành vi tương ứng." 
                    : "Vui lòng chọn loại chiến dịch và mục tiêu ở bước trên để truy xuất tệp khách hàng tự động."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Compose Email Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Biên soạn Email Chiến Dịch</h2>
              <button className={styles.closeBtn} onClick={() => setIsModalOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSendEmail}>
              <div className={styles.modalBody}>
                <div className={styles.formGroup}>
                  <label>Tệp khách hàng mục tiêu:</label>
                  <input 
                    type="text" 
                    value={`${selectedIds.length} khách hàng quan tâm đến ${plantOptions.find(p => p.id === targetItemId)?.name || blogOptions.find(b => b.id === targetItemId)?.name || ''}`}
                    readOnly
                    style={{ backgroundColor: '#fcfbf8', color: '#1e3b32', fontWeight: 600 }}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Tiêu đề Email (<span style={{color: 'red'}}>*</span>):</label>
                  <input 
                    type="text" 
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="VD: Bí quyết chăm sóc cây bạn đang quan tâm..."
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Nội dung (<span style={{color: 'red'}}>*</span>):</label>
                  <textarea 
                    value={emailContent}
                    onChange={(e) => setEmailContent(e.target.value)}
                    placeholder="Nhập nội dung email tại đây..."
                    required
                  />
                </div>
              </div>
              <div className={styles.modalFooter}>
                <button type="button" className={styles.cancelBtn} onClick={() => setIsModalOpen(false)}>
                  Hủy bỏ
                </button>
                <button type="submit" className={styles.submitBtn}>
                  <Send size={18} />
                  Xác nhận Gửi Email
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsletterManager;
