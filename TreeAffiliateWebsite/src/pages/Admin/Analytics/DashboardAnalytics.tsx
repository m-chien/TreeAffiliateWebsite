import React, { useState } from 'react';
import { 
  DollarSign, ShoppingCart, MousePointerClick, TrendingUp, 
  Target, BarChart3, PieChart, Activity, AlertTriangle, 
  CheckCircle, Download, Calendar
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, Legend, Cell
} from 'recharts';
import styles from './DashboardAnalytics.module.css';
import { 
  kpiData, trendChartData, funnelData, 
  topPlants, topArticles, trafficSources
} from '../../../data/analyticsMockData';

// --- SUB-COMPONENTS ---

const formatCurrency = (val: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
const formatNumber = (val: number) => new Intl.NumberFormat('vi-VN').format(val);

const KPICards = () => {
  return (
    <div className={styles.kpiGrid}>
      <div className={styles.kpiCard}>
        <div className={styles.kpiHeader}>
          <h3 className={styles.kpiTitle}>Doanh thu</h3>
          <div className={styles.kpiIconWrapper} style={{ backgroundColor: '#e0f2fe', color: '#0ea5e9' }}>
            <DollarSign size={20} />
          </div>
        </div>
        <p className={styles.kpiValue}>{formatCurrency(kpiData.totalRevenue)}</p>
        <p className={styles.kpiSub}>
          <span className={styles.trendUp}>+12.5%</span> so với tháng trước
        </p>
      </div>

      <div className={styles.kpiCard}>
        <div className={styles.kpiHeader}>
          <h3 className={styles.kpiTitle}>Hoa hồng (Est.)</h3>
          <div className={styles.kpiIconWrapper} style={{ backgroundColor: '#ffedd5', color: '#f97316' }}>
            <Target size={20} />
          </div>
        </div>
        <p className={styles.kpiValue}>{formatCurrency(kpiData.estimatedCommission)}</p>
        <p className={styles.kpiSub}>
          <span className={styles.trendUp}>+15.2%</span> so với tháng trước
        </p>
      </div>

      <div className={styles.kpiCard}>
        <div className={styles.kpiHeader}>
          <h3 className={styles.kpiTitle}>Click Affiliate</h3>
          <div className={styles.kpiIconWrapper} style={{ backgroundColor: '#f3e8ff', color: '#a855f7' }}>
            <MousePointerClick size={20} />
          </div>
        </div>
        <p className={styles.kpiValue}>{formatNumber(kpiData.totalClicks)}</p>
        <p className={styles.kpiSub}>
          <span className={styles.trendDown}>-2.4%</span> so với tháng trước
        </p>
      </div>

      <div className={styles.kpiCard}>
        <div className={styles.kpiHeader}>
          <h3 className={styles.kpiTitle}>Đơn hàng (Orders)</h3>
          <div className={styles.kpiIconWrapper} style={{ backgroundColor: '#dcfce7', color: '#22c55e' }}>
            <ShoppingCart size={20} />
          </div>
        </div>
        <p className={styles.kpiValue}>{formatNumber(kpiData.totalOrders)}</p>
        <p className={styles.kpiSub}>
          <span className={styles.trendUp}>+8.1%</span> so với tháng trước
        </p>
      </div>

      <div className={styles.kpiCard}>
        <div className={styles.kpiHeader}>
          <h3 className={styles.kpiTitle}>Conversion Rate (CR)</h3>
          <div className={styles.kpiIconWrapper} style={{ backgroundColor: '#fee2e2', color: '#ef4444' }}>
            <Activity size={20} />
          </div>
        </div>
        <p className={styles.kpiValue}>{kpiData.conversionRate}%</p>
        <p className={styles.kpiSub}>Orders / Clicks</p>
      </div>

      <div className={styles.kpiCard}>
        <div className={styles.kpiHeader}>
          <h3 className={styles.kpiTitle}>Earning Per Click (EPC)</h3>
          <div className={styles.kpiIconWrapper} style={{ backgroundColor: '#e0e7ff', color: '#6366f1' }}>
            <TrendingUp size={20} />
          </div>
        </div>
        <p className={styles.kpiValue}>{formatCurrency(kpiData.epc)}</p>
        <p className={styles.kpiSub}>Commission / Clicks</p>
      </div>

      <div className={styles.kpiCard}>
        <div className={styles.kpiHeader}>
          <h3 className={styles.kpiTitle}>Avg Order Value (AOV)</h3>
          <div className={styles.kpiIconWrapper} style={{ backgroundColor: '#ffedd5', color: '#f59e0b' }}>
            <BarChart3 size={20} />
          </div>
        </div>
        <p className={styles.kpiValue}>{formatCurrency(kpiData.aov)}</p>
        <p className={styles.kpiSub}>Revenue / Orders</p>
      </div>

      <div className={styles.kpiCard}>
        <div className={styles.kpiHeader}>
          <h3 className={styles.kpiTitle}>Sản phẩm / Bài viết</h3>
          <div className={styles.kpiIconWrapper} style={{ backgroundColor: '#f1f5f9', color: '#64748b' }}>
            <PieChart size={20} />
          </div>
        </div>
        <p className={styles.kpiValue}>{kpiData.activeProducts} / {kpiData.activeArticles}</p>
        <p className={styles.kpiSub}>Đang phát sinh click</p>
      </div>
    </div>
  );
};

const ChartsSection = () => {
  return (
    <div className={styles.chartGrid}>
      <div className={styles.chartCard}>
        <h2 className={styles.cardTitle}>
          <Activity size={20} />
          Biểu đồ Xu hướng (30 Ngày)
        </h2>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <AreaChart data={trendChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} />
              <YAxis yAxisId="left" stroke="#8884d8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" fontSize={12} tickLine={false} axisLine={false} />
              <RechartsTooltip 
                contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
              />
              <Legend />
              <Area yAxisId="left" type="monotone" name="Clicks" dataKey="clicks" stroke="#8884d8" fillOpacity={1} fill="url(#colorClicks)" />
              <Area yAxisId="right" type="monotone" name="Revenue (VND)" dataKey="revenue" stroke="#82ca9d" fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={styles.chartCard}>
        <h2 className={styles.cardTitle}>
          <Target size={20} />
          Funnel Chuyển đổi
        </h2>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart layout="vertical" data={funnelData} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
              <XAxis type="number" hide />
              <YAxis dataKey="step" type="category" width={120} fontSize={12} stroke="#64748b" tickLine={false} axisLine={false} />
              <RechartsTooltip cursor={{fill: '#f1f5f9'}} />
              <Bar dataKey="value" name="Lượt" radius={[0, 4, 4, 0]}>
                {
                  funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))
                }
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const AnalyticsTables = () => {
  return (
    <div className={styles.chartGrid} style={{ gridTemplateColumns: '1fr 1fr' }}>
      <div className={styles.chartCard} style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: 24, paddingBottom: 0 }}>
          <h2 className={styles.cardTitle}>Top 5 Cây kiếm tiền tốt nhất</h2>
        </div>
        <div className={styles.tableContainer}>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>Tên cây</th>
                <th>Clicks</th>
                <th>Orders</th>
                <th>CR%</th>
                <th>Hoa hồng</th>
              </tr>
            </thead>
            <tbody>
              {topPlants.map(plant => (
                <tr key={plant.id}>
                  <td style={{ fontWeight: 500 }}>{plant.name}</td>
                  <td className={styles.highlightMetric}>{formatNumber(plant.clicks)}</td>
                  <td>{plant.orders}</td>
                  <td>
                    <span className={plant.cr > 4 ? styles.trendUp : plant.cr < 2 ? styles.trendDown : ''}>
                      {plant.cr}%
                    </span>
                  </td>
                  <td className={styles.commission}>{formatCurrency(plant.commission)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.chartCard} style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: 24, paddingBottom: 0 }}>
          <h2 className={styles.cardTitle}>Top 5 Bài viết thu hút tương tác</h2>
        </div>
        <div className={styles.tableContainer}>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>Bài viết</th>
                <th>Views</th>
                <th>Clicks</th>
                <th>CTR%</th>
                <th>Hoa hồng</th>
              </tr>
            </thead>
            <tbody>
              {topArticles.map(article => (
                <tr key={article.id}>
                  <td style={{ fontWeight: 500 }}>{article.title.substring(0, 30)}...</td>
                  <td>{formatNumber(article.views)}</td>
                  <td className={styles.highlightMetric}>{formatNumber(article.clicks)}</td>
                  <td>
                    <span className={article.ctr > 15 ? styles.trendUp : article.ctr < 5 ? styles.trendDown : ''}>
                      {article.ctr}%
                    </span>
                  </td>
                  <td className={styles.commission}>{formatCurrency(article.commission)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Traffic Table spanning full width */}
      <div className={styles.chartCard} style={{ gridColumn: '1 / -1', padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: 24, paddingBottom: 0 }}>
          <h2 className={styles.cardTitle}>Phân tích Nguồn Traffic</h2>
        </div>
        <div className={styles.tableContainer}>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>Nguồn (Source)</th>
                <th>Lượt Clicks</th>
                <th>Đơn hàng</th>
                <th>Tỉ lệ chuyển đổi (CR)</th>
                <th>Doanh thu</th>
                <th>Hoa hồng mang lại</th>
              </tr>
            </thead>
            <tbody>
              {trafficSources.map((traffic, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 600 }}>{traffic.source}</td>
                  <td className={styles.highlightMetric}>{formatNumber(traffic.clicks)}</td>
                  <td>{traffic.orders}</td>
                  <td>
                    <span className={traffic.cr > 4 ? styles.badge + ' ' + styles.success : traffic.cr < 3 ? styles.badge + ' ' + styles.danger : styles.badge + ' ' + styles.warning}>
                      {traffic.cr}%
                    </span>
                  </td>
                  <td className={styles.money}>{formatCurrency(traffic.revenue)}</td>
                  <td className={styles.commission}>+{formatCurrency(traffic.commission)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const Diagnostics = () => {
  return (
    <div className={styles.chartCard}>
      <h2 className={styles.cardTitle}>
        <Activity size={20} />
        Chẩn đoán Hiệu suất & Insight Gợi ý
      </h2>
      <div className={styles.diagGrid}>
        
        <div className={`${styles.insightCard} ${styles.danger}`}>
          <div className={styles.insightHeader}>
            <AlertTriangle size={20} color="#ef4444" />
            <h4>Cảnh báo: Traffic cao nhưng Order thấp</h4>
          </div>
          <p className={styles.insightDesc}>
            Bài viết <strong>"Cách trồng sen đá không bị úng nước"</strong> có tới 42,000 views nhưng chỉ mang lại 40 đơn hàng (CTR: 2.8%, CR thấp). 
          </p>
          <span className={`${styles.badge} ${styles.danger}`}>Hành động: Tối ưu lại Landing Page sen đá, kiểm tra giá bán hoặc thêm nút "Mua ngay" rõ ràng hơn.</span>
        </div>

        <div className={`${styles.insightCard} ${styles.success}`}>
          <div className={styles.insightHeader}>
            <CheckCircle size={20} color="#10b981" />
            <h4>Điểm sáng: Kênh Email Marketing mang lại EPC cực tốt</h4>
          </div>
          <p className={styles.insightDesc}>
            Nguồn <strong>Email</strong> có tỉ lệ chuyển đổi (CR) dẫn đầu đạt 5.62%, mang lại EPC (Earning Per Click) cực kì cao. Tập khách hàng này cực kì chất lượng.
          </p>
          <span className={`${styles.badge} ${styles.success}`}>Hành động: Đẩy mạnh các chiến dịch gửi email chăm sóc cây / mã giảm giá hàng tuần.</span>
        </div>

        <div className={`${styles.insightCard} ${styles.warning}`}>
          <div className={styles.insightHeader}>
            <AlertTriangle size={20} color="#f59e0b" />
            <h4>Sản phẩm tiềm năng: Cây Lưỡi Hổ</h4>
          </div>
          <p className={styles.insightDesc}>
            <strong>Cây Lưỡi Hổ</strong> đang kéo được 5,500 clicks (nhiều nhất) nhưng Conversion Rate chỉ lẹt đẹt ở mức 1.72%. Có thể do hình ảnh trên gian hàng đối tác xấu, hoặc hết hàng.
          </p>
          <span className={`${styles.badge} ${styles.warning}`}>Hành động: Check link Affiliate xem gian hàng còn hàng không, tìm shop khác bán rẻ hơn.</span>
        </div>

        <div className={`${styles.insightCard} ${styles.success}`}>
          <div className={styles.insightHeader}>
            <CheckCircle size={20} color="#10b981" />
            <h4>Bài viết "Ngôi sao": Top 10 cây lọc không khí</h4>
          </div>
          <p className={styles.insightDesc}>
            Bài viết này tạo ra 156 đơn hàng và thu về hơn 3.5 triệu đồng hoa hồng. Người dùng đọc bài này có ý định mua rất mạnh.
          </p>
          <span className={`${styles.badge} ${styles.success}`}>Hành động: Đổ thêm ngân sách chạy Ads cho bài viết này, ghim lên Trang chủ.</span>
        </div>

      </div>
    </div>
  );
};


// --- MAIN DASHBOARD AGGREGATOR ---

const DashboardAnalytics: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState('30days');

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <h1>Analytics & Insights</h1>
          <p>Phân tích chuyên sâu về chỉ số Affiliate, Traffic và Hiệu suất bán hàng.</p>
        </div>
        <div className={styles.filterControls}>
          <button className={styles.dateFilter}>
            <Calendar size={16} />
            Hôm nay: {new Date().toLocaleDateString('vi-VN')}
          </button>
          <select 
            className={styles.filterSelect}
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
          >
            <option value="7days">7 Ngày qua</option>
            <option value="30days">30 Ngày qua</option>
            <option value="thisMonth">Tháng này</option>
            <option value="all">Tất cả thời gian</option>
          </select>
          <button className={styles.filterSelect} style={{ backgroundColor: '#1e3b32', color: 'white', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Download size={16} /> Xuất Báo Cáo
          </button>
        </div>
      </div>

      <KPICards />
      <ChartsSection />
      <Diagnostics />
      <AnalyticsTables />

    </div>
  );
};

export default DashboardAnalytics;
