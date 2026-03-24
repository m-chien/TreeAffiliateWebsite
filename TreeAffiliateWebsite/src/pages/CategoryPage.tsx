import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Maximize2, ShoppingCart, Star, X } from "lucide-react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./CategoryPage.css";

const CATEGORIES = [
  "Cây trong nhà",
  "Cây để bàn",
  "Cây phong thủy",
  "Cây lọc không khí",
  "Cây văn phòng",
  "Phụ kiện sinh thái",
];
const SIZES = ["Nhỏ", "Trung bình", "Lớn", "Khổng lồ"];

const DUMMY_PRODUCTS = [
  {
    id: 1,
    name: "Tuyết Tùng (SilkSculpt)",
    price: "350.000₫",
    oldPrice: "700.000₫",
    discount: "50% off",
    rating: 4.9,
    category: "Cây trong nhà",
    subcategory: "Cây để bàn",
    img: "https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    isNew: true,
    isBestSeller: false,
    inStock: true,
  },
  {
    id: 2,
    name: "Bàng Singapore (SilkSkin)",
    price: "480.000₫",
    oldPrice: "600.000₫",
    discount: "20% off",
    rating: 4.8,
    category: "Cây phong thủy",
    subcategory: "Cây trong nhà",
    img: "https://images.unsplash.com/photo-1598531405105-9b2f3d640fa8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    isNew: false,
    isBestSeller: true,
    inStock: true,
  },
  {
    id: 3,
    name: "Monstera Glow",
    price: "630.000₫",
    oldPrice: "900.000₫",
    discount: "30% off",
    rating: 5.0,
    category: "Cây lọc không khí",
    subcategory: "Cây cỡ lớn",
    img: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    isNew: false,
    isBestSeller: true,
    inStock: true,
  },
  {
    id: 4,
    name: "Dương Xỉ (Nephrolepis)",
    price: "450.000₫",
    oldPrice: "500.000₫",
    discount: "10% off",
    rating: 5.0,
    category: "Cây để bàn",
    subcategory: "Cây lọc không khí",
    img: "https://images.unsplash.com/photo-1597055909287-2521c78473e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    isNew: true,
    isBestSeller: false,
    inStock: false,
  },
  {
    id: 5,
    name: "Trầu Bà Lá Xẻ",
    price: "200.000₫",
    oldPrice: "400.000₫",
    discount: "50% off",
    rating: 5.0,
    category: "Cây phong thủy",
    subcategory: "Dây leo",
    img: "https://images.unsplash.com/photo-1609144828691-1fa64ceaaab8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    isNew: false,
    isBestSeller: false,
    inStock: true,
  },
  {
    id: 6,
    name: "Lan Ý Kiểng",
    price: "300.000₫",
    oldPrice: "600.000₫",
    discount: "50% off",
    rating: 5.0,
    category: "Cây trong nhà",
    subcategory: "Có hoa",
    img: "https://images.unsplash.com/photo-1599598425947-3300454316d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    isNew: false,
    isBestSeller: true,
    inStock: true,
  },
  {
    id: 7,
    name: "Sen Đá Wellness",
    price: "60.000₫",
    oldPrice: "120.000₫",
    discount: "50% off",
    rating: 4.8,
    category: "Cây để bàn",
    subcategory: "Xương rồng",
    img: "https://images.unsplash.com/photo-1497942304096-e175440d24bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    isNew: true,
    isBestSeller: false,
    inStock: true,
  },
  {
    id: 8,
    name: "Hồng Môn Rose",
    price: "100.000₫",
    oldPrice: "200.000₫",
    discount: "50% off",
    rating: 4.9,
    category: "Cây văn phòng",
    subcategory: "Có hoa",
    img: "https://images.unsplash.com/photo-1620645607062-11115668db8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    isNew: false,
    isBestSeller: false,
    inStock: true,
  },
  {
    id: 9,
    name: "Kim Tiền (Herbal Haven)",
    price: "200.000₫",
    oldPrice: "400.000₫",
    discount: "50% off",
    rating: 5.0,
    category: "Cây phong thủy",
    subcategory: "Cảnh quan",
    img: "https://images.unsplash.com/photo-1600411832986-5a4477b64a1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    isNew: false,
    isBestSeller: true,
    inStock: true,
  },
];

