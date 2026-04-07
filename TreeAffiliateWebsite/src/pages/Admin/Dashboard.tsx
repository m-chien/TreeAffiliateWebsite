import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Leaf, 
  FileText, 
  FolderTree, 
  Settings, 
  Search, 
  Bell,
  User,
  Users,
  Mail
} from 'lucide-react';
import styles from './Dashboard.module.css';

import DashboardAnalytics from './Analytics/DashboardAnalytics';
import PlantsManager from './PlantsManager';
import ArticlesManager from './ArticlesManager';
import CategoriesManager from './CategoriesManager';
import SettingsManager from './SettingsManager';
import AccountManager from './AccountManager';
import NewsletterManager from './NewsletterManager';
import UsersManager from './UsersManager';

const Dashboard: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'plants', label: 'Quản lý cây', icon: <Leaf size={20} /> },
    { id: 'articles', label: 'Quản lý bài viết', icon: <FileText size={20} /> },
    { id: 'categories', label: 'Quản lý danh mục', icon: <FolderTree size={20} /> },
    { id: 'users', label: 'Người dùng', icon: <Users size={20} /> },
    { id: 'newsletter', label: 'Liên hệ tiếp thị', icon: <Mail size={20} /> },
    { id: 'account', label: 'Tài khoản', icon: <User size={20} /> },
    { id: 'settings', label: 'Hệ thống', icon: <Settings size={20} /> },
  ];

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <DashboardAnalytics />;
      case 'plants':
        return <PlantsManager />;
      case 'articles':
        return <ArticlesManager />;
      case 'categories':
        return <CategoriesManager />;
      case 'users':
        return <UsersManager />;
      case 'newsletter':
        return <NewsletterManager />;
      case 'account':
        return <AccountManager />;
      case 'settings':
        return <SettingsManager />;
      default:
        return <DashboardAnalytics />;
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logoArea}>
          <Leaf className={styles.logoIcon} />
          <span>Plants Avenue</span>
        </div>
        <ul className={styles.menuList}>
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`${styles.menuItem} ${activeMenu === item.id ? styles.active : ''}`}
              onClick={() => setActiveMenu(item.id)}
            >
              {item.icon}
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Top Bar */}
        <header className={styles.topBar}>
          <div className={styles.searchBox}>
            <Search size={18} color="#999" />
            <input type="text" placeholder="Tìm kiếm..." />
          </div>
          <div className={styles.topBarActions}>
            <div className={styles.notificationIcon}>
              <Bell size={20} />
              <div className={styles.notificationDot}></div>
            </div>
            <div className={styles.adminProfile}>
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&q=80" 
                alt="Admin Avatar" 
                className={styles.avatar} 
              />
              <div className={styles.adminInfo}>
                <span className={styles.adminName}>Alex Nguyen</span>
                <span className={styles.adminRole}>Super Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Route Content */}
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;
