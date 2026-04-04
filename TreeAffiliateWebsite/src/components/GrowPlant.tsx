import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import "./GrowPlant.css";

const GrowPlant = () => {
  return (
    <section className="grow-plant bg-dark-green">
      <div className="container grow-plant-container grid">
        <motion.div
          className="grow-plant-content"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="font-serif">
            Trồng Cây Cho <br /> Cuộc Sống Tốt Đẹp Hơn
          </h2>
        </motion.div>

        <div className="grow-plant-images flex gap-4">
          <motion.img
            src="/images/2_main_plant.png"
            alt="Tall plant on stand component"
            className="img-large"
            style={{ color: "transparent" }}
            initial={{ opacity: 0, scale: 0.8, y: 50, rotate: 10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              type: "spring",
              stiffness: 100,
            }}
            whileHover={{ scale: 1.05, rotate: 3 }}
          />
        </div>

        <motion.div
          className="grow-plant-desc"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <p>
            Chăm sóc cây xanh không chỉ làm đẹp không gian mà còn giúp cải thiện
            sức khỏe tinh thần và môi trường sống của bạn.
          </p>
          <motion.a
            href="#"
            className="btn btn-primary gap-2 mt-4 inline-flex items-center"
            whileHover={{
              scale: 1.05,
              gap: "1rem",
              backgroundColor: "var(--primary-hover)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Xem Thêm <ArrowRight size={18} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default GrowPlant;
