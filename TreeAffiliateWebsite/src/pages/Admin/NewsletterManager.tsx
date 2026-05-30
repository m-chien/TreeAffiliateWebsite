import React, { useState, useEffect } from 'react';
import { Search, Mail, X, Send, Target, Users, BookOpen, Sparkles, History, Check } from 'lucide-react';
import axios from 'axios';
import styles from './NewsletterManager.module.css';
import {
  mockUsersForMarketing,
  mockArticlesForMarketing,
  fallbackPlants,
  type FallbackPlant
} from '../../data/newsletterData';

interface CampaignLog {
  id: string;
  title: string;
  targetName: string;
  targetType: 'Cây mới' | 'Bài viết';
  category: string;
  recipientsCount: number;
  dateSent: string;
  status: 'Đã gửi' | 'Thất bại';
}

const NewsletterManager: React.FC = () => {
  // Config state
  const [marketingType, setMarketingType] = useState<'plant' | 'article'>('plant');
  const [selectedItemId, setSelectedItemId] = useState<string>('');
  const [plantsList, setPlantsList] = useState<FallbackPlant[]>([]);
  const [usersList, setUsersList] = useState<any[]>(mockUsersForMarketing);
  const [loadingPlants, setLoadingPlants] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);

  // Target criteria
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  // Table State
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailContent, setEmailContent] = useState('');

  // History State (logged in session)
  const [campaignHistory, setCampaignHistory] = useState<CampaignLog[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // 1. Fetch plants and users list from API on load
  useEffect(() => {
    const fetchPlants = async () => {
      setLoadingPlants(true);
      try {
        const response = await axios.get("http://localhost:8080/api/v1/cay-canh?size=100");
        const apiContent = response.data?.result?.content;
        if (apiContent && Array.isArray(apiContent) && apiContent.length > 0) {
          const formattedPlants: FallbackPlant[] = apiContent.map((item: any) => ({
            id: String(item.id),
            name: item.tenCay,
            danhMucList: item.danhMucList || []
          }));
          setPlantsList(formattedPlants);
        } else {
          setPlantsList(fallbackPlants);
        }
      } catch (error) {
        console.warn("Backend API not reachable or failed. Using fallback plants data.", error);
        setPlantsList(fallbackPlants);
      } finally {
        setLoadingPlants(false);
      }
    };

    const fetchUsers = async () => {
      setLoadingUsers(true);
      try {
        const response = await axios.get("http://localhost:8080/api/v1/plants-user?size=100");
        const apiContent = response.data?.result?.content;
        if (apiContent && Array.isArray(apiContent) && apiContent.length > 0) {
          const formattedUsers = apiContent.map((item: any) => ({
            id: String(item.id),
            name: item.hoTen || item.email.split('@')[0],
            email: item.email,
            status: item.trangThai?.toLowerCase() === 'active' ? 'active' : 'inactive',
            favoriteCategories: item.favoriteCategories || [],
            favoritePlants: item.favoritePlants || []
          }));
          setUsersList(formattedUsers);
        } else {
          setUsersList(mockUsersForMarketing);
        }
      } catch (error) {
        console.warn("Backend API not reachable or failed for users. Using mock users data.", error);
        setUsersList(mockUsersForMarketing);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchPlants();
    fetchUsers();
  }, []);

  // Re-fetch or resolve Campaign History whenever plantsList is populated
  const fetchHistory = async () => {
    setLoadingHistory(true);
    try {
      const response = await axios.get("http://localhost:8080/api/v1/lich-su-tiep-thi?size=100");
      const apiContent = response.data?.result?.content;
      if (apiContent && Array.isArray(apiContent)) {
        // Group history records by sending minute and target IDs to consolidate batch campaigns
        const groups: { [key: string]: any } = {};
        
        apiContent.forEach((item: any) => {
          const dateStr = item.ngayGui ? item.ngayGui.replace('T', ' ').slice(0, 16) : '';
          const key = `${dateStr}_${item.cayCanhId}_${item.baiVietId}`;
          
          if (!groups[key]) {
            let targetName = 'Tiếp thị';
            let targetType: 'Cây mới' | 'Bài viết' = 'Cây mới';
            let category = 'Khác';
            
            if (item.cayCanhId) {
              const plant = plantsList.find(p => p.id === String(item.cayCanhId));
              targetName = plant ? plant.name : `Cây cảnh (ID: ${item.cayCanhId})`;
              targetType = 'Cây mới';
              category = plant ? plant.danhMucList.join(', ') : 'Cây cảnh';
            } else if (item.baiVietId) {
              const article = mockArticlesForMarketing.find(a => a.id === `art${item.baiVietId}`);
              targetName = article ? article.name : `Bài viết (ID: ${item.baiVietId})`;
              targetType = 'Bài viết';
              category = article ? article.category : 'Bài viết';
            }
            
            groups[key] = {
              id: `CAMP_${item.id}`,
              title: item.loaiNoiDung === 'BLOG' ? 'Gửi bài viết mới' : 'Gửi sản phẩm cây mới',
              targetName,
              targetType,
              category,
              recipientsCount: 0,
              dateSent: dateStr,
              status: item.trangThai === 'ACTIVE' ? 'Đã gửi' : 'Thất bại'
            };
          }
          groups[key].recipientsCount += 1;
        });
        
        setCampaignHistory(Object.values(groups));
      }
    } catch (error) {
      console.warn("Could not fetch campaign history from DB. Using local mocks.", error);
      // fallback mock campaign history
      setCampaignHistory([
        {
          id: 'CAMP_01',
          title: 'Gửi bài viết mới',
          targetName: 'Top 10 cây lọc không khí trong nhà tốt nhất',
          targetType: 'Bài viết',
          category: 'Cây trong nhà',
          recipientsCount: 4,
          dateSent: '2026-05-28 09:15',
          status: 'Đã gửi'
        },
        {
          id: 'CAMP_02',
          title: 'Gửi sản phẩm cây mới',
          targetName: 'Cây Kim Tiền',
          targetType: 'Cây mới',
          category: 'Cây phong thủy',
          recipientsCount: 3,
          dateSent: '2026-05-29 14:30',
          status: 'Đã gửi'
        }
      ]);
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    if (plantsList.length > 0) {
      fetchHistory();
    }
  }, [plantsList]);

  // 2. Compute categories and fetch target users when selection changes
  useEffect(() => {
    if (!selectedItemId) {
      setSelectedCategories([]);
      setSubscribers([]);
      setSelectedIds([]);
      return;
    }

    let categories: string[] = [];
    if (marketingType === 'plant') {
      const foundPlant = plantsList.find(p => p.id === selectedItemId);
      if (foundPlant) {
        categories = foundPlant.danhMucList;
      }
    } else {
      const foundArticle = mockArticlesForMarketing.find(a => a.id === selectedItemId);
      if (foundArticle) {
        categories = [foundArticle.category];
      }
    }
    setSelectedCategories(categories);

    // Fetch target users directly from DB or use local fallback filtering
    const fetchTargetUsers = async () => {
      if (categories.length === 0) return;
      try {
        let url = `http://localhost:8080/api/v1/plants-user/marketing-targets`;
        if (marketingType === 'plant') {
          url += `?plantId=${selectedItemId}`;
        } else {
          url += `?category=${encodeURIComponent(categories[0])}`;
        }
        
        const response = await axios.get(url);
        const apiTargets = response.data?.result;
        
        if (apiTargets && Array.isArray(apiTargets)) {
          const matchedUsers = apiTargets.map((item: any) => ({
            id: String(item.id),
            name: item.hoTen || item.email.split('@')[0],
            email: item.email,
            status: item.trangThai?.toLowerCase() === 'active' ? 'active' : 'inactive',
            favoriteCategories: item.favoriteCategories || [],
            favoritePlants: item.favoritePlants || [],
            interest: item.favoritePlants && item.favoritePlants.length > 0
              ? `Thích ${item.favoritePlants.join(', ')} (${categories.join(', ')})`
              : `Quan tâm nhóm ${categories.join(', ')}`
          }));
          
          setSubscribers(matchedUsers);
          setSelectedIds(matchedUsers.filter(u => u.status === 'active').map(u => u.id));
          return;
        }
      } catch (error) {
        console.warn("Could not fetch target marketing users from DB. Using local frontend filtering fallback.", error);
      }

      // Local Frontend-side Filtering Fallback
      const matchedUsers = usersList.filter(user => 
        user.favoriteCategories && user.favoriteCategories.some((cat: string) => categories.includes(cat))
      ).map(user => {
        const matchingCategoryList = user.favoriteCategories.filter((cat: string) => categories.includes(cat));
        const explanation = user.favoritePlants && user.favoritePlants.length > 0
          ? `Thích ${user.favoritePlants.join(', ')} (${matchingCategoryList.join(', ')})`
          : `Quan tâm nhóm ${matchingCategoryList.join(', ')}`;
        return {
          ...user,
          interest: explanation
        };
      });

      setSubscribers(matchedUsers);
      setSelectedIds(matchedUsers.filter(u => u.status === 'active').map(u => u.id));
    };

    fetchTargetUsers();
  }, [selectedItemId, marketingType, plantsList, usersList]);

  // Handle Select All
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      // Select all active subscribers
      const activeIds = filteredSubscribers
        .filter(sub => sub.status === 'active')
        .map(sub => sub.id);
      setSelectedIds(activeIds);
    } else {
      setSelectedIds([]);
    }
  };

  // Handle individual select
  const handleSelectOne = (id: string, status: string) => {
    if (status !== 'active') {
      alert('Khách hàng này đã từ chối nhận email tiếp thị (Opted-out).');
      return;
    }
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

  const handleSkipUser = (id: string) => {
    setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
  };

  // Setup template when opening modal
  const handleOpenModal = () => {
    let itemName = '';
    if (marketingType === 'plant') {
      itemName = plantsList.find(p => p.id === selectedItemId)?.name || '';
    } else {
      itemName = mockArticlesForMarketing.find(a => a.id === selectedItemId)?.name || '';
    }

    const defaultSubject = marketingType === 'plant'
      ? `[Plants Avenue] Giới thiệu cây mới: Cây ${itemName} cực đẹp vừa cập bến!`
      : `[Plants Avenue] Chia sẻ bài viết: ${itemName}`;

    const defaultContent = `Xin chào Quý khách,\n\nPlants Avenue vừa cập nhật nội dung mới phù hợp với sở thích quan tâm đến dòng cây ${selectedCategories.join(', ')} của bạn:\n\n👉 ${marketingType === 'plant' ? 'Sản phẩm mới' : 'Bài viết mới'}: ${itemName}\n\nChúng tôi hy vọng bài viết/sản phẩm này sẽ mang lại thông tin hữu ích và giúp không gian xanh của bạn thêm phần sinh động. Hãy ghé thăm website Plants Avenue để xem chi tiết nhé!\n\nChúc bạn một ngày tràn đầy năng lượng!\n\nTrân trọng,\nĐội ngũ quản trị Plants Avenue.`;

    setEmailSubject(defaultSubject);
    setEmailContent(defaultContent);
    setIsModalOpen(true);
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIds.length === 0) {
      alert('Vui lòng chọn ít nhất 1 khách hàng trước khi gửi.');
      return;
    }

    let itemName = '';
    if (marketingType === 'plant') {
      itemName = plantsList.find(p => p.id === selectedItemId)?.name || '';
    } else {
      itemName = mockArticlesForMarketing.find(a => a.id === selectedItemId)?.name || '';
    }

    // Build batch campaign payload for Java backend
    const payload = {
      plantId: marketingType === 'plant' ? Number(selectedItemId) : null,
      articleId: marketingType === 'article' ? Number(selectedItemId.replace('art', '')) : null,
      recipientIds: selectedIds.map(Number),
      subject: emailSubject,
      content: emailContent,
      contentType: marketingType === 'plant' ? 'OTHER' : 'BLOG'
    };

    try {
      // Send real emails and record logs in LichSuTiepThi DB table
      const response = await axios.post("http://localhost:8080/api/v1/lich-su-tiep-thi/send-campaign", payload);
      
      if (response.status === 200) {
        alert(`Thành công! Đã gửi tiếp thị email thực tế tới ${selectedIds.length} khách hàng mục tiêu thông qua Gmail SMTP và ghi nhận vào bảng LichSuTiepThi trong Database.`);
        setIsModalOpen(false);
        setSelectedItemId(''); // reset selection
        fetchHistory(); // Reload history table from DB
      }
    } catch (error: any) {
      console.error("Lỗi khi gửi chiến dịch tiếp thị:", error);
      alert(`Lỗi gửi tiếp thị: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Quản Lý Tiếp Thị Mục Tiêu</h1>
        <p className={styles.subtitle}>Tự động phân nhóm và gửi email tiếp thị dựa trên danh mục cây yêu thích của người dùng</p>
      </div>

      {/* Target Audience Wizard */}
      <div className={styles.toolbarCard} style={{ borderLeft: '5px solid #1e3b32', backgroundColor: '#faf9f5' }}>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', width: '100%', alignItems: 'flex-end' }}>
          
          {/* Step 1: Campaign Type */}
          <div className={styles.formGroup} style={{ flex: 1, minWidth: '220px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#1e3b32', fontWeight: 600 }}>
              <Target size={16} /> 1. Chọn loại tiếp thị
            </label>
            <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
              <button 
                type="button"
                className={marketingType === 'plant' ? styles.typeBtnActive : styles.typeBtn}
                onClick={() => {
                  setMarketingType('plant');
                  setSelectedItemId('');
                }}
              >
                <Sparkles size={16} /> Cây mới ra mắt
              </button>
              <button 
                type="button"
                className={marketingType === 'article' ? styles.typeBtnActive : styles.typeBtn}
                onClick={() => {
                  setMarketingType('article');
                  setSelectedItemId('');
                }}
              >
                <BookOpen size={16} /> Bài viết mới
              </button>
            </div>
          </div>

          {/* Step 2: Select Item */}
          <div className={styles.formGroup} style={{ flex: 2, minWidth: '300px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#1e3b32', fontWeight: 600 }}>
              {marketingType === 'plant' ? <Sparkles size={16} /> : <BookOpen size={16} />}
              {marketingType === 'plant' ? '2. Chọn sản phẩm Cây cảnh mới' : '2. Chọn Bài viết mới đăng'}
            </label>
            {marketingType === 'plant' ? (
              <select 
                value={selectedItemId} 
                onChange={(e) => setSelectedItemId(e.target.value)}
                style={{ fontWeight: 600, border: '1px solid #1e3b32', height: 45, width: '100%' }}
                disabled={loadingPlants}
              >
                <option value="">-- {loadingPlants ? 'Đang tải danh sách cây...' : 'Chọn loại cây cần tiếp thị'} --</option>
                {plantsList.map(plant => (
                  <option key={plant.id} value={plant.id}>
                    {plant.name} ({plant.danhMucList.join(', ')})
                  </option>
                ))}
              </select>
            ) : (
              <select 
                value={selectedItemId} 
                onChange={(e) => setSelectedItemId(e.target.value)}
                style={{ fontWeight: 600, border: '1px solid #1e3b32', height: 45, width: '100%' }}
              >
                <option value="">-- Chọn bài viết cần tiếp thị --</option>
                {mockArticlesForMarketing.map(blog => (
                  <option key={blog.id} value={blog.id}>
                    {blog.name} ({blog.category})
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Info Card when item selected */}
          {selectedItemId && selectedCategories.length > 0 && (
            <div className={styles.categoryBadgeCard}>
              <span className={styles.badgeLabel}>Nhóm đối tượng hướng tới:</span>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>
                {selectedCategories.map(cat => (
                  <span key={cat} className={styles.categoryTag}>{cat}</span>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Filter and Compose Email Toolbar */}
      {selectedItemId && subscribers.length > 0 && (
        <div className={styles.toolbarCard} style={{ marginTop: '-8px' }}>
          <div className={styles.filterGroup}>
            <div className={styles.searchBox}>
              <Search size={18} color="#999" />
              <input 
                type="text" 
                placeholder="Tìm kiếm user trong danh sách..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <button 
            className={styles.addBtn} 
            onClick={handleOpenModal}
            disabled={selectedIds.length === 0}
            style={{ backgroundColor: selectedIds.length > 0 ? '#1e3b32' : '#cccccc' }}
          >
            <Mail size={18} />
            Soạn Email Tới {selectedIds.length} Người
          </button>
        </div>
      )}

      {/* Table Content */}
      {selectedItemId && (
        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Users size={18} />
              Khách hàng mục tiêu quan tâm danh mục ({filteredSubscribers.length} người)
            </h3>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.checkboxCell}>
                  <input 
                    type="checkbox" 
                    className={styles.checkbox}
                    checked={
                      filteredSubscribers.length > 0 &&
                      filteredSubscribers.filter(sub => sub.status === 'active').every(sub => selectedIds.includes(sub.id))
                    }
                    onChange={handleSelectAll}
                    disabled={filteredSubscribers.filter(sub => sub.status === 'active').length === 0}
                  />
                </th>
                <th>Họ và Tên</th>
                <th>Email</th>
                <th>Lý do gửi (Thích cây thuộc danh mục này)</th>
                <th>Trạng thái nhận tin</th>
                <th style={{ textAlign: 'center' }}>Bỏ qua</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubscribers.map(sub => {
                const isSelected = selectedIds.includes(sub.id);
                const isActive = sub.status === 'active';
                return (
                  <tr 
                    key={sub.id} 
                    style={{ 
                      opacity: isActive ? (isSelected ? 1 : 0.6) : 0.4,
                      backgroundColor: !isActive ? '#fafafa' : (isSelected ? '#fcfbf8' : '')
                    }}
                  >
                    <td className={styles.checkboxCell}>
                      <input 
                        type="checkbox" 
                        className={styles.checkbox}
                        checked={isSelected}
                        onChange={() => handleSelectOne(sub.id, sub.status)}
                        disabled={!isActive}
                      />
                    </td>
                    <td style={{ fontWeight: 600 }}>{sub.name}</td>
                    <td>{sub.email}</td>
                    <td style={{ color: '#c86c42', fontWeight: 500 }}>{sub.interest}</td>
                    <td>
                      <span className={isActive ? styles.badgeActive : styles.badgeInactive}>
                        {isActive ? 'Sẵn sàng nhận' : 'Từ chối nhận'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <div className={styles.actions} style={{ justifyContent: 'center' }}>
                        <button 
                          className={styles.actionBtn} 
                          onClick={() => handleSkipUser(sub.id)}
                          title="Bỏ qua email này"
                          disabled={!isSelected}
                        >
                          <X size={18} color={isSelected ? "#ef4444" : "#ccc"} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredSubscribers.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '64px', color: '#888' }}>
                    Không tìm thấy khách hàng nào có sở thích trùng với danh mục của đối tượng được chọn.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Dashboard Prompt when no item is selected */}
      {!selectedItemId && (
        <div className={styles.emptyStateContainer}>
          <Target size={64} style={{ color: '#1e3b32', opacity: 0.2, marginBottom: 12 }} />
          <h3>Chưa cấu hình đối tượng tiếp thị mục tiêu</h3>
          <p style={{ maxWidth: 500, color: '#666', fontSize: 14 }}>
            Vui lòng chọn loại chiến dịch tiếp thị và sản phẩm/bài viết cụ thể ở bước trên. Hệ thống sẽ tự động quét qua sở thích người dùng và trích xuất danh sách khách hàng tương ứng.
          </p>
        </div>
      )}

      {/* Campaign Log / History (Database based) */}
      <div className={styles.tableCard} style={{ marginTop: 12 }}>
        <div className={styles.tableHeader} style={{ backgroundColor: '#fcfbf8', borderBottom: '2px solid #1e3b32' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#1e3b32' }}>
            <History size={18} />
            Lịch sử chiến dịch đã gửi {loadingHistory && "(Đang tải...)"}
          </h3>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID Chiến dịch</th>
              <th>Tiêu đề Email</th>
              <th>Sản phẩm / Bài viết</th>
              <th>Nhóm Danh mục</th>
              <th>Số người nhận</th>
              <th>Thời gian gửi</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {campaignHistory.map(log => (
              <tr key={log.id}>
                <td style={{ color: '#888', fontWeight: 600 }}>{log.id}</td>
                <td style={{ fontWeight: 600, color: '#1e3b32' }}>{log.title}</td>
                <td>
                  <span className={log.targetType === 'Cây mới' ? styles.badgePlant : styles.badgeBlog}>
                    {log.targetName}
                  </span>
                </td>
                <td>{log.category}</td>
                <td style={{ fontWeight: 600, textAlign: 'center' }}>{log.recipientsCount} người</td>
                <td>{log.dateSent}</td>
                <td>
                  <span className={styles.badgeSent}>
                    <Check size={12} style={{ marginRight: 3 }} /> {log.status}
                  </span>
                </td>
              </tr>
            ))}
            {campaignHistory.length === 0 && (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '32px', color: '#888' }}>
                  Chưa có lịch sử chiến dịch tiếp thị nào được gửi.
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
              <h2>Biên soạn Email Tiếp Thị</h2>
              <button className={styles.closeBtn} onClick={() => setIsModalOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSendEmail}>
              <div className={styles.modalBody}>
                <div className={styles.formGroup}>
                  <label>Nhóm khách hàng mục tiêu:</label>
                  <input 
                    type="text" 
                    value={`${selectedIds.length} khách hàng có sở thích [${selectedCategories.join(', ')}]`}
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
                  <label>Nội dung Email (<span style={{color: 'red'}}>*</span>):</label>
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
                  Gửi Tiếp Thị Ngay
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
