import type { ReviewSummary } from "../types";

export const mockReviews: ReviewSummary[] = [
  {
    id: "monstera",
    name: "Cây Monstera Deliciosa",
    scientificName: "Monstera deliciosa",
    category: "Lọc Không Khí",
    rating: 4.8,
    image: "/images/main-plant.png",
    prosSnippet: "Vẻ đẹp nhiệt đới, lọc không khí cực tốt.",
    link: "/review/monstera",
  },
  {
    id: "snake-plant",
    name: "Cây Lưỡi Hổ",
    scientificName: "Sansevieria trifasciata",
    category: "Dễ Chăm",
    rating: 4.9,
    image: "/images/2_plant.png",
    prosSnippet: "Gần như bất tử, lọc độc tố ban đêm.",
    link: "/review/monstera", // Temporary link if no separate review exists
  },
  {
    id: "money-tree",
    name: "Cây Kim Tiền",
    scientificName: "Zamioculcas zamiifolia",
    category: "Phong Thủy",
    rating: 4.7,
    image: "/images/4_plant.png",
    prosSnippet: "Mang lại tài lộc, chịu hạn rất tốt.",
    link: "/review/monstera",
  },
  {
    id: "fiddle-leaf",
    name: "Cây Bàng Singapore",
    scientificName: "Ficus lyrata",
    category: "Lọc Không Khí",
    rating: 4.6,
    image: "/images/5_plant.png",
    prosSnippet: "Lá to sang trọng, tạo điểm nhấn nội thất.",
    link: "/review/monstera",
  },
    {
    id: "snake-plant",
    name: "Cây Lưỡi Hổ",
    scientificName: "Sansevieria trifasciata",
    category: "Dễ Chăm",
    rating: 4.9,
    image: "/images/6_plant.png",
    prosSnippet: "Gần như bất tử, lọc độc tố ban đêm.",
    link: "/review/monstera", // Temporary link if no separate review exists
  },
  {
    id: "money-tree",
    name: "Cây Kim Tiền",
    scientificName: "Zamioculcas zamiifolia",
    category: "Phong Thủy",
    rating: 4.7,
    image: "/images/5_plant.png",
    prosSnippet: "Mang lại tài lộc, chịu hạn rất tốt.",
    link: "/review/monstera",
  },
];
