import React, { useState } from 'react';
import { Shield, Bell, Settings, CheckCircle2, Globe, HardDrive, Activity, Save, TriangleAlert } from 'lucide-react';
import styles from './SettingsManager.module.css';

const SettingsManager: React.FC = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Toggle states
  const [emailAlert, setEmailAlert] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(false);
  const [loginAlert, setLoginAlert] = useState(true);
  
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [debugMode, setDebugMode] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    setTimeout(() => {
      setIsSaving(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Cài đặt hệ thống</h1>
        <p className={styles.subtitle}>Quản lý bảo mật cốt lõi, thông báo hệ thống và tùy chọn tối ưu hóa website</p>
      </div>

      {/* System Health Indicators */}
      <div className={styles.statsRow}>
        <div className={`${styles.statCard} ${styles.success}`}>
          <div className={styles.statIcon}>
            <Activity size={20} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Trạng thái máy chủ (Uptime)</span>
            <span className={styles.statValue}>99.9%</span>
            <span className={styles.statSub}>Ổn định trong 30 ngày qua</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <HardDrive size={20} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Dung lượng khả dụng</span>
            <span className={styles.statValue}>45%</span>
            <span className={styles.statSub} style={{ color: '#666' }}>Đã sử dụng 4.5/10 GB</span>
          </div>
        </div>
        <div className={`${styles.statCard} ${styles.warning}`}>
          <div className={styles.statIcon}>
            <Shield size={20} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Cảnh báo bảo mật</span>
            <span className={styles.statValue}>An toàn</span>
            <span className={styles.statSub} style={{ color: '#e65100' }}>Cập nhật mật khẩu định kỳ để bảo vệ</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSaveSettings}>
        <div className={styles.mainGrid}>
          
          {/* LEFT COLUMN */}
          <div className={styles.column}>
            {/* Card 1: Change Password */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>
                <Shield size={18} /> Đổi mật khẩu đăng nhập Admin
              </h2>
              
              <div className={styles.formGroup}>
                <label>Mật khẩu hiện tại</label>
                <input type="password" className={styles.input} placeholder="Nhập để xác thực..." />
              </div>
              <div className={styles.formGroup}>
                <label>Mật khẩu mới</label>
                <input type="password" className={styles.input} placeholder="Nhiều hơn 8 ký tự, bao gồm số và ký tự đặc biệt" />
              </div>
              <div className={styles.formGroup}>
                <label>Xác nhận lại mật khẩu mới</label>
                <input type="password" className={styles.input} placeholder="Phải khớp với mật khẩu mới..." />
              </div>
            </div>

            {/* Card 3: System Preferences */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>
                <Settings size={18} /> Tùy chọn hiển thị & Cấu trúc
              </h2>
              
              <div className={styles.formGroup}>
                <label><Globe size={14} style={{ display: 'inline', marginRight: '4px' }} /> Ngôn ngữ hiển thị (Bảng điều khiển)</label>
                <select className={styles.select}>
                  <option value="vi">Tiếng Việt (Mặc định)</option>
                  <option value="en">English (US)</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Múi giờ hệ thống</label>
                <select className={styles.select}>
                  <option value="gmt7">(GMT+07:00) Bangkok, Hanoi, Jakarta</option>
                  <option value="utc">UTC Standard Time</option>
                </select>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className={styles.column}>
            {/* Card 2: Notifications */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>
                <Bell size={18} /> Chính sách Nhận thông báo
              </h2>
              
              <div className={styles.toggleRow}>
                <div className={styles.toggleInfo}>
                  <span className={styles.toggleLabel}>Gửi Email khi có Tương tác</span>
                  <span className={styles.toggleDesc}>Nhận email tức thì khi có đơn vị liên hệ qua Form.</span>
                </div>
                <label className={styles.switch}>
                  <input type="checkbox" checked={emailAlert} onChange={(e) => setEmailAlert(e.target.checked)} />
                  <span className={styles.slider}></span>
                </label>
              </div>
              
              <div className={styles.toggleRow}>
                <div className={styles.toggleInfo}>
                  <span className={styles.toggleLabel}>Báo cáo doanh thu hàng tuần</span>
                  <span className={styles.toggleDesc}>Tự động tổng hợp số liệu Affiliate Clicks vào sáng T2.</span>
                </div>
                <label className={styles.switch}>
                  <input type="checkbox" checked={weeklyReport} onChange={(e) => setWeeklyReport(e.target.checked)} />
                  <span className={styles.slider}></span>
                </label>
              </div>

              <div className={styles.toggleRow}>
                <div className={styles.toggleInfo}>
                  <span className={styles.toggleLabel}>Cảnh báo Đăng nhập lạ</span>
                  <span className={styles.toggleDesc}>Hệ thống sẽ gửi yêu cầu kích hoạt nếu nhận thấy địa chỉ IP lạ.</span>
                </div>
                <label className={styles.switch}>
                  <input type="checkbox" checked={loginAlert} onChange={(e) => setLoginAlert(e.target.checked)} />
                  <span className={styles.slider}></span>
                </label>
              </div>
            </div>

            {/* Card 4: Danger Zone */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle} style={{ color: '#d32f2f' }}>
                <TriangleAlert size={18} /> Khu vực nguy hiểm
              </h2>
              
              <div className={styles.toggleRow}>
                <div className={styles.toggleInfo}>
                  <span className={styles.toggleLabel}>Chế độ Bảo trì mạng (Maintenance)</span>
                  <span className={styles.toggleDesc}>Khóa toàn bộ truy cập từ bên ngoài, chỉ admin có thể vào.</span>
                </div>
                <label className={styles.switch}>
                  <input type="checkbox" checked={maintenanceMode} onChange={(e) => setMaintenanceMode(e.target.checked)} />
                  <span className={styles.slider} style={maintenanceMode ? { backgroundColor: '#d32f2f' } : {}}></span>
                </label>
              </div>

              <div className={styles.toggleRow}>
                <div className={styles.toggleInfo}>
                  <span className={styles.toggleLabel}>Bật Log lỗi (Debug Mode)</span>
                  <span className={styles.toggleDesc}>Hiển thị chi tiết lỗi kỹ thuật thay vì giao diện màn hình thân thiện để trace code.</span>
                </div>
                <label className={styles.switch}>
                  <input type="checkbox" checked={debugMode} onChange={(e) => setDebugMode(e.target.checked)} />
                  <span className={styles.slider} style={debugMode ? { backgroundColor: '#e65100' } : {}}></span>
                </label>
              </div>
              
              <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
                 <button type="button" style={{ 
                    width: '100%', 
                    padding: '12px', 
                    borderRadius: '8px', 
                    border: '1px solid #ffcdd2', 
                    backgroundColor: '#fff', 
                    color: '#d32f2f',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}>Xóa File Cache Hệ Thống</button>
              </div>
            </div>
          </div>

        </div>

        {/* Submit */}
        <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
          <button type="submit" className={styles.submitBtn} disabled={isSaving}>
            <Save size={18} style={{ marginRight: '8px' }} />
            {isSaving ? 'Đang áp dụng...' : 'Áp dụng mọi thay đổi'}
          </button>
        </div>
      </form>

      {/* Toast Notification */}
      {showToast && (
        <div className={styles.toast}>
          <CheckCircle2 size={24} />
          Đã lưu thiết lập hệ thống!
        </div>
      )}
    </div>
  );
};

export default SettingsManager;
