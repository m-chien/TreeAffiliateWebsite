import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Calendar, User, ShoppingBag, ArrowRight, Mail, Layout, Leaf, Sprout } from "lucide-react";
import { motion } from "framer-motion";
import { mockBlogPosts } from "../data/blogData";
import "./BlogListingPage.css";

const BlogListingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  // Filter Logic
  const filteredPosts = mockBlogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination Logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const categories = ["All", "Top List", "Guides", "Phong Thủy"];

  const featuredPost = mockBlogPosts.find(p => p.featured);

  return (
    <div className="blog-listing-page">
      <div className="global-artistic-background">
        <Leaf className="decor-leaf leaf-1" size={120} />
        <Leaf className="decor-leaf leaf-2" size={80} />
        <Sprout className="decor-leaf leaf-3" size={100} />
        <Leaf className="decor-leaf leaf-4" size={60} />
        <Leaf className="decor-leaf leaf-5" size={110} />
        <Sprout className="decor-leaf leaf-6" size={70} />
        <Leaf className="decor-leaf leaf-7" size={90} />
        <Leaf className="decor-leaf leaf-8" size={50} />
        <Leaf className="decor-leaf leaf-9" size={130} />
        <Sprout className="decor-leaf leaf-10" size={85} />
        <Leaf className="decor-leaf leaf-11" size={95} />
        <Leaf className="decor-leaf leaf-12" size={75} />
        <Sprout className="decor-leaf leaf-13" size={105} />
        <Leaf className="decor-leaf leaf-14" size={55} />
        <Leaf className="decor-leaf leaf-15" size={115} />
      </div>

      <div className="container-blog">
        {/* Header Section */}
        <header className="blog-header">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Cẩm Nang Cây Cảnh
          </motion.h1>
          <p className="blog-description">
            Khám phá những bí quyết chọn cây công sở, hướng dẫn chăm sóc chuyên sâu 
            và mẹo phong thủy giúp không gian sống của bạn thêm rực rỡ và hài hòa.
          </p>

          <div className="blog-controls">
            <div className="search-container">
              <input 
                type="text" 
                placeholder="Tìm kiếm bài viết..." 
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="category-filters">
              {categories.map(cat => (
                <button 
                  key={cat}
                  className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
                  onClick={() => {
                    setActiveCategory(cat);
                    setCurrentPage(1);
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Featured Post (Only show if on page 1 and no search/category filter active) */}
        {currentPage === 1 && activeCategory === "All" && searchTerm === "" && featuredPost && (
          <section className="featured-post">
            <motion.div 
              className="featured-card"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="featured-image">
                <img src={featuredPost.image} alt={featuredPost.title} />
              </div>
              <div className="featured-content">
                <span className="post-category">{featuredPost.category}</span>
                <h2>{featuredPost.title}</h2>
                <p className="post-excerpt">{featuredPost.excerpt}</p>
                <div className="post-meta">
                  <span><User size={14} /> {featuredPost.author}</span>
                  <span><Calendar size={14} /> {featuredPost.date}</span>
                </div>
                <Link to={`/blog/${featuredPost.id}`} className="read-more-btn" style={{display: 'inline-block', textDecoration: 'none'}}>Đọc tiếp <ArrowRight size={18} style={{marginLeft: '8px', verticalAlign: 'middle'}} /></Link>
              </div>
            </motion.div>
          </section>
        )}

        {/* Main Content Layout */}
        <div className="blog-content-layout">
          <main className="blog-posts-main">
            <div className="post-grid">
              {currentPosts.map((post, index) => (
                <motion.article 
                  key={post.id} 
                  className="post-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="card-image">
                    <img src={post.image} alt={post.title} />
                  </div>
                  <div className="card-content">
                    <span className="post-category">{post.category}</span>
                    <h3>{post.title}</h3>
                    <p className="post-excerpt">{post.excerpt.substring(0, 100)}...</p>
                    <div className="post-meta">
                      <span>{post.date}</span>
                    </div>
                    <Link to={`/blog/${post.id}`} className="read-more-btn" style={{display: 'inline-block', textDecoration: 'none', padding: '0.6rem 1.2rem', fontSize: '0.9rem'}}>Đọc thêm</Link>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  className="page-btn page-arrow" 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                >
                  <ChevronLeft size={20} />
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button 
                    key={i} 
                    className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button 
                  className="page-btn page-arrow" 
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </main>

          {/* Sidebar */}
          <aside className="blog-sidebar">
            <div className="sidebar-widget">
              <h4>Mới cập nhật</h4>
              <div className="latest-posts-list">
                {mockBlogPosts.slice(0, 3).map(post => (
                  <div key={post.id} className="small-post-item">
                    <div className="small-img">
                      <img src={post.image} alt={post.title} />
                    </div>
                    <div className="small-info">
                      <h5>{post.title}</h5>
                      <span>{post.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sidebar-widget">
              <div className="affiliate-banner">
                <ShoppingBag size={40} style={{marginBottom: '1rem', opacity: 0.8}} />
                <h4>Góc Mua Sắm</h4>
                <p>Khám phá bộ sưu tập chậu gốm thủ công cao cấp vừa cập bến tại cửa hàng đối tác.</p>
                <a href="#" className="banner-btn">Đến Cửa Hàng</a>
              </div>
            </div>
          </aside>
        </div>

        {/* Popular Categories Section */}
        <section className="popular-categories">
          <div className="section-header">
            <h3><Layout size={24} /> Khám Phá Theo Chủ Đề</h3>
            <p>Tìm kiếm cảm hứng qua các chuyên mục được yêu thích nhất của chúng tôi.</p>
          </div>
          <div className="category-grid">
            <div className="category-card-alt">
              <div className="cat-icon-wrap">🪴</div>
              <h4>Chăm Sóc Cơ Bản</h4>
              <span>24 Bài viết</span>
            </div>
            <div className="category-card-alt">
              <div className="cat-icon-wrap">✨</div>
              <h4>Phong Thủy Cây Cảnh</h4>
              <span>18 Bài viết</span>
            </div>
            <div className="category-card-alt">
              <div className="cat-icon-wrap">🏆</div>
              <h4>Top List Chọn Lọc</h4>
              <span>12 Bài viết</span>
            </div>
            <div className="category-card-alt">
              <div className="cat-icon-wrap">🍃</div>
              <h4>Xu Hướng 2026</h4>
              <span>15 Bài viết</span>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="blog-newsletter">
          <motion.div 
            className="newsletter-container"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="newsletter-content">
              <Mail className="newsletter-icon" size={48} />
              <h2>Gia Nhập Cộng Đồng Yêu Cây</h2>
              <p>Nhận ngay bộ bí kíp chăm sóc cây cảnh chuyên sâu và thông báo về các bài viết mới nhất hàng tuần.</p>
              <form className="newsletter-form-blog" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Địa chỉ email của bạn..." required />
                <button type="submit">Đăng ký ngay</button>
              </form>
              <span className="newsletter-promise">Chúng tôi cam kết không gửi spam. Bạn có thể hủy đăng ký bất cứ lúc nào.</span>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default BlogListingPage;
