import { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Heart, Menu, X, Leaf, Search } from "lucide-react";
import { motion } from "framer-motion";
import EmailSubscriptionModal from "./EmailSubscriptionModal";
import "./Header.css";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
    setSearchQuery("");
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
              <NavLink to="/" className={({ isActive }) => (isActive ? "active" : undefined)}>
                Trang Chủ
              </NavLink>
            </li>
            <li>
              <NavLink to="/category" className={({ isActive }) => (isActive ? "active" : undefined)}>
                Sản Phẩm
              </NavLink>
            </li>
            <li>
              <NavLink to="/reviews" className={({ isActive }) => (isActive ? "active" : undefined)}>
                Đánh Giá
              </NavLink>
            </li>
            <li>
              <NavLink to="/compare" className={({ isActive }) => (isActive ? "active" : undefined)}>
                So Sánh
              </NavLink>
            </li>
            <li>
              <NavLink to="/blog" className={({ isActive }) => (isActive ? "active" : undefined)}>
                Bài Viết
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : undefined)}>
                Liên Hệ
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Icons + Search */}
        <div className="header-icons flex items-center gap-4">
          <form className="search-inline" onSubmit={handleSearchSubmit} role="search">
            <button type="submit" className="search-icon-btn" aria-label="Tìm">
              <Search size={14} />
            </button>
            <input
              className="search-input-inline"
              type="search"
              placeholder="Tìm sản phẩm, bài viết..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Tìm kiếm"
            />
          </form>

          <Link to="/favorites" className="icon-btn" title="Yêu Thích">
            <Heart size={20} />
          </Link>

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
            <Link to="/reviews" onClick={toggleMenu}>
              Đánh Giá
            </Link>
          </li>
          <li>
            <Link to="/compare" onClick={toggleMenu}>
              So Sánh
            </Link>
          </li>
          <li>
            <Link to="/blog" onClick={toggleMenu}>
              Bài Viết
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={toggleMenu}>
              Liên Hệ
            </Link>
          </li>
        </ul>
      </div>

      <EmailSubscriptionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </motion.header>
  );
};

export default Header;
