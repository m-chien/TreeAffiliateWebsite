import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Maximize2, Star, Leaf, Sprout } from "lucide-react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { toggleFavoriteProduct } from "../store/favoritesSlice";

import EmailSubscriptionModal from "../components/EmailSubscriptionModal";
import "./CategoryPage.css";

// Interface khớp 100% với DTO và Response của Spring Boot
interface Category {
  id: number;
  tenDanhMuc: string;
  ngayTao: string;
}

interface Product {
  id: number;
  tenCay: string;
  tenTiengAnh: string;
  gia: number;
  moTa: string;
  anh: string;
  trangThai: string;
  mucTraHoaHong: number;
  diemDanhGia: number;
  luotXem: number;
  giaThamKhao: string;
  anToanChoThuCung: boolean;
  anhSangCanThiet: string;
  locKhongKhi: boolean;
  doKhoChamSoc: number;
  kichThuoc: string;
  danhMucList?: string[];
}

// Hằng số cho bộ lọc
const SIZES = ["Mini", "Nhỏ", "Trung bình", "Lớn"];
const RATINGS = [5, 4, 3, 2, 1];

const CategoryPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // States Bộ lọc
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [bestSellerOnly, setBestSellerOnly] = useState(false);
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000000]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  
  const dispatch = useDispatch();
  const favoriteProducts = useSelector((state: RootState) => state.favorites.products);
  const isFavorite = (productId: number) => favoriteProducts.some((p) => p.id === productId);

  // 1. Gọi API lấy dữ liệu
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [catRes, prodRes] = await Promise.all([
          axios.get("http://localhost:8080/api/v1/danh-muc-cay-canh"),
          axios.get("http://localhost:8080/api/v1/cay-canh"),
        ]);

        const catData = catRes.data?.result?.content || [];
        const prodData = prodRes.data?.result?.content || [];

        setCategories(catData);
        setProducts(prodData);
        setFilteredProducts(prodData);
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu từ API:", err);
        setError(
          "Không thể tải dữ liệu. Vui lòng kiểm tra lại kết nối Backend.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // 2. Logic Lọc dữ liệu
  useEffect(() => {
    if (!Array.isArray(products)) return;

    let result = [...products];

    // Lọc theo Danh mục
    if (selectedCats.length > 0) {
      result = result.filter(
        (p) =>
          p.danhMucList &&
          p.danhMucList.some((cat) => selectedCats.includes(cat)),
      );
    }

    // Lọc theo Kích thước
    if (selectedSizes.length > 0) {
      result = result.filter((p) => selectedSizes.includes(p.kichThuoc));
    }

    // Lọc theo Đánh giá sao (So sánh phần nguyên của điểm đánh giá, VD: 4.8 -> 4 sao)
    if (selectedRatings.length > 0) {
      result = result.filter((p) => {
        const floorRating = Math.floor(p.diemDanhGia || 0);
        return selectedRatings.includes(floorRating);
      });
    }

    // Lọc theo Khoảng giá
    result = result.filter((p) => {
      const price = p.gia || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Lọc trạng thái "Còn hàng" (ACTIVE)
    if (inStockOnly) {
      result = result.filter((p) => p.trangThai === "ACTIVE");
    }

    // Lọc "Bán chạy" (Lượt xem > 1500)
    if (bestSellerOnly) {
      result = result.filter((p) => p.luotXem > 1500);
    }

    setFilteredProducts(result);
  }, [
    selectedCats,
    selectedSizes,
    selectedRatings,
    inStockOnly,
    bestSellerOnly,
    priceRange,
    products,
  ]);

  // Các hàm tiện ích (Handlers)
  const handleFavoriteClick = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleFavoriteProduct({
      id: product.id,
      tenCay: product.tenCay,
      tenTiengAnh: product.tenTiengAnh,
      gia: product.gia,
      anh: product.anh,
      diemDanhGia: product.diemDanhGia,
      giaThamKhao: product.giaThamKhao,
      kichThuoc: product.kichThuoc,
      danhMucList: product.danhMucList,
    }));
  };

  const handleProductClick = (id: number) => {
    navigate(`/review/${id}`);
  };

  const toggleStringFilter = (
    set: React.Dispatch<React.SetStateAction<string[]>>,
    item: string,
  ) => {
    set((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  const toggleNumberFilter = (
    set: React.Dispatch<React.SetStateAction<number[]>>,
    item: number,
  ) => {
    set((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  const renderStars = (rating: number) => {
    return Array(Math.floor(rating) || 0)
      .fill(0)
      .map((_, i) => <Star key={i} size={14} className="star-icon" />);
  };

  const formatPrice = (price: number) =>
    (price || 0).toLocaleString("vi-VN") + "₫";

  if (isLoading)
    return (
      <div
        style={{ textAlign: "center", padding: "100px", fontSize: "1.2rem" }}
      >
        Đang tải dữ liệu cây cảnh...
      </div>
    );
  if (error)
    return (
      <div style={{ color: "red", textAlign: "center", padding: "100px" }}>
        {error}
      </div>
    );

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
      
      <div className="category-hero">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Bộ Sưu Tập Cây Xanh Thiết Kế</h1>
          <p>
            Khám phá hàng trăm loài thực vật độc đáo được tuyển chọn kỹ lưỡng. 
            Từ những chậu cây để bàn nhỏ xinh cho đến những tuyệt tác kiến trúc xanh thanh lọc không khí,
            giúp không gian sống của bạn thêm phần trong lành và thư thái.
          </p>
        </motion.div>
      </div>

      <div className="category-container">
        {/* ================= SIDEBAR BỘ LỌC ================= */}
        <aside className="category-sidebar" style={{ zIndex: 10 }}>
          <h2 className="sidebar-title">Bộ Lọc</h2>

          {/* 1. Lọc Danh Mục */}
          <div className="filter-section">
            <h3>Danh Mục</h3>
            <div className="filter-list">
              {categories.map((cat) => (
                <label key={cat.id} className="filter-item">
                  <input
                    type="checkbox"
                    checked={selectedCats.includes(cat.tenDanhMuc)}
                    onChange={() =>
                      toggleStringFilter(setSelectedCats, cat.tenDanhMuc)
                    }
                  />
                  {cat.tenDanhMuc}
                </label>
              ))}
            </div>
          </div>

          {/* 2. Lọc Kích Thước */}
          <div className="filter-section">
            <h3>Kích Thước</h3>
            <div className="filter-list">
              {SIZES.map((size) => (
                <label key={size} className="filter-item">
                  <input
                    type="checkbox"
                    checked={selectedSizes.includes(size)}
                    onChange={() => toggleStringFilter(setSelectedSizes, size)}
                  />
                  {size}
                </label>
              ))}
            </div>
          </div>

          {/* 3. Lọc Mức Giá */}
          <div className="filter-section">
            <h3>Mức Giá</h3>
            <div className="price-labels">
              <span>{formatPrice(priceRange[0])}</span>
              <span>{formatPrice(priceRange[1])}</span>
            </div>
            <div style={{ padding: "0 10px", marginTop: "10px" }}>
              <Slider
                range
                min={0}
                max={1000000}
                step={50000}
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

          {/* 4. Lọc Đánh Giá Sao */}
          <div className="filter-section">
            <h3>Đánh Giá</h3>
            <div className="filter-list">
              {RATINGS.map((star) => (
                <label
                  key={star}
                  className="filter-item"
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <input
                    type="checkbox"
                    checked={selectedRatings.includes(star)}
                    onChange={() =>
                      toggleNumberFilter(setSelectedRatings, star)
                    }
                  />
                  <div className="stars-row" style={{ display: "flex" }}>
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          fill={i < star ? "#ffc107" : "transparent"}
                          color={i < star ? "#ffc107" : "#ccc"}
                        />
                      ))}
                  </div>
                  <span style={{ fontSize: "0.9rem" }}>
                    {star === 5 ? "5 Sao" : `Từ ${star} Sao`}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* 5. Lọc Khuyến Mãi & Trạng Thái */}
          <div className="filter-section">
            <h3>Trạng Thái & Khuyến Mãi</h3>
            <div className="filter-list">
              <label className="filter-item">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={() => setInStockOnly(!inStockOnly)}
                />{" "}
                Còn Hàng (Sẵn có)
              </label>
              <label className="filter-item">
                <input
                  type="checkbox"
                  checked={bestSellerOnly}
                  onChange={() => setBestSellerOnly(!bestSellerOnly)}
                />{" "}
                Bán Chạy Nhất
              </label>
            </div>
          </div>
        </aside>

        {/* ================= NỘI DUNG CHÍNH ================= */}
        <main className="category-main" style={{ zIndex: 10 }}>
          <div className="main-header">
            <span className="results-count">
              Hiển thị {filteredProducts.length} kết quả
            </span>
          </div>

          <div className="product-grid">
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  className="product-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => handleProductClick(product.id)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="product-image-container">
                    <img
                      src={`/images/${product.anh}`}
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://via.placeholder.com/300x350?text=Chua+Co+Anh";
                      }}
                      alt={product.tenCay}
                    />
                    {/* Badge trạng thái */}
                    {product.trangThai !== "ACTIVE" && (
                      <span
                        className="discount-badge"
                        style={{ backgroundColor: "#dc3545" }}
                      >
                        Tạm hết
                      </span>
                    )}

                    <div className="hover-actions">
                      <button
                        className="action-btn"
                        title="Yêu thích"
                        onClick={(e) => handleFavoriteClick(product, e)}
                        style={isFavorite(product.id) ? { color: "var(--accent-orange, #C4622D)" } : {}}
                      >
                        <Heart size={18} fill={isFavorite(product.id) ? "var(--accent-orange, #C4622D)" : "none"} />
                      </button>
                      <button
                        className="action-btn"
                        title="Xem nhanh"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Maximize2 size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="product-meta">
                    <span className="subcategory">
                      {product.danhMucList && product.danhMucList.length > 0
                        ? product.danhMucList[0]
                        : product.kichThuoc}
                    </span>
                    <span
                      className="rating"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <span style={{ display: "flex" }}>
                        {renderStars(product.diemDanhGia)}
                      </span>
                      <span>{product.diemDanhGia?.toFixed(1) || "0.0"}</span>
                    </span>
                  </div>

                  <h3 className="product-title">{product.tenCay}</h3>
                  <div className="price-row">
                    <span className="current-price">
                      {formatPrice(product.gia)}
                    </span>
                    {product.giaThamKhao && (
                      <span
                        className="old-price"
                        style={{
                          textDecoration: "line-through",
                          fontSize: "0.85em",
                          color: "#999",
                        }}
                      >
                        {product.giaThamKhao}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredProducts.length === 0 && (
              <div
                style={{
                  padding: "40px",
                  textAlign: "center",
                  width: "100%",
                  gridColumn: "1 / -1",
                  color: "#666",
                }}
              >
                Không tìm thấy cây cảnh nào phù hợp với bộ lọc. Vui lòng điều
                chỉnh lại lựa chọn!
              </div>
            )}
          </div>
        </main>
      </div>

      <EmailSubscriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default CategoryPage;
