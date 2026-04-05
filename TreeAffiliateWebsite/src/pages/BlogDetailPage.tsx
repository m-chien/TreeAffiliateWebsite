import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Calendar, ShoppingBag, Eye, List, ThumbsUp, User, Clock, CheckCircle2, Heart, Share2, Info } from 'lucide-react';
import { mockBlogPosts } from '../data/blogData';
import './BlogDetailPage.css';

const BlogDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const article = id && id !== '1' ? mockBlogPosts.find(p => p.id.toString() === id.toString()) : mockBlogPosts[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return <div style={{padding: '120px', textAlign: 'center'}}>Bài viết không tồn tại.</div>;
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
          <Link to={`/category`}>{article.category}</Link>
        </div>
      </div>

      {/* Massive Hero Section */}
      <div className="article-hero" style={{ backgroundImage: `url(${article.image || '/public/images/cay1.png'})` }}>
        <div className="hero-overlay"></div>
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="hero-category">{article.category}</span>
          <h1>{article.title}</h1>
          <div className="hero-meta">
            <div className="meta-item"><User size={16} /> <span>{article.author}</span></div>
            <div className="meta-item"><Calendar size={16} /> <span>{article.date}</span></div>
            <div className="meta-item"><Eye size={16} /> <span>12.5K Lượt xem</span></div>
            <div className="meta-item"><Clock size={16} /> <span>5 phút đọc</span></div>
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
               <div className="author-large-avatar">{article.author.charAt(0)}</div>
               <h4 className="author-name">{article.author}</h4>
               <p className="author-bio">Chuyên gia thực vật học nội thất với hơn 5 năm kinh nghiệm setup không gian xanh cho hơn 100+ văn phòng.</p>
               <div className="author-socials">
                 <button className="social-btn"><Heart size={16}/></button>
                 <button className="social-btn"><Share2 size={16}/></button>
               </div>
             </div>

             {/* Table of Contents */}
             <div className="widget-card">
               <h3 className="widget-title"><List size={18} color="#c86c42" /> Mục Lục</h3>
               <ul className="toc-list">
                 <li className="active"><a href="#">Giới thiệu chung</a></li>
                 <li><a href="#">1. Tâm lý chưng cây hiện đại</a></li>
                 <li><a href="#">2. Yêu cầu ánh sáng & độ ẩm</a></li>
                 <li><a href="#">3. Các mẹo trộn đất (Bí quyết)</a></li>
                 <li><a href="#">4. Lời khuyên kết luận</a></li>
               </ul>
             </div>

             {/* Simple Actions */}
             <div className="widget-card">
                 <h3 className="widget-title">Hành động</h3>
                 <div className="share-links">
                   <button className="share-btn"><Share2 size={16}/> Chia sẻ</button>
                   <button className="share-btn"><Heart size={16} color="#c86c42"/> Lưu Cẩm Nang</button>
                 </div>
             </div>
          </div>
        </aside>

        {/* CENTER COLUMN: Main Content */}
        <main className="article-main">
          <div className="article-content">
            <p>{article.excerpt} Thật vậy, việc lựa chọn đúng loại cây không chỉ mang lại giá trị thẩm mỹ phi thường mà còn cải thiện phong thủy và năng lượng cá nhân một cách đáng kinh ngạc. Hãy cùng chúng tôi đào sâu vào chi tiết.</p>
            
            <div className="info-box">
               <Info size={24} />
               <p><strong>Lưu ý chuyên gia:</strong> Các dòng cây {article.category} thường khá nhạy cảm với việc tưới dư nước. Yếu tố hàng đầu quyết định sự sinh tồn là một hệ thống đất thoát nước cực tốt!</p>
            </div>

            <h2><CheckCircle2 color="#c86c42" /> 1. Tại sao {article.title} lại được khao khát?</h2>
            <p>Trong thời gian gần đây, xu hướng mang thiên nhiên vào không gian sống đang ngày càng phổ biến. Không chỉ mang lại tính thẩm mỹ cao, những loài cây cảnh đặc biệt còn giúp thanh lọc không khí, tạo ra môi trường làm việc và thư giãn vô cùng lý tưởng. Khi nhịp sống đô thị ngày càng ngột ngạt, một góc xanh nhỏ bé cũng đủ để xoa dịu tâm hồn và cân bằng lại trạng thái tinh thần.</p>
            
            <img src={article.image || '/public/images/cay1.png'} alt="Main Visual Layout" />

            <p className="custom-quote">"Một chậu cây xanh trong phòng khách không chỉ là điểm nhấn trang trí, mà còn là chiếc máy lọc sinh học tuyệt vời nhất mà thiên nhiên ban tặng cho mọi gia đình."</p>

            <h2><CheckCircle2 color="#c86c42" /> 2. Những quy tắc "Sống Còn" khi chăm sóc</h2>
            <p>Rất nhiều người đã thất bại trong vòng 1 tuần đầu chỉ vì không tuân thủ các điều kiện sinh quyển cốt lõi. Dưới đây là những nguyên tắc vàng:</p>
            <ul>
              <li><strong>Ánh sáng gián tiếp:</strong> Hầu hết các loài cây trong nhà chỉ cần ánh sáng dịu. Đặt chúng gần cửa sổ hướng Đông hoặc Tây. Đừng để nắng gắt buổi trưa thiêu rụi lá.</li>
              <li><strong>Kiểm soát độ ẩm:</strong> Không phải ném càng nhiều nước càng tốt. Phun sương cho lá mỗi tuần 1 lần để giả lập môi trường nhiệt đới tự nhiên. Chỉ tưới khi lớp đất mặt đã khô hoàn toàn.</li>
              <li><strong>Cấu trúc Đất nền:</strong> Phải là đất tơi xốp, ưu tiên sử dụng Đá Perlite, Chun nhỏ và lớp xơ dừa băm.</li>
            </ul>

            {/* In-content Affiliate Box - High Conversion */}
            <div className="affiliate-inline-box">
              <img src="/public/images/cay3.png" alt="Sản phẩm gợi ý" className="affiliate-inline-img" />
              <div className="affiliate-inline-info">
                <h4>Combo Đất Trồng Premium + Phân Tan Chậm</h4>
                <p>Giải pháp tối ưu nhổ rễ chứng "Úng nước" khiến 90% cây chết. Công thức độc quyền đã được pha trộn sẵn tỉ lệ vàng giữa Mùn, Đá Perlite và Phân Hữu cơ vi sinh.</p>
                <a href="#" className="btn-buy-inline">
                  <ShoppingBag size={18} /> Mua Chính Hãng Trên Shopee (Freeship)
                </a>
              </div>
            </div>

            <h2><CheckCircle2 color="#c86c42" /> 3. Lời kết</h2>
            <p>Việc chăm cây cảnh không đòi hỏi quá nhiều kỹ thuật phức tạp nếu bạn thực sự thấu hiểu nhu cầu tự nhiên của chúng. Đừng ngần ngại sắm ngay một chậu cây để tự mình trải nghiệm năng lượng tích cực mà nó mang lại. Khởi đầu luôn gian nan, nhưng một khi chúng bung chiếc lá mới đầu tiên, đó là phần thưởng vô giá.</p>

            <div className="article-tags">
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
               <img src="/public/images/cay4.png" alt="Khuyến mãi" className="affiliate-widget-img" />
               <h4>Săn Deal Giảm Giá Cây Sân Vườn Đặc Biệt</h4>
               <p>Chỉ áp dụng mã <strong>PLANTSVN20</strong> hôm nay để được khấu trừ thẳng 20% đơn hàng tại hệ thống kho đối tác.</p>
               <a href="#" className="btn-widget">Đến Kho Vườn Shopee</a>
             </div>

             {/* Top Rated Products Widget */}
             <div className="widget-card">
                <h3 className="widget-title"><ThumbsUp size={18} color="#c86c42"/> Phụ Kiện Bán Chạy</h3>
                <div className="products-list-item">
                   <img src="/public/images/cay2.png" className="product-widget-img" alt="prod"/>
                   <div className="product-widget-info">
                      <h5>Chậu Gốm Sứ Bắc Âu Trắng</h5>
                      <a href="#">Mua Giá 120k →</a>
                   </div>
                </div>
                <div className="products-list-item">
                   <img src="/public/images/cay5.png" className="product-widget-img" alt="prod"/>
                   <div className="product-widget-info">
                      <h5>Bình xịt phun sương áp lực</h5>
                      <a href="#">Mua Giá 65k →</a>
                   </div>
                </div>
                <div className="products-list-item">
                   <img src="/public/images/cay1.png" className="product-widget-img" alt="prod"/>
                   <div className="product-widget-info">
                      <h5>Cây con Monstera Đột Biến</h5>
                      <a href="#">Mua Giá 250k →</a>
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
          {mockBlogPosts.slice(1, 5).map(related => (
            <Link to={`/blog/${related.id}`} key={related.id} className="related-card">
              <img src={related.image} alt={related.title} className="related-img" />
              <div className="related-info">
                <h4>{related.title}</h4>
                <span><Calendar size={14}/> {related.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BlogDetailPage;
