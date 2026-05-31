import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Calendar, User, ShoppingBag, ArrowRight, Mail, Layout, Leaf, Sprout } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import "./BlogListingPage.css";

// --- ĐỊNH NGHĨA KIỂU DỮ LIỆU TỪ BACKEND ---
interface BaiViet {
  id: number;
  tieuDe: string;
  trichDoan?: string;
  noiDung: string;
  tenTacGia: string;
  tenDanhMuc: string;
  ngayTao: string;
  anhDaiDien: string;
}

interface DanhMuc {
  id: number;
  tenDanhMuc: string;
  soLuongBaiViet: number;
}

const BlogListingPage: React.FC = () => {
  // --- STATE QUẢN LÝ DỮ LIỆU TỪ API ---
  const [posts, setPosts] = useState<BaiViet[]>([]);
  const [recentPosts, setRecentPosts] = useState<BaiViet[]>([]);
  const [categoriesDb, setCategoriesDb] = useState<DanhMuc[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // --- STATE QUẢN LÝ UI ---
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  // 1. Lấy danh sách Danh mục và Bài viết mới nhất (Chỉ gọi 1 lần khi load trang)
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [catRes, recentRes] = await Promise.all([
          // Gọi danh mục nội dung (Nếu bạn chưa tạo hàm /with-count, hãy gọi tạm API gốc này)
          axios.get("http://localhost:8080/api/v1/danh-muc-noi-dung"),
          // Gọi đúng API /newest của bạn
          axios.get("http://localhost:8080/api/v1/bai-viet/newest?page=0&size=5")
        ]);
        
        // Backend của bạn có thể trả về Page cho danh mục, dùng content để lấy mảng
        setCategoriesDb(catRes.data.result.content || catRes.data.result || []);
        // API newest của bạn trả về kiểu Page, nên phải chọc vào .content
        setRecentPosts(recentRes.data.result.content || []);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu ban đầu:", error);
      }
    };
    fetchInitialData();
  }, []);

  // 2. Lấy danh sách Bài viết (Gọi đúng API search và category của bạn)
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        let url = "http://localhost:8080/api/v1/bai-viet";
        let params: any = {
          page: currentPage - 1,
          size: postsPerPage
        };

        // Nếu người dùng có gõ tìm kiếm -> Dùng API /search của bạn
        if (searchTerm) {
          url = "http://localhost:8080/api/v1/bai-viet/search";
          params.tieuDe = searchTerm; // Tên tham số khớp với Java của bạn
        } 
        // Nếu người dùng chọn danh mục -> Dùng API /category/{categoryId} của bạn
        else if (activeCategory !== "All") {
          const categoryId = categoriesDb.find(c => c.tenDanhMuc === activeCategory)?.id;
          if (categoryId) {
            url = `http://localhost:8080/api/v1/bai-viet/category/${categoryId}`;
          }
        }

        const res = await axios.get(url, { params });
        const data = res.data.result;
        
        setPosts(data.content || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Lỗi khi tải bài viết:", error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchPosts();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [currentPage, searchTerm, activeCategory, categoriesDb]);

  // Tạo mảng tên danh mục cho filter tabs (Thêm chữ "All" lên đầu)
  const categoryTabs = ["All", ...categoriesDb.map(cat => cat.tenDanhMuc)];

  // Lấy bài viết đầu tiên làm bài nổi bật (Featured Post)
  const featuredPost = posts.length > 0 ? posts[0] : null;

  // Hàm format ngày giờ từ Backend
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  // --- HÀM PHỤ TRỢ: Xóa thẻ HTML để làm đoạn tóm tắt ---
  const stripHtmlAndTruncate = (htmlString?: string, maxLength: number = 100) => {
    if (!htmlString) return 'Đang cập nhật nội dung...';
    // Dùng Regex để xóa sạch mọi thứ nằm trong dấu < > (VD: <p>, <strong>...)
    const plainText = htmlString.replace(/<[^>]+>/g, ''); 
    
    // Cắt chữ cho vừa khung
    if (plainText.length <= maxLength) return plainText;
    return plainText.substring(0, maxLength) + '...';
  };

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
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset về trang 1 khi tìm kiếm
                }}
              />
            </div>
            <div className="category-filters">
              {categoryTabs.map(cat => (
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
        {currentPage === 1 && activeCategory === "All" && searchTerm === "" && featuredPost && !loading && (
          <section className="featured-post">
            <motion.div 
              className="featured-card"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="featured-image">
                <img src={`/images/${featuredPost.anhDaiDien}`} alt={featuredPost.tieuDe} />
              </div>
              <div className="featured-content">
                <span className="post-category">{featuredPost.tenDanhMuc}</span>
                <h2>{featuredPost.tieuDe}</h2>
                <p className="post-excerpt">
                  {/* Áp dụng hàm dọn dẹp HTML cho bài viết nổi bật */}
                  {featuredPost.trichDoan || stripHtmlAndTruncate(featuredPost.noiDung, 150)}
                </p>
                <div className="post-meta">
                  <span><User size={14} /> {featuredPost.tenTacGia}</span>
                  <span><Calendar size={14} /> {formatDate(featuredPost.ngayTao)}</span>
                </div>
                <Link to={`/blog/${featuredPost.id}`} className="read-more-btn" style={{display: 'inline-block', textDecoration: 'none'}}>Đọc tiếp <ArrowRight size={18} style={{marginLeft: '8px', verticalAlign: 'middle'}} /></Link>
              </div>
            </motion.div>
          </section>
        )}

        {/* Main Content Layout */}
        <div className="blog-content-layout">
          <main className="blog-posts-main">
            {loading ? (
              <div style={{ textAlign: "center", padding: "2rem" }}>Đang tải bài viết...</div>
            ) : (
              <>
                <div className="post-grid">
                  {posts.map((post, index) => (
                    <motion.article 
                      key={post.id} 
                      className="post-card"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="card-image">
                        <img src={`/images/${post.anhDaiDien}`} alt={post.tieuDe} />
                      </div>
                      <div className="card-content">
                        <span className="post-category">{post.tenDanhMuc}</span>
                        <h3>{post.tieuDe}</h3>
                        <p className="post-excerpt">
                          {/* Áp dụng hàm dọn dẹp HTML cho danh sách bài viết */}
                          {post.trichDoan || stripHtmlAndTruncate(post.noiDung, 100)}
                        </p>
                        <div className="post-meta">
                          <span>{formatDate(post.ngayTao)}</span>
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
              </>
            )}
          </main>

          {/* Sidebar */}
          <aside className="blog-sidebar">
            <div className="sidebar-widget">
              <h4>Mới cập nhật</h4>
              <div className="latest-posts-list">
                {recentPosts.slice(0, 3).map(post => (
                  <div key={post.id} className="small-post-item">
                    <div className="small-img">
                      <img src={`/images/${post.anhDaiDien}`} alt={post.tieuDe} />
                    </div>
                    <div className="small-info">
                      <h5>{post.tieuDe}</h5>
                      <span>{formatDate(post.ngayTao)}</span>
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
            {categoriesDb.slice(0, 4).map((cat, idx) => {
              // Gán icon ngẫu nhiên cho đẹp mắt
              const icons = ["🪴", "✨", "🏆", "🍃"];
              return (
                <div key={cat.id} className="category-card-alt">
                  <div className="cat-icon-wrap">{icons[idx % 4]}</div>
                  <h4>{cat.tenDanhMuc}</h4>
                  <span>{cat.soLuongBaiViet} Bài viết</span>
                </div>
              );
            })}
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