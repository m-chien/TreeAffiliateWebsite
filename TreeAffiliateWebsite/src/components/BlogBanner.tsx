import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import "./BlogBanner.css";

const BlogBanner = () => {
  return (
    <section className="blog-banner container section-padding" id="blog">
      <div className="banner-wrapper flex">
        <motion.div
          className="banner-image"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
        >
          {/* Using monstera background via CSS */}
        </motion.div>

        <motion.div
          className="banner-content"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="font-serif">
            Cùng Chúng Tôi Chăm Sóc Cây Xanh Tốt Hơn
          </h2>
          <p>
            Khám phá nghệ thuật chăm sóc cây cảnh. Chúng tôi luôn sẵn sàng chia
            sẻ những bí quyết để khu vườn của bạn phát triển rực rỡ nhất.
          </p>
          <motion.a
            href="#"
            className="btn btn-primary gap-2 mt-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Đọc Thêm <ArrowRight size={18} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogBanner;
