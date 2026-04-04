import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Maximize2, Star, X, Leaf, Sprout } from "lucide-react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { CATEGORIES, SIZES } from "../data/configData";
import { DUMMY_PRODUCTS } from "../data/plantData";
import "./CategoryPage.css";

/* Removed local CATEGORIES, SIZES, and DUMMY_PRODUCTS definitions */

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
      <div className="global-artistic-background">
        <Leaf className="decor-leaf leaf-1" size={120} />
        <Leaf className="decor-leaf leaf-2" size={80} />
        <Sprout className="decor-leaf leaf-3" size={100} />
        <Leaf className="decor-leaf leaf-4" size={60} />
        <Leaf className="decor-leaf leaf-5" size={110} />
        <Sprout className="decor-leaf leaf-6" size={70} />
        <Leaf className="decor-leaf leaf-7" size={90} />
        <Leaf className="decor-leaf leaf-8" size={50} />
        <Leaf className="decor-leaf leaf-9" size={130} />
        <Sprout className="decor-leaf leaf-10" size={85} />
        <Leaf className="decor-leaf leaf-11" size={95} />
        <Leaf className="decor-leaf leaf-12" size={75} />
        <Sprout className="decor-leaf leaf-13" size={105} />
        <Leaf className="decor-leaf leaf-14" size={55} />
        <Leaf className="decor-leaf leaf-15" size={115} />
      </div>
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
