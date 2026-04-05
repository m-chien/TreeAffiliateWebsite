import {
  DollarSign,
  TrendingUp,
  MousePointerClick,
  TreePine,
} from "lucide-react";
import type {
  OverviewStat,
  RankedProduct,
  RankedArticle,
  ChartDataPoint,
  ManagedPlant,
  ManagedArticle,
  ManagedCategory,
} from "../types";

export const overviewStats: OverviewStat[] = [
  {
    title: "Tổng doanh thu",
    value: "125,430,000đ",
    trend: 12.5,
    trendLabel: "so với tháng trước",
    icon: <DollarSign size={20} />,
  },
  {
    title: "Hoa hồng ước tính",
    value: "18,500,000đ",
    trend: 8.2,
    trendLabel: "so với tháng trước",
    icon: <TrendingUp size={20} />,
    highlight: true,
  },
  {
    title: "Tổng lượt Click Affiliate",
    value: "14,245",
    trend: 5.1,
    trendLabel: "so với tuần trước",
    icon: <MousePointerClick size={20} />,
  },
  {
    title: "Cây quảng bá / Bài viết",
    value: "42 / 128",
    trend: 0,
    trendLabel: "Tổng cộng",
    icon: <TreePine size={20} />,
  },
];

export const topProducts: RankedProduct[] = [
  {
    id: "1",
    rank: 1,
    name: "Monstera Deliciosa",
    category: "Cây trong nhà",
    clicks: 3450,
    imageUrl:
      "/public/images/cay1.png",
  },
  {
    id: "2",
    rank: 2,
    name: "Bàng Singapore",
    category: "Cây trong nhà",
    clicks: 2840,
    imageUrl:
      "/public/images/cay2.png",
  },
  {
    id: "3",
    rank: 3,
    name: "Mai Điểu",
    category: "Cây ngoài trời",
    clicks: 2100,
    imageUrl:
      "/public/images/cay3.png",
  },
  {
    id: "4",
    rank: 4,
    name: "Trầu Bà Nam Mỹ",
    category: "Cây leo",
    clicks: 1850,
    imageUrl:
      "/public/images/cay4.png",
  },
  {
    id: "5",
    rank: 5,
    name: "Cây Kim Tiền",
    category: "Cây phong thủy",
    clicks: 1540,
    imageUrl:
      "/public/images/cay5.png",
  },
];

export const topArticles: RankedArticle[] = [
  {
    id: "1",
    rank: 1,
    title: "Top 10 cây lọc không khí trong nhà",
    author: "Minh Trí",
    views: 15000,
    affiliateClicks: 4200,
  },
  {
    id: "2",
    rank: 2,
    title: "Hướng dẫn chăm sóc Monstera từ A-Z",
    author: "Thảo Vy",
    views: 12500,
    affiliateClicks: 3800,
  },
  {
    id: "3",
    rank: 3,
    title: "Cây phong thủy hút tài lộc năm 2024",
    author: "Quốc Bảo",
    views: 9800,
    affiliateClicks: 2100,
  },
  {
    id: "4",
    rank: 4,
    title: "Cách nhân giống cây Trầu Bà dễ dàng",
    author: "Minh Trí",
    views: 8200,
    affiliateClicks: 1650,
  },
  {
    id: "5",
    rank: 5,
    title: "Bí quyết chọn đất trồng cây cảnh",
    author: "Lan Anh",
    views: 6500,
    affiliateClicks: 1200,
  },
];

export const chartData: ChartDataPoint[] = [
  { day: "01/04", clicks: 30, revenue: 20 },
  { day: "05/04", clicks: 45, revenue: 35 },
  { day: "10/04", clicks: 35, revenue: 25 },
  { day: "15/04", clicks: 60, revenue: 50 },
  { day: "20/04", clicks: 50, revenue: 45 },
  { day: "25/04", clicks: 80, revenue: 70 },
  { day: "30/04", clicks: 65, revenue: 60 },
];

export const managedPlants: ManagedPlant[] = [
  {
    id: "1",
    imageUrl: "/public/images/cay1.png",
    name: "Monstera Deliciosa",
    category: "Cây trong nhà",
    platform: "Shopee",
    commission: 15,
    status: "Active",
  },
  {
    id: "2",
    imageUrl: "/public/images/cay2.png",
    name: "Bàng Singapore",
    category: "Cây trong nhà",
    platform: "TikTok",
    commission: 20,
    status: "Active",
  },
  {
    id: "3",
    imageUrl: "/public/images/cay3.png",
    name: "Mai Điểu",
    category: "Cây ngoài trời",
    platform: "Shopee",
    commission: 12,
    status: "Inactive",
  },
  {
    id: "4",
    imageUrl: "/public/images/cay4.png",
    name: "Trầu Bà Nam Mỹ",
    category: "Cây leo",
    platform: "Shopee",
    commission: 15,
    status: "Active",
  },
  {
    id: "5",
    imageUrl: "/public/images/cay5.png",
    name: "Cây Kim Tiền",
    category: "Cây phong thủy",
    platform: "TikTok",
    commission: 18,
    status: "Active",
  },
];

export const managedArticles: ManagedArticle[] = [
  {
    id: "1",
    title: "Top 10 cây lọc không khí trong nhà",
    author: "Minh Trí",
    date: "2024-04-01",
    views: 15000,
    affiliateClicks: 4200,
    status: "Published",
  },
  {
    id: "2",
    title: "Hướng dẫn chăm sóc Monstera từ A-Z",
    author: "Thảo Vy",
    date: "2024-03-25",
    views: 12500,
    affiliateClicks: 3800,
    status: "Published",
  },
  {
    id: "3",
    title: "Cây phong thủy hút tài lộc năm 2024",
    author: "Quốc Bảo",
    date: "2024-04-03",
    views: 9800,
    affiliateClicks: 2100,
    status: "Draft",
  },
  {
    id: "4",
    title: "Cách nhân giống cây Trầu Bà dễ dàng",
    author: "Minh Trí",
    date: "2024-03-15",
    views: 8200,
    affiliateClicks: 1650,
    status: "Published",
  },
];

export const managedCategories: ManagedCategory[] = [
  { id: "1", name: "Cây trong nhà", type: "Sản phẩm", itemCount: 45 },
  { id: "2", name: "Cây văn phòng", type: "Sản phẩm", itemCount: 32 },
  { id: "3", name: "Cây phong thủy", type: "Sản phẩm", itemCount: 28 },
  { id: "4", name: "Hướng dẫn chăm sóc", type: "Bài viết", itemCount: 64 },
  { id: "5", name: "Top list", type: "Bài viết", itemCount: 24 },
];
