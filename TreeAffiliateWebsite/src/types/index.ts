export interface Plant {
  id: string;
  name: string;
  image: string;
  light_requirement?: string;
  care_difficulty?: number;
  air_purifying?: number;
  pet_friendly?: boolean;
  price: string;
  affiliate_link?: string;
  img?: string;
  tab?: string;
  link?: string;
  oldPrice?: string;
  discount?: string;
  rating?: number;
  category?: string;
  subcategory?: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  inStock?: boolean;
}

export interface Alternative {
  id: string;
  name: string;
  price: string;
  image: string;
  link: string;
}

export interface Testimonial {
  id: number;
  name: string;
  date: string;
  avatar: string;
  rating: number;
  text: string;
}

export interface InstagramPost {
  id: number;
  likes: number;
  img: string;
}

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

export interface ReviewSummary {
  id: string;
  name: string;
  scientificName: string;
  category: string;
  rating: number;
  image: string;
  prosSnippet: string;
  link: string;
  plantName?: string;
  reviewCount?: number;
  pros?: string[];
  cons?: string[];
  verdict?: string;
  expertName?: string;
  expertTitle?: string;
  expertAvatar?: string;
  affiliateLink?: string;
}
