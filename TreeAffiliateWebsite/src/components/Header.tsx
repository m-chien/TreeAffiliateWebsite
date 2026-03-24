import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, Menu, X, Leaf } from "lucide-react";
import { motion } from "framer-motion";
import "./Header.css";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.header
      className={`header ${isScrolled || !isHomePage ? "scrolled" : ""}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container header-container">
        {/* Logo */}
        <Link to="/" className="logo flex items-center gap-2">
          <Leaf className="logo-icon" size={24} />
          <span className="font-serif">Plants Avenue</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          <ul className="nav-links flex items-center gap-6">
            <li>
              <Link to="/">Trang Chủ</Link>
            </li>
            <li>
              <Link to="/category">Sản Phẩm</Link>
            </li>
            <li>
              <a href="/#review">Đánh Giá</a>
            </li>
            <li>
              <Link to="/compare">So Sánh</Link>
            </li>
            <li>
              <a href="/#blog">Bài Viết</a>
            </li>
            <li>
              <a href="/#contact">Liên Hệ</a>
            </li>
          </ul>
        </nav>

        {/* Icons */}
        <div className="header-icons flex items-center gap-4">
          <a href="#" className="icon-btn" title="Yêu Thích">
            <Heart size={20} />
          </a>

          <button className="mobile-menu-btn" onClick={toggleMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`mobile-nav ${isMobileMenuOpen ? "open" : ""}`}>
        <ul className="mobile-nav-links">
          <li>
            <Link to="/">Trang Chủ</Link>
          </li>
          <li>
            <Link to="/category" onClick={toggleMenu}>
              Sản Phẩm
            </Link>
          </li>
          <li>
            <a href="/#review" onClick={toggleMenu}>
              Đánh Giá
            </a>
          </li>
          <li>
            <Link to="/compare" onClick={toggleMenu}>
              So Sánh
            </Link>
          </li>
          <li>
            <a href="/#blog" onClick={toggleMenu}>
              Bài Viết
            </a>
          </li>
          <li>
            <a href="/#contact" onClick={toggleMenu}>
              Liên Hệ
            </a>
          </li>
        </ul>
      </div>
    </motion.header>
  );
};

export default Header;
