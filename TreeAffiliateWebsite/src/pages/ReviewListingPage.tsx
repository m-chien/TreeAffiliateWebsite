import React, { useState, useEffect } from "react";
import {
  Search,
  Star,
  ArrowRight,
  MousePointer2,
  Leaf,
  Sprout,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import styles from "./ReviewListingPage.module.css";

const ReviewListingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const categories = ["Tất cả", "Dễ Chăm", "Lọc Không Khí", "Phong Thủy"];

  // Reset page when search or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeCategory]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Lấy danh sách tối đa 100 cây từ API
        const response = await axios.get("http://localhost:8080/api/v1/cay-canh?size=100");
        const content = response.data?.result?.content || [];

        const mapped = content.map((plant: any) => {
          const nameLower = plant.tenCay.toLowerCase();
          let category = "Dễ Chăm";
          if (
            nameLower.includes("lưỡi hổ") ||
            nameLower.includes("xương rồng") ||
            nameLower.includes("trầu bà")
          ) {
            category = "Dễ Chăm";
          } else if (
            nameLower.includes("kim tiền") ||
            nameLower.includes("ngọc ngân")
          ) {
            category = "Phong Thủy";
          } else if (
            nameLower.includes("monstera") ||
            nameLower.includes("bàng sing") ||
            nameLower.includes("lan ý") ||
            nameLower.includes("hạnh phúc")
          ) {
            category = "Lọc Không Khí";
          } else {
            const cats = plant.danhMucList || [];
            if (cats.some((c: string) => c.toLowerCase().includes("phong thủy"))) {
              category = "Phong Thủy";
            } else if (
              plant.locKhongKhi ||
              cats.some((c: string) => c.toLowerCase().includes("lọc không khí"))
            ) {
              category = "Lọc Không Khí";
            }
          }

          return {
            id: plant.id,
            name: plant.tenCay.startsWith("Cây") ? plant.tenCay : `Cây ${plant.tenCay}`,
            scientificName: plant.tenTiengAnh || "",
            category,
            rating: plant.diemDanhGia || 5.0,
            image: plant.anh
              ? `/images/${plant.anh}`
              : "https://via.placeholder.com/300x350?text=Chua+Co+Anh",
            prosSnippet: plant.moTa || "",
            link: `/review/${plant.id}`,
          };
        });

        setReviews(mapped);
      } catch (err) {
        console.error("Lỗi khi tải danh sách đánh giá:", err);
        setError("Không thể tải danh sách đánh giá cây cảnh. Vui lòng kiểm tra kết nối Server.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.scientificName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "Tất cả" || review.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className={styles.hubPage}>
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

      <div className={styles.container}>
        <header className={styles.hubHeader}>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Trung Tâm Đánh Giá Cây Cảnh
          </motion.h1>
          <p>
            Tìm kiếm những bài phân tích chuyên sâu về các loại cây cảnh phổ
            biến nhất. Chúng tôi giúp bạn hiểu rõ ưu khuyết điểm trước khi quyết
            định rước "bạn xanh" về nhà.
          </p>

          <div className={styles.controls}>
            <div className={styles.searchBox}>
              <Search className={styles.searchIcon} size={20} />
              <input
                type="text"
                placeholder="Tìm tên cây hoặc tên khoa học..."
                className={styles.searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className={styles.filterGroup}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`${styles.filterBtn} ${activeCategory === cat ? styles.active : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </header>

        {isLoading ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "4rem 0" }}>
            <p style={{ fontSize: "1.2rem", color: "#1a332a", fontWeight: "bold" }}>Đang tải danh sách đánh giá...</p>
          </div>
        ) : error ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "4rem 0", flexDirection: "column", gap: "1rem" }}>
            <p style={{ fontSize: "1.2rem", color: "#d9534f", fontWeight: "bold" }}>{error}</p>
            <button onClick={() => window.location.reload()} style={{ padding: "0.5rem 1rem", backgroundColor: "#1a332a", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>Thử lại</button>
          </div>
        ) : paginatedReviews.length > 0 ? (
          <>
            <div className={styles.reviewGrid}>
              {paginatedReviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  className={styles.reviewCard}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className={styles.cardImageContainer}>
                    <img
                      src={review.image}
                      alt={review.name}
                      className={styles.cardImage}
                    />
                  </div>
                  <div className={styles.cardContent}>
                    <span className={styles.category}>{review.category}</span>
                    <h3>{review.name}</h3>
                    <span className={styles.sciName}>
                      {review.scientificName}
                    </span>
                    <div className={styles.rating}>
                      <Star size={14} fill="currentColor" style={{ color: "#ffc107" }} />
                      <span>{review.rating?.toFixed(1)} / 5</span>
                    </div>
                    <p className={styles.snippet}>{review.prosSnippet}</p>
                    <Link
                      to={review.link}
                      className={styles.viewBtn}
                      aria-label="View details"
                    >
                      Xem chi tiết <ArrowRight size={18} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className={styles.pagination}>
                <button
                  className={styles.pageBtn}
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                >
                  <ChevronLeft size={18} />
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    className={`${styles.pageNumber} ${currentPage === page ? styles.activePage : ""}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  className={styles.pageBtn}
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className={styles.noResults}>
            <MousePointer2 size={48} style={{ marginBottom: "1rem" }} />
            <h3>Không tìm thấy kết quả phù hợp</h3>
            <p>Hãy thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewListingPage;
