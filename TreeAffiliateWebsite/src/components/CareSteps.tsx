import React from 'react';
import { Droplets, Bug, Scissors } from 'lucide-react';
import { motion } from 'framer-motion';
import './CareSteps.css';

const CareSteps: React.FC = () => {
  return (
    <section className="care-steps container section-padding">
      <motion.div 
        className="care-header text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-serif">Các Bước Chăm Sóc Cây Cảnh</h2>
        <p className="subtitle">Giải pháp tối ưu giúp cây của bạn luôn xanh tốt</p>
      </motion.div>

      <div className="steps-grid grid">
        <motion.div 
          className="step-card text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          whileHover={{ y: -10 }}
        >
          <div className="step-icon-wrapper">
            <Droplets size={32} className="step-icon" />
          </div>
          <h4 className="font-serif">Kiểm Soát Độ Ẩm</h4>
          <p>
            Kiểm soát độ ẩm hiệu quả là điều cần thiết để chăm sóc cây đúng cách,
            đảm bảo sự phát triển tối ưu và sức khỏe tổng thể.
          </p>
        </motion.div>

        <motion.div 
          className="step-card text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ y: -10 }}
        >
          <div className="step-icon-wrapper">
            <Bug size={32} className="step-icon" />
          </div>
          <h4 className="font-serif">Phòng Ngừa Sâu Bệnh</h4>
          <p>
            Thực hiện các biện pháp phòng ngừa sâu bệnh một cách chủ động là cực kỳ quan trọng
            để bảo vệ và nuôi dưỡng cây trồng khỏe mạnh.
          </p>
        </motion.div>

        <motion.div 
          className="step-card text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.5 }}
          whileHover={{ y: -10 }}
        >
          <div className="step-icon-wrapper">
            <Scissors size={32} className="step-icon" />
          </div>
          <h4 className="font-serif">Cắt Tỉa Định Kỳ</h4>
          <p>
            Chăm sóc cây xanh bao gồm việc quản lý cẩn thận sự phát triển
            giúp cây luôn giữ được phom dáng và phát triển tốt.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CareSteps;
