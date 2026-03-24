import React from "react";
import { motion } from "framer-motion";
import "./CategoryCards.css";

const CategoryCards = () => {
  return (
    <section className="category-cards container section-padding">
      <div className="grid cards-grid">
        <motion.div
          className="category-card"
          style={{ background: "#F8F3ED" }}
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="card-content">
            <span className="badge badge-red">Khuyến Mãi Lớn</span>
            <h3 className="font-serif">
              Cây Trong <br /> Nhà
            </h3>
            <a href="#" className="card-link mt-4">
              Xem Ngay <span>→</span>
            </a>
          </div>
          <div className="card-image">
            <motion.img
              src="https://images.unsplash.com/photo-1487798452839-440eb76e1a47?auto=format&fit=crop&w=400&q=80"
              alt="Indoor Plants"
              style={{ color: "transparent" }}
              whileHover={{ scale: 1.08, rotate: -3 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>

        <motion.div
          className="category-card"
          style={{ background: "#EBF2EE" }}
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="card-content">
            <span className="badge badge-green">Sản Phẩm Nổi Bật</span>
            <h3 className="font-serif">
              Cây <br /> Thảo Dược
            </h3>
            <a href="#" className="card-link mt-4">
              Xem Ngay <span>→</span>
            </a>
          </div>
          <div className="card-image">
            <motion.img
              src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=400&q=80"
              alt="Herbal Plants"
              style={{ color: "transparent" }}
              whileHover={{ scale: 1.08, rotate: 3 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryCards;
