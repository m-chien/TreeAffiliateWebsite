import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import EmailSubscriptionModal from "./EmailSubscriptionModal";
import "./Products.css";
import { TABS } from "../data/configData";
import { ALL_PRODUCTS } from "../data/plantData";
import type { Plant } from "../types";

/* Removed local ALL_PRODUCTS definition */

const Products = () => {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleFavoriteClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };
  
  const handleProductClick = () => {
    navigate('/review/monstera');
  };
  
  const filteredProducts: Plant[] = ALL_PRODUCTS.filter((p) => p.tab === activeTab);
  console.log("🚀 ~ Products ~ ALL_PRODUCTS:", ALL_PRODUCTS)
  console.log("🚀 ~ Products ~ filteredProducts:", filteredProducts)
  
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
          {filteredProducts.map((product, index) => {
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
                onClick={handleProductClick}
                style={{ cursor: "pointer" }}
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
                    onClick={(e) => handleFavoriteClick(product.id, e)}
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

      <EmailSubscriptionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
};

export default Products;
