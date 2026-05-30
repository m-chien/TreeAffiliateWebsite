export interface MarketingUser {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  favoriteCategories: string[];
  favoritePlants: string[];
}

export interface MarketingArticle {
  id: string;
  name: string;
  category: string;
}

export interface FallbackPlant {
  id: string;
  name: string;
  danhMucList: string[];
}

export const fallbackPlants: FallbackPlant[] = [
  { id: 'p1', name: 'Monstera Deliciosa', danhMucList: ['Cây trong nhà', 'Cây leo'] },
  { id: 'p2', name: 'Bàng Singapore', danhMucList: ['Cây trong nhà'] },
  { id: 'p3', name: 'Mai Điểu', danhMucList: ['Cây ngoài trời'] },
  { id: 'p4', name: 'Trầu Bà Nam Mỹ', danhMucList: ['Cây leo', 'Cây trong nhà'] },
  { id: 'p5', name: 'Cây Kim Tiền', danhMucList: ['Cây phong thủy', 'Cây văn phòng'] },
  { id: 'p6', name: 'Cây Lưỡi Hổ', danhMucList: ['Cây trong nhà', 'Cây phong thủy'] },
  { id: 'p7', name: 'Cây Ngọc Ngân', danhMucList: ['Cây phong thủy', 'Cây văn phòng'] },
  { id: 'p8', name: 'Cây Lan Ý', danhMucList: ['Cây trong nhà'] },
];

export const mockArticlesForMarketing: MarketingArticle[] = [
  { id: 'art1', name: 'Top 10 cây lọc không khí trong nhà tốt nhất', category: 'Cây trong nhà' },
  { id: 'art2', name: 'Bí quyết chọn cây phong thủy hút tài lộc năm 2026', category: 'Cây phong thủy' },
  { id: 'art3', name: 'Cách thiết kế ban công xanh mát với cây ngoài trời', category: 'Cây ngoài trời' },
  { id: 'art4', name: 'Hướng dẫn làm giàn leo đơn giản cho Trầu Bà', category: 'Cây leo' },
  { id: 'art5', name: '5 loại cây văn phòng giúp giảm stress hiệu quả', category: 'Cây văn phòng' },
];

export const mockUsersForMarketing: MarketingUser[] = [
  {
    id: 'U001',
    name: 'Trần Văn Định',
    email: 'tvding@example.com',
    status: 'active',
    favoriteCategories: ['Cây trong nhà', 'Cây leo'],
    favoritePlants: ['Monstera Deliciosa', 'Trầu Bà Nam Mỹ']
  },
  {
    id: 'U002',
    name: 'Lê Cát Tiên',
    email: 'cattien.le@example.com',
    status: 'active',
    favoriteCategories: ['Cây phong thủy', 'Cây văn phòng'],
    favoritePlants: ['Cây Kim Tiền', 'Cây Ngọc Ngân']
  },
  {
    id: 'U003',
    name: 'Nguyễn Quang Hải',
    email: 'quanghai.ng@example.com',
    status: 'inactive', // Opted-out
    favoriteCategories: ['Cây trong nhà'],
    favoritePlants: ['Bàng Singapore']
  },
  {
    id: 'U004',
    name: 'Phạm Hoàng Dung',
    email: 'hoangdung.pham@yahoo.com',
    status: 'active',
    favoriteCategories: ['Cây ngoài trời'],
    favoritePlants: ['Cây hoa hồng cổ', 'Mai Điểu']
  },
  {
    id: 'U005',
    name: 'Đỗ Thị Nhàn',
    email: 'nhando.flower@gmail.com',
    status: 'active',
    favoriteCategories: ['Cây trong nhà', 'Cây phong thủy'],
    favoritePlants: ['Cây Lan Ý', 'Cây Lưỡi Hổ']
  },
  {
    id: 'U006',
    name: 'Nguyễn Hoàng Nam',
    email: 'nam.hoang@gmail.com',
    status: 'active',
    favoriteCategories: ['Cây leo'],
    favoritePlants: ['Trầu Bà Nam Mỹ']
  },
  {
    id: 'U007',
    name: 'Phan Thị Quỳnh',
    email: 'quynhphan@gmail.com',
    status: 'active',
    favoriteCategories: ['Cây phong thủy'],
    favoritePlants: ['Cây Kim Tiền']
  },
  {
    id: 'U008',
    name: 'Vũ Minh Tuấn',
    email: 'tuanminh.vu@gmail.com',
    status: 'active',
    favoriteCategories: ['Cây trong nhà', 'Cây văn phòng'],
    favoritePlants: ['Bàng Singapore', 'Cây Ngọc Ngân']
  }
];
