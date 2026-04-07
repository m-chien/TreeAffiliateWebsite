import React, { useState } from 'react';
import { Search, Users, ExternalLink, Calendar, Mail, Clock, ShieldAlert, CheckCircle, XCircle } from 'lucide-react';
import styles from './UsersManager.module.css';
import { mockUsersData, type UserDetail } from '../../data/usersData';

const UsersManager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null);

  const filteredUsers = mockUsersData.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active': return styles.badgeActive;
      case 'Banned': return styles.badgeBanned;
      case 'Pending': return styles.badgePending;
      default: return '';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'Active': return 'Hoạt động';
      case 'Banned': return 'Bị khóa';
      case 'Pending': return 'Chờ duyệt';
      default: return status;
    }
  };

  const openUserModal = (user: UserDetail) => {
    setSelectedUser(user);
  };

  const closeUserModal = () => {
    setSelectedUser(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Quản lý người dùng</h1>
        <p className={styles.subtitle}>Xem thông tin chi tiết và lịch sử tiếp thị của khách hàng</p>
      </div>

      <div className={styles.toolbarCard}>
        <div className={styles.searchBox}>
          <Search size={18} color="#999" />
          <input 
            type="text" 
            placeholder="Tìm kiếm theo tên hoặc email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Users size={18} />
            Danh sách người dùng ({filteredUsers.length})
          </h3>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Họ và Tên</th>
              <th>Email</th>
              <th>Vai trò</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td style={{ color: '#888', fontWeight: 500 }}>{user.id}</td>
                <td style={{ fontWeight: 600 }}>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <span className={getStatusBadge(user.status)}>
                    {getStatusText(user.status)}
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button 
                      className={styles.actionBtn} 
                      onClick={() => openUserModal(user)}
                      title="Xem chi tiết"
                    >
                      <ExternalLink size={18} color="#1e3b32" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '64px', color: '#888' }}>
                  Không tìm thấy người dùng nào phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className={styles.modalOverlay} onClick={closeUserModal}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Chi tiết Người dùng: {selectedUser.name}</h2>
              <button className={styles.closeBtn} onClick={closeUserModal}>
                <XCircle size={24} />
              </button>
            </div>
            
            <div className={styles.modalBody}>
              <div>
                <h3 className={styles.sectionTitle}>
                  <Users size={18} /> Thông tin chung
                </h3>
                <div className={styles.userInfoGrid}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>ID</span>
                    <span className={styles.infoValue}>{selectedUser.id}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Email</span>
                    <span className={styles.infoValue}>{selectedUser.email}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Vai trò</span>
                    <span className={styles.infoValue}>{selectedUser.role}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Trạng thái</span>
                    <span className={styles.infoValue}>
                      <span className={getStatusBadge(selectedUser.status)}>
                        {getStatusText(selectedUser.status)}
                      </span>
                    </span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}><Calendar size={12} style={{display: 'inline', marginRight: 4}}/> Ngày tham gia</span>
                    <span className={styles.infoValue}>{selectedUser.joinDate}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}><Clock size={12} style={{display: 'inline', marginRight: 4}}/> Đăng nhập lần cuối</span>
                    <span className={styles.infoValue}>{selectedUser.lastLogin}</span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 8 }}>
                <h3 className={styles.sectionTitle}>
                  <Mail size={18} /> Lịch sử Liên hệ Tiếp thị
                </h3>
                
                {selectedUser.marketingContacts && selectedUser.marketingContacts.length > 0 ? (
                  <div className={styles.historyList}>
                    {selectedUser.marketingContacts.map(contact => (
                      <div key={contact.id} className={styles.historyCard}>
                        <div className={styles.historyHeader}>
                          <span className={styles.campaignName}>{contact.campaignName}</span>
                          <span className={styles.dateSent}>{contact.sentDate}</span>
                        </div>
                        <div className={styles.statsRow}>
                          <div className={`${styles.statBadge} ${contact.opened ? styles.opened : ''}`}>
                            {contact.opened ? <CheckCircle size={14} /> : <XCircle size={14} />} 
                            {contact.opened ? 'Đã mở mail' : 'Chưa mở'}
                          </div>
                          <div className={`${styles.statBadge} ${contact.clicked ? styles.clicked : ''}`}>
                            {contact.clicked ? <CheckCircle size={14} /> : <XCircle size={14} />} 
                            {contact.clicked ? 'Đã click link' : 'Chưa click'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.noData}>
                    Người dùng này chưa nhận được liên hệ tiếp thị nào.
                  </div>
                )}
              </div>
              
              <div style={{ marginTop: 8 }}>
                 <h3 className={styles.sectionTitle}>
                  <ShieldAlert size={18} /> Chức năng khác
                </h3>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button className={styles.actionBtn} style={{ background: '#f5f5f5', border: '1px solid #ddd', padding: '8px 16px', fontWeight: 500 }}>
                    Đặt lại mật khẩu
                  </button>
                  <button className={styles.actionBtn} style={{ background: '#ffebee', color: '#c62828', border: '1px solid #ffcdd2', padding: '8px 16px', fontWeight: 500 }}>
                    {selectedUser.status === 'Banned' ? 'Mở khóa tài khoản' : 'Khóa tài khoản'}
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersManager;
