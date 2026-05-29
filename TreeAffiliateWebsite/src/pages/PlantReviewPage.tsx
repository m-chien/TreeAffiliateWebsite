import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
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
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./PlantReviewPage.module.css";

interface PlantData {
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
}

interface HuongDanData {
  id: number;
  cayCanhId: number;
  anhSang: string;
  cheDoNuoc: string;
  datVaDinhDuong: string;
  doAnToan: string;
}

interface VendorData {
  name: string;
  price: string;
  link: string;
}

interface TestimonialData {
  id: number;
  name: string;
  rating: number;
  quote: string;
}

interface FaqData {
  id: number;
  cauHoi: string;
  cauTraLoi: string;
}

const PlantReviewPage = () => {
  const { id } = useParams<{ id: string }>();
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [plant, setPlant] = useState<PlantData | null>(null);
  const [huongDan, setHuongDan] = useState<HuongDanData | null>(null);
  const [pros, setPros] = useState<string[]>([]);
  const [cons, setCons] = useState<string[]>([]);
  const [faqs, setFaqs] = useState<FaqData[]>([]);
  const [vendors, setVendors] = useState<VendorData[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchPlantDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [
          plantRes,
          hdRes,
          nbRes,
          faqRes,
          linkRes,
          dgRes
        ] = await Promise.all([
          axios.get(`http://localhost:8080/api/v1/cay-canh/${id}`),
          axios.get(`http://localhost:8080/api/v1/huong-dan-cham-soc/cay-canh/${id}`),
          axios.get(`http://localhost:8080/api/v1/thong-tin-noi-bat/cay-canh/${id}`),
          axios.get(`http://localhost:8080/api/v1/cau-hoi-thuong-gap/cay-canh/${id}`),
          axios.get(`http://localhost:8080/api/v1/link-affiliate/cay-canh/${id}`),
          axios.get(`http://localhost:8080/api/v1/danh-gia/cay-canh/${id}`)
        ]);

        setPlant(plantRes.data?.result || null);
        setHuongDan(hdRes.data?.result || null);

        const nbList = nbRes.data?.result?.content || [];
        const uuDiem = nbList.filter((item: any) => item.loai === "Uu").map((item: any) => item.noiDung);
        const nhuoDiem = nbList.filter((item: any) => item.loai === "Nhuoc").map((item: any) => item.noiDung);
        setPros(uuDiem);
        setCons(nhuoDiem);

        setFaqs(faqRes.data?.result?.content || []);

        const linkList = linkRes.data?.result?.content || [];
        setVendors(linkList.map((item: any) => ({
          name: item.nenTang || item.nhaCungCap,
          price: item.giaGoc ? `${item.giaGoc.toLocaleString("vi-VN")}đ` : "Liên hệ",
          link: item.linkAffiliate || "#"
        })));

        const dgList = dgRes.data?.result?.content || [];
        setTestimonials(dgList.map((item: any) => ({
          id: item.id,
          name: item.nguoiDanhGia,
          rating: item.diem,
          quote: item.noiDung
        })));

      } catch (err) {
        console.error("Lỗi khi tải chi tiết cây cảnh:", err);
        setError("Không thể tải thông tin cây cảnh. Vui lòng kiểm tra kết nối CSDL và Server.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlantDetails();
  }, [id]);

  const defaultTestimonials = [
    {
      id: -1,
      name: "Thanh Nga",
      rating: 5,
      quote: "Cây mình mua về rất khỏe, đóng gói kỹ. Đặt ở góc phòng khách làm không gian sang hẳn lên. Cảm ơn bài review rất chi tiết đã giúp mình tự tin hơn khi chăm cây!"
    },
    {
      id: -2,
      name: "Hoàng Quân",
      rating: 5,
      quote: "Thông tin về ánh sáng và nước rất hữu ích. Mình từng làm chết một cây do tưới quá nhiều, giờ làm theo hướng dẫn thấy cây phát triển tốt lắm."
    }
  ];

  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;

  if (isLoading) {
    return (
      <div className={styles.reviewPage} style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <p style={{ fontSize: "1.2rem", color: "#1a332a", fontWeight: "bold" }}>Đang tải thông tin cây cảnh...</p>
      </div>
    );
  }

  if (error || !plant) {
    return (
      <div className={styles.reviewPage} style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", flexDirection: "column", gap: "1rem" }}>
        <p style={{ fontSize: "1.2rem", color: "#d9534f", fontWeight: "bold" }}>{error || "Không tìm thấy thông tin cây cảnh!"}</p>
        <button onClick={() => window.location.reload()} style={{ padding: "0.5rem 1rem", backgroundColor: "#1a332a", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>Tải lại trang</button>
      </div>
    );
  }

  return (
    <div className={styles.reviewPage}>
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
        {/* Hero Section */}
        <section className={styles.hero}>
          <motion.div
            className={styles.heroImage}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src={`/images/${plant.anh}`} 
              onError={(e) => {
                e.currentTarget.src = "https://via.placeholder.com/500x500?text=Chua+Co+Anh";
              }}
              alt={plant.tenCay} 
            />
          </motion.div>
          <div className={styles.heroContent}>
            <div className={styles.expertBadge}>
              <ShieldCheck size={18} /> Đánh giá bởi Chuyên gia
            </div>
            <h1 className={styles.title}>{plant.tenCay}</h1>
            <span className={styles.scientificName}>
              {plant.tenTiengAnh || "Đang cập nhật tên khoa học"}
            </span>
            <div className={styles.ratingBox}>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    fill={i < Math.floor(plant.diemDanhGia || 5) ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <span className={styles.ratingValue}>{(plant.diemDanhGia || 5.0).toFixed(1)}/5</span>
              <span className={styles.reviewCount}>
                ({testimonials.length} nhận xét)
              </span>
            </div>
            <p className={styles.shortIntro}>
              {plant.moTa || `Chi tiết thông tin đánh giá, ưu nhược điểm và hướng dẫn chăm sóc đầy đủ nhất cho cây ${plant.tenCay}.`}
            </p>
          </div>
        </section>

        {/* Pros & Cons Section */}
        {(pros.length > 0 || cons.length > 0) && (
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
                  {pros.length > 0 ? (
                    pros.map((p, i) => (
                      <li key={i} className={styles.pItem}>
                        <CheckCircle size={18} className={styles.checkIcon} />
                        <span>{p}</span>
                      </li>
                    ))
                  ) : (
                    <li className={styles.pItem}>Đang cập nhật...</li>
                  )}
                </ul>
              </div>
              <div className={styles.consCol}>
                <h3>
                  <AlertTriangle className={styles.warnIcon} /> Nhược Điểm
                </h3>
                <ul className={styles.pList}>
                  {cons.length > 0 ? (
                    cons.map((c, i) => (
                      <li key={i} className={styles.pItem}>
                        <AlertTriangle size={18} className={styles.warnIcon} />
                        <span>{c}</span>
                      </li>
                    ))
                  ) : (
                    <li className={styles.pItem}>Đang cập nhật...</li>
                  )}
                </ul>
              </div>
            </div>
          </motion.section>
        )}

        {/* Affiliate CTA Box */}
        {vendors.length > 0 && (
          <motion.section
            className={styles.affiliateSection}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.affiliateCard}>
              <h2>Mua {plant.tenCay} Uy Tín Ở Đâu?</h2>
              <div className={styles.vendorList}>
                {vendors.map((v, i) => (
                  <div key={i} className={styles.vendorItem}>
                    <div className={styles.vendorInfo}>
                      <span className={styles.vendorName}>{v.name}</span>
                      <span className={styles.vendorPrice}>{v.price}</span>
                    </div>
                    <a href={v.link} target="_blank" rel="noopener noreferrer" className={styles.ctaBtn}>
                      Đến nơi bán{" "}
                      <ExternalLink size={16} style={{ marginLeft: "8px" }} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* Detailed Review Content */}
        {huongDan && (
          <motion.section
            className={styles.detailedReview}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <article className={styles.reviewContent}>
              <h2>Hướng Dẫn Chăm Sóc Chi Tiết</h2>

              {huongDan.anhSang && (
                <>
                  <h4>
                    <Sun size={20} style={{ marginRight: "8px" }} /> Ánh sáng
                  </h4>
                  <p>{huongDan.anhSang}</p>
                </>
              )}

              {huongDan.cheDoNuoc && (
                <>
                  <h4>
                    <Droplets size={20} style={{ marginRight: "8px" }} /> Chế độ nước
                  </h4>
                  <p>{huongDan.cheDoNuoc}</p>
                </>
              )}

              {huongDan.datVaDinhDuong && (
                <>
                  <h4>
                    <Wind size={20} style={{ marginRight: "8px" }} /> Đất và Dinh dưỡng
                  </h4>
                  <p>{huongDan.datVaDinhDuong}</p>
                </>
              )}

              {huongDan.doAnToan && (
                <>
                  <h4>
                    <Heart size={20} style={{ marginRight: "8px" }} /> Độ an toàn
                  </h4>
                  <p style={{ color: "#C2714F", fontWeight: "bold" }}>
                    {huongDan.doAnToan}
                  </p>
                </>
              )}
            </article>
          </motion.section>
        )}

        {/* FAQs Section */}
        {faqs.length > 0 && (
          <motion.section
            className={styles.faqSection}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2>Câu Hỏi Thường Gặp (FAQs)</h2>
            <div className={styles.faqGrid}>
              {faqs.map((faq, i) => {
                const isOpen = expandedFaq === i;
                return (
                  <div key={faq.id || i} className={styles.faqItem}>
                    <button
                      className={styles.faqQuestion}
                      onClick={() => setExpandedFaq(isOpen ? null : i)}
                    >
                      <span className={styles.faqQuestionText}>{faq.cauHoi}</span>
                      <ChevronDown
                        size={20}
                        className={`${styles.faqIcon} ${isOpen ? styles.faqIconRotated : ""}`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className={styles.faqAnswer}
                        >
                          <div className={styles.faqAnswerInner}>
                            {faq.cauTraLoi}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.section>
        )}
      </div>

      {/* Testimonials Section */}
      <section className={styles.testimonialsSection}>
        <div className={styles.container}>
          <motion.h2
            style={{
              textAlign: "center",
              marginBottom: "3rem",
              fontFamily: "Inter, serif",
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Khách Hàng Nói Gì?
          </motion.h2>
          <div className={styles.testimonialsGrid}>
            {displayTestimonials.map((t) => (
              <motion.div
                key={t.id}
                className={styles.testimonialCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className={styles.tHeader}>
                  <div className={styles.avatar}>
                    {t.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
                  </div>
                  <div>
                    <span className={styles.tName}>{t.name}</span>
                    <div className={styles.stars}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < t.rating ? "white" : "none"} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className={styles.tQuote}>
                  "{t.quote}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlantReviewPage;