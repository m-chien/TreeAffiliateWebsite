export const plantOptions = [
  { id: 'p1', name: 'Bàng Singapore' },
  { id: 'p2', name: 'Kim Tiền' },
  { id: 'p3', name: 'Trầu Bà Nam Mỹ' },
  { id: 'p4', name: 'Lưỡi Hổ' },
];

export const blogOptions = [
  { id: 'b1', name: 'Top 10 cây lọc không khí' },
  { id: 'b2', name: 'Mệnh mộc hợp cây gì?' },
];

export const mockInterestedUsers: Record<string, any[]> = {
  'p1': [
    { id: '1', email: 'nguyenvana@gmail.com', name: 'Nguyễn Văn A', status: 'active', subscribedAt: '2026-04-01', interest: 'Bàng Singapore' },
    { id: '2', email: 'tranb@yahoo.com', name: 'Trần Thị B', status: 'active', subscribedAt: '2026-04-02', interest: 'Bàng Singapore' },
  ],
  'p2': [
    { id: '3', email: 'lehoangc@hotmail.com', name: 'Lê Hoàng C', status: 'inactive', subscribedAt: '2026-03-28', interest: 'Kim Tiền' },
    { id: '8', email: 'mai_phuong@gmail.com', name: 'Mai Phương', status: 'active', subscribedAt: '2026-04-04', interest: 'Kim Tiền' },
  ],
  'p3': [
    { id: '4', email: 'pham_d@outlook.com', name: 'Phạm D', status: 'active', subscribedAt: '2026-04-05', interest: 'Trầu Bà Nam Mỹ' },
    { id: '5', email: 'hoang_yen@gmail.com', name: 'Hoàng Yến', status: 'active', subscribedAt: '2026-04-06', interest: 'Trầu Bà Nam Mỹ' },
    { id: '6', email: 'minhtuan@gmail.com', name: 'Minh Tuấn', status: 'active', subscribedAt: '2026-04-03', interest: 'Trầu Bà Nam Mỹ' },
  ],
  'p4': [
    { id: '7', email: 'quoc_bao@yahoo.com', name: 'Quốc Bảo', status: 'active', subscribedAt: '2026-04-06', interest: 'Lưỡi Hổ' },
  ],
  'b1': [
    { id: '9', email: 'generic_reader1@gmail.com', name: 'Độc giả 1', status: 'active', subscribedAt: '2026-03-15', interest: 'Blog Lọc không khí' },
    { id: '10', email: 'generic_reader2@gmail.com', name: 'Độc giả 2', status: 'active', subscribedAt: '2026-03-20', interest: 'Blog Lọc không khí' },
  ]
};
