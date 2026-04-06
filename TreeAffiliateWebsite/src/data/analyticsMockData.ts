export const kpiData = {
  totalRevenue: 125000000,
  estimatedCommission: 18750000,
  totalClicks: 24500,
  totalOrders: 850,
  conversionRate: 3.47,
  epc: 765,
  aov: 147000,
  activeProducts: 45,
  activeArticles: 32,
};

export const trendChartData = Array.from({ length: 30 }).map((_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  const baseClicks = 500 + Math.random() * 500;
  const orders = Math.floor(baseClicks * 0.03 + Math.random() * 10);
  const revenue = orders * (100000 + Math.random() * 100000);
  const commission = revenue * 0.15;
  
  return {
    date: date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }),
    clicks: Math.floor(baseClicks),
    orders,
    revenue: Math.floor(revenue),
    commission: Math.floor(commission),
  };
});

export const funnelData = [
  { step: 'Lượt xem bài viết', value: 125000, fill: '#8884d8' },
  { step: 'Click Affiliate', value: 24500, fill: '#83a6ed' },
  { step: 'Thêm vào giỏ', value: 5200, fill: '#8dd1e1' },
  { step: 'Đặt hàng thành công', value: 850, fill: '#82ca9d' },
];

export const topPlants = [
  { id: '1', name: 'Cây Bàng Singapore', clicks: 4200, orders: 185, cr: 4.4, revenue: 37000000, commission: 5550000 },
  { id: '2', name: 'Chậu Trầu Bà Nam Mỹ (Monstera)', clicks: 3800, orders: 142, cr: 3.73, revenue: 21300000, commission: 3195000 },
  { id: '3', name: 'Cây Kim Tiền', clicks: 3100, orders: 120, cr: 3.87, revenue: 14400000, commission: 2160000 },
  { id: '4', name: 'Cây Lưỡi Hổ', clicks: 5500, orders: 95, cr: 1.72, revenue: 8550000, commission: 1282500 },
  { id: '5', name: 'Tiểu cảnh Sen Đá', clicks: 2100, orders: 88, cr: 4.19, revenue: 4400000, commission: 660000 },
];

export const topArticles = [
  { id: 'A1', title: 'Top 10 cây cảnh lọc không khí trong nhà', views: 25000, clicks: 4500, ctr: 18.0, orders: 156, revenue: 23400000, commission: 3510000 },
  { id: 'A2', title: 'Hướng dẫn chăm sóc Bàng Singapore', views: 8500, clicks: 2100, ctr: 24.7, orders: 112, revenue: 22400000, commission: 3360000 },
  { id: 'A3', title: 'Mệnh Kim hợp cây gì? 5 Lựa chọn tốt nhất', views: 32000, clicks: 3800, ctr: 11.8, orders: 95, revenue: 14250000, commission: 2137500 },
  { id: 'A4', title: 'Cách trồng sen đá không bị úng nưóc', views: 42000, clicks: 1200, ctr: 2.8, orders: 40, revenue: 2000000, commission: 300000 },
  { id: 'A5', title: 'Top 5 loại cây để bàn làm việc giảm stress', views: 15000, clicks: 2800, ctr: 18.6, orders: 85, revenue: 12750000, commission: 1912500 },
];

export const trafficSources = [
  { source: 'SEO (Google)', clicks: 12500, orders: 450, cr: 3.6, revenue: 67500000, commission: 10125000 },
  { source: 'Facebook', clicks: 6200, orders: 180, cr: 2.9, revenue: 27000000, commission: 4050000 },
  { source: 'TikTok', clicks: 4500, orders: 160, cr: 3.55, revenue: 24000000, commission: 3600000 },
  { source: 'Email', clicks: 800, orders: 45, cr: 5.62, revenue: 6750000, commission: 1012500 },
  { source: 'Direct', clicks: 500, orders: 15, cr: 3.0, revenue: 2250000, commission: 337500 },
];

export const deviceData = [
  { name: 'Mobile', value: 68 },
  { name: 'Desktop', value: 27 },
  { name: 'Tablet', value: 5 },
];
