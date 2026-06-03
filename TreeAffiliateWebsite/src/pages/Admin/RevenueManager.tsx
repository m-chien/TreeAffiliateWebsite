import React, { useState, useMemo, useEffect } from 'react';
import { 
  DollarSign, TrendingUp, ShoppingBag, CheckCircle, Search, Upload, Eye, Clock, Calendar 
} from 'lucide-react';
import axios from 'axios'; // Bổ sung import axios
import styles from './RevenueManager.module.css';
import { managedRevenueOrders as initialOrders } from '../../data/adminData';
import type { ManagedRevenueOrder } from '../../types';
import AdminModal from './AdminModal';
import { fetchAllAffiliateOrders, fetchAllLinkAffiliates } from '../../services/affiliateOrderService';

const RevenueManager: React.FC = () => {
  const [orders, setOrders] = useState<ManagedRevenueOrder[]>(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [partnerFilter, setPartnerFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('30'); 

  // Modal states
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<ManagedRevenueOrder | null>(null);

  // Import State
  const [importPartner, setImportPartner] = useState<'Shopee' | 'TikTok Shop' | 'Eco Garden'>('TikTok Shop');
  const [rawText, setRawText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [draggedFile, setDraggedFile] = useState<{ name: string; size: number } | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  
  // Toast notifications
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const formatVND = (num: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num).replace('₫', '₫');
  };

  const parseDateStr = (dateStr: string): Date => {
    if (dateStr.includes('/')) {
      const [datePart] = dateStr.split(' ');
      const [day, month, year] = datePart.split('/').map(Number);
      return new Date(year, month - 1, day);
    }
    return new Date(dateStr);
  };

  const timeCutoffDate = useMemo(() => {
    const now = new Date();
    now.setDate(now.getDate() - Number(timeFilter));
    return now;
  }, [timeFilter]);

  // HÀM LOAD DỮ LIỆU TỪ DATABASE
  const loadData = async () => {
    try {
      const [apiOrders, apiLinks] = await Promise.all([
        fetchAllAffiliateOrders(0, 1000),
        fetchAllLinkAffiliates(0, 1000)
      ]);

      if (apiOrders && apiOrders.length > 0) {
        const mapped: ManagedRevenueOrder[] = apiOrders.map(o => {
          const link = apiLinks.find(l => l.id === o.linkAffiliateId);
          // Ưu tiên lấy tên sản phẩm từ DB, nếu không có mới lấy từ link
          const productName = o.tenSanPham || link?.moTa || "Sản phẩm liên kết";
          
          let partner: 'Shopee' | 'TikTok Shop' | 'Eco Garden' | 'Other' = 'Other';
          const platformStr = String(o.nenTang || '').toUpperCase(); // Chuyển hết về in hoa để so sánh
          
          if (platformStr.includes('SHOPEE')) partner = 'Shopee';
          else if (platformStr.includes('TIKTOK')) partner = 'TikTok Shop';
          else if (platformStr.includes('LAZADA') || platformStr.includes('ECO')) partner = 'Eco Garden';

          let status: 'Settled' | 'Pending' | 'Ineligible' = 'Pending';
          if (o.trangThai === 'COMPLETED') status = 'Settled';
          else if (o.trangThai === 'CANCELLED') status = 'Ineligible';

          const ratePercent = o.giaTriDonHang > 0 ? `${((o.hoaHong / o.giaTriDonHang) * 100).toFixed(1)}%` : "10%";

          return {
            id: o.maCode || String(o.id),
            productName,
            partner,
            status,
            gmv: o.giaTriDonHang,
            commission: o.hoaHong,
            commissionRate: ratePercent,
            orderDate: o.ngayDat ? o.ngayDat.replace('T', ' ') : new Date().toISOString().replace('T', ' ').split('.')[0],
            settlementDate: o.ngayCapNhat ? o.ngayCapNhat.replace('T', ' ') : '/',
            price: o.giaTriDonHang,
            quantity: 1
          };
        });
        setOrders(mapped);
      }
    } catch (err) {
      console.error("Lỗi khi tải đơn hàng từ database:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // HÀM CHỌN FILE
  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      setDraggedFile({ name: file.name, size: Math.round(file.size / 1024) });
      setRawText(''); // Xóa text nếu đã dùng file
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setDraggedFile({ name: file.name, size: Math.round(file.size / 1024) });
      setRawText('');
    }
  };

  // HÀM GỌI API IMPORT XUỐNG BACKEND JAVA
  const executeImport = async () => {
    if (!rawText.trim() && !selectedFile) {
      showToast("Vui lòng kéo thả file báo cáo hoặc dán văn bản!", "error");
      return;
    }

    setIsImporting(true);
    showToast("Đang xử lý dữ liệu...", "success");

    const formData = new FormData();
    formData.append("doiTac", importPartner);
    if (selectedFile) formData.append("file", selectedFile);
    if (rawText) formData.append("rawData", rawText);

    try {
      // Gửi API sang Spring Boot
      const res = await axios.post('http://localhost:8080/api/v1/affiliate-order/import', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      showToast(res.data.message || "Import đồng bộ dữ liệu thành công!", "success");
      
      // Load lại bảng dữ liệu mới nhất
      await loadData();
      
      // Đóng modal và reset
      setIsImportModalOpen(false);
      setRawText('');
      setSelectedFile(null);
      setDraggedFile(null);
    } catch (err: any) {
      console.error(err);
      showToast(err.response?.data?.message || "Lỗi cấu trúc File, Import thất bại!", "error");
    } finally {
      setIsImporting(false);
    }
  };

  // Filter & Search Logic
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchSearch = 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.productName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchPartner = partnerFilter === 'all' || order.partner === partnerFilter;
      
      let matchStatus = true;
      if (statusFilter !== 'all') {
        if (statusFilter === 'Settled') matchStatus = order.status === 'Settled';
        else if (statusFilter === 'Pending') matchStatus = order.status === 'Pending';
      }

      const orderDate = parseDateStr(order.orderDate);
      const matchTime = orderDate >= timeCutoffDate;

      return matchSearch && matchPartner && matchStatus && matchTime;
    });
  }, [orders, searchTerm, partnerFilter, statusFilter, timeCutoffDate]);

  // Tính toán thống kê...
  const stats = useMemo(() => {
    let gmv = 0, commission = 0, ordersCount = 0, settledCount = 0;
    filteredOrders.forEach(o => {
      gmv += o.gmv;
      commission += o.commission;
      ordersCount += 1;
      if (o.status === 'Settled') settledCount += 1;
    });
    return { gmv, commission, orders: ordersCount, settled: settledCount };
  }, [filteredOrders]);

  const partnerAnalytics = useMemo(() => {
    const partnerData: Record<string, { gmv: number; comm: number }> = {};
    orders.forEach(o => {
      if (!partnerData[o.partner]) partnerData[o.partner] = { gmv: 0, comm: 0 };
      partnerData[o.partner].gmv += o.gmv;
      partnerData[o.partner].comm += o.commission;
    });
    return Object.entries(partnerData).map(([name, val]) => ({ name, ...val })).sort((a, b) => b.gmv - a.gmv);
  }, [orders]);

  const productAnalytics = useMemo(() => {
    const products: Record<string, number> = {};
    orders.forEach(o => {
      products[o.productName] = (products[o.productName] || 0) + o.commission;
    });
    return Object.entries(products).map(([name, comm]) => ({ name, comm })).sort((a, b) => b.comm - a.comm).slice(0, 5);
  }, [orders]);

  const handleOpenDetail = (order: ManagedRevenueOrder) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };

  return (
    <div className={styles.container}>
      {toast && (
        <div className={`${styles.toast} ${toast.type === 'success' ? styles.toastSuccess : styles.toastError}`}>
          {toast.message}
        </div>
      )}

      <div className={styles.header}>
        <h1 className={styles.title}>Quản lý doanh thu Affiliate</h1>
        <p className={styles.subtitle}>Theo dõi doanh thu, hoa hồng và lịch sử thanh toán từ các đối tác liên kết</p>
      </div>

      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.iconMoney}`}><DollarSign size={24} /></div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Tổng doanh thu (GMV)</span>
            <span className={styles.statValue}>{formatVND(stats.gmv)}</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.iconPercent}`}><TrendingUp size={24} /></div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Tổng hoa hồng</span>
            <span className={styles.statValue}>{formatVND(stats.commission)}</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.iconOrder}`}><ShoppingBag size={24} /></div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Đơn hàng Affiliate</span>
            <span className={styles.statValue}>{stats.orders.toLocaleString()}</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.iconCheck}`}><CheckCircle size={24} /></div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Đã quyết toán</span>
            <span className={styles.statValue}>{stats.settled.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className={styles.toolbarCard}>
        <div className={styles.filterGroup}>
          <div className={styles.searchBox}>
            <Search size={18} color="#666" />
            <input type="text" placeholder="Tìm theo mã đơn hàng hoặc sản phẩm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
          </div>
          <select className={styles.filterSelect} value={partnerFilter} onChange={(e) => setPartnerFilter(e.target.value)}>
            <option value="all">Đối tác: Tất cả</option>
            <option value="Shopee">Shopee</option>
            <option value="TikTok Shop">TikTok Shop</option>
            <option value="Eco Garden">Eco Garden</option>
          </select>
          <select className={styles.filterSelect} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">Trạng thái: Tất cả</option>
            <option value="Settled">Đã quyết toán</option>
            <option value="Pending">Chờ quyết toán</option>
          </select>
          <select className={styles.filterSelect} value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
            <option value="7">Khoảng thời gian: 7 ngày</option>
            <option value="30">Khoảng thời gian: 30 ngày</option>
            <option value="90">Khoảng thời gian: 90 ngày</option>
            <option value="365">Khoảng thời gian: 1 năm</option>
          </select>
        </div>
        <button className={styles.importBtn} onClick={() => setIsImportModalOpen(true)}>
          <Upload size={18} /> Import báo cáo
        </button>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableHeader}><h3>Danh sách doanh thu liên kết</h3></div>
        <div className={styles.tableWrapper}>
          {filteredOrders.length > 0 ? (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Mã đơn hàng</th><th>Đối tác</th><th>Sản phẩm</th><th>GMV</th><th>Hoa hồng</th>
                  <th>Trạng thái</th><th>Ngày đặt hàng</th><th>Ngày quyết toán</th><th style={{ textAlign: 'right' }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, idx) => (
                  <tr key={`${order.id}-${idx}`}>
                    <td><span className={styles.orderId}>{order.id}</span></td>
                    <td>
                      <span className={`${styles.partnerBadge} ${order.partner === 'Shopee' ? styles.shopeeBadge : order.partner === 'TikTok Shop' ? styles.tiktokBadge : styles.ecoBadge}`}>
                        {order.partner}
                      </span>
                    </td>
                    <td><div className={styles.productName} title={order.productName}>{order.productName}</div></td>
                    <td><span className={styles.gmvText}>{formatVND(order.gmv)}</span></td>
                    <td><span className={styles.commissionText}>{formatVND(order.commission)}</span></td>
                    <td>
                      <span className={order.status === 'Settled' ? styles.badgeSettled : order.status === 'Pending' ? styles.badgePendingOrder : styles.badgeIneligible}>
                        {order.status === 'Settled' ? 'Đã quyết toán' : order.status === 'Pending' ? 'Chờ quyết toán' : 'Không đủ điều kiện'}
                      </span>
                    </td>
                    <td><span className={styles.dateText}>{order.orderDate.split(' ')[0]}</span></td>
                    <td><span className={styles.dateText}>{order.settlementDate?.split(' ')[0]}</span></td>
                    <td>
                      <div className={styles.actions} style={{ justifyContent: 'flex-end' }}>
                        <button className={styles.actionBtn} title="Xem chi tiết" onClick={() => handleOpenDetail(order)}>
                          <Eye size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className={styles.emptyState}>
              <ShoppingBag size={48} />
              <h4>Không tìm thấy đơn hàng nào</h4>
              <p>Hãy thay đổi bộ lọc hoặc import thêm báo cáo.</p>
            </div>
          )}
        </div>
      </div>

      <div className={styles.analyticsRow}>
        <div className={styles.analyticsCard}>
          <h3 className={styles.sectionTitle}>Top đối tác mang lại doanh thu</h3>
          <div className={styles.analyticsList}>
            {partnerAnalytics.map((p, idx) => (
              <div key={idx} className={styles.partnerItem}>
                <div className={styles.partnerMain}>
                  <div className={styles.rankNumber}>{idx + 1}</div>
                  <span className={styles.partnerLabel}>{p.name}</span>
                </div>
                <div className={styles.partnerStats}>
                  <span className={styles.partnerGmv}>GMV: {formatVND(p.gmv)}</span>
                  <span className={styles.partnerComm}>HH: {formatVND(p.comm)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.analyticsCard}>
          <h3 className={styles.sectionTitle}>Top sản phẩm kiếm hoa hồng</h3>
          <div className={styles.analyticsList}>
            {productAnalytics.map((p, idx) => (
              <div key={idx} className={styles.productItem}>
                <div className={styles.productMain}>
                  <div className={styles.rankNumber}>{idx + 1}</div>
                  <span className={styles.productLabel}>{p.name}</span>
                </div>
                <span className={styles.productCommAmount}>{formatVND(p.comm)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Import Modal */}
      <AdminModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        title="Import báo cáo Affiliate"
        footer={
          <>
            <button className={styles.cancelBtn} onClick={() => setIsImportModalOpen(false)}>Hủy</button>
            <button className={styles.confirmBtn} onClick={executeImport} disabled={isImporting}>
              {isImporting ? 'Đang xử lý...' : 'Import dữ liệu'}
            </button>
          </>
        }
      >
        <div className={styles.modalBody}>
          <div className={styles.formGroup}>
            <label>Chọn nguồn dữ liệu</label>
            <select className={styles.select} value={importPartner} onChange={(e) => setImportPartner(e.target.value as 'Shopee' | 'TikTok Shop' | 'Eco Garden')}>
              <option value="TikTok Shop">📹 TikTok Shop</option>
              <option value="Shopee">🛍️ Shopee</option>
              <option value="Eco Garden">🌿 Eco Garden</option>
            </select>
          </div>
          <div className={styles.fileUploadBox} onDragOver={(e) => e.preventDefault()} onDrop={handleFileDrop} onClick={() => document.getElementById('file-input')?.click()}>
            <input id="file-input" type="file" accept=".txt,.csv,.xlsx,.xls" onChange={handleFileSelect} />
            <Upload size={36} className={styles.uploadIcon} />
            <div className={styles.uploadTitle}>Kéo thả file báo cáo vào đây hoặc click để chọn file</div>
            <div className={styles.uploadDesc}>Hỗ trợ tệp định dạng .txt, .csv, hoặc bảng Excel (.xlsx, .xls)</div>
          </div>
          {draggedFile && (
            <div className={styles.excelPreview}>
              <span className={styles.excelFileName}>{draggedFile.name}</span>
              <span className={styles.excelFileSize}>{draggedFile.size} KB</span>
            </div>
          )}
          <div className={styles.rawPasteBox}>
            <label style={{ fontSize: '13px', fontWeight: 600 }}>Hoặc dán nội dung văn bản (tab-separated):</label>
            <textarea 
              className={styles.rawTextarea} placeholder="Dán các dòng báo cáo tại đây..." 
              value={rawText} onChange={(e) => { setRawText(e.target.value); setSelectedFile(null); setDraggedFile(null); }}
            />
          </div>
        </div>
      </AdminModal>

      {/* Detail Modal */}
      <AdminModal isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)} title="Chi tiết giao dịch" footer={<button className={styles.confirmBtn} onClick={() => setIsDetailModalOpen(false)}>Đóng</button>}>
        {selectedOrder && (
          <div className={styles.modalBody}>
            <div className={styles.detailGrid}>
              <div className={styles.detailItem}><span className={styles.detailItemLabel}>Mã đơn hàng</span><span className={styles.detailItemValue}>{selectedOrder.id}</span></div>
              <div className={styles.detailItem}><span className={styles.detailItemLabel}>Đối tác</span><span className={styles.detailItemValue}>{selectedOrder.partner}</span></div>
              <div className={styles.detailItem + ' ' + styles.detailFullWidth}><span className={styles.detailItemLabel}>Sản phẩm</span><span className={styles.detailItemValue}>{selectedOrder.productName}</span></div>
              <div className={styles.detailItem}><span className={styles.detailItemLabel}>GMV</span><span className={styles.detailItemValue}>{formatVND(selectedOrder.gmv)}</span></div>
              <div className={styles.detailItem}><span className={styles.detailItemLabel}>Hoa hồng</span><span className={styles.detailItemValue}>{formatVND(selectedOrder.commission)}</span></div>
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  );
};

export default RevenueManager;