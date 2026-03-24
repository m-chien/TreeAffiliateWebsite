export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: "Top List" | "Guides" | "Phong Thủy";
  author: string;
  date: string;
  image: string;
  featured?: boolean;
}

export const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Top 5 cây để bàn làm việc dễ chăm nhất 2026",
    excerpt: "Bạn bận rộn nhưng vẫn muốn không gian làm việc xanh mát? Khám phá ngay 5 loại cây 'bất tử' phù hợp nhất cho dân văn phòng năm 2026...",
    category: "Top List",
    author: "Admin",
    date: "24/03/2026",
    image: "https://images.unsplash.com/photo-1597072689227-8882273e8f6a?auto=format&fit=crop&q=80&w=1000",
    featured: true
  },
  {
    id: "2",
    title: "Hướng dẫn chi tiết tưới cây Monstera cho người mới",
    excerpt: "Monstera có cần tưới nhiều nước không? Làm sao để không bị úng rễ? Đây là tất cả những gì bạn cần biết để giữ cho lá luôn xanh mướt.",
    category: "Guides",
    author: "Thảo Nguyễn",
    date: "22/03/2026",
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "3",
    title: "Mẹo phong thủy: Chọn cây cảnh hợp mệnh Mộc",
    excerpt: "Cây gì mang lại tài lộc cho người mệnh Mộc? Khám phá sự kết hợp hoàn hảo giữa không gian sống và năng lượng thiên nhiên.",
    category: "Phong Thủy",
    author: "Thầy Phong Thủy",
    date: "20/03/2026",
    image: "https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "4",
    title: "Top 10 cây lọc không khí tốt nhất cho phòng ngủ",
    excerpt: "Cải thiện giấc ngủ của bạn với những người bạn xanh này. Chúng không chỉ đẹp mà còn giúp loại bỏ độc tố trong không khí cực kỳ hiệu quả.",
    category: "Top List",
    author: "Admin",
    date: "18/03/2026",
    image: "https://images.unsplash.com/photo-1512428236160-593672620f30?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "5",
    title: "Làm sao để cứu cây bị héo lá do thiếu nước?",
    excerpt: "Đừng vội bỏ cuộc! Với 3 bước đơn giản này, bạn có thể hồi sinh cây cảnh yêu quý của mình chỉ trong vòng 48 giờ.",
    category: "Guides",
    author: "Thảo Nguyễn",
    date: "15/03/2026",
    image: "https://images.unsplash.com/photo-1525498128493-380d1990a112?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "6",
    title: "Đặt cây Lưỡi Hổ ở đâu để xua đuổi điềm xui?",
    excerpt: "Vị trí đặt cây cực kỳ quan trọng trong phong thủy. Cùng tìm hiểu xem đâu là vị trí 'đắc địa' nhất cho cây Lưỡi Hổ trong nhà bạn.",
    category: "Phong Thủy",
    author: "Admin",
    date: "12/03/2026",
    image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&q=80&w=800"
  }
];
