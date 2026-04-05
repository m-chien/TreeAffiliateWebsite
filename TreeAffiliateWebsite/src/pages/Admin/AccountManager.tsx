import React, { useState } from 'react';
import { User, KeyRound, CreditCard, Eye, EyeOff, CheckCircle2, Camera, Calendar, Mail, MapPin } from 'lucide-react';
import styles from './AccountManager.module.css';

const AccountManager: React.FC = () => {
  const [showShopeeKey, setShowShopeeKey] = useState(false);
  const [showTiktokKey, setShowTiktokKey] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setShowToast(true);
      
      // Hide toast after 3 seconds
      setTimeout(() => setShowToast(false), 3000);
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Quản lý tài khoản</h1>
        <p className={styles.subtitle}>Cập nhật thông tin cá nhân và quản lý các cổng kết nối API Affiliate</p>
      </div>

      <div className={styles.mainLayout}>
        {/* Left Sidebar: Profile Overview */}
        <aside className={styles.profileCard}>
          <div className={styles.avatarWrapper}>
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=250&q=80" 
              alt="Admin Avatar" 
              className={styles.avatar} 
            />
            <button className={styles.editAvatarBtn} title="Thay ảnh đại diện">
              <Camera size={16} />
            </button>
          </div>
          
          <h2 className={styles.profileName}>Alex Nguyen</h2>
          <span className={styles.profileRole}>Super Admin</span>
          
          <div className={styles.profileStats}>
            <div className={styles.statItem}>
              <span><Calendar size={14} /> Ngày tham gia</span>
              <span>15/04/2024</span>
            </div>
            <div className={styles.statItem}>
              <span><Mail size={14} /> Trạng thái mail</span>
              <span style={{ color: '#2e7d32' }}>Đã xác minh</span>
            </div>
            <div className={styles.statItem}>
              <span><MapPin size={14} /> Khu vực hoạt động</span>
              <span>Hồ Chí Minh, VN</span>
            </div>
          </div>

          <div className={styles.completionBox}>
            <p>Độ hoàn thiện hồ sơ <span>85%</span></p>
            <div className={styles.progressBar}>
              <div className={styles.progressFill}></div>
            </div>
          </div>
        </aside>

        {/* Right Area: Forms */}
        <div className={styles.formArea}>
          <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Card 1: Thông tin cá nhân */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>
                <User size={20} /> Chi tiết Hồ sơ cá nhân
              </h2>
              
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Họ và tên đầy đủ</label>
                  <input type="text" className={styles.input} defaultValue="Alex Nguyen" />
                </div>
                <div className={styles.formGroup}>
                  <label>Chức danh công việc</label>
                  <input type="text" className={styles.input} defaultValue="Website Administrator" />
                </div>
                <div className={styles.formGroup}>
                  <label>Email liên hệ</label>
                  <input type="email" className={styles.input} defaultValue="admin@plantsafe.com" />
                </div>
                <div className={styles.formGroup}>
                  <label>Số điện thoại xác thực</label>
                  <input type="tel" className={styles.input} defaultValue="0987654321" />
                </div>
                <div className={`${styles.formGroup} ${styles.full}`}>
                  <label>Giới thiệu ngắn (Tiểu sử)</label>
                  <textarea 
                    className={styles.input} 
                    style={{ minHeight: '80px', resize: 'vertical' }} 
                    defaultValue="Yêu cây xanh, thích thiết kế trải nghiệm người dùng và đam mê viết lách." 
                  />
                </div>
              </div>
            </div>

            {/* Card 2: API Affiliate */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>
                <KeyRound size={20} /> Mã định danh Affiliate (API Keys)
              </h2>
              
              <div className={styles.formGrid}>
                <div className={`${styles.formGroup} ${styles.full}`}>
                  <label>Shopee Open Platform Key</label>
                  <div className={styles.inputWrapper}>
                    <input 
                      type={showShopeeKey ? "text" : "password"} 
                      className={styles.input} 
                      defaultValue="SHP_aff_89x21nca21d3jsakd21n" 
                    />
                    <button 
                      type="button" 
                      className={styles.eyeBtn} 
                      onClick={() => setShowShopeeKey(!showShopeeKey)}
                    >
                      {showShopeeKey ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className={`${styles.formGroup} ${styles.full}`}>
                  <label>TikTok Shop Affiliate Key</label>
                  <div className={styles.inputWrapper}>
                    <input 
                      type={showTiktokKey ? "text" : "password"} 
                      className={styles.input} 
                      defaultValue="TT_aff_491nz1298dsan21mdlk" 
                    />
                    <button 
                      type="button" 
                      className={styles.eyeBtn} 
                      onClick={() => setShowTiktokKey(!showTiktokKey)}
                    >
                      {showTiktokKey ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Thông tin thanh toán */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>
                <CreditCard size={20} /> Thông tin nhận thanh toán hoa hồng
              </h2>
              
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Ngân hàng nhận tiền</label>
                  <select className={styles.select}>
                    <option>Vietcombank (Ngân hàng Ngoại thương)</option>
                    <option>Techcombank (Ngân hàng Kỹ Thương)</option>
                    <option>MB Bank (Ngân hàng Quân Đội)</option>
                    <option>TPBank (Ngân hàng Tiên Phong)</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Chi nhánh mở thẻ</label>
                  <input type="text" className={styles.input} defaultValue="Chi nhánh Tân Bình" />
                </div>
                <div className={styles.formGroup}>
                  <label>Tên chủ tài khoản</label>
                  <input type="text" className={styles.input} defaultValue="NGUYEN VAN A" />
                </div>
                <div className={styles.formGroup}>
                  <label>Số tài khoản</label>
                  <input type="text" className={styles.input} defaultValue="012345678910" />
                </div>
              </div>
            </div>

            {/* Submit */}
            <button type="submit" className={styles.submitBtn} disabled={isSaving}>
              {isSaving ? 'Đang cập nhật hồ sơ...' : 'Lưu hồ sơ tài khoản'}
            </button>
          </form>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className={styles.toast}>
          <CheckCircle2 size={24} />
          Đã lưu hồ sơ thành công!
        </div>
      )}
    </div>
  );
};

export default AccountManager;
