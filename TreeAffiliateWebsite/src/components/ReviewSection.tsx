import React, { useState, useEffect } from 'react';
import { Star, StarHalf, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import './ReviewSection.css';

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Jenkins",
    date: "15 Thg 8, 2024",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    rating: 5,
    text: "Thực sự rất thích cây Monstera của tôi! Khi nhận được tình trạng rất tuyệt vời, đóng gói cẩn thận và chồi non đã bắt đầu nhú ra. Quy trình hướng dẫn chăm sóc cực kỳ hữu ích đối với người mới như tôi."
  },
  {
    id: 2,
    name: "Michael Chen",
    date: "02 Thg 9, 2024",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    rating: 4,
    text: "Cây Lưỡi Hổ tôi nhận được cực kì đẹp và khoẻ mạnh. Khâu giao hàng tốn nhiều thời gian hơn dự kiến nhưng bản thân cây trồng thật sự chính xác như mô tả. Rất hài lòng với Plants Avenue!"
  },
  {
    id: 3,
    name: "Emma Watson",
    date: "10 Thg 10, 2024",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    rating: 5,
    text: "Tôi đã mua vài cây ở đây và không bao giờ phải thất vọng. Cây Lan Ý ngoài đời vô cùng lộng lẫy và mang theo nhiều sức sống khi được bố trí trong phòng ngủ của tôi. Cực kỳ tiến cử dịch vụ này!"
  }
];

const ReviewSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="review-section bg-cream section-padding" id="review">
      <div className="container">
        <motion.div 
          className="text-center mb-5"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif section-title">Đánh Giá & Review Cây Cảnh</h2>
          <p className="subtitle mx-auto">Khám phá hàng ngàn đánh giá từ cộng đồng người yêu cây cảnh của chúng tôi.</p>
        </motion.div>

        <div className="grid review-grid">
          
          {/* Detailed Product Review Card */}
          <motion.div 
            className="product-review-card"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="prd-review-header flex gap-4">
              <div className="prd-review-img">
                <motion.img 
                  src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                  alt="Monstera Deliciosa" 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="prd-review-title">
                <h3 className="font-serif">Monstera Deliciosa</h3>
                <div className="stars flex gap-1">
                  <Star fill="#F59E0B" color="#F59E0B" size={18} />
                  <Star fill="#F59E0B" color="#F59E0B" size={18} />
                  <Star fill="#F59E0B" color="#F59E0B" size={18} />
                  <Star fill="#F59E0B" color="#F59E0B" size={18} />
                  <StarHalf fill="#F59E0B" color="#F59E0B" size={18} />
                  <span className="rating-score">4.7/5 (128 đánh giá)</span>
                </div>
              </div>
            </div>

            <div className="prd-review-body">
              <div className="pros-cons grid">
                <div className="pros">
                  <h4>Ưu điểm:</h4>
                  <ul>
                    <li><CheckCircle2 color="#10B981" size={16}/> Dễ chăm sóc, sinh trưởng nhanh</li>
                    <li><CheckCircle2 color="#10B981" size={16}/> Khả năng lọc không khí tuyệt vời</li>
                    <li><CheckCircle2 color="#10B981" size={16}/> Kiểu dáng lá độc đáo, hiện đại</li>
                  </ul>
                </div>
                <div className="cons">
                  <h4>Nhược điểm:</h4>
                  <ul>
                    <li><AlertTriangle color="#EF4444" size={16}/> Cần không gian tương đối rộng</li>
                    <li><AlertTriangle color="#EF4444" size={16}/> Tránh ánh sáng mặt trời gay gắt</li>
                  </ul>
                </div>
              </div>
              
              <div className="reviewer-verdict">
                <p>
                  "Monstera Deliciosa xứng đáng là nữ hoàng của cây trong nhà. Sự phát triển mạnh mẽ 
                  cùng những chiếc lá xẻ thùy đặc trưng mang lại vẻ đẹp nhiệt đới cho bất kỳ không gian nào. 
                  Tuy nhiên hãy đảm bảo bạn có đủ không gian cho chúng vươn mình."
                </p>
              </div>
            </div>

            <div className="prd-review-footer flex justify-between items-center">
              <div className="expert-info flex items-center gap-3">
                <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Expert" className="expert-avatar" />
                <div>
                  <strong>David Palmer</strong>
                  <span className="expert-title">Chuyên gia cây cảnh</span>
                </div>
              </div>
              <motion.a 
                href="#" 
                className="btn btn-primary gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Mua tại đây <ArrowRight size={16}/>
              </motion.a>
            </div>
          </motion.div>

          {/* Testimonial Carousel */}
          <motion.div 
            className="testimonial-carousel"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="font-serif mb-4 text-center">Trải Nghiệm Khách Hàng</h3>
            <div className="carousel-window">
              <div 
                className="carousel-track" 
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {TESTIMONIALS.map(t => (
                  <div className="testimonial-slide" key={t.id}>
                    <div className="testimonial-card">
                      <div className="stars flex gap-1 mb-3 justify-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} fill={i < t.rating ? "#F59E0B" : "none"} color={i < t.rating ? "#F59E0B" : "#D1D5DB"} size={16} />
                        ))}
                      </div>
                      <p className="testimonial-text">"{t.text}"</p>
                      <div className="testimonial-user flex flex-col items-center mt-4">
                        <img src={t.avatar} alt={t.name} />
                        <strong>{t.name}</strong>
                        <span>{t.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="carousel-dots flex justify-center gap-2 mt-4">
              {TESTIMONIALS.map((_, i) => (
                <button 
                  key={i} 
                  className={`dot ${currentSlide === i ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
