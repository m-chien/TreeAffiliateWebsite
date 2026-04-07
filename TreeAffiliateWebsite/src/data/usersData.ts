export interface MarketingContact {
  id: string;
  campaignName: string;
  sentDate: string;
  opened: boolean;
  clicked: boolean;
}

export interface UserDetail {
  id: string;
  name: string;
  email: string;
  role: 'Customer' | 'Subscriber' | 'Admin';
  status: 'Active' | 'Banned' | 'Pending';
  joinDate: string;
  lastLogin: string;
  marketingContacts: MarketingContact[];
}

export const mockUsersData: UserDetail[] = [
  {
    id: "U001",
    name: "Trần Văn Định",
    email: "tvding@example.com",
    role: "Subscriber",
    status: "Active",
    joinDate: "2024-01-15",
    lastLogin: "2024-03-20 10:30",
    marketingContacts: [
      { id: "MC_01", campaignName: "Blog: Hướng dẫn chăm sóc Monstera", sentDate: "2024-02-10", opened: true, clicked: true },
      { id: "MC_02", campaignName: "Sale: Cây nội thất mùa xuân", sentDate: "2024-03-01", opened: true, clicked: false },
    ]
  },
  {
    id: "U002",
    name: "Lê Cát Tiên",
    email: "cattien.le@example.com",
    role: "Customer",
    status: "Active",
    joinDate: "2023-11-05",
    lastLogin: "2024-04-01 14:15",
    marketingContacts: [
      { id: "MC_03", campaignName: "New Product: Cây Bàng Singapore", sentDate: "2024-03-15", opened: false, clicked: false },
    ]
  },
  {
    id: "U003",
    name: "Nguyễn Quang Hải",
    email: "quanghai.ng@example.com",
    role: "Subscriber",
    status: "Banned",
    joinDate: "2024-02-28",
    lastLogin: "2024-03-05 08:00",
    marketingContacts: [
      { id: "MC_04", campaignName: "Care: Bệnh thường gặp ở cây kim tiền", sentDate: "2024-03-02", opened: true, clicked: false },
    ]
  },
  {
    id: "U004",
    name: "Phạm Hoàng Dung",
    email: "hoangdung.pham@yahoo.com",
    role: "Customer",
    status: "Active",
    joinDate: "2022-09-10",
    lastLogin: "2024-04-06 20:45",
    marketingContacts: [
      { id: "MC_05", campaignName: "Sale: Cây ngoại thất", sentDate: "2024-01-20", opened: true, clicked: true },
      { id: "MC_06", campaignName: "Survey: Đánh giá website", sentDate: "2024-03-25", opened: true, clicked: true },
    ]
  },
  {
    id: "U005",
    name: "Đỗ Thị Nhàn",
    email: "nhando.flower@gmail.com",
    role: "Customer",
    status: "Pending",
    joinDate: "2024-04-05",
    lastLogin: "2024-04-05 09:12",
    marketingContacts: []
  }
];
