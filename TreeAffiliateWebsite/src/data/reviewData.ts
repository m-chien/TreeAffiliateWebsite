export interface ReviewSummary {
  id: string;
  name: string;
  scientificName: string;
  category: "Dễ Chăm" | "Lọc Không Khí" | "Phong Thủy";
  rating: number;
  image: string;
  prosSnippet: string;
  link: string;
}

export const mockReviews: ReviewSummary[] = [
  {
    id: "monstera",
    name: "Cây Monstera Deliciosa",
    scientificName: "Monstera deliciosa",
    category: "Lọc Không Khí",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=800",
    prosSnippet: "Vẻ đẹp nhiệt đới, lọc không khí cực tốt.",
    link: "/review/monstera"
  },
  {
    id: "snake-plant",
    name: "Cây Lưỡi Hổ",
    scientificName: "Sansevieria trifasciata",
    category: "Dễ Chăm",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&q=80&w=800",
    prosSnippet: "Gần như bất tử, lọc độc tố ban đêm.",
    link: "/review/monstera" // Temporary link if no separate review exists
  },
  {
    id: "money-tree",
    name: "Cây Kim Tiền",
    scientificName: "Zamioculcas zamiifolia",
    category: "Phong Thủy",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?auto=format&fit=crop&q=80&w=800",
    prosSnippet: "Mang lại tài lộc, chịu hạn rất tốt.",
    link: "/review/monstera"
  },
  {
    id: "fiddle-leaf",
    name: "Cây Bàng Singapore",
    scientificName: "Ficus lyrata",
    category: "Lọc Không Khí",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1597072689227-8882273e8f6a?auto=format&fit=crop&q=80&w=800",
    prosSnippet: "Lá to sang trọng, tạo điểm nhấn nội thất.",
    link: "/review/monstera"
  }
];
