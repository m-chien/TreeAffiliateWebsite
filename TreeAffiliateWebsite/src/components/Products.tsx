import React, { useState } from "react";
import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./Products.css";

const TABS = ["MỚI NHẤT", "BÁN CHẠY", "ĐƯỢC YÊU THÍCH"];

const ALL_PRODUCTS = [
  {
    id: 1,
    name: "Homalomena Rubescens",
    price: "99.000₫",
    img: "/images/cay1.png",
    tab: "MỚI NHẤT",
    link: "#",
  },
  {
    id: 2,
    name: "Ucuala Grandis",
    price: "99.000₫",
    img: "/images/cay2.png",
    tab: "BÁN CHẠY",
    link: "#",
  },
  {
    id: 3,
    name: "Fiddle Leaf Fig",
    price: "99.000₫",
    img: "/images/cay3.png",
    tab: "ĐƯỢC YÊU THÍCH",
    link: "#",
  },
  {
    id: 4,
    name: "Monstera Deliciosa",
    price: "99.000₫",
    img: "/images/cay4.png",
    tab: "MỚI NHẤT",
    link: "#",
  },
  {
    id: 5,
    name: "Lưỡi Hổ (Snake Plant)",
    price: "99.000₫",
    img: "/images/cay5.png",
    tab: "BÁN CHẠY",
    link: "#",
  },
  {
    id: 6,
    name: "Lan Ý (Peace Lily)",
    price: "99.000₫",
    img: "/images/cay6.png",
    tab: "MỚI NHẤT",
    link: "#",
  },
];

const Products = () => {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <section className="products container section-padding" id="shop">
      <motion.h2
        className="section-title font-serif text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        Sản Phẩm Của Chúng Tôi
      </motion.h2>

      <motion.div
        className="tabs flex justify-center gap-4"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </motion.div>

      <motion.div className="products-grid grid" layout>
        <AnimatePresence>
          {ALL_PRODUCTS.map((product, index) => {
            const isLiked = wishlist.includes(product.id);
            return (
              <motion.div
                className="product-card"
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="product-image-wrapper">
                  <motion.img
                    src={product.img}
                    alt={product.name}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  <button
                    className="wishlist-btn"
                    onClick={() => toggleWishlist(product.id)}
                    aria-label="Toggle Wishlist"
                  >
                    <Heart
                      size={20}
                      fill={isLiked ? "var(--bg-dark-green)" : "none"}
                      color={isLiked ? "var(--bg-dark-green)" : "currentColor"}
                    />
                  </button>
                </div>
                <div className="product-info">
                  <h4>{product.name}</h4>
                  <p>{product.price}</p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default Products;
