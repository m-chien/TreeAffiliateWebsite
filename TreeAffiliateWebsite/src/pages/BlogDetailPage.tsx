import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Calendar, ShoppingBag, Eye, List, ThumbsUp, User, Clock, CheckCircle2, Heart, Share2, Info } from 'lucide-react';
import axios from 'axios';
import EmailSubscriptionModal from '../components/EmailSubscriptionModal';
import './BlogDetailPage.css';

// --- ĐỊNH NGHĨA KIỂU DỮ LIỆU TỪ BACKEND ---
interface BaiVietDetail {
  id: number;
  tieuDe: string;
  noiDung: string;
  tenTacGia: string;
  tenDanhMuc: string;
  ngayTao: string;
  anhDaiDien: string;
  luotXem: number;
  thoiGianDoc: number;
}

const BlogDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // --- STATE LƯU DỮ LIỆU THẬT TỪ API ---
  const [post, setPost] = useState<BaiVietDetail | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BaiVietDetail[]>([]);
  const [loading, setLoading] = useState(true);

  // --- STATE MỚI CHO TÍNH NĂNG TƯƠNG TÁC ---
  const [isSaved, setIsSaved] = useState(false);
  const [toc, setToc] = useState<{ id: string, text: string }[]>([]);

  // Cuộn lên đầu trang và gọi API khi đổi bài viết
  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchDetailData = async () => {
      setLoading(true);
      try {
        const detailRes = await axios.get(`http://localhost:8080/api/v1/bai-viet/chi-tiet/${id}`);
        setPost(detailRes.data.result);

        const relatedRes = await axios.get(`http://localhost:8080/api/v1/bai-viet/newest?page=0&size=4`);
        setRelatedPosts(relatedRes.data.result.content || []);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu chi tiết:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDetailData();
    }
  }, [id]);

  // --- TỰ ĐỘNG TẠO MỤC LỤC VÀ KIỂM TRA TRẠNG THÁI LƯU ---
  useEffect(() => {
    if (post) {
      // Dùng setTimeout chờ 100ms để HTML kịp render ra màn hình
      setTimeout(() => {
        const headings = document.querySelectorAll('.post-content-html h3');
        const tocItems = Array.from(headings).map((h, index) => {
          const headingId = `heading-${index}`;
          h.id = headingId; 
          return { id: headingId, text: (h as HTMLElement).innerText };
        });
        setToc(tocItems);
      }, 100);

      // Kiểm tra xem bài đã lưu trong localStorage chưa
      const savedFavorites = JSON.parse(localStorage.getItem('favorite_posts') || '[]');
      const isExist = savedFavorites.some((p: any) => p.id === post.id);
      setIsSaved(isExist);
    }
  }, [post]);

  // --- HÀM XỬ LÝ LƯU CẨM NANG ---
  const handleToggleSave = () => {
    if (!post) return;
    
    let savedFavorites = JSON.parse(localStorage.getItem('favorite_posts') || '[]');

    if (isSaved) {
      // Nếu đã lưu thì xóa đi
      savedFavorites = savedFavorites.filter((p: any) => p.id !== post.id);
      alert("Đã bỏ lưu cẩm nang!");
    } else {
      // Nếu chưa lưu thì thêm vào
      const newFavorite = {
        id: post.id,
        tieuDe: post.tieuDe,
        anhDaiDien: post.anhDaiDien,
        tenDanhMuc: post.tenDanhMuc,
        ngayTao: post.ngayTao
      };
      savedFavorites.push(newFavorite);
      alert("Đã lưu cẩm nang vào Danh Sách Yêu Thích!");
    }

    localStorage.setItem('favorite_posts', JSON.stringify(savedFavorites));
    setIsSaved(!isSaved);
  };

  // --- HÀM XỬ LÝ CHIA SẺ ---
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Đã sao chép đường dẫn bài viết!");
  };

  // Hàm format ngày từ Backend
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  if (loading) {
    return <div style={{padding: '120px', textAlign: 'center', fontSize: '1.2rem'}}>Đang tải dữ liệu bài viết...</div>;
  }

  if (!post) {
    return <div style={{padding: '120px', textAlign: 'center', fontSize: '1.2rem'}}>Bài viết không tồn tại.</div>;
  }

  return (
    <div className="blog-detail-page">
      {/* Absolute Breadcrumbs overlapping the Hero */}
      <div className="breadcrumb-container">
        <div className="breadcrumbs">
          <Link to="/">Trang chủ</Link>
          <ChevronRight size={14} />
          <Link to="/blog">Hiểu Biết & Cẩm Nang</Link>
          <ChevronRight size={14} />
          <Link to={`/blog`}>{post.tenDanhMuc}</Link>
        </div>
      </div>

      {/* Massive Hero Section */}
      <div className="article-hero" style={{ backgroundImage: `url(/images/${post.anhDaiDien})` }}>
        <div className="hero-overlay"></div>
        <motion.div 
          className="hero-content-page"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="hero-category">{post.tenDanhMuc}</span>
          <h1>{post.tieuDe}</h1>
          <div className="hero-meta">
            <div className="meta-item"><User size={16} /> <span>{post.tenTacGia}</span></div>
            <div className="meta-item"><Calendar size={16} /> <span>{formatDate(post.ngayTao)}</span></div>
            <div className="meta-item"><Eye size={16} /> <span>{post.luotXem || 0} Lượt xem</span></div>
            <div className="meta-item"><Clock size={16} /> <span>{post.thoiGianDoc || 5} phút đọc</span></div>
          </div>
        </motion.div>
      </div>

      {/* 3-Column Magazine Layout */}
      <div className="article-layout">
        
        {/* LEFT COLUMN: Author & Socials */}
        <aside className="left-sidebar">
          <div className="sticky-wrapper">
             {/* Author Card */}
             <div className="widget-card author-profile">
               <div className="author-large-avatar">{post.tenTacGia.charAt(0).toUpperCase()}</div>
               <h4 className="author-name">{post.tenTacGia}</h4>
               <p className="author-bio">Chuyên gia thực vật học nội thất với hơn 5 năm kinh nghiệm setup không gian xanh cho hơn 100+ văn phòng.</p>
               <div className="author-socials">
                 <button className="social-btn" onClick={handleToggleSave} title="Yêu thích">
                   <Heart size={16} fill={isSaved ? "#E76F51" : "none"} color={isSaved ? "#E76F51" : "currentColor"}/>
                 </button>
                 <button className="social-btn" onClick={handleShare}><Share2 size={16}/></button>
               </div>
             </div>

             {/* Table of Contents */}
             <div className="widget-card">
               <h3 className="widget-title"><List size={18} color="#c86c42" /> Mục Lục</h3>
               <ul className="toc-list">
                 <li><a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); }}>Giới thiệu chung</a></li>
                 {toc.length > 0 ? (
                   toc.map(item => (
                     <li key={item.id}>
                       <a href={`#${item.id}`} onClick={(e) => {
                          e.preventDefault();
                          document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                       }}>{item.text.replace('✓', '').trim()}</a>
                     </li>
                   ))
                 ) : (
                   <li><span style={{color: '#999', fontSize: '0.9rem'}}>Chưa có mục lục</span></li>
                 )}
               </ul>
             </div>

             {/* Simple Actions */}
             <div className="widget-card">
                 <h3 className="widget-title">Hành động</h3>
                 <div className="share-links">
                   <button className="share-btn" onClick={handleShare}><Share2 size={16}/> Chia sẻ</button>
                   <button className="share-btn" onClick={handleToggleSave}>
                     <Heart size={16} fill={isSaved ? "#c86c42" : "none"} color="#c86c42"/> 
                     {isSaved ? "Đã lưu Cẩm Nang" : "Lưu Cẩm Nang"}
                   </button>
                 </div>
             </div>
          </div>
        </aside>

        {/* CENTER COLUMN: Main Content */}
        <main className="article-main">
          <div className="article-content">
            
            {/* INJECT HTML TỪ DATABASE VÀO ĐÂY */}
            <div 
              className="post-content-html" 
              dangerouslySetInnerHTML={{ __html: post.noiDung }} 
            />

            {/* In-content Affiliate Box - High Conversion */}
            <div className="affiliate-inline-box" style={{ marginTop: '40px' }}>
              <img src="/images/cay3.png" alt="Sản phẩm gợi ý" className="affiliate-inline-img" />
              <div className="affiliate-inline-info">
                <h4>Combo Đất Trồng Premium + Phân Tan Chậm</h4>
                <p>Giải pháp tối ưu nhổ rễ chứng "Úng nước" khiến 90% cây chết. Công thức độc quyền đã được pha trộn sẵn tỉ lệ vàng giữa Mùn, Đá Perlite và Phân Hữu cơ vi sinh.</p>
                <Link to="/category" className="btn-buy-inline">
                  <ShoppingBag size={18} /> Mua Chính Hãng Trên Shopee (Freeship)
                </Link>
              </div>
            </div>

            {/* Tags bài viết */}
            <div className="article-tags" style={{ marginTop: '30px' }}>
              <span className="tag">cây văn phòng</span>
              <span className="tag">mẹo chăm sóc</span>
              <span className="tag">cây thanh lọc không khí</span>
              <span className="tag">decor nội thất</span>
            </div>
          </div>
        </main>

        {/* RIGHT COLUMN: Highly Commercial Sidebar */}
        <aside className="right-sidebar">
          <div className="sticky-wrapper">
             {/* Sticky Premium Affiliate Banner */}
             <div className="affiliate-widget">
               <img src="/images/cay4.png" alt="Khuyến mãi" className="affiliate-widget-img" />
               <h4>Săn Deal Giảm Giá Cây Sân Vườn Đặc Biệt</h4>
               <p>Chỉ áp dụng mã <strong>PLANTSVN20</strong> hôm nay để được khấu trừ thẳng 20% đơn hàng tại hệ thống kho đối tác.</p>
               <Link to="/category" className="btn-widget">Đến Kho Vườn Shopee</Link>
             </div>

             {/* Top Rated Products Widget */}
             <div className="widget-card">
                <h3 className="widget-title"><ThumbsUp size={18} color="#c86c42"/> Phụ Kiện Bán Chạy</h3>
                <div className="products-list-item">
                   <img src="/images/cay2.png" className="product-widget-img" alt="prod"/>
                   <div className="product-widget-info">
                      <h5>Chậu Gốm Sứ Bắc Âu Trắng</h5>
                      <Link to="/category">Mua Giá 120k →</Link>
                   </div>
                </div>
                <div className="products-list-item">
                   <img src="/images/cay5.png" className="product-widget-img" alt="prod"/>
                   <div className="product-widget-info">
                      <h5>Bình xịt phun sương áp lực</h5>
                      <Link to="/san-pham">Mua Giá 65k →</Link>
                   </div>
                </div>
                <div className="products-list-item">
                   <img src="/images/cay1.png" className="product-widget-img" alt="prod"/>
                   <div className="product-widget-info">
                      <h5>Cây con Monstera Đột Biến</h5>
                      <Link to="/category">Mua Giá 250k →</Link>
                   </div>
                </div>
             </div>
          </div>
        </aside>
      </div>

      {/* Related Posts */}
      <section className="related-section">
        <h3 className="related-title"><Clock size={28} color="#c86c42"/> Xem Thêm Bài Viết Mới</h3>
        <div className="related-grid">
          {relatedPosts.map(related => (
            <Link to={`/blog/${related.id}`} key={related.id} className="related-card">
              <img src={`/images/${related.anhDaiDien}`} alt={related.tieuDe} className="related-img" />
              <div className="related-info">
                <h4>{related.tieuDe}</h4>
                <span><Calendar size={14}/> {formatDate(related.ngayTao)}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <EmailSubscriptionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default BlogDetailPage;