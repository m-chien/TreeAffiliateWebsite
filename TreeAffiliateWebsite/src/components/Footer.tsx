import React from "react";
import { Facebook, Instagram, Youtube, Send } from "lucide-react";
import { motion } from "framer-motion";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer bg-dark-green">
      <div className="container">
        {/* Newsletter Section */}
        <motion.div
          className="newsletter-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="font-serif newsletter-title">
            Đăng Ký Nhận Bản Tin Của Chúng Tôi <br /> Với Những Ưu Đãi Và Mẹo
            Chăm Sóc Cây.
          </h3>
          <form
            className="newsletter-form flex items-center"
            onSubmit={(e) => e.preventDefault()}
          >
            <input type="email" placeholder="Nhập email của bạn" required />
            <motion.button
              type="submit"
              className="newsletter-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Send size={20} />
            </motion.button>
          </form>
        </motion.div>

        <div className="footer-line"></div>

        <motion.div
          className="footer-grid grid custom-footer-layout"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="footer-contact left-align">
            <address>
              88 Nguyễn Giản Thanh,
              <br />
              Đà Nẵng
            </address>
            <p className="phone">+84 0969 827 284</p>
            <p className="email">plants.ave@gmail.com</p>
          </div>

          <div className="footer-brand center-align">
            <h3 className="font-serif text-cream content-title">
              Plants Avenue
            </h3>
            <p className="footer-desc mx-auto text-center">
              Chăm sóc cây xanh làm phong phú thêm không gian và cuộc sống của
              bạn. Dù là một vườn thảo môc nhỏ nhắn hay cả một khu rừng nhiệt
              đới, nuôi dưỡng cây trồng sẽ mang lại cho bạn sự an yên và không
              gian xanh mát.
            </p>
            <div className="social-links flex justify-center gap-4">
              <motion.a href="#" whileHover={{ y: -5 }}>
                <Instagram size={20} />
              </motion.a>
              <motion.a href="#" whileHover={{ y: -5 }}>
                <Facebook size={20} />
              </motion.a>
              <motion.a href="#" whileHover={{ y: -5 }}>
                <Youtube size={20} />
              </motion.a>
            </div>
          </div>

          <div className="footer-links-col right-col">
            <h4 className="font-serif">Menu</h4>
            <ul className="footer-links">
              <li>
                <a href="#">Trang Chủ</a>
              </li>
              <li>
                <a href="#shop">Sản Phẩm</a>
              </li>
              <li>
                <a href="#about">Về Chúng Tôi</a>
              </li>
              <li>
                <a href="#blog">Bài Viết</a>
              </li>
              <li>
                <a href="#contact">Liên Hệ</a>
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          className="footer-bottom center-align flex-col section-padding-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="copyright">
            © 2026 PLANTS AVENUE. ALL RIGHTS RESERVED.
          </p>
          <p className="design-by">DESIGN BY UI.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
