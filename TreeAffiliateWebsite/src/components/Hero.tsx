import React from 'react';
import { Truck, ShieldCheck, HeartPulse, ArrowRight } from 'lucide-react';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="hero bg-dark-green">
      <div className="container hero-container grid">
        <div className="hero-content animate-fade-in">
          <h1 className="hero-title font-serif">Mang Thiên Nhiên <br/> Đến Gần Bạn Hơn</h1>
          <p className="hero-description">
            Tô điểm không gian sống với các loại cây trong nhà của chúng tôi. 
            Cảm nhận sự thanh bình và tươi mát ngay chính ngôi nhà của bạn.
          </p>
          <a href="#shop" className="btn btn-primary hero-btn">
            <span>Khám Phá Ngay</span> 
            <span className="btn-icon-wrapper">
              <ArrowRight size={16} />
            </span>
          </a>
        </div>
        
        <div className="hero-visual animate-fade-in" style={{animationDelay: '0.2s'}}>
          <div className="arch-mask">
            {/* Using a placeholder high-quality plant image */}
            <img src="https://images.unsplash.com/photo-1597055909287-2521c78473e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Beautiful indoor plant" />
            <div className="price-badge font-serif">
              <span>Giá từ</span>
              <strong>$8</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="trust-badges flex justify-between items-center animate-fade-in" style={{animationDelay: '0.4s'}}>
          <div className="trust-badge flex items-center gap-4">
            <Truck size={36} className="trust-icon" />
            <div>
              <h4>Giao Hàng Tận Nơi</h4>
              <p>Miễn phí giao hàng toàn quốc cho mọi đơn hàng trên 500k</p>
            </div>
          </div>
          <div className="trust-badge flex items-center gap-4">
            <ShieldCheck size={36} className="trust-icon" />
            <div>
              <h4>Thanh Toán An Toàn</h4>
              <p>Bảo mật thông tin tuyệt đối qua cổng thanh toán uy tín</p>
            </div>
          </div>
          <div className="trust-badge flex items-center gap-4">
            <HeartPulse size={36} className="trust-icon" />
            <div>
              <h4>Hỗ Trợ Tận Tình</h4>
              <p>Cam kết hoàn tiền trong 30 ngày nếu không hài lòng</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
