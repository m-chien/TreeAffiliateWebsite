import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  ShieldCheck,
  Heart,
  Droplets,
  Sun,
  Wind,
  Leaf,
  Sprout,
  ArrowLeft,
  Share2,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import styles from "./PlantReviewPage.module.css";
import EmailSubscriptionModal from "../components/EmailSubscriptionModal";

// ==================== INTERFACES ====================
interface PlantData {
  id: number;
  tenCay: string;
  tenTiengAnh: string;
  scientificName?: string;
  diemDanhGia: number;
  luotXem: number;
  anh: string;
  moTa: string;
  gia: number;
  giaThamKhao?: string;
  anhSangCanThiet: string;
  locKhongKhi: boolean;
  doKhoChamSoc: number;
  kichThuoc: string;
  anToanChoThuCung: boolean;
  mucTraHoaHong: number;
  trangThai: string;
}

interface CareGuideData {
  id: number;
  idCayCanh: number;
  anhSang: string;
  cheDoNuoc: string;
  datVaDinhDuong: string;
  doAnToan: string;
}

interface LinkAffiliateData {
  id: number;
  nhaCungCap: string;
  giaGoc: number;
  linkAffiliate: string;
  trangThai: string;
}

interface Testimonial {
  id: number;
  idCayCanh: number;
  idUser: number;
  nguoiDanhGia: string;
  diem: number;
  noiDung: string;
  ngayDang: string;
  linkAnh?: string;
}