const CategoryPage = () => {
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(true);
  const [bestSellerOnly, setBestSellerOnly] = useState(false);
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000000]);

  const toggleFilter = (
    set: React.Dispatch<React.SetStateAction<string[]>>,
    item: string,
  ) => {
    set((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  const clearAllFilters = () => {
    setSelectedCats([]);
    setSelectedSizes([]);
    setInStockOnly(false);
    setBestSellerOnly(false);
    setPriceRange([0, 1000000]);
  };

  const renderStars = (rating: number) => {
    return Array(rating)
      .fill(0)
      .map((_, i) => <Star key={i} size={14} className="star-icon" />);
  };

  return (
    <div className="category-page">
      <div className="category-container">
        {/* Sidebar */}
        <aside className="category-sidebar">
          <h2 className="sidebar-title">Bộ Lọc</h2>

          <div className="filter-section">
            <h3>Danh Mục</h3>
            <div className="filter-list">
              {CATEGORIES.map((cat) => (
                <label key={cat} className="filter-item">
                  <input
                    type="checkbox"
                    checked={selectedCats.includes(cat)}
                    onChange={() => toggleFilter(setSelectedCats, cat)}
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Kích Thước</h3>
            <div className="filter-list">
              {SIZES.map((size) => (
                <label key={size} className="filter-item">
                  <input
                    type="checkbox"
                    checked={selectedSizes.includes(size)}
                    onChange={() => toggleFilter(setSelectedSizes, size)}
                  />
                  {size}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Mức Giá</h3>
            <div className="price-labels">
              <span>{priceRange[0].toLocaleString("vi-VN")}₫</span>
              <span>{priceRange[1].toLocaleString("vi-VN")}₫</span>
            </div>
            <div style={{ padding: "0 10px" }}>
              <Slider
                range
                min={0}
                max={1000000}
                step={10000}
                value={priceRange}
                onChange={(val: number | number[]) =>
                  setPriceRange(val as number[])
                }
                trackStyle={[{ backgroundColor: "var(--bg-dark-green)" }]}
                handleStyle={[
                  {
                    borderColor: "var(--bg-dark-green)",
                    backgroundColor: "var(--bg-dark-green)",
                    opacity: 1,
                  },
                  {
                    borderColor: "var(--bg-dark-green)",
                    backgroundColor: "var(--bg-dark-green)",
                    opacity: 1,
                  },
                ]}
              />
            </div>
          </div>

          <div className="filter-section">
            <h3>Đánh Giá</h3>
            <div className="filter-list">
              {[5, 4, 3, 2, 1].map((star) => (
                <label key={star} className="filter-item">
                  <input type="checkbox" />
                  <div className="stars-row">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          fill={i < star ? "#ffc107" : "#eee"}
                          color={i < star ? "#ffc107" : "#eee"}
                        />
                      ))}
                  </div>
                  <span>{star} Sao</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Khuyến Mãi</h3>
            <div className="filter-list">
              <label className="filter-item">
                <input type="checkbox" /> Hàng Mới
              </label>
              <label className="filter-item">
                <input
                  type="checkbox"
                  checked={bestSellerOnly}
                  onChange={() => setBestSellerOnly(!bestSellerOnly)}
                />{" "}
                Bán Chạy
              </label>
              <label className="filter-item">
                <input type="checkbox" /> Giảm Giá
              </label>
            </div>
          </div>

          <div className="filter-section">
            <h3>Trạng Thái</h3>
            <div className="filter-list">
              <label className="filter-item">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={() => setInStockOnly(!inStockOnly)}
                />{" "}
                Còn Hàng
              </label>
              <label className="filter-item">
                <input type="checkbox" /> Hết Hàng
              </label>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="category-main">
          <div className="main-header">
            <span className="results-count">
              Hiển thị 1-9 trong 2560 kết quả
            </span>
            <div className="sort-by">
              Sắp xếp theo :
              <select className="sort-select">
                <option>Mặc định</option>
                <option>Giá thấp đến cao</option>
                <option>Giá cao đến thấp</option>
                <option>Mới nhất</option>
              </select>
            </div>
          </div>

          <div className="active-filters">
            <span style={{ fontSize: "0.9rem", color: "#666" }}>
              Lọc theo:{" "}
            </span>
            <div className="filter-tag">
              Giá: {priceRange[0].toLocaleString("vi-VN")}₫ -{" "}
              {priceRange[1].toLocaleString("vi-VN")}₫{" "}
              <button onClick={() => setPriceRange([0, 1000000])}>
                <X size={14} />
              </button>
            </div>
            {bestSellerOnly && (
              <div className="filter-tag">
                Bán chạy{" "}
                <button onClick={() => setBestSellerOnly(false)}>
                  <X size={14} />
                </button>
              </div>
            )}
            {inStockOnly && (
              <div className="filter-tag">
                Còn hàng{" "}
                <button onClick={() => setInStockOnly(false)}>
                  <X size={14} />
                </button>
              </div>
            )}
            <button className="clear-all" onClick={clearAllFilters}>
              Xóa tất cả
            </button>
          </div>

          <div className="product-grid">
            <AnimatePresence>
              {DUMMY_PRODUCTS.map((product) => (
                <motion.div
                  key={product.id}
                  className="product-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="product-image-container">
                    <span className="discount-badge">{product.discount}</span>
                    <img src={product.img} alt={product.name} />
                    <div className="hover-actions">
                      <button className="action-btn" title="Yêu thích">
                        <Heart size={18} />
                      </button>
                      <button className="action-btn" title="Xem nhanh">
                        <Maximize2 size={18} />
                      </button>
                      <button className="action-btn" title="Thêm giỏ hàng">
                        <ShoppingCart size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="product-meta">
                    <span className="subcategory">{product.subcategory}</span>
                    <span className="rating">
                      {renderStars(Math.floor(product.rating))}{" "}
                      {product.rating.toFixed(1)}
                    </span>
                  </div>

                  <h3 className="product-title">{product.name}</h3>
                  <div className="price-row">
                    <span className="current-price">{product.price}</span>
                    <span className="old-price">{product.oldPrice}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button className="page-btn">{"<"}</button>
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <span className="page-btn dots">...</span>
            <button className="page-btn">10</button>
            <button className="page-btn">{">"}</button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CategoryPage;
