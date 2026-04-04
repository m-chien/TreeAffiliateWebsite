import React from "react";
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
} from "lucide-react";
import { motion } from "framer-motion";
import styles from "./PlantReviewPage.module.css";

const PlantReviewPage = () => {
  const plantData = {
    name: "Cây Monstera Deliciosa",
    scientificName: "Monstera deliciosa",
    rating: 4.8,
    reviews: 128,
    image: "/images/main-plant.png",
    pros: [
      "Vẻ đẹp nhiệt đới sang trọng, tạo điểm nhấn mạnh mẽ.",
      "Có khả năng lọc không khí cực kỳ hiệu quả.",
      "Ít sâu bệnh và dễ thích nghi với môi trường trong nhà.",
      "Mang ý nghĩa phong thủy tốt về sự trường thọ.",
    ],
    cons: [
      "Có độc nhẹ nếu thú cưng hoặc trẻ em nuốt phải.",
      "Cần không gian rộng để tán lá phát triển.",
      "Lá dễ bám bụi, cần lau chùi thường xuyên.",
    ],
    vendors: [
      { name: "Shopee Mall", price: "350.000đ - 750.000đ", link: "#" },
      { name: "Tiệm Cây Xanh A", price: "400.000đ", link: "#" },
      { name: "Vườn Kiểng Tropical", price: "380.000đ", link: "#" },
    ],
  };

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
            <img src={plantData.image} alt={plantData.name} />
          </motion.div>
          <div className={styles.heroContent}>
            <div className={styles.expertBadge}>
              <ShieldCheck size={18} /> Đánh giá bởi Chuyên gia
            </div>
            <h1 className={styles.title}>{plantData.name}</h1>
            <span className={styles.scientificName}>
              {plantData.scientificName}
            </span>
            <div className={styles.ratingBox}>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    fill={i < 4 ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <span className={styles.ratingValue}>{plantData.rating}/5</span>
              <span className={styles.reviewCount}>
                ({plantData.reviews} nhận xét)
              </span>
            </div>
            <p className={styles.shortIntro}>
              Monstera Deliciosa, hay còn gọi là Trầu Bà Lá Xẻ, là "ông hoàng"
              của thế giới cây cảnh nội thất. Với những chiếc lá xẻ độc đáo và
              kích thước ấn tượng, nó mang lại hơi thở nhiệt đới sang trọng cho
              bất kỳ không gian nào.
            </p>
          </div>
        </section>

        {/* Pros & Cons Section */}
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
                {plantData.pros.map((p, i) => (
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
                {plantData.cons.map((c, i) => (
                  <li key={i} className={styles.pItem}>
                    <AlertTriangle size={18} className={styles.warnIcon} />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Affiliate CTA Box */}
        <motion.section
          className={styles.affiliateSection}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.affiliateCard}>
            <h2>Mua Monstera Uy Tín Ở Đâu?</h2>
            <div className={styles.vendorList}>
              {plantData.vendors.map((v, i) => (
                <div key={i} className={styles.vendorItem}>
                  <div className={styles.vendorInfo}>
                    <span className={styles.vendorName}>{v.name}</span>
                    <span className={styles.vendorPrice}>{v.price}</span>
                  </div>
                  <a href={v.link} className={styles.ctaBtn}>
                    Đến nơi bán{" "}
                    <ExternalLink size={16} style={{ marginLeft: "8px" }} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Detailed Review Content */}
        <motion.section
          className={styles.detailedReview}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <article className={styles.reviewContent}>
            <h2>Hướng Dẫn Chăm Sóc Chi Tiết</h2>

            <h4>
              <Sun size={20} style={{ marginRight: "8px" }} /> Ánh sáng
            </h4>
            <p>
              Monstera ưa ánh sáng tán xạ, tránh ánh nắng trực tiếp gay gắt vì
              có thể làm cháy lá. Vị trí lý tưởng là gần cửa sổ hướng Đông hoặc
              Tây nơi có rèm che mỏng. Nếu thiếu sáng, cây sẽ chậm lớn và các lá
              mới sẽ ít xẻ hơn.
            </p>

            <h4>
              <Droplets size={20} style={{ marginRight: "8px" }} /> Chế độ nước
            </h4>
            <p>
              Tưới nước khi lớp đất mặt (khoảng 2-3cm) đã khô. Tránh để cây bị
              úng nước vì dễ gây thối rễ. Vào mùa hè, bạn có thể phun sương lên
              lá để tăng độ ẩm, giúp lá bóng mượt hơn.
            </p>

            <h4>
              <Wind size={20} style={{ marginRight: "8px" }} /> Đất và Dinh
              dưỡng
            </h4>
            <p>
              Sử dụng hỗn hợp đất tơi xốp, thoát nước tốt (thường trộn thêm đá
              perlite hoặc vỏ thông). Bón phân tan chậm hoặc phân hữu cơ định kỳ
              1 lần/tháng trong mùa sinh trưởng để cây phát triển khỏe mạnh.
            </p>

            <h4>
              <Heart size={20} style={{ marginRight: "8px" }} /> Độ an toàn
            </h4>
            <p style={{ color: "#C2714F", fontWeight: "bold" }}>
              Lưu ý: Monstera chứa tinh thể canxi oxalat, có thể gây kích ứng
              miệng và tiêu hóa nếu nuốt phải. Hãy đặt cây ở vị trí xa tầm tay
              trẻ nhỏ và thú cưng (chó, mèo).
            </p>
          </article>
        </motion.section>
      </div>

      {/* Testimonials Section - Moved OUTSIDE container for clean full-width */}
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
            <motion.div
              className={styles.testimonialCard}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className={styles.tHeader}>
                <div className={styles.avatar}>TN</div>
                <div>
                  <span className={styles.tName}>Thanh Nga</span>
                  <div className={styles.stars}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="white" />
                    ))}
                  </div>
                </div>
              </div>
              <p className={styles.tQuote}>
                "Cây mình mua về rất khỏe, lá xẻ rất đẹp. Đặt ở góc phòng khách
                làm không gian sang hẳn lên. Cảm ơn bài review rất chi tiết đã
                giúp mình tự tin hơn khi chăm cây!"
              </p>
            </motion.div>
            <motion.div
              className={styles.testimonialCard}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className={styles.tHeader}>
                <div className={styles.avatar}>HQ</div>
                <div>
                  <span className={styles.tName}>Hoàng Quân</span>
                  <div className={styles.stars}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="white" />
                    ))}
                  </div>
                </div>
              </div>
              <p className={styles.tQuote}>
                "Thông tin về ánh sáng và nước rất hữu ích. Mình từng làm chết
                một cây do tưới quá nhiều, giờ làm theo hướng dẫn thấy cây phát
                triển tốt lắm."
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlantReviewPage;