// ==================== COMPONENT ====================
const PlantReviewPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // States chính
  const [plantData, setPlantData] = useState<PlantData | null>(null);
  const [careGuide, setCareGuide] = useState<CareGuideData | null>(null);
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [affiliateLinks, setAffiliateLinks] = useState<LinkAffiliateData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Lấy dữ liệu từ API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Gọi đồng thời 4 API: Thông tin cây, Hướng dẫn chăm sóc, Đánh giá, và Link Affiliate
        const [
          plantResponse,
          careGuideResponse,
          reviewsResponse,
          linksResponse,
        ] = await Promise.allSettled([
          axios.get(`http://localhost:8080/api/v1/cay-canh/${id}`),
          axios.get(
            `http://localhost:8080/api/v1/huong-dan-cham-soc/cay-canh/${id}`,
          ),
          axios.get(`http://localhost:8080/api/v1/danh-gia/cay-canh/${id}`),
          axios.get(
            `http://localhost:8080/api/v1/link-affiliate/cay-canh/${id}`,
          ),
        ]);

        // Xử lý dữ liệu Cây Cảnh
        if (
          plantResponse.status === "fulfilled" &&
          plantResponse.value.data?.result
        ) {
          const data = plantResponse.value.data.result;
          setPlantData({
            ...data,
            scientificName: data.tenTiengAnh || "Orchidaceae",
          });
        } else {
          setError("Không tìm thấy thông tin cây cảnh");
          setIsLoading(false);
          return;
        }

        // Xử lý dữ liệu Hướng Dẫn Chăm Sóc
        if (
          careGuideResponse.status === "fulfilled" &&
          careGuideResponse.value.data?.result
        ) {
          setCareGuide(careGuideResponse.value.data.result);
        }

        // Xử lý dữ liệu Đánh Giá
        if (
          reviewsResponse.status === "fulfilled" &&
          reviewsResponse.value.data?.result?.content
        ) {
          setReviews(reviewsResponse.value.data.result.content);
        }

        // Xử lý dữ liệu Link Affiliate
        if (
          linksResponse.status === "fulfilled" &&
          linksResponse.value.data?.result?.content
        ) {
          const activeLinks = linksResponse.value.data.result.content.filter(
            (link: LinkAffiliateData) => link.trangThai === "ACTIVE",
          );
          setAffiliateLinks(activeLinks);
        }
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu:", err);
        setError("Không thể tải thông tin. Vui lòng thử lại.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  // Dữ liệu mẫu Ưu/Nhược điểm
  const pros = [
    "Vẻ đẹp nhiệt đới sang trọng, tạo điểm nhấn mạnh mẽ.",
    "Có khả năng lọc không khí cực kỳ hiệu quả.",
    "Ít sâu bệnh và dễ thích nghi với môi trường trong nhà.",
    "Mang ý nghĩa phong thủy tốt về sự trường thọ.",
  ];

  const cons = [
    "Có độc nhẹ nếu thú cưng hoặc trẻ em nuốt phải.",
    "Cần không gian rộng để tán lá phát triển.",
    "Lá dễ bám bụi, cần lau chùi thường xuyên.",
  ];

  // Helper function để lấy chữ cái đầu của tên làm Avatar
  const getInitials = (name: string) => {
    if (!name) return "U";
    const words = name.trim().split(" ");
    if (words.length >= 2) {
      return (words[0][0] + words[words.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Handlers
  const handleFavoriteClick = () => setIsFavorite(!isFavorite);
  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: plantData?.tenCay,
        text: `Xem review về ${plantData?.tenCay}`,
        url: window.location.href,
      });
    }
  };
  const handleSubscribeClick = () => setIsModalOpen(true);
  const handleBackClick = () => navigate(-1);

  // Loading state
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Leaf size={40} className={styles.loadingIcon} />
        </motion.div>
        <p>Đang tải thông tin cây cảnh...</p>
      </div>
    );
  }

  // Error state
  if (error || !plantData) {
    return (
      <div className={styles.errorContainer}>
        <AlertTriangle size={48} />
        <p>{error || "Không tìm thấy thông tin cây cảnh"}</p>
        <button onClick={handleBackClick} className={styles.backBtn}>
          <ArrowLeft size={18} /> Quay lại
        </button>
      </div>
    );
  }

  return (
    <div className={styles.reviewPage}>
      {/* Decorative background */}
      <div className="global-artistic-background">
        {Array.from({ length: 15 }).map((_, i) => (
          <React.Fragment key={i}>
            {i % 2 === 0 ? (
              <Leaf
                className={`decor-leaf leaf-${i + 1}`}
                size={Math.random() * 80 + 50}
              />
            ) : (
              <Sprout
                className={`decor-leaf leaf-${i + 1}`}
                size={Math.random() * 80 + 50}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Navigation Bar */}
      <nav className={styles.navbar}>
        <button onClick={handleBackClick} className={styles.backNavBtn}>
          <ArrowLeft size={20} />
        </button>
        <h1 className={styles.navTitle}>{plantData.tenCay}</h1>
        <div className={styles.navActions}>
          <button
            onClick={handleFavoriteClick}
            className={`${styles.navActionBtn} ${isFavorite ? styles.active : ""}`}
            title="Thêm vào yêu thích"
          >
            <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
          </button>
          <button
            onClick={handleShareClick}
            className={styles.navActionBtn}
            title="Chia sẻ"
          >
            <Share2 size={20} />
          </button>
        </div>
      </nav>

      <div className={styles.container}>
        {/* ==================== HERO SECTION ==================== */}
        <section className={styles.hero}>
          <motion.div
            className={styles.heroImage}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img src={`/images/${plantData.anh}`} alt={plantData.tenCay} />
            {plantData.trangThai !== "ACTIVE" && (
              <span className={styles.outOfStockBadge}>Tạm hết hàng</span>
            )}
          </motion.div>

          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className={styles.expertBadge}>
              <ShieldCheck size={18} /> Đánh giá bởi Chuyên gia
            </div>

            <h1 className={styles.title}>{plantData.tenCay}</h1>
            <span className={styles.scientificName}>
              Tên khoa học: {plantData.scientificName}
            </span>

            <div className={styles.ratingBox}>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    fill={
                      i < Math.floor(plantData.diemDanhGia)
                        ? "currentColor"
                        : "none"
                    }
                  />
                ))}
              </div>
              <span className={styles.ratingValue}>
                {plantData.diemDanhGia?.toFixed(1) || "0.0"}/5
              </span>
              <span className={styles.reviewCount}>
                ({plantData.luotXem || 0} lượt xem)
              </span>
            </div>

            <div className={styles.priceInfo}>
              <div className={styles.priceSection}>
                <span className={styles.label}>Giá từ:</span>
                <span className={styles.price}>
                  {(plantData.gia || 0).toLocaleString("vi-VN")}₫
                </span>
              </div>
              {plantData.giaThamKhao && (
                <div className={styles.referencePrice}>
                  Giá tham khảo: {plantData.giaThamKhao}
                </div>
              )}
            </div>

            <p className={styles.shortIntro}>
              Mô tả:{" "}
              {plantData.moTa ||
                " Cây cảnh nội thất tuyệt vời với khả năng lọc không khí vượt trội. Phù hợp cho không gian sống hiện đại và mang lại vẻ đẹp tự nhiên cho nhà bạn."}
            </p>

            <button
              className={styles.ctaPrimary}
              onClick={handleSubscribeClick}
            >
              <Heart size={18} /> Thêm vào yêu thích & Nhận tin tức
            </button>
          </motion.div>
        </section>

        {/* ==================== PROS & CONS SECTION ==================== */}
        <motion.section
          className={styles.prosConsSection}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.prosConsBox}>
            <div className={styles.prosCol}>
              <h3>
                <CheckCircle className={styles.checkIcon} /> Ưu Điểm
              </h3>
              <ul className={styles.pList}>
                {pros.map((p, i) => (
                  <li key={i} className={styles.pItem}>
                    <CheckCircle size={18} className={styles.checkIcon} />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.consCol}>
              <h3>
                <AlertTriangle className={styles.warnIcon} /> Nhược Điểm
              </h3>
              <ul className={styles.pList}>
                {cons.map((c, i) => (
                  <li key={i} className={styles.pItem}>
                    <AlertTriangle size={18} className={styles.warnIcon} />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        {/* ==================== CARE GUIDE SECTION ==================== */}
        <motion.section
          className={styles.careGuideSection}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <article className={styles.careContent}>
            <h2>Hướng Dẫn Chăm Sóc Chi Tiết</h2>

            {/* Ánh sáng */}
            <div className={styles.careSection}>
              <h4>
                <Sun size={20} style={{ marginRight: "8px" }} /> Ánh sáng
              </h4>
              <p>
                {careGuide?.anhSang ||
                  plantData.anhSangCanThiet ||
                  "Đang cập nhật thông tin ánh sáng."}
              </p>
            </div>

            {/* Nước */}
            <div className={styles.careSection}>
              <h4>
                <Droplets size={20} style={{ marginRight: "8px" }} /> Chế độ
                nước
              </h4>
              <p>
                {careGuide?.cheDoNuoc || "Đang cập nhật thông tin chế độ nước."}
              </p>
            </div>

            {/* Đất và Dinh Dưỡng */}
            <div className={styles.careSection}>
              <h4>
                <Leaf size={20} style={{ marginRight: "8px" }} /> Đất và Dinh
                dưỡng
              </h4>
              <p>
                {careGuide?.datVaDinhDuong ||
                  "Đang cập nhật thông tin đất trồng và dinh dưỡng."}
              </p>
            </div>

            {/* Độ khó chăm sóc */}
            <div className={styles.careSection}>
              <h4>
                <Wind size={20} style={{ marginRight: "8px" }} /> Độ khó chăm
                sóc
              </h4>
              <div className={styles.difficultyMeter}>
                <div className={styles.difficultyLabel}>
                  Mức độ:{" "}
                  {["Rất dễ", "Dễ", "Trung bình", "Khó", "Rất khó"][
                    plantData.doKhoChamSoc - 1
                  ] || "Không xác định"}
                </div>
                <div className={styles.difficultyBar}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className={`${styles.difficultySegment} ${i < plantData.doKhoChamSoc ? styles.filled : ""}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* An toàn */}
            <div className={styles.careSection}>
              <h4>
                <Heart size={20} style={{ marginRight: "8px" }} /> Độ an toàn
              </h4>
              <div className={styles.safetyBox}>
                {careGuide?.doAnToan ? (
                  <p>{careGuide.doAnToan}</p>
                ) : plantData.anToanChoThuCung ? (
                  <p style={{ color: "#27ae60" }}>
                    ✓ An toàn cho thú cưng và trẻ em
                  </p>
                ) : (
                  <p style={{ color: "#c0392b" }}>
                    ⚠ Có độc nhẹ nếu thú cưng hoặc trẻ em nuốt phải.
                  </p>
                )}
              </div>
            </div>

            {/* Kích thước */}
            <div className={styles.careSection}>
              <h4>
                <Sprout size={20} style={{ marginRight: "8px" }} /> Kích thước
              </h4>
              <p>
                Kích thước cây: <strong>{plantData.kichThuoc}</strong>
              </p>
            </div>
          </article>
        </motion.section>

        {/* ==================== AFFILIATE SECTION ==================== */}
        <motion.section
          className={styles.affiliateSection}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.affiliateCard}>
            <div className={styles.affiliateHeader}>
              <TrendingUp size={24} />
              <h2>Mua {plantData.tenCay} Uy Tín Ở Đâu?</h2>
            </div>

            <div className={styles.vendorList}>
              {affiliateLinks.length > 0 ? (
                affiliateLinks.map((link, i) => (
                  <motion.div
                    key={link.id}
                    className={styles.vendorItem}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className={styles.vendorInfo}>
                      <span className={styles.vendorName}>
                        {link.nhaCungCap}
                      </span>
                      <span className={styles.vendorPrice}>
                        {link.giaGoc?.toLocaleString("vi-VN")}₫
                      </span>
                    </div>
                    <a
                      href={link.linkAffiliate}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.ctaBtn}
                    >
                      Xem chi tiết{" "}
                      <ExternalLink size={16} style={{ marginLeft: "8px" }} />
                    </a>
                  </motion.div>
                ))
              ) : (
                <p
                  style={{
                    textAlign: "center",
                    width: "100%",
                    padding: "1rem",
                  }}
                >
                  Hiện chưa có liên kết mua hàng cho cây này.
                </p>
              )}
            </div>
          </div>
        </motion.section>

        {/* ==================== TESTIMONIALS SECTION ==================== */}
        <section className={styles.testimonialsSection}>
          <motion.h2
            style={{
              textAlign: "center",
              marginBottom: "3rem",
              fontFamily: "Poppins, serif",
              fontSize: "2rem",
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Khách Hàng Nói Gì?
          </motion.h2>

          <div className={styles.testimonialsGrid}>
            {reviews.length > 0 ? (
              reviews.map((testimonial, i) => (
                <motion.div
                  key={testimonial.id || i}
                  className={styles.testimonialCard}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className={styles.tHeader}>
                    <div className={styles.avatar}>
                      {getInitials(testimonial.nguoiDanhGia)}
                    </div>
                    <div>
                      <span className={styles.tName}>
                        {testimonial.nguoiDanhGia}
                      </span>
                      <div className={styles.stars}>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            fill={i < testimonial.diem ? "#ffc107" : "none"}
                            color="#ffc107"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className={styles.tQuote}>{testimonial.noiDung}</p>
                </motion.div>
              ))
            ) : (
              <p
                style={{
                  textAlign: "center",
                  width: "100%",
                  gridColumn: "1 / -1",
                }}
              >
                Hiện chưa có đánh giá nào cho cây này. Hãy là người đầu tiên
                chia sẻ cảm nhận!
              </p>
            )}
          </div>
        </section>
      </div>

      <EmailSubscriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default PlantReviewPage;
