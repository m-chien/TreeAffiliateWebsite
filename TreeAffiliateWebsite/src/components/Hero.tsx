import React from 'react';
import { Star, ShieldCheck, ThumbsUp, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="hero bg-dark-green">
      <div className="container hero-container grid">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="hero-title font-serif">Mang Thiên Nhiên <br/> Đến Gần Bạn Hơn</h1>
          <p className="hero-description">
            Tô điểm không gian sống với các loại cây trong nhà của chúng tôi. 
            Cảm nhận sự thanh bình và tươi mát ngay chính ngôi nhà của bạn.
          </p>
          <a href="#shop" className="btn btn-primary hero-btn">
            <span>Khám Phá Ngay</span> 
            <span className="btn-icon-wrapper">
              <ArrowRight size={16} />
            </span>
          </a>
        </motion.div>
        
        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className="arch-mask">
            {/* Using a placeholder high-quality plant image */}
            <img src="https://images.unsplash.com/photo-1597055909287-2521c78473e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Beautiful indoor plant" />
            <motion.div 
              className="price-badge font-serif"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8, type: "spring" }}
            >
              <span>Giá từ</span>
              <strong>199.000₫</strong>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="container">
        <div className="trust-badges flex justify-between items-center">
          <motion.div 
            className="trust-badge flex items-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Star size={36} className="trust-icon" />
            <div>
              <h4>Tuyển Chọn Kỹ Càng</h4>
              <p>Chỉ giới thiệu sản phẩm từ các nhà vườn và đối tác uy tín nhất</p>
            </div>
          </motion.div>
          <motion.div 
            className="trust-badge flex items-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <ShieldCheck size={36} className="trust-icon" />
            <div>
              <h4>Đối Tác Đáng Tin Cậy</h4>
              <p>Đảm bảo giao dịch an toàn và minh bạch qua các sàn TMĐT uy tín</p>
            </div>
          </motion.div>
          <motion.div 
            className="trust-badge flex items-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <ThumbsUp size={36} className="trust-icon" />
            <div>
              <h4>Đánh Giá Chân Thực</h4>
              <p>Mang đến những đánh giá và kinh nghiệm thực tế nhất cho người yêu cây</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
