import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MailSearch, Leaf, Sprout } from "lucide-react";
import styles from "./ContactPage.module.css";
import FAQ from "../components/FAQ";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={styles.contactPage}>
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

      <header className={styles.hero}>
        <div className={styles.container}>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Liên Hệ Với ChienPlant
          </motion.h1>
          <p>
            Bạn cần tư vấn về cách chăm sóc cây hay muốn hợp tác cùng chúng tôi? 
            Hãy để lại lời nhắn, đội ngũ chuyên gia sẽ phản hồi bạn trong vòng 24 giờ.
          </p>
        </div>
      </header>

      <div className={styles.container}>
        
        {/* Tier 1: Form & Newsletter Section */}
        <div className={styles.topGrid}>
          <motion.div 
            className={styles.formBox}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <input 
                  type="email" 
                  name="email"
                  placeholder="Địa chỉ Email" 
                  className={styles.inputField} 
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="Số điện thoại" 
                  className={styles.inputField} 
                  value={formData.phone}
                  onChange={handleChange}
                />
                <input 
                  type="text" 
                  name="name"
                  placeholder="Họ và Tên" 
                  className={`${styles.inputField} ${styles.fullWidth}`} 
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <textarea 
                name="message"
                placeholder="Lời nhắn của bạn..." 
                className={styles.textareaField}
                required
                value={formData.message}
                onChange={handleChange}
              ></textarea>
              <button type="submit" className={styles.submitBtn}>
                {submitted ? "Đã Gửi Thành Công!" : "Gửi Tin Nhắn"}
              </button>
            </form>
          </motion.div>

          <motion.div 
            className={styles.newsletterBox}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2>Nhận Bản Tin Đặc Biệt</h2>
            <p>
              Đừng bỏ lỡ những bí quyết chăm sóc cây cảnh độc quyền và các chương trình ưu đãi dành riêng cho thành viên ChienPlant.
            </p>
            <input type="email" placeholder="Email của bạn" className={styles.newsInput} />
            <button className={styles.newsBtn}>Đăng Ký Ngay</button>
          </motion.div>
        </div>

        {/* Tier 2: Contact Info Cards */}
        <div className={styles.cardsGrid}>
          <motion.div 
            className={styles.infoCard}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className={styles.topIcon}><Phone size={40} /></div>
            <div className={styles.cardValue}>(+84) 0969 827 284</div>
            <p className={styles.cardLabel}>Hotline hỗ trợ kỹ thuật và giải đáp thắc mắc về cây cảnh 24/7.</p>
          </motion.div>

          <motion.div 
            className={`${styles.infoCard} ${styles.light}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className={styles.topIcon}><Mail size={40} /></div>
            <div className={styles.cardValue}>plants.ave@gmail.com</div>
            <p className={styles.cardLabel}>Gửi đề xuất hợp tác hoặc báo cáo lỗi kỹ thuật qua hòm thư điện tử.</p>
          </motion.div>

          <motion.div 
            className={`${styles.infoCard} ${styles.white}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className={styles.topIcon}><MapPin size={40} /></div>
            <div className={styles.cardValue}>Đà Nẵng, Việt Nam</div>
            <p className={styles.cardLabel}>Văn phòng đại diện và vườn ươm chính của ChienPlant tại Đà Nẵng.</p>
          </motion.div>
        </div>

        {/* Tier 4: Trusted Partners Section */}
        <section className={styles.partnersSection}>
          <div className={styles.sectionHeader}>
            <h2>Đối Tác Của ChienPlant</h2>
            <p>Chúng tôi tự hào hợp tác cùng các nhà vườn và thương hiệu uy tín nhất trong ngành.</p>
          </div>
          <div className={styles.partnersGrid}>
            <motion.div className={styles.partnerLogo} whileHover={{ opacity: 1, scale: 1.05 }} initial={{ opacity: 0.6 }}>Botanical Lab</motion.div>
            <motion.div className={styles.partnerLogo} whileHover={{ opacity: 1, scale: 1.05 }} initial={{ opacity: 0.6 }}>Green House</motion.div>
            <motion.div className={styles.partnerLogo} whileHover={{ opacity: 1, scale: 1.05 }} initial={{ opacity: 0.6 }}>Nature Garden</motion.div>
            <motion.div className={styles.partnerLogo} whileHover={{ opacity: 1, scale: 1.05 }} initial={{ opacity: 0.6 }}>Urban Jungle</motion.div>
            <motion.div className={styles.partnerLogo} whileHover={{ opacity: 1, scale: 1.05 }} initial={{ opacity: 0.6 }}>Eco Flora</motion.div>
          </div>
        </section>

      </div>

      {/* Tier 5: FAQ Section - Full Width Green */}
      <section className={styles.faqFullWidth}>
        <FAQ 
          theme="dark"
          title="Câu Hỏi Thường Gặp"
          items={[
            {
              question: "Thời gian phản hồi thông tin là bao lâu?",
              answer: "Đội ngũ hỗ trợ của chúng tôi cam kết phản hồi tất cả các yêu cầu trong vòng 24 giờ làm việc."
            },
            {
              question: "Tôi có thể ký gửi cây cảnh để review không?",
              answer: "Chắc chắn rồi! Chúng tôi luôn hoan nghênh các nhà vườn gửi sản phẩm để được đánh giá chuyên sâu bởi đội ngũ kỹ thuật."
            },
            {
              question: "ChienPlant có nhận thiết kế sân vườn không?",
              answer: "Hiện tại chúng tôi tập trung vào nội dung đánh giá và hướng dẫn chăm sóc. Tuy nhiên, chúng tôi có thể giới thiệu các đối tác thi công uy tín cho bạn."
            },
            {
              question: "Làm sao để trở thành đối tác quảng cáo?",
              answer: "Vui lòng chọn chủ đề \"Hợp tác quảng cáo\" trong form liên hệ bên trên, đính kèm thông tin thương hiệu của bạn."
            }
          ]}
        />
      </section>

      {/* Tier 3: Map Section */}
      <motion.div 
        className={styles.mapWrapper}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className={styles.mapOverlay}>
          <div className={styles.mapLabel}>Văn Phòng ChienPlant - Đà Nẵng</div>
        </div>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d122691.61993466446!2d108.13636655!3d16.03945535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314218e88e89cf2d%3A0xc023f6684742e947!2zRMO6IE7hurVuZywgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1711294600000!5m2!1svi!2s" 
          width="100%" 
          height="100%" 
          style={{border:0}} 
          allowFullScreen={true} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map"
        ></iframe>
      </motion.div>
    </div>
  );
};

export default ContactPage;
