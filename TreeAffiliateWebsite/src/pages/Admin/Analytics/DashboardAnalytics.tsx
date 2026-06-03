import React, { useState, useEffect } from 'react';
import { 
  DollarSign, ShoppingCart, MousePointerClick, TrendingUp, 
  Target, BarChart3, PieChart, Activity, Download, Calendar
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, Legend, Cell
} from 'recharts';
import styles from './DashboardAnalytics.module.css';
import { 
  kpiData as mockKpiData, trendChartData as mockTrendData, funnelData as mockFunnelData, 
  topPlants as mockTopPlants, topArticles, trafficSources
} from '../../../data/analyticsMockData';
import { fetchAllAffiliateOrders, fetchAllLinkAffiliates } from '../../../services/affiliateOrderService';

// --- SUB-COMPONENTS ---

const formatCurrency = (val: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
const formatNumber = (val: number) => new Intl.NumberFormat('vi-VN').format(val);

const loadXLSX = () => {
  return new Promise<any>((resolve, reject) => {
    if ((window as any).XLSX) {
      resolve((window as any).XLSX);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js';
    script.onload = () => resolve((window as any).XLSX);
    script.onerror = (err) => reject(err);
    document.body.appendChild(script);
  });
};

interface KPICardsProps {
  kpi: typeof mockKpiData;
}

const KPICards: React.FC<KPICardsProps> = ({ kpi }) => {
  return (
    <div className={styles.kpiGrid}>
      <div className={styles.kpiCard}>
        <div className={styles.kpiHeader}>
          <h3 className={styles.kpiTitle}>Doanh thu</h3>
          <div className={styles.kpiIconWrapper} style={{ backgroundColor: '#e0f2fe', color: '#0ea5e9' }}>
            <DollarSign size={20} />
          </div>
        </div>
        <p className={styles.kpiValue}>{formatCurrency(kpi.totalRevenue)}</p>
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
        <p className={styles.kpiValue}>{formatCurrency(kpi.estimatedCommission)}</p>
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
        <p className={styles.kpiValue}>{formatNumber(kpi.totalClicks)}</p>
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
        <p className={styles.kpiValue}>{formatNumber(kpi.totalOrders)}</p>
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
        <p className={styles.kpiValue}>{kpi.conversionRate}%</p>
        <p className={styles.kpiSub}>Orders / Clicks</p>
      </div>

      <div className={styles.kpiCard}>
        <div className={styles.kpiHeader}>
          <h3 className={styles.kpiTitle}>Earning Per Click (EPC)</h3>
          <div className={styles.kpiIconWrapper} style={{ backgroundColor: '#e0e7ff', color: '#6366f1' }}>
            <TrendingUp size={20} />
          </div>
        </div>
        <p className={styles.kpiValue}>{formatCurrency(kpi.epc)}</p>
        <p className={styles.kpiSub}>Commission / Clicks</p>
      </div>

      <div className={styles.kpiCard}>
        <div className={styles.kpiHeader}>
          <h3 className={styles.kpiTitle}>Avg Order Value (AOV)</h3>
          <div className={styles.kpiIconWrapper} style={{ backgroundColor: '#ffedd5', color: '#f59e0b' }}>
            <BarChart3 size={20} />
          </div>
        </div>
        <p className={styles.kpiValue}>{formatCurrency(kpi.aov)}</p>
        <p className={styles.kpiSub}>Revenue / Orders</p>
      </div>

      <div className={styles.kpiCard}>
        <div className={styles.kpiHeader}>
          <h3 className={styles.kpiTitle}>Sản phẩm / Bài viết</h3>
          <div className={styles.kpiIconWrapper} style={{ backgroundColor: '#f1f5f9', color: '#64748b' }}>
            <PieChart size={20} />
          </div>
        </div>
        <p className={styles.kpiValue}>{kpi.activeProducts} / {kpi.activeArticles}</p>
        <p className={styles.kpiSub}>Đang phát sinh click</p>
      </div>
    </div>
  );
};

interface ChartsSectionProps {
  trendData: typeof mockTrendData;
  funnel: typeof mockFunnelData;
}

const ChartsSection: React.FC<ChartsSectionProps> = ({ trendData, funnel }) => {
  return (
    <div className={styles.chartGrid}>
      <div className={styles.chartCard}>
        <h2 className={styles.cardTitle}>
          <Activity size={20} />
          Biểu đồ Xu hướng (30 Ngày)
        </h2>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <AreaChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
            <BarChart layout="vertical" data={funnel} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
              <XAxis type="number" hide />
              <YAxis dataKey="step" type="category" width={120} fontSize={12} stroke="#64748b" tickLine={false} axisLine={false} />
              <RechartsTooltip cursor={{fill: '#f1f5f9'}} />
              <Bar dataKey="value" name="Lượt" radius={[0, 4, 4, 0]}>
                {
                  funnel.map((entry, index) => (
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

interface AnalyticsTablesProps {
  plants: typeof mockTopPlants;
  articles: typeof topArticles;
  traffic: typeof trafficSources;
}

const AnalyticsTables: React.FC<AnalyticsTablesProps> = ({ plants, articles, traffic }) => {
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
              {plants.map(plant => (
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
              {articles.map(article => (
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
              {traffic.map((trafficItem, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 600 }}>{trafficItem.source}</td>
                  <td className={styles.highlightMetric}>{formatNumber(trafficItem.clicks)}</td>
                  <td>{trafficItem.orders}</td>
                  <td>
                    <span className={trafficItem.cr > 4 ? styles.badge + ' ' + styles.success : trafficItem.cr < 3 ? styles.badge + ' ' + styles.danger : styles.badge + ' ' + styles.warning}>
                      {trafficItem.cr}%
                    </span>
                  </td>
                  <td className={styles.money}>{formatCurrency(trafficItem.revenue)}</td>
                  <td className={styles.commission}>+{formatCurrency(trafficItem.commission)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- MAIN DASHBOARD AGGREGATOR ---

const DashboardAnalytics: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState('30days');
  const [kpi, setKpi] = useState<typeof mockKpiData>(mockKpiData);
  const [trend, setTrend] = useState<typeof mockTrendData>(mockTrendData);
  const [funnel, setFunnel] = useState<typeof mockFunnelData>(mockFunnelData);
  const [topPlantsList, setTopPlantsList] = useState<typeof mockTopPlants>(mockTopPlants);
  const [topArticlesList, setTopArticlesList] = useState<typeof topArticles>(topArticles);
  const [trafficSourcesList, setTrafficSourcesList] = useState<typeof trafficSources>(trafficSources);

  useEffect(() => {
    async function loadBackendData() {
      try {
        const [orders, links, articles] = await Promise.all([
          fetchAllAffiliateOrders(0, 1000),
          fetchAllLinkAffiliates(0, 1000),
          fetch("http://localhost:8080/api/v1/bai-viet?page=0&size=100")
            .then(res => {
              if (!res.ok) throw new Error(`HTTP ${res.status}`);
              return res.json();
            })
            .then(data => data.result?.content || [])
            .catch(err => {
              console.error("Lỗi khi load bài viết từ DB:", err);
              return [];
            })
        ]);

        if (orders && orders.length > 0) {
          // Calculate KPI metrics
          const completedOrders = orders.filter(o => o.trangThai === 'COMPLETED');
          const nonCancelledOrders = orders.filter(o => o.trangThai !== 'CANCELLED');
          
          const totalRevenue = completedOrders.reduce((sum, o) => sum + o.giaTriDonHang, 0);
          const estimatedCommission = nonCancelledOrders.reduce((sum, o) => sum + o.hoaHong, 0);
          const totalOrders = nonCancelledOrders.length;
          
          const totalClicks = links.reduce((sum, l) => sum + (l.luotClick || 0), 0) || 1;
          const conversionRate = Number(((totalOrders / totalClicks) * 100).toFixed(2));
          const epc = Math.round(estimatedCommission / totalClicks);
          const aov = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

          setKpi({
            totalRevenue,
            estimatedCommission,
            totalClicks,
            totalOrders,
            conversionRate,
            epc,
            aov,
            activeProducts: links.filter(l => l.luotClick > 0).length,
            activeArticles: articles.length
          });

          // Generate Funnel Data
          setFunnel([
            { step: 'Lượt xem bài viết', value: totalClicks * 5, fill: '#8884d8' },
            { step: 'Click Affiliate', value: totalClicks, fill: '#83a6ed' },
            { step: 'Thêm vào giỏ', value: Math.round(totalClicks * 0.2), fill: '#8dd1e1' },
            { step: 'Đặt hàng thành công', value: totalOrders, fill: '#82ca9d' }
          ]);

          // Process Top Plants
          const plantStats: Record<number, { name: string; clicks: number; orders: number; revenue: number; commission: number }> = {};
          
          links.forEach(link => {
            plantStats[link.id] = {
              name: link.moTa || `Link Affiliate #${link.id}`,
              clicks: link.luotClick || 0,
              orders: 0,
              revenue: 0,
              commission: 0
            };
          });

          completedOrders.forEach(o => {
            if (o.linkAffiliateId && plantStats[o.linkAffiliateId]) {
              plantStats[o.linkAffiliateId].orders += 1;
              plantStats[o.linkAffiliateId].revenue += o.giaTriDonHang;
              plantStats[o.linkAffiliateId].commission += o.hoaHong;
            }
          });

          const mappedPlants = Object.entries(plantStats).map(([id, val]) => {
            const cr = val.clicks > 0 ? Number(((val.orders / val.clicks) * 100).toFixed(1)) : 0;
            return {
              id,
              name: val.name,
              clicks: val.clicks,
              orders: val.orders,
              cr,
              revenue: val.revenue,
              commission: val.commission
            };
          }).sort((a, b) => b.commission - a.commission).slice(0, 5);

          if (mappedPlants.length > 0) {
            setTopPlantsList(mappedPlants);
          }

          // Process Top Articles
          if (articles && articles.length > 0) {
            const mappedArticles = articles.map((art: any) => {
              const artLinks = art.linkAffiliates || [];
              const artLinkIds = new Set(artLinks.map((l: any) => l.id));
              
              const artClicks = artLinks.reduce((sum: number, l: any) => sum + (l.luotClick || 0), 0);
              const artOrdersList = completedOrders.filter(o => artLinkIds.has(o.linkAffiliateId));
              const artOrders = artOrdersList.length;
              const artRevenue = artOrdersList.reduce((sum, o) => sum + o.giaTriDonHang, 0);
              const artCommission = artOrdersList.reduce((sum, o) => sum + o.hoaHong, 0);
              
              const views = art.luotXem || 0;
              const ctr = views > 0 ? Number(((artClicks / views) * 100).toFixed(1)) : 0;
              
              return {
                id: String(art.id),
                title: art.tieuDe,
                views,
                clicks: artClicks,
                ctr,
                orders: artOrders,
                revenue: artRevenue,
                commission: artCommission
              };
            }).sort((a: any, b: any) => b.commission - a.commission).slice(0, 5);

            if (mappedArticles.length > 0) {
              setTopArticlesList(mappedArticles);
            }
          }

          // Process Traffic Sources by Platform from DB
          const platformStats: Record<string, { clicks: number; orders: number; revenue: number; commission: number }> = {
            'Shopee': { clicks: 0, orders: 0, revenue: 0, commission: 0 },
            'TikTok Shop': { clicks: 0, orders: 0, revenue: 0, commission: 0 },
            'Eco Garden': { clicks: 0, orders: 0, revenue: 0, commission: 0 },
          };

          links.forEach(l => {
            let plat = 'Eco Garden';
            if (l.nhaCungCap?.toLowerCase().includes('shopee')) plat = 'Shopee';
            else if (l.nhaCungCap?.toLowerCase().includes('tiktok')) plat = 'TikTok Shop';
            
            if (platformStats[plat]) {
              platformStats[plat].clicks += (l.luotClick || 0);
            }
          });

          completedOrders.forEach(o => {
            let plat = 'Eco Garden';
            if (o.nenTang?.toLowerCase().includes('shopee')) plat = 'Shopee';
            else if (o.nenTang?.toLowerCase().includes('tiktok')) plat = 'TikTok Shop';

            if (platformStats[plat]) {
              platformStats[plat].orders += 1;
              platformStats[plat].revenue += o.giaTriDonHang;
              platformStats[plat].commission += o.hoaHong;
            }
          });

          const calculatedTraffic = Object.entries(platformStats).map(([source, val]) => {
            const cr = val.clicks > 0 ? Number(((val.orders / val.clicks) * 100).toFixed(2)) : 0;
            return {
              source,
              clicks: val.clicks,
              orders: val.orders,
              cr,
              revenue: val.revenue,
              commission: val.commission
            };
          }).sort((a, b) => b.revenue - a.revenue);

          setTrafficSourcesList(calculatedTraffic);

          // Build 30-day Trend Chart Data
          const chartDataMap: Record<string, { clicks: number; orders: number; revenue: number; commission: number }> = {};
          
          for (let i = 29; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
            chartDataMap[dateStr] = { clicks: 0, orders: 0, revenue: 0, commission: 0 };
          }

          completedOrders.forEach(o => {
            if (o.ngayDat) {
              const d = new Date(o.ngayDat);
              const dateStr = d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
              if (chartDataMap[dateStr]) {
                chartDataMap[dateStr].orders += 1;
                chartDataMap[dateStr].revenue += o.giaTriDonHang;
                chartDataMap[dateStr].commission += o.hoaHong;
              }
            }
          });

          // Standardize trend clicks distributing total clicks across 30 days roughly
          const distributedClicks = Math.round(totalClicks / 30);
          const formattedTrend = Object.entries(chartDataMap).map(([date, val]) => ({
            date,
            clicks: val.clicks || distributedClicks,
            orders: val.orders,
            revenue: val.revenue,
            commission: val.commission
          }));
          
          setTrend(formattedTrend);
        }
      } catch (err) {
        console.error("Lỗi khi load dữ liệu thật từ database:", err);
      }
    }

    loadBackendData();
  }, []);

  const handleExportReport = async () => {
    try {
      const XLSX = await loadXLSX();
      
      // 1. Sheet KPI
      const kpiRows = [
        ["Chỉ số thống kê", "Giá trị"],
        ["Tổng doanh thu (GMV)", formatCurrency(kpi.totalRevenue)],
        ["Tổng hoa hồng (Est.)", formatCurrency(kpi.estimatedCommission)],
        ["Tổng click affiliate", formatNumber(kpi.totalClicks)],
        ["Tổng đơn hàng", formatNumber(kpi.totalOrders)],
        ["Tỷ lệ chuyển đổi (CR%)", `${kpi.conversionRate}%`],
        ["EPC (Earning Per Click)", formatCurrency(kpi.epc)],
        ["AOV (Average Order Value)", formatCurrency(kpi.aov)],
        ["Số sản phẩm phát sinh click", kpi.activeProducts],
        ["Số bài viết phát sinh click", kpi.activeArticles]
      ];
      const wsKpi = XLSX.utils.aoa_to_sheet(kpiRows);
      
      // 2. Sheet Top Plants
      const plantRows = [
        ["Tên cây cảnh", "Số Clicks", "Số Đơn hàng", "Tỷ lệ CR%", "Hoa hồng đem lại"],
        ...topPlantsList.map(p => [p.name, p.clicks, p.orders, `${p.cr}%`, formatCurrency(p.commission)])
      ];
      const wsPlants = XLSX.utils.aoa_to_sheet(plantRows);

      // 3. Sheet Top Articles
      const articleRows = [
        ["Tiêu đề bài viết", "Lượt xem", "Số Clicks", "Tỷ lệ CTR%", "Hoa hồng đem lại"],
        ...topArticlesList.map(a => [a.title, a.views, a.clicks, `${a.ctr}%`, formatCurrency(a.commission)])
      ];
      const wsArticles = XLSX.utils.aoa_to_sheet(articleRows);

      // 4. Sheet Traffic Sources
      const trafficRows = [
        ["Nguồn traffic", "Lượt Clicks", "Số Đơn hàng", "Tỷ lệ CR%", "Doanh thu", "Hoa hồng"],
        ...trafficSourcesList.map(t => [t.source, t.clicks, t.orders, `${t.cr}%`, formatCurrency(t.revenue), formatCurrency(t.commission)])
      ];
      const wsTraffic = XLSX.utils.aoa_to_sheet(trafficRows);

      // Create Workbook
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, wsKpi, "Tổng quan KPI");
      XLSX.utils.book_append_sheet(wb, wsPlants, "Top Cây cảnh");
      XLSX.utils.book_append_sheet(wb, wsArticles, "Top Bài viết");
      XLSX.utils.book_append_sheet(wb, wsTraffic, "Nguồn Traffic");

      // Write file
      XLSX.writeFile(wb, `BaoCao_Affiliate_Dashboard_${new Date().toISOString().split('T')[0]}.xlsx`);
    } catch (err) {
      console.error("Lỗi khi xuất báo cáo Excel:", err);
      alert("Không thể tải thư viện xuất Excel. Vui lòng thử lại!");
    }
  };

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
          <button 
            className={styles.filterSelect} 
            style={{ backgroundColor: '#1e3b32', color: 'white', display: 'flex', alignItems: 'center', gap: 6 }}
            onClick={handleExportReport}
          >
            <Download size={16} /> Xuất Báo Cáo
          </button>
        </div>
      </div>

      <KPICards kpi={kpi} />
      <ChartsSection trendData={trend} funnel={funnel} />
      <AnalyticsTables plants={topPlantsList} articles={topArticlesList} traffic={trafficSourcesList} />

    </div>
  );
};

export default DashboardAnalytics;
