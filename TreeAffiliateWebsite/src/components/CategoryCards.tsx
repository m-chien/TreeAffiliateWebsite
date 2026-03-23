import React from 'react';
import './CategoryCards.css';

const CategoryCards: React.FC = () => {
  return (
    <section className="category-cards container section-padding">
      <div className="grid cards-grid">
        
        <div className="category-card" style={{ background: '#F8F3ED' }}>
          <div className="card-content">
            <span className="badge badge-red">Khuyến Mãi Lớn</span>
            <h3 className="font-serif">Cây Trong <br/> Nhà</h3>
            <a href="#" className="card-link mt-4">Xem Ngay <span>→</span></a>
          </div>
          <div className="card-image">
            <img src="https://images.unsplash.com/photo-1487798452839-440eb76e1a47?auto=format&fit=crop&w=400&q=80" alt="Indoor Plants" style={{ color: 'transparent' }} />
          </div>
        </div>

        <div className="category-card" style={{ background: '#EBF2EE' }}>
          <div className="card-content">
            <span className="badge badge-green">Sản Phẩm Nổi Bật</span>
            <h3 className="font-serif">Cây <br/> Thảo Dược</h3>
            <a href="#" className="card-link mt-4">Xem Ngay <span>→</span></a>
          </div>
          <div className="card-image">
            <img src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=400&q=80" alt="Herbal Plants" style={{ color: 'transparent' }} />
          </div>
        </div>

      </div>
    </section>
  );
};

export default CategoryCards;
