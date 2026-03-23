import React, { useState, useEffect } from 'react';
import { Heart, User, Menu, X, Leaf } from 'lucide-react';
import './Header.css';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        {/* Logo */}
        <a href="#" className="logo flex items-center gap-2">
          <Leaf className="logo-icon" size={24} />
          <span className="font-serif">Plants Avenue</span>
        </a>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          <ul className="nav-links flex items-center gap-6">
            <li><a href="#">Trang Chủ</a></li>
            <li><a href="#shop">Sản Phẩm</a></li>
            <li><a href="#review">Đánh Giá</a></li>
            <li><a href="#compare">So Sánh</a></li>
            <li><a href="#blog">Bài Viết</a></li>
            <li><a href="#contact">Liên Hệ</a></li>
          </ul>
        </nav>

        {/* Icons */}
        <div className="header-icons flex items-center gap-4">
          <a href="#" className="icon-btn" title="Yêu Thích"><Heart size={20} /></a>
          <a href="#" className="icon-btn" title="Tài Khoản"><User size={20} /></a>
          
          <button className="mobile-menu-btn" onClick={toggleMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          <li><a href="#" onClick={toggleMenu}>Trang Chủ</a></li>
          <li><a href="#shop" onClick={toggleMenu}>Sản Phẩm</a></li>
          <li><a href="#review" onClick={toggleMenu}>Đánh Giá</a></li>
          <li><a href="#compare" onClick={toggleMenu}>So Sánh</a></li>
          <li><a href="#blog" onClick={toggleMenu}>Bài Viết</a></li>
          <li><a href="#contact" onClick={toggleMenu}>Liên Hệ</a></li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
