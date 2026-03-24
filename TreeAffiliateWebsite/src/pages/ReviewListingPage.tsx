import React, { useState } from "react";
import { Search, Star, ArrowRight, MousePointer2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { mockReviews } from "../data/reviewData";
import styles from "./ReviewListingPage.module.css";

const ReviewListingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tất cả");

  const categories = ["Tất cả", "Dễ Chăm", "Lọc Không Khí", "Phong Thủy"];

  const filteredReviews = mockReviews.filter(review => {
    const matchesSearch = review.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          review.scientificName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "Tất cả" || review.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={styles.hubPage}>
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
            Tìm kiếm những bài phân tích chuyên sâu về các loại cây cảnh phổ biến nhất. 
            Chúng tôi giúp bạn hiểu rõ ưu khuyết điểm trước khi quyết định rước "bạn xanh" về nhà.
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
              {categories.map(cat => (
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

        {filteredReviews.length > 0 ? (
          <div className={styles.reviewGrid}>
            {filteredReviews.map((review, index) => (
              <motion.div 
                key={review.id}
                className={styles.reviewCard}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className={styles.cardImage}>
                  <img src={review.image} alt={review.name} />
                </div>
                <div className={styles.cardContent}>
                  <span className={styles.category}>{review.category}</span>
                  <h3>{review.name}</h3>
                  <span className={styles.sciName}>{review.scientificName}</span>
                  <div className={styles.rating}>
                    <Star size={16} fill="currentColor" /> {review.rating} / 5
                  </div>
                  <p className={styles.snippet}>{review.prosSnippet}</p>
                  <Link to={review.link} className={styles.viewBtn}>
                    Xem đánh giá chi tiết <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className={styles.noResults}>
            <MousePointer2 size={48} style={{marginBottom: '1rem'}} />
            <h3>Không tìm thấy kết quả phù hợp</h3>
            <p>Hãy thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewListingPage;
