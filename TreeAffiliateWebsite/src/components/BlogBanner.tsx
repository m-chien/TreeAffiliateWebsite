import React from 'react';
import { ArrowRight } from 'lucide-react';
import './BlogBanner.css';

const BlogBanner: React.FC = () => {
  return (
    <section className="blog-banner container section-padding" id="blog">
      <div className="banner-wrapper flex">
        <div className="banner-image">
          {/* Using monstera background */}
        </div>
        <div className="banner-content">
          <h2 className="font-serif">
            Cùng Chúng Tôi Chăm Sóc Cây Xanh Tốt Hơn
          </h2>
          <p>
            Khám phá nghệ thuật chăm sóc cây cảnh. Chúng tôi luôn sẵn sàng chia sẻ 
            những bí quyết để khu vườn của bạn phát triển rực rỡ nhất.
          </p>
          <a href="#" className="btn btn-primary gap-2 mt-4">
            Đọc Thêm <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogBanner;
